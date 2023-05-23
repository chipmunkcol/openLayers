let lat = 126.978;
let lng = 37.5665;
// Create a map instance
const map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],

  view: new ol.View({
    projection: 'EPSG:4326',
    center: ol.proj.fromLonLat([lat, lng]),
    zoom: 5,
  }),
});

const center = new ol.source.Vector();
console.log('center: ', center);


// Define a style
var myStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'red',
    width: 10
  }),
  fill: new ol.style.Fill({
    color: 'rgba(1, 1, 1, 0.2)'
  })
});

// const getLayer = map.getLayers();
// console.log('getLayer: ', getLayer);

const btn = document.querySelector('.btn');
btn.textContent = '고 center';
btn.addEventListener('click', () => {
  setMapCenter(lat, lng);
  setCircleLayer(lat, lng);
  // setLayersHandler();
  // setMapCenter2();
  // setZoomPlus();
})

function setMapCenter(centerlat, centerLng) {
  const view = map.getView();
  const newCenter = ol.proj.fromLonLat([centerlat, centerLng]);
  // console.log('newCenter: ', newCenter);
  view.setCenter([centerlat, centerLng]);
  view.setZoom(15);
  // view.setCenter([0, 0]) // 걍 이렇게 해도 되는듯?
}

function setMapCenter2() {
  map.setView(new ol.View({
    center: ol.proj.fromLonLat([0, 0]),
    zoom: 4,
  }))
}

function setZoomPlus() {
  const view = map.getView();
  const zoom = view.getZoom();
  view.setZoom(zoom + 1);
}

function setCircleLayer(circleLat, circleLng) {
  const circleFeature = new ol.Feature({
    name: 'My Polygon',
    // class: 'point',
    geometry: new ol.geom.Circle([circleLat, circleLng], 1 / 7000),
  });

  const circleLayer = new ol.layer.Vector({
    name: 'circle_layer',
    source: center
  });

  circleFeature.setStyle(myStyle);
  center.addFeature(circleFeature);

  map.addLayer(circleLayer);
}


// feature.setStyle(
//   new ol.style.Stroke({
//     stroke: new ol.style.Stroke({
//       color: 'rgb(65, 160, 253)',
//       width: 5
//     }),
//     fill: new ol.style.Fill({
//       color: 'rgba(65, 160, 253, 0.2)'
//     })
//   })
// )

// const poly = feature.getGeometry();
// console.log('poly: ', poly);

// feature.setGeometryName('labelPoint');

// const point = feature.getGeometry();
// console.log('point: ', point);