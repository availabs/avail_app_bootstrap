#!/usr/bin/env node

const {
  execSync,
} = require('child_process');

execSync('yarn add relay-runtime react-relay');
execSync('yarn add relay-compiler babel-plugin-relay --dev');
