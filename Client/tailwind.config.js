// tailwind.config.js
module.exports = {
	content: [
		'./src/**/*.js', // Archivos JavaScript
		'./src/**/*.jsx', // Archivos JSX
		'./src/**/*.html', // Archivos HTML
	],
	theme: {
		extend: {
			colors: {
				indigo: {
					50: '#f0f4ff',
					// Define otros tonos de azul indigo aquí según sea necesario.
				},
				fuchsia: {
					900: '#a700ff',
					// Define otros tonos de fuchsia aquí según sea necesario.
				},
				gray: {
					900: '#333333',
					// Define otros tonos de gris aquí según sea necesario.
				},
				white: '#ffffff',
				// Define otros colores aquí según sea necesario.
			},
		},
	},
	plugins: [
		// ...
		require('@tailwindcss/forms'),
	],
};
