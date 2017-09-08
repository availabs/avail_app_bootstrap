#!/usr/bin/env node

/*
  In the blog, it says to add the folloing to the package.json scripts.
    Instead, we'll do the work in this script and call it from package.json 

  "relay": "curl https://graphql-demo.kriasoft.com/schema -o ./src/graphql.schema && relay-compiler --src ./src --schema ./src/graphql.schema

  Main docs: https://facebook.github.io/relay/docs/relay-compiler.html

  I believe the __generated__/ is created only if there are graphql queries in the code.
*/

const { spawn } = require('child_process');
const { join } = require('path');

const relayCompilerPath = join(
  __dirname,
  '../node_modules/relay-compiler/bin/relay-compiler'
);

const srcDir = join(__dirname, '../src');

const schemaDir = join(__dirname, '../src/relay-schema');
const schemaFileName = 'graphql.schema';
const schemaFilePath = join(schemaDir, schemaFileName);

const compiler = spawn(`${relayCompilerPath}`, [
  '--watch',
  '--src',
  srcDir,
  '--schema',
  schemaFilePath
]);

compiler.stdout.on('data', data => {
  console.log(data.toString());
});

compiler.stderr.on('data', data => {
  console.log(`compiler stderr: ${data}`);
});

compiler.on('close', code => {
  if (code !== 0) {
    console.log(`compiler process exited with code ${code}`);
  }
});
