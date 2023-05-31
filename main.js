

import Map from './src/ol/Map.js';
import View from './src/ol/View.js';
import TileLayer from './src/ol/layer/Tile.js';
import XYZ from './src/ol/source/XYZ.js';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new XYZ({
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
      })
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});


const view = new View;
const source = new XYZ;
const layer = new TileLayer;

view
source
layer