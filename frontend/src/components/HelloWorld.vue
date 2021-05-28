<template>
     <div id="mapid" style="height: 100%;"></div>
</template>

<script>

import leaflet from 'leaflet';
import { getPointDetail } from '../services/api';
import 'leaflet/dist/leaflet.css';

const L = leaflet;

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },

  methods: {
    async showPopup(id, event) {
      event.target.getPopup().setContent('aaaa');
      const data = await getPointDetail(id);
      const date = new Date(data.properties['datum_instalace']);
      const instalationDate =  ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '. ' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '. ' + date.getFullYear()
      
      const content = `
        <h1>${data.properties['evidenční_číslo']}</h1>
        <table>
          <tr><th>Ulice</th><td>${data.properties['název_ulice']}</td></tr>
          <tr><th>Katastr</th><td>${data.properties['katastr']}</td></tr>
          <tr><th>Počet svítidel</th><td>${data.properties['počet_svítidel']}</td></tr>
          <tr><th>Typ svetelneho místa</th><td>${data.properties['typ_sv__místa']}</td></tr>
          <tr><th>Datum instalace</th><td>${instalationDate}</td></tr>
        </table>
      `;

      event.target.getPopup().setContent(content);
    },

    addMap() {
      this.map = L.map('mapid', {preferCanvas: true}).setView([49.1951, 16.6068], 19);

      L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    },

    renderPoints(json) {
      const group = L.featureGroup();

      Object.keys(json).forEach((position) => {
          const latLang = [json[position][1], json[position][0]];

          var circle = L.circle(latLang, {
            stroke: false,
            fillColor: 'white',
            fillOpacity: 0.6,
            radius: 3
          });

          circle.addTo(group);
          circle.bindPopup();

          circle.on('click', (event) => this.showPopup(position, event))
        });

        group.addTo(this.map);
    }
  },

  mounted() {
    this.addMap();

    this.$store.dispatch('loadPoints');
  },

  computed: {
    points() {
      return this.$store.state.main.points
    }
  },

  watch: {
    points(current) { this.renderPoints(current) }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
