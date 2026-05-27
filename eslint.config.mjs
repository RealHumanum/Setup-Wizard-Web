import next from "eslint-config-next";

const eslintConfig = [
  ...next,
  { ignores: ["out/**", ".next/**", "node_modules/**"] },
];

export default eslintConfig;
