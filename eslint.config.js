const { configs, processors } = require("@angular-eslint/eslint-plugin");
const { configs: tsConfigs } = require("@typescript-eslint/eslint-plugin");
const { configs: jsConfigs } = require("@eslint/js");

// You do not need .config() helpers—use plain objects.

module.exports = [
  // Ignore patterns (flat config way)
  {
    ignores: [
      "node_modules/",
      "dist/",
      "coverage/",
      "*.js",
      "*.d.ts",
      "*.json"
      // Add additional patterns as needed
    ]
  },
  // TypeScript/Angular files
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
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
    processor: processors.inlineTemplate
  },
  // Angular templates
  {
    files: ["**/*.html"],
    plugins: {
      "@angular-eslint/template": require("@angular-eslint/eslint-plugin-template")
    },
    languageOptions: {
      parser: "@angular-eslint/template-parser"
    },
    rules: {
      ...require("@angular-eslint/eslint-plugin-template").configs["recommended"].rules,
      ...require("@angular-eslint/eslint-plugin-template").configs["accessibility"].rules
    }
  }
];
