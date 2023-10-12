import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../../../redux/actions";

export const allUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

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
            <th>ADDRESS</th>
            <th>CITY</th>
            <th>COUNTRY</th>
            <th>POSTS</th>
            <th>ID</th>
            <th>ROLE</th>
            <th>ACTIVE</th>
          </tr>
        </head>
        <body>
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
                <td>{user.posts.length}</td>
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
        </body>
      </table>
    </div>
  );
};
