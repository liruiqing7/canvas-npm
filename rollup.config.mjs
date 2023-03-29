import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import serve from "rollup-plugin-serve";

const overrides = {
  compilerOptions: {
    noUnusedParameters: true,
    noUnusedLocals: true,
    strictNullChecks: true,
    moduleResolution: "node",
    declaration: true, //抽离声明代码 *.d.js
    allowSyntheticDefaultImports: true,
  },
  useTsconfigDeclarationDir: true,
};

export default {
  input: "src/index.tsx",
  output: {
    file: "dist/bundle.js",
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    typescript({
      tsconfigOverride: overrides,
    }),
    nodeResolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      modulesOnly: true,
      preferredBuiltins: false,
    }),
    commonjs(),
    babel({ babelHelpers: "bundled" }),
  ],
};
