import { createContext } from "react";
import { Input, InputNumber } from "antd";
import { useData } from "../Hooks/UseData";
import { useLocation } from "react-router-dom";
import CustomSelect from "../Modules/Select/Select";

export const TableContext = createContext();

export const TableProvider = ({ children }) => {
    let location = useLocation();
    const { rolesData, coursesData } = useData();

    const usersFormData = [
        {
            name: "first_name",
            label: "Xodim ismi",
            required: true,
            input: <Input placeholder="Xodimni ismini kiriting" />,
        },
        {
            name: "last_name",
            label: "Xodim sharifi",
            required: true,
            input: <Input placeholder="Xodimni sharifini kiriting" />,
        },
        {
            name: "role",
            label: "Xodim lavozimi",
            required: true,
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Xodimni lavozimini tanlang"}
                    selectData={rolesData?.map((item) => ({
                        ...item,
                        name: item.name,
                    }))}
                />
            ),
        },
    ];
    const editUsersFormData = [
        {
            name: "first_name",
            label: "Xodim ismi",
            required: true,
            input: <Input placeholder="Xodimni ismini kiriting" />,
        },
        {
            name: "last_name",
            label: "Xodim sharifi",
            required: true,
            input: <Input placeholder="Xodimni sharifini kiriting" />,
        },
        {
            name: "role",
            label: "Xodim lavozimi",
            required: true,
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    DValue={defaultId}
                    backValue={"id"}
                    placeholder={"Xodimni lavozimini tanlang"}
                    selectData={rolesData?.map((item) => ({
                        ...item,
                        name: item.name,
                    }))}
                />
            ),
        },
    ];

    const clientsFormData = [
        {
            name: "first_name",
            label: "Mijoz ismi",
            required: true,
            input: <Input placeholder="Mijoz ismini kiriting" />,
        },
        {
            name: "last_name",
            label: "Mijoz sharifi",
            required: true,
            input: <Input placeholder="Mijoz sharifini kiriting" />,
        },
        {
            name: "course",
            label: "Mijoz kursi",
            required: true,
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Mijoz kursini tanlang"}
                    selectData={coursesData?.map((item) => ({
                        ...item,
                        name: item.name,
                    }))}
                />
            ),
        },
        {
            name: "age",
            label: "Mijoz yoshi",
            required: true,
            input: <InputNumber style={{width: "100%"}} placeholder="Mijoz yoshini kiriting" />,
        },
        {
            name: "location",
            label: "Mijoz manzili",
            required: true,
            input: <Input placeholder="Mijoz manzilini kiriting" />,
        }
    ];
    const editClientsFormData = [
        {
            name: "first_name",
            label: "Mijoz ismi",
            required: true,
            input: <Input placeholder="Mijoz ismini kiriting" />,
        },
        {
            name: "last_name",
            label: "Mijoz sharifi",
            required: true,
            input: <Input placeholder="Mijoz sharifini kiriting" />,
        },
        {
            name: "course",
            label: "Mijoz kursi",
            required: true,
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    DValue={defaultId}
                    backValue={"id"}
                    placeholder={"Mijoz kursini tanlang"}
                    selectData={coursesData?.map((item) => ({
                        ...item,
                        name: item.name,
                    }))}
                />
            ),
        },
        {
            name: "age",
            label: "Mijoz yoshi",
            required: true,
            input: <InputNumber style={{width: "100%"}} placeholder="Mijoz yoshini kiriting" />,
        },
        {
            name: "location",
            label: "Mijoz manzili",
            required: true,
            input: <Input placeholder="Mijoz manzilini kiriting" />,
        }
    ];

    let formData = {};

    switch (location.pathname) {
        case "/": {
            formData = {
                formData: clientsFormData,
                editFormData: editClientsFormData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                auditInfo: true,
                editModalTitle: "Mijozlar",
                modalTitle: "Mijoz qo'shish",
            };
            break;
        }
        case "/users": {
            formData = {
                formData: usersFormData,
                editFormData: editUsersFormData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "Xodimlar",
                modalTitle: "Xodim qo'shish",
            };
            break;
        }
        default: {
            formData = { ...formData };
        }
    }

    const value = { formData };

    return (
        <TableContext.Provider value={value}>{children}</TableContext.Provider>
    );
};
