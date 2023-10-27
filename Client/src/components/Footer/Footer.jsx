import React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { GithubOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<div className='relative isolate overflow-hidden bg-gradient-to-tr from-purple-100 via-indigo-300 to-indigo-500  lg:p-8'>
			<div className='mx-auto w-full overflow-hidden px-8 lg:px-24'>
				<div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2'>
					<div className='max-w-xl lg:max-w-lg'>
						<h2 className='font-onest text-xl font-bold tracking-tight text-violet sm:text-4xl'>
							Inmuebles 360
						</h2>
						<p className='font-onest mt-4 text-lg leading-8 text-white'>
							Our final project proposal at the SoyHenry bootcamp. We streamline the rental and property management process to provide a user-friendly experience for both property owners and tenants.
						</p>
						<p className='font-onest mt-8 text-lg leading-8 text-white'>
							© {currentYear} Inmuebles 360 All rights reserved.
						</p>
					</div>
					<dl className='grid grid-cols-1 gap-x-11 gap-y-10 sm:grid-cols-2 lg:pt-8'>
						<div className='flex flex-col items-start'>
							<div className='rounded-full bg-white/5 p-2 ring-1 ring-white/10'>
								<HeartIcon
									className='h-6 w-6 text-white'
									aria-hidden='true'
								/>
							</div>
							<div className='mt-6 font-onest font-semibold text-white text-2xl'>
								Stay Connected 
							</div>
							<div className='flex gap-x-11 mt-3 text-violet text-4xl'>
								<div>
									<a href='https://github.com/joaBotto/proyectofinal'>
										<GithubOutlined />
									</a>
								</div>
							</div>
							<div className='mt-6'>

								<p></p>
								<Link to='/about'>
								<button className='font-onest rounded-full bg-violet px-3.5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-pink'>
   								 Team Members
 								</button>
								</Link>
							</div>
						</div>
					</dl>
				</div>
			</div>
		</div>
	);
}
