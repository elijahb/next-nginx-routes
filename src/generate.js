#!/usr/bin/env node
"use strict";

module.exports = function (routesManifest) {
  const { dynamicRoutes, staticRoutes = [], rewrites = [] } = JSON.parse(routesManifest);
  const allRoutes = []

  console.log(dynamicRoutes, staticRoutes, rewrites)

  const filteredDynamicRoutes = dynamicRoutes
    .filter(route => !rewrites.find(rewrite => rewrite.destination === route.page))
    .sort((a, b) => Object.keys(b.routeKeys).length - Object.keys(a.routeKeys).length)

  return allRoutes
    .concat(staticRoutes)
    .concat(rewrites)
    .concat(filteredDynamicRoutes)
    .map(({ regex, page, destination }) => (`
location ~ ${regex} {
    try_files ${(page === '/' ? '/index' : page) || destination}.html =404;
}`
    ))
    .join("\n")
}
