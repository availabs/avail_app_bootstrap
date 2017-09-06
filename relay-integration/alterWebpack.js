#!/usr/bin/env node

/* eslint no-console: 0 */

const { readFileSync, writeFileSync } = require("fs");

const { join } = require("path");

const file = join(__dirname, "../node_modules/babel-preset-react-app/index.js");

const text = readFileSync(file, "utf8");

// NOTE: This will break if the plugin was commented out.
//       If this becomes an issue, we could parse the file with acorn or a similar app.
if (text.match(/babel-plugin-relay/)) {
  console.log(`Looks like babel-plugin-relay is already in ${file}.`);
  process.exit(0);
}

if (!text.match(/const plugins = \[/)) {
  console.error(
    `ERROR: No plugins array found in ${file}. Failed to inject babel-plugin-relay.`
  );
  process.exit(1);
}

const injected = text.replace(
  /const plugins = \[/,
  "const plugins = [\n  require.resolve('babel-plugin-relay'),"
);

writeFileSync(file, injected, "utf8");
