// import { pointLayers } from "./data.js";
// const myModule = require('./data.js');

const pointLayers = [
  {lat: 126.978, lng: 37.1},
  {lat: 126.978, lng: 37.2},
  {lat: 126.978, lng: 37.3},
  {lat: 126.978, lng: 37.4},
  {lat: 126.978, lng: 37.5},
  {lat: 126.978, lng: 37.6},
  {lat: 126.978, lng: 37.7},
  {lat: 126.978, lng: 37.8}
]

let lat = 126.978;
let lng = 37.5665;

const btn = document.querySelector('.btn');
btn.textContent = '고 center';
btn.addEventListener('click', () => {
  setMapCenter(lat, lng);
  setCircleLayer(lat, lng);
  setPointLayer();
  // setLayersHandler();
  // setMapCenter2();
  // setZoomPlus();
})



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
    // center: ol.proj.fromLonLat([lat, lng]),
    center: [0, 0],
    zoom: 5,
  }),
});

const source = new ol.source.Vector();
const pointLayer = new ol.layer.Vector({
  source: source
});
// console.log('source: ', source);

const saveBtn = document.querySelector('.btn.save-data');
saveBtn.textContent = 'data save';
saveBtn.addEventListener('click', (e) => {
  saveDataHandler();
});

function saveDataHandler() {
  const newfeatures = [];

  pointLayer.getSource().forEachFeature((feature) => {
    const clone = feature.clone();
    clone.setId(feature.getId());
    newfeatures.push(clone);
  });

  const json = new ol.format.GeoJSON().writeFeatures(newfeatures);
  console.log('json: ', json);

  // JSON.parse(json).features[0].geometry.coordinates  요렇게 사용
}

function setCenterHandler() {}

map.on(
  "click", 
  function(e) {
      map.forEachFeatureAtPixel(
          e.pixel, 
          function (feature, layer) {
              const values = feature.getProperties();
              const lat = values.geometry.flatCoordinates[0];
              const lng = values.geometry.flatCoordinates[1];
              setMapCenter(lat, lng); 
          }, 
          {
              hitTolerance: 2,
              layerFilter: function(layer) {
                  return layer === pointLayer;
              }
          }
      );
  }
);


// Define a style
const myStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'red',
    width: 2
  }),
  fill: new ol.style.Fill({
    color: 'rgba(1, 1, 1, 0.2)'
  })
});

const pointStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 10,
    // fill: new ol.style.Fill({
    //   color: 'rgba(255, 255, 0, 0.3)'
    // }),
    stroke: new ol.style.Stroke({
      width: 5,
      color: 'rgb(255, 255, 0)'
    }),
    fill: new ol.style.Fill({
      color: 'rgb(255, 255, 0, 0.2)'
    })
  })
});
  

function setMapCenter(centerlat, centerLng) {
  const view = map.getView();
  // const newCenter = ol.proj.fromLonLat([centerlat, centerLng]);
  // console.log('newCenter: ', newCenter);
  view.setCenter([centerlat, centerLng]);
  view.setZoom(10);
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
    name: 'circle_feature',
    geometry: new ol.geom.Circle([circleLat, circleLng], 1 / 70),
  });

  const circleLayer = new ol.layer.Vector({
    name: 'circle_layer',
    source: source
  });

  circleFeature.setStyle(myStyle);
  source.addFeature(circleFeature);

  map.addLayer(circleLayer);
}

function setPointLayer() {

  for (i=0; i<pointLayers.length; i++) {

    const lat = pointLayers[i].lat;
    const lng = pointLayers[i].lng;
    
    const pointFeature = new ol.Feature({
      geometry: new ol.geom.Point([lat, lng])
    });

    pointFeature.setStyle(pointStyle)
    source.addFeature(pointFeature);
  }

  map.addLayer(pointLayer);
}


// hover시 cursor 이벤트 (안됨)
// map.on('pointermove', function (e) {
//   if (!e.dragging) {
//       var pixel = map.getEventPixel(e.originalEvent);
//       var hit = map.hasFeatureAtPixel(pixel);
//       map.getTarget().style.cursor = hit ? 'pointer' : '';
//   }
// });
