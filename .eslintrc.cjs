module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    // * Begin React Rules:

    "react/prop-types": 0,
    "no-unused-vars": "off", // "import/no-unresolved": "error", // "import/named": "error", // "import/default": "error", // "import/namespace": "error", // "import/export": "error", // "import/no-named-as-default": "error", // "import/no-named-as-default-member": "error", // "import/no-extraneous-dependencies": "error",

    // * End React Rules: //

    // * Javascript Rules: //

    "lines-around-comment": [
      "error",
      {
        beforeBlockComment: false,
        afterBlockComment: false,
        beforeLineComment: false,
        afterLineComment: false,
        allowBlockStart: false,
        allowBlockEnd: false,
        allowObjectStart: false,
        allowObjectEnd: false,
        allowArrayStart: false,
        allowArrayEnd: false,
      },
    ],
    "no-confusing-arrow": ["error", { allowParens: false }], // Auto determines if parenthesis are required or not for multi operators:
    "no-mixed-operators": "error", // Allows tabs for spacing:
    "no-tabs": ["error", { allowIndentationTabs: true }], // Quotes are automatically converted to double quotes:
    quotes: [
      "error",
      "double",
      { avoidEscape: true, allowTemplateLiterals: false },
    ], // Allows prettier to break up long lines of code if enabled:
    curly: ["error", "all"], // Using 'alert()' in code gives warning:
    "no-alert": "warn", // Throws an error if trying to call before defined:
    "no-use-before-define": [
      "error",
      {
        functions: false,
        classes: true,
        variables: true,
        allowNamedExports: false,
      },
    ], // Determines the max amount of classes per file:
    "max-classes-per-file": ["error", 5], // Allows function parameters to be reassigned:
    "no-param-reassign": ["error", { props: false }], // Allows for ++ and -- operators:
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }], // Requiring comma placement at the end of multi-line code:
    "comma-dangle": ["error", "only-multiline"], // Ignore long comments:
    "max-len": [
      "error",
      {
        code: 120,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
      },
    ],
    "prefer-const": [
      "error",
      {
        ignoreReadBeforeAssign: true,
        destructuring: "all",
      },
    ], // Allow for '.js' extensions during module import => i.e.: import { ships } from '.ships.js': // "import/extensions": [<severity>, "always"]
  },
};
