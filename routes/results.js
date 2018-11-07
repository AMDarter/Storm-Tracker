var express = require("express"),
  router = express.Router(),
  request = require("request"),
  keys = require("../config/keys");

const apiId = keys.apiId;
const apiSecret = keys.apiSecret;

router.get("/", function(req, res) {
  var CityAndState = req.query.city + "," + req.query.state;
  var url =
    "https://api.aerisapi.com/tropicalcyclones/closest?p=" +
    CityAndState +
    "?radius=24902mi&filter=all&limit=2&format=json&client_id=" +
    apiId +
    "&client_secret=" +
    apiSecret;
  request(url, function(error, response, body) {
    var data = JSON.parse(body);
    if (
      typeof data.response[0] === "undefined" ||
      typeof data.response[0].profile === "undefined"
    ) {
      // alternate url if no storm is found nearby
      var url =
        "https://api.aerisapi.com/tropicalcyclones/?&client_id=" +
        apiId +
        "&client_secret=" +
        apiSecret;
      request(url, function(error, response, body) {
        var data = JSON.parse(body);
        if (
          typeof data.response[0] === "undefined" ||
          typeof data.response[0].profile === "undefined"
        ) {
          res.redirect("/nodata");
        } else {
          res.render("results", { data: data });
        }
      });
    } else {
      res.render("results", { data: data });
    }
  });
});

module.exports = router;
