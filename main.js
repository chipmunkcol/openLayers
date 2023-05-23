import { Map, View } from 'ol';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';

const map = new Map({
  view: new View({
    center: [0, 0],
    zoom: 1,
  }),
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  target: 'map',
});