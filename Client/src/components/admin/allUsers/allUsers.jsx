import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../../../redux/actions";


export const allUsers = () => {
const dispatch = useDispatch();

useEffect(() => {
    dispatch(getAllUsers());
},[dispatch])


return (
<div>
    <h1>All Users</h1>
    <table>
        <head>
            <tr>
                <th>NAME</th>
                <th>LASTNAME</th>
                <th>EMAIL</th>
                <th>PHONENUMBER</th>
                <th></th>
            </tr>
        </head>
    </table>
    
</div>
)
}
