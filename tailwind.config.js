// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: [
        "disabled"
      ],
      backgroundColor: [
        "disabled"
      ],
      cursor: [
        "disabled"
      ]
    }
  },  
  plugins: [
    require('@tailwindcss/forms')
  ],
}
