/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // 👈 important
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'blueish': "#0e8cc5"
            }
        },
    },
    plugins: [],
}