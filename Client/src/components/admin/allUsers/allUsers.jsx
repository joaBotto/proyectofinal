import React from "react";
import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../redux/actions";
import Switch from "react-switch";

export const AllUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const [userChange, setUserChanges] = useState({
    id: "",
    email:"",
    password: "",
    name: "",
    lastName: "",
    country: "",
    city: "",
    address: "",
    phoneNumber: 0,
    active: true,
    role: 'user',
    properties: [],
    images: [],
    createdAt:"",
    __v:""
  }) 

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleActive = () => {
    console.log("holarodrigo")
  }

  return (
    <div>
      <h1>All Users</h1>
      <table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>LASTNAME</th>
            <th>EMAIL</th>
            <th>PHONE NUMBER</th>
            <th>ADDRESS</th>
            <th>CITY</th>
            <th>COUNTRY</th>
            {/* <th>POSTS</th> */}
            <th>ID</th>
            <th>ROLE</th>
            <th>ACTIVE</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.address}</td>
                <td>{user.city}</td>
                <td>{user.country}</td>
                {/* <td>{user.posts.length}</td> */}
                <td>{user._id}</td>
                <td>
                  <select value={user.role}>
                    <option value = "user">User</option>
                    <option value = "admin">Admin</option>
                  </select>
                </td>
                <td>
                  <Switch onChange={handleActive} checked={user.active} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
