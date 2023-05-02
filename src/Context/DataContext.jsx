import React, { createContext, useEffect, useState } from "react";
import instance from "../Api/Axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [usersData, setUsersData] = React.useState([]);
    const [clientsData, setClientsData] = React.useState([]);
    const getUsersData = () => {
        instance
            .get("users")
            .then((data) => {
                setUsersData(data);
            })
            .catch((err) => console.error(err));
    };

    const getClientsData = () => {
        instance
            .get("clients")
            .then((data) => {
                setClientsData(data);
            })
            .catch((err) => console.error(err));
    };


    React.useEffect(() => {
        getUsersData();
        getClientsData();
    }, []);

    const value = {
        getUsersData,
        getClientsData,
        usersData,
        clientsData
    };

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
};
