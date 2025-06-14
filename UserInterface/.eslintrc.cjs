// This tells the system: "Hey, start reading rules from this file, it's the main guy."
module.exports = {
  // This line says: "We're setting up rules from the very root of the project."
  root: true,

  // We're telling ESLint where our code will run: in the browser, using modern JavaScript (2020+).
  env: { browser: true, es2020: true },

  // Think of these like parenting styles. We're inheriting rules from trusted experts.
  extends: [
    // Basic rules from ESLint—like a strict school teacher watching over your grammar.
    'eslint:recommended',

    // React-specific rules—help you avoid common mistakes while building components.
    'plugin:react/recommended',

    // Ensures JSX is handled properly without needing to manually import React.
    'plugin:react/jsx-runtime',

    // Encourages good practices when using React hooks like useState and useEffect.
    'plugin:react-hooks/recommended',
  ],

  // These are the folders or files ESLint should ignore—like telling it "don't go in that room."
  ignorePatterns: ['dist', '.eslintrc.cjs'],

  // We’re saying: “We write modern code (latest ECMAScript) using module style (import/export).”
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },

  // This helps ESLint understand which React version we're using.
  settings: { react: { version: '18.2' } },

  // Plugins are like superpowers. This one helps with fast updates during development (hot reloading).
  plugins: ['react-refresh'],

  // Here’s the list of custom rules where we override or fine-tune behavior:
  rules: {
    // We turn off the warning about not using "noopener noreferrer" when using target="_blank".
    // Maybe we’re handling it differently or just don’t want the nagging right now.
    'react/jsx-no-target-blank': 'off',

    // This gives a soft warning (not an error) if you're exporting components in a weird way.
    // But it allows you to export constants without trouble.
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
