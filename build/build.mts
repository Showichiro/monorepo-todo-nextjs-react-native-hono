import arg from "arg";
import { build, context } from "esbuild";
import type { Plugin, PluginBuild, BuildOptions } from "esbuild";
import * as glob from "glob";
import fs from "fs";
import path from "path";

const args = arg({
  "--watch": Boolean,
});

const isWatch = args["--watch"] || false;

console.log(isWatch);

const entryPoints = glob.sync("./src/**/*.ts");
console.log(entryPoints);

const commonOptions: BuildOptions = {
  entryPoints,
  logLevel: "info",
  platform: "node",
};

const addExtension = (
  extension: string = ".js",
  fileExtension: string = ".ts"
): Plugin => ({
  name: "add-extension",
  setup(build: PluginBuild) {
    build.onResolve({ filter: /.*/ }, (args) => {
      if (args.importer) {
        const p = path.join(args.resolveDir, args.path);
        let tsPath = `${p}${fileExtension}`;

        let importPath = "";
        if (fs.existsSync(tsPath)) {
          importPath = args.path + extension;
        } else {
          tsPath = path.join(
            args.resolveDir,
            args.path,
            `index${fileExtension}`
          );
          if (fs.existsSync(tsPath)) {
            if (args.path.endsWith("/")) {
              importPath = `${args.path}index${extension}`;
            } else {
              importPath = `${args.path}/index${extension}`;
            }
          }
        }
        return { path: importPath, external: true };
      }
    });
  },
});

if (isWatch) {
  const cjsContext = await context({
    ...commonOptions,
    outbase: "./src",
    outdir: "./dist/cjs",
    format: "cjs",
    minify: true,
  });
  const mjsContext = await context({
    ...commonOptions,
    bundle: true,
    outbase: "./src",
    outdir: "./dist",
    format: "esm",
    plugins: [addExtension(".js")],
    minify: true,
  });
  await Promise.all([cjsContext.watch(), mjsContext.watch()]);
} else {
  const cjsBuild = () =>
    build({
      ...commonOptions,
      outbase: "./src",
      outdir: "./dist/cjs",
      format: "cjs",
      minify: true,
    });

  const esmBuild = () =>
    build({
      ...commonOptions,
      bundle: true,
      outbase: "./src",
      outdir: "./dist",
      format: "esm",
      plugins: [addExtension(".js")],
      minify: true,
    });
  await Promise.all([esmBuild(), cjsBuild()]);
}
