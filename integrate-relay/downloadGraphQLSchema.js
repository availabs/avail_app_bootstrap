#!/usr/bin/env node

/*
  In the blog, it says to add the folloing to the package.json scripts.
    Instead, we'll do the work in this script and call it from package.json 

  "relay": "curl https://graphql-demo.kriasoft.com/schema -o ./src/graphql.schema && relay-compiler --src ./src --schema ./src/graphql.schema
*/


const { execSync } = require('child_process');
const { join } = require('path');

const SCHEMA_URL = require('./SCHEMA_URL.js');

const schemaDir = join(__dirname, '../src/relay-schema');
const schemaFileName = 'graphql.schema';
const schemaFilePath = join(schemaDir, schemaFileName);

execSync(`mkdir -p ${schemaDir}`);

execSync(`curl ${SCHEMA_URL} -o ${schemaFilePath}`);
