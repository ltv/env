const path = require('path');
const esbuild = require('esbuild');
const outDir = path.resolve(__dirname, 'dist');

// const options = ;
const defaultOptions = {
  entryPoints: ['index.ts'],
  color: true,
  minify: false,
  bundle: true,
  sourcemap: false,
  platform: 'node',
  tsconfig: './tsconfig.json',
  logLevel: 'error'
};

const build = (format = 'cjs') => {
  const options = Object.assign(defaultOptions, {
    format,
    outfile: `${outDir}/env.${format}.js`,
  });
  return esbuild.build(options);
};

const outFormats = ['cjs', 'esm'];

Promise
  .all(outFormats.map(f => build(f)))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });


