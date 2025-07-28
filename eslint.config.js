// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

/**
 * See: https://eslint.org/docs/latest/use/configure/ignoring-code#the-ignores-configuration-property
 */
module.exports = [
  // TypeScript and Angular rules for .ts files
  tseslint.config(
    {
      files: ["**/*.ts"],
      extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
        ...tseslint.configs.stylistic,
        ...angular.configs.tsRecommended,
      ],
      processor: angular.processInlineTemplates,
      rules: {
        "@angular-eslint/directive-selector": [
          "error",
          {
            type: "attribute",
            prefix: "app",
            style: "camelCase",
          },
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            type: "element",
            prefix: "app",
            style: "kebab-case",
          },
        ],
      },
    },
    {
      files: ["**/*.html"],
      extends: [
        ...angular.configs.templateRecommended,
        ...angular.configs.templateAccessibility,
      ],
      rules: {},
    }
  ),
  // Global ignores (migrate from .eslintignore)
  {
    ignores: [
      "node_modules/",
      "dist/",
      "coverage/",
      "*.js",
      "*.d.ts",
      "*.json"
      // Add any additional patterns here from your .eslintignore
    ]
  }
];
