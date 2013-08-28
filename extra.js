// mimic what node-fs-extra lib/index.js does (it's quite complex, so it's a good stress test)
// https://github.com/jprichardson/node-fs-extra/blob/95098c31eaf5c3547628e29c514ded7499e6df08/lib/index.js
var qs = null, qse = {};

try {
  qs = require("doesntexist");
} catch (err) {
  qs = require("querystring"); // node.js querystring stdlib module
}

Object.keys(qs).forEach(function (key) {
  var func = qs[key];
  if (typeof func === "function") {
    qse[key] = func;
  }
});

qs = qse;

qs.A = require("./extra_AB").A;

var cd = require("./extra_CD");
qs.C = cd.C;
qs["delete"] = cd.D;

// doc for E
qs.E = function E2(i) {
  var j = 3;
  return qs.C * j * i;
};

module.exports = qs;

module.exports.F = require("./extra_F");
module.exports.G = module.exports.F.F;

// unescape is from "querystring" lib
module.exports.H2 = module.exports.unescape; // ok, should point to unescape

console.log(module.exports);
