#!/usr/bin/env node
"use strict";

const { cwd } = require("process");
const { readFileSync, writeFileSync } = require("fs");
const generate = require('./generate')

writeFileSync("./next-routes.conf", generate(readFileSync("./.next/routes-manifest.json", "utf8")));

console.log(`Nginx routes configuration written to ${cwd()}/next-routes.conf`);
