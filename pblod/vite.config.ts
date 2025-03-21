import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import ViteAutoImport from "unplugin-auto-import/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vite.dev/config/
const pathSrc = path.resolve(__dirname, "src");
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    ViteAutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      imports: ["vue"],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: "Icon",
        }),
      ],
      dts: path.resolve(pathSrc, "components.d.ts"),
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        // Auto register icon components
        IconsResolver({
          enabledCollections: ["ep"],
        }),
      ],
      dts: path.resolve(pathSrc, "auto-imports.d.ts"),
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  assetsInclude: ["**/*.svg"],
  // 配置@
  resolve: {
    alias: {
      "@": pathSrc,
    },
  },
});
