"use strict";

const { readFileSync } = require("fs");
const generate = require('./generate')

test("generate routes for example project", () => {
  const nginxRoutes = generate(readFileSync(__dirname + "/routes-manifest.example.json", "utf8"))
  expect(nginxRoutes).toMatchSnapshot();
});
