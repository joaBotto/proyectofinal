import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../../redux/actions';
import Switch from 'react-switch';
import { updateUser } from '../../../redux/actions';
import NavBarAdmin from '../NavBar/NavBarAdmin';

export const AllUsers = () => {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users);
	const [usersLocal, setUsersLocal] = useState(null);
	console.log('soy userLocal', usersLocal);

	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);

	useEffect(() => {
		setUsersLocal(users);
	}, [users]);

	const handleSelectChange = (event, id) => {
		const usersUpdate = usersLocal.map((user) => {
			if (user._id === id) {
				return { ...user, role: event.target.value };
			} else {
				return user;
			}
		});
		setUsersLocal(usersUpdate);
		const user = usersUpdate.find((user) => user._id === id);
		dispatch(updateUser(user));
	};

	const handleActive = (id, value) => {
		console.log(value);
		const usersUpdate = usersLocal.map((user) => {
			if (user._id === id) {
				return { ...user, active: value };
			} else {
				return user;
			}
		});
		setUsersLocal(usersUpdate);
		const user = usersUpdate.find((user) => user._id === id);
		console.log('soy user', user);
		dispatch(updateUser(user));
	};

	return (
		<div className='mx-4 mt-6'>
			<NavBarAdmin />
			<h1 className='text-3xl font-bold mb-4 text-violet text-center'>
				All Users
			</h1>
			<div className='overflow-x-auto'>
				<table className='min-w-full table-auto divide-y divide-gray-300 shadow-md'>
					<thead>
						<tr className='min-w-full table-auto divide-y divide-gray-300 shadow-md'>
							<th className='px-4 py-2 text-violet '>NAME</th>
							<th className='px-4 py-2 text-violet'>LASTNAME</th>
							<th className='px-4 py-2 text-violet'>EMAIL</th>
							<th className='px-4 py-2 text-violet'>PHONE NUMBER</th>
							<th className='px-4 py-2 text-violet'>ADDRESS</th>
							{/* <th className='px-4 py-2'>CITY</th> */}
							<th className='px-4 py-2 text-violet'>COUNTRY</th>
							{/* <th className='px-4 py-2'>ID</th> */}
							<th className='px-4 py-2 text-violet'>ROLE</th>
							<th className='px-4 py-2 text-violet'>ACTIVE</th>
						</tr>
					</thead>
					<tbody className='min-w-full table-auto divide-y divide-gray-300 shadow-md'>
						{usersLocal &&
							usersLocal.map((user) => (
								<tr key={user._id}>
									<td className='px-4 py-2'>{user.name}</td>
									<td className='px-4 py-2'>{user.lastName}</td>
									<td className='px-4 py-2'>{user.email}</td>
									<td className='px-4 py-2'>{user.phoneNumber}</td>
									<td className='px-4 py-2'>{user.address}</td>
									{/* <td className='px-4 py-2'>{user.city}</td> */}
									<td className='px-4 py-2'>{user.country}</td>
									{/* <td className='px-4 py-2'>{user._id}</td> */}
									<td className='px-4 py-2'>
										<select
											className='px-2 py-1 pr-8 bg-blue-200 border border-blue-400 rounded'
											name='role'
											onChange={(event) => {
												handleSelectChange(event, user._id);
											}}
											value={user.role}
										>
											<option value='user'>User</option>
											<option value='admin'>Admin</option>
										</select>
									</td>
									<td className='px-2 py-2'>
										<Switch
											onChange={(newActive) => {
												handleActive(user._id, newActive);
											}}
											checked={user.active}
										/>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
