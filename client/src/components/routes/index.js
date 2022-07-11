import React, { lazy } from "react";
const EmployeeList = lazy(() => import("../../components/EmployeeList"));

const EmployeeEdit = lazy(() => import("../../components/EmployeeEdit"));

const EmployeeCreate = lazy(() => import("../../components/EmployeeCreate"));
// import EmployeeEdit from "../../components/EmployeeEdit";
// import EmployeeCreate from "../../components/EmployeeCreate";
// import EmployeeList from "../../components/EmployeeList";

export default [
    {
        path: "/employeelist",
        Component: EmployeeList,
    },
    {
        path: "/employeecreate",
        Component: EmployeeCreate,
    },
    {
        path: "/employeeedit",
        Component: EmployeeEdit,
    },
];
