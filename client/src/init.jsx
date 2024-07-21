/* Polyfill for global variable issue in Vite.
React's Amazon Cognito library requires a global variable named `global`,
but Vite does not define it like Webpack does. This line ensures that
`window.global` is available by assigning `window` to it if `window.global`
does not already exist. */
window.global ||= window;