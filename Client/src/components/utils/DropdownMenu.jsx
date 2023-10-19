import React, { useState } from 'react';

const DropdownMenu = ({ items }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItems, setSelectedItems] = useState([]);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const handleCheckboxChange = (event) => {
		const value = event.target.value;
		if (selectedItems.includes(value)) {
			setSelectedItems(selectedItems.filter((item) => item !== value));
		} else {
			setSelectedItems([...selectedItems, value]);
		}
	};

	return (
		<div className='relative group'>
			<button
				onClick={toggleMenu}
				className='text-white bg-violet rounded-full pl-4 pr-2 py-1 focus:outline-none hover:bg-violet-dark'
			>
				☰{/* Icono de hamburguesa */}
			</button>
			{isOpen && (
				<ul className='dropdown-menu absolute top-0 right-0 mt-10 w-48 bg-white border rounded-lg shadow-lg'>
					<li className='p-2'>
						<label className='flex items-center space-x-2'>
							<input
								type='checkbox'
								value='departments'
								onChange={handleCheckboxChange}
								checked={selectedItems.includes('departments')}
								className='form-checkbox text-violet-dark'
							/>
							<span className='text-gray-700'>Departments</span>
						</label>
					</li>
					<li className='p-2'>
						<label className='flex items-center space-x-2'>
							<input
								type='checkbox'
								value='house'
								onChange={handleCheckboxChange}
								checked={selectedItems.includes('house')}
								className='form-checkbox text-violet-dark'
							/>
							<span className='text-gray-700'>House</span>
						</label>
					</li>
					<li className='p-2'>
						<label className='flex items-center space-x-2'>
							<input
								type='checkbox'
								value='users'
								onChange={handleCheckboxChange}
								checked={selectedItems.includes('users')}
								className='form-checkbox text-violet-dark'
							/>
							<span className='text-gray-700'>Users</span>
						</label>
					</li>
					{items.map((item, index) => (
						<li key={index} className='p-2 hover:bg-gray-200'>
							<a
								href={item.link}
								className='text-gray-700 hover:text-violet-dark'
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default DropdownMenu;
