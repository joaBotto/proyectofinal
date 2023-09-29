export default function Footer() {
	return (
		<div className='bg-purple-500 py-16 sm:py-24 lg:py-32'>
			<div className='mx-auto max-w-7xl px-6 lg:px-8'>
				<div className='grid grid-cols-2 gap-8'>
					<div className='grid grid-cols-1 gap-8'>
						<ul className='mt-4 space-y-2'>
							<li>
								<a href='#' className='text-gray-300 hover:text-white'>
									HOME
								</a>
							</li>
							<li>
								<a href='#' className='text-gray-300 hover:text-white'>
									ABOUT
								</a>
							</li>
							<li>
								<a href='#' className='text-gray-300 hover:text-white'>
									SAVED
								</a>
							</li>
							<li>
								<a href='#' className='text-gray-300 hover:text-white'>
									MY ACCOUNT
								</a>
							</li>
						</ul>
					</div>
					<div className='grid grid-cols-1 gap-8'>
						<ul className='mt-4 space-y-2'>
							<li>
								<a href='#' className='text-gray-300 hover:text-white'>
									<span className='font-semibold text-white'>
										REGISTRY YOUR PROPERTY
									</span>
								</a>
							</li>
							<li>
								<a href='#' className='text-gray-300 hover:text-white'>
									HELP
								</a>
							</li>
							<li>
								<a href='#' className='text-gray-300 hover:text-white'>
									CUSTOMER SERVICE
								</a>
							</li>
							<li>
								<a href='#' className='text-gray-300 hover:text-white'>
									CONTACT US
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			{/* Línea divisoria */}
			<hr className='mt-8 mb-8 border-t-2 border-gray-300 w-80 mx-auto' />

			{/* Información adicional */}
			<div className='text-center text-gray-300'>
				<p>&copy; 2023 - Inmuebles360 S.R.L</p>
				<p>Dirección: XXX | Teléfono: XXX-XXX-XXX</p>
			</div>
			<div
				className='absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6'
				aria-hidden='true'
			>
				<div
					className='aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30'
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
					}}
				/>
			</div>
		</div>
	);
}
