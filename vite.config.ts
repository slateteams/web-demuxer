import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import babel from "@rollup/plugin-babel";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig(({mode}) => ({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "web-demuxer",
      fileName: "web-demuxer",
    },
    minify: mode === 'development',
    rollupOptions: {
      plugins: [
        babel({
          presets: [
            [
              "@babel/preset-env",
              {
                targets: "> 0.25%, not dead",
              },
            ],
          ],
          extensions: [".ts"],
          babelHelpers: "bundled",
        }),
      ],
    },
    sourcemap: mode === 'development',
  },
  plugins: [
    dts({ rollupTypes: true }),
    viteStaticCopy({
      targets: [
        {
          src: 'src/lib/*.{js,wasm}',
          dest: 'wasm-files'
        }
      ]
    })
  ],
}));
