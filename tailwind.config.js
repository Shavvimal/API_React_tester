module.exports = {
  purge: {
    enabled: true,
    // enabled: process.env.NODE_ENV == "production"
    content: [
      './src/**/*.js'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
