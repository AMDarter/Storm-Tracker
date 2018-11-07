var express = require("express"),
  router = express.Router(),
  request = require("request"),
  keys = require("../config/keys");

const apiId = keys.apiId;
const apiSecret = keys.apiSecret;

router.use("/results", require("./results"));

router.get("/", function(req, res) {
  const weatherURL =
    "https://api.aerisapi.com/forecasts/:auto?&format=json&filter=daynight&limit=1&client_id=" +
    apiId +
    "&client_secret=" +
    apiSecret;
  request(weatherURL, function(error, response, body) {
    let weather_json = JSON.parse(body);
    if (typeof weather_json.response[0] === "undefined") {
      // if weather is undefined render index with no weather data
      res.render("index");
    } else {
      var weather = {
        forecast: weather_json.response[0].periods[0].weather,
        icon: weather_json.response[0].periods[0].icon,
        temp: weather_json.response[0].periods[0].feelslikeF
      };
      // render index with weather data
      res.render("index", { weather: weather });
    }
  });
});

router.get("/nodata", function(req, res) {
  res.render("nodata");
});

// redirect all pages if route error
router.get("*", function(req, res) {
  res.redirect("/");
});

module.exports = router;
