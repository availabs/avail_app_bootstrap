#!/usr/bin/env node

const { execSync } = require("child_process");

const { join } = require("path");

const projRoot = join(__dirname, "../");

execSync("yarn add relay-runtime react-relay", { cwd: projRoot });
execSync("yarn add relay-compiler babel-plugin-relay --dev", { cwd: projRoot });
