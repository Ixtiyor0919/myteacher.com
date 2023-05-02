import { Input } from "antd";
import { createContext } from "react";
// import { useData } from "../Hooks/UseData";
import { useLocation } from "react-router-dom";
// import CustomSelect from "../Modules/Select/Select";

export const TableContext = createContext();

export const TableProvider = ({ children }) => {
    let location = useLocation();
    // const { roleData } = useData();

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
            input: <Input placeholder="Xodimni lavozimini kiriting" />,
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
            input: <Input placeholder="Mijoz kursini kiriting" />,
        },
        {
            name: "age",
            label: "Mijoz yoshi",
            required: true,
            input: <Input placeholder="Mijoz yoshini kiriting" />,
        },
        {
            name: "location",
            label: "Mijoz manzili",
            required: true,
            input: <Input placeholder="Mijoz manzilini kiriting" />,
        },
        // {
        //     name: "roleId",
        //     label: "Role",
        //     required: true,
        //     input: (
        //         <CustomSelect
        //             backValue={"id"}
        //             placeholder={"Role tanlang"}
        //             selectData={roleData?.map((item) => ({
        //                 ...item,
        //                 name: item.name,
        //             }))}
        //         />
        //     ),
        // },
    ];

    let formData = {};

    switch (location.pathname) {
        case "/": {
            formData = {
                formData: clientsFormData,
                editFormData: clientsFormData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                auditInfo: true,
                editModalTitle: "Auditing",
                modalTitle: "Mijoz qo'shish",
            };
            break;
        }
        case "/users": {
            formData = {
                formData: usersFormData,
                editFormData: usersFormData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "Auditing",
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
