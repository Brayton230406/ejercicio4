import js from "@eslint/js";
export default [
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
  js.configs.recommended,
  {
    files: ["script.js"],
    languageOptions: {
      globals: { document: "readonly", setTimeout: "readonly" },
    },
  },
  {
    files: ["**/*.cjs"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        process: "readonly",
        URL: "readonly",
        console: "readonly",
        document: "readonly",
        window: "readonly",
      },
    },
  },
];
