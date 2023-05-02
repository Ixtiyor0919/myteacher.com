import { message } from "antd";
import { useState } from "react";
import instance from "../../Api/Axios";
import { useData } from "../../Hooks/UseData";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../Modules/Table/Table";

const Users = () => {
    const { rolesData } = useData();
    const [pageData, setPageData] = useState({
        data: [],
        loading: true,
        current: 1,
        pageSize: 10,
    });
    const navigate = useNavigate();

    const getResponse = () => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .get("users")
            .then((data) => {
                // console.log("users: ", data)
                setPageData((prev) => ({
                    ...prev,
                    data: data.data,
                }));
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Xodimlarni yuklashda muammo bo'ldi");
            })
            .finally(() =>
                setPageData((prev) => ({ ...prev, loading: false }))
            );
    };

    const onCreate = (values) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .post("users", { ...values })
            .then(function (response) {
                message.success("Xodim muvaffaqiyatli qo'shildi");
                getResponse();
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Xodimni qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setPageData((prev) => ({ ...prev, loading: false }));
            });
    };

    const onEdit = (values, initial) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .put(`users/${initial.id}`, {
                ...values,
            })
            .then((res) => {
                message.success("Xodim muvaffaqiyatli taxrirlandi");
                getResponse();
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Xodimni taxrirlashda muammo bo'ldi");
            })
            .finally(() => {
                setPageData((prev) => ({ ...prev, loading: false }));
            });
    };

    const handleDelete = (arr) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        arr.map((item) => {
            instance
                .delete(`users/${item}`)
                .then((data) => {
                    getResponse();
                    message.success("Xodim muvaffaqiyatli o'chirildi");
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response?.status === 500)
                        navigate("/server-error");
                    message.error("Xodimni o'chirishda muammo bo'ldi");
                })
                .finally(() =>
                    setPageData((prev) => ({ ...prev, loading: false }))
                );
            return null;
        });
    };

    const columns = [
        {
            title: "Xodim ism",
            dataIndex: "first_name",
            key: "first_name",
            width: "33%",
            search: true,
            sorter: (a, b) => {
                if (a.first_name < b.first_name) {
                    return -1;
                }
                if (a.first_name > b.first_name) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Xodim sharifi",
            dataIndex: "last_name",
            key: "last_name",
            width: "33%",
            search: true,
            sorter: (a, b) => {
                if (a.last_name < b.last_name) {
                    return -1;
                }
                if (a.last_name > b.last_name) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Xodim lavozimi",
            dataIndex: "role",
            key: "role",
            width: "33%",
            search: true,
            render: (record) => {
                const data = rolesData?.filter((item) => item.id === record);
                return data[0]?.name;
            },
            sorter: (a, b) => {
                if (a.role < b.role) {
                    return -1;
                }
                if (a.role > b.role) {
                    return 1;
                }
                return 0;
            },
        },
    ];

    return (
        <div className="others">
            <div>
                <h3>Xodimlar</h3>
                <CustomTable
                    columns={columns}
                    pageSizeOptions={[10, 20]}
                    getData={getResponse}
                    onDelete={handleDelete}
                    onCreate={onCreate}
                    onEdit={onEdit}
                    current={pageData?.current}
                    pageSize={pageData?.pageSize}
                    setCurrent={(newProp) =>
                        setPageData((prev) => ({ ...prev, current: newProp }))
                    }
                    setPageSize={(newProp) =>
                        setPageData((prev) => ({ ...prev, pageSize: newProp }))
                    }
                    tableData={pageData?.data}
                    loading={pageData?.loading}
                    setLoading={(newProp) =>
                        setPageData((prev) => ({ ...prev, loading: newProp }))
                    }
                />
            </div>
        </div>
    );
};

export default Users;
