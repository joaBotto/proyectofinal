import React from "react";
import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../redux/actions";
import Switch from "react-switch";
import { updateUser } from "../../../redux/actions";

export const AllUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [usersLocal,setUsersLocal] = useState(null);
  console.log("soy userLocal",usersLocal)
  
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setUsersLocal(users);
  }, [users])

  const handleSelectChange = (event, id) => {
    const usersUpdate = usersLocal.map((user) => {if (user._id === id) {
      return {...user, role:event.target.value}
    } else {
      return user;
    }})
    setUsersLocal(usersUpdate)
    const user = usersUpdate.find((user) => user._id === id)
    dispatch(updateUser(user))
  }

  const handleActive = (id, value) => {
    console.log(value)
   const usersUpdate = usersLocal.map((user) => {if (user._id === id) {
      return {...user, active: value}
    } else {
      return user;
    }})
    setUsersLocal(usersUpdate);
    const user = usersUpdate.find((user) => user._id === id)
    console.log("soy user", user)
    dispatch(updateUser(user))
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
          {usersLocal &&
            usersLocal.map((user) => (
              <tr key={user._id}>
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
                  <select  name="role" onChange={(event)=> {handleSelectChange(event, user._id)}} value={user.role}>
                    <option value = "user">User</option>
                    <option value = "admin">Admin</option>
                  </select>
                </td>
                <td><Switch onChange={(newActive)=>{handleActive(user._id, newActive)}} checked={user.active} />
                  
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
