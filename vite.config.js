import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "./",
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    minify: true, //圧縮するかしないか？
    rollupOptions: {
      //ファイル出力設定
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.names[0].split(".")[1];
          //Webフォントファイルの振り分け
          if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
            extType = "fonts";
          }
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img";          }
          //ビルド時のCSS名を明記してコントロールする
          if (extType === "css") {
            return `css/style.css`;
          }
          return `${extType}/[name][extname]`;
        },
        chunkFileNames: "js/[name].js",
        entryFileNames: (chunkInfo) => {
          // 💡 HTMLファイルの個別処理をすべて削除し、JSファイルのみに限定する

          // chunkInfo.isEntryがtrueで、inputで指定したエントリポイント
          if (chunkInfo.isEntry && chunkInfo.name !== 'main') {
              // 例: "contact/index" -> contact/index.js (通常はこれで十分)
              // 必要に応じて、以下のようにディレクトリ構造を維持するように修正
              return `${chunkInfo.name}.js`;
          }

          // メインのJSファイル、またはその他のチャンクファイル
          return "js/[name].js";
        },
      },
      input: {
        index: resolve(__dirname, "./src/index.html"),
        contact: resolve(__dirname, "./src/contact/index.html"),
        contactThanks: resolve(__dirname, "./src/contact-thanks/index.html"),
        whitepaper: resolve(__dirname, "./src/whitepaper/index.html"),
        whitepaperDownload: resolve(__dirname, "./src/whitepaper-download/index.html"
        ),
        terms: resolve(__dirname, "./src/terms/index.html"),
        policy: resolve(__dirname, "./src/policy/index.html"),
      },
    },
  },
});
