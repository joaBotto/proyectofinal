// tailwind.config.js

module.exports = {
	content: [
		"./src/**/*.js", // Archivos JavaScript
		"./src/**/*.jsx", // Archivos JSX
		"./src/**/*.html", // Archivos HTML
	],
	theme: {
		extend: {
			fontFamily: {
				noto: ["Noto Serif NP Hmong, serif"],
				onest: ["Onest, sans-serif"],
			},
			colors: {
				indigo: {
					50: "#f0f4ff",
					// Define otros tonos de azul indigo aquí según sea necesario.
				},
				fuchsia: {
					900: "#a700ff",
					// Define otros tonos de fuchsia aquí según sea necesario.
				},
				gray: {
					900: "#333333",
					// Define otros tonos de gris aquí según sea necesario.
				},
				white: "#ffffff",
				violet: "#54086B",
				pink: "#FF0BAC",
				cyan: "#00BEC5",
				blue: "#050833",
			},
		},
	},
	plugins: [
		// ...
		require("@tailwindcss/forms"),
	],
};
