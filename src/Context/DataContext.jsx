import React, { createContext } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const rolesData = [
        {
            id: 1,
            name: "Admin",
        },
        {
            id: 2,
            name: 'Manager',
        },
        {
            id: 3,
            name: 'Operator',
        },
        {
            id: 4,
            name: 'Tutor',
        }
    ]
    const coursesData = [
        {
            id: 1,
            name: "English",
        },
        {
            id: 2,
            name: 'Russian',
        },
        {
            id: 3,
            name: 'O\'zbek',
        },
    ]

    const value = {
        rolesData,
        coursesData,
    };

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
};
