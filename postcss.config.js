const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
	// eslint-disable-next-line no-process-env
	plugins: [
        tailwind('./tailwind.config.js'), 
        ...(process.env.HUGO_ENVIRONMENT === 'production' ? [autoprefixer] : [])
    ],
};