import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import terser from "@rollup/plugin-terser";

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
  input: "src/index.tsx", // 入口文件地址
  output: {
    file: "dist/bundle.js", // 输出文件
    format: "esm", // 5种输出格式: amd / es6 / iife / umd / cjs
    sourcemap: true, // 生成bundle.map.js 方便调试
    globals: {
      window: "window",
      self: "window",
    },
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
    terser({
      maxWorkers: 4,
    }),
    // livereload(),
  ],
};
