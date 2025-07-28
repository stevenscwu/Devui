const { configs } = require("@angular-eslint/eslint-plugin");
const { configs: tsConfigs } = require("@typescript-eslint/eslint-plugin");
const { configs: jsConfigs } = require("@eslint/js");

module.exports = [
  {
    ignores: [
      "node_modules/",
      "dist/",
      "coverage/",
      "*.js",
      "*.d.ts",
      "*.json"
    ]
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        project: ["./tsconfig.json"],
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      "@angular-eslint": require("@angular-eslint/eslint-plugin")
    },
    rules: {
      ...jsConfigs.recommended.rules,
      ...tsConfigs.recommended.rules,
      ...tsConfigs.stylistic.rules,
      ...configs.recommended.rules,
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase"
        }
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case"
        }
      ]
    },
    processor: "@angular-eslint/template/extract-inline-html"
  },
  {
    files: ["**/*.html"],
    plugins: {
      "@angular-eslint/template": require("@angular-eslint/eslint-plugin-template")
    },
    languageOptions: {
      parser: require("@angular-eslint/template-parser")
    },
    rules: {
      ...require("@angular-eslint/eslint-plugin-template").configs["recommended"].rules,
      ...require("@angular-eslint/eslint-plugin-template").configs["accessibility"].rules
    }
  }
];
