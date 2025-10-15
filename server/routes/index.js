const express = require("express");

const user = require("./user.js");
const favorite_track = require("./favorite_track.js");
const auth = require("./auth.js");

module.exports = {
  user,
  favorite_track,
  auth,
};
