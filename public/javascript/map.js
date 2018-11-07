// SECURITY: access to apiId & apiSecret is authorized ONLY for namespace provided.
aeris.config.set({
  apiId: "apiId",
  apiSecret: "apiSecret"
});
var lat = document.getElementById("lat").textContent;
var lng = document.getElementById("lng").textContent;
var map = new aeris.maps.Map("map-canvas", {
  zoom: 4,
  center: [lat, lng],
  baseLayer: new aeris.maps.layers.AerisTile({
    tileType: "blue-marble",
    zIndex: 1
  })
});
var waterDepth = new aeris.maps.layers.AerisTile({
  tileType: "water-depth",
  zIndex: 3,
  map: map
});
var adminCitiesDk = new aeris.maps.layers.AerisTile({
  tileType: "admin-cities-dk",
  zIndex: 6,
  map: map
});
var tropicalCyclonesForecastErrorCones = new aeris.maps.layers.AerisTile({
  tileType: "tropical-cyclones-forecast-error-cones",
  zIndex: 7,
  map: map
});
var tropicalCyclonesForecastPointIcons = new aeris.maps.layers.AerisTile({
  tileType: "tropical-cyclones-forecast-point-icons",
  zIndex: 9,
  map: map
});
var tropicalCyclonesBreakPoints = new aeris.maps.layers.AerisTile({
  tileType: "tropical-cyclones-break-points",
  zIndex: 11,
  map: map
});
