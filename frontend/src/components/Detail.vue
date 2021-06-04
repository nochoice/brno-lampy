<template>


    <v-card>
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <div id="map-detail" style="height: 300px"></div>

      <v-card-title v-if="!!detail.properties">{{detail.properties['evidenční_číslo']}}</v-card-title>

      <v-card-text>
        <div class="content" v-if="!!detail.properties">
          <table>
            <tr><th>Ulice</th><td>{{ detail.properties['název_ulice']}}</td></tr>
            <tr><th>Katastr</th><td>{{detail.properties['katastr']}}</td></tr>
            <tr><th>Počet svítidel</th><td>{{detail.properties['počet_svítidel']}}</td></tr>
            <tr><th>Typ svetelneho místa</th><td>{{detail.properties['typ_sv__místa']}}</td></tr>
            <tr><th>Datum instalace</th><td>fdfd</td></tr>
          </table>
        </div>
      </v-card-text>
    </v-card>
</template>

<script>

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

const L = leaflet;

export default {
  name: 'Detail',
  props: {
    msg: String
  },

  methods: {
    navigate(id) {
      this.$store.dispatch('showDetail');
      this.$store.dispatch('loadPointDetail', id);
    },

    addMap() {
      this.map = L.map('map-detail', {preferCanvas: true}).setView([49.1951, 16.6068], 19);
      this.pointLayer = L.featureGroup();

      const tiles = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      })

      this.map.addLayer(tiles);
      this.map.addLayer(this.pointLayer);

    },

    renderPoints(json) {
      this.pointLayer.clearLayers();

      json.forEach((point) => {
          const latLang = [point.c[1], point.c[0]];

          var circle = L.circle(latLang, {
            stroke: false,
            fillColor: 'white',
            fillOpacity: 0.6,
            radius: 3
          });

          circle.addTo(this.pointLayer);

          circle.on('click', (event) => this.navigate(point.p, event))
        });
    },

    renderPointCurrentPoint(detail) {
      const coords = detail.geometry.coordinates;
      const latLang = [coords[1], coords[0]];

      var circle = L.circle(latLang, {
        stroke: false,
        fillColor: 'yellow',
        fillOpacity: 1,
        radius: 4
      });

      this.pointLayer.addLayer(circle)
    },

    updateMap(detail) {
      const street = detail.properties['název_ulice'];
      const streetPoints = this.$store.state.main.streets[street];

      this.renderPoints(streetPoints);
      this.renderPointCurrentPoint(detail);
      this.map.flyToBounds(this.pointLayer.getBounds());
    }
  },

  mounted() {
    this.addMap();

  },

  computed: {
    detail() {
      return this.$store.state.main.detail
    }
  },

  watch: {
    detail(current) { 
      this.updateMap(current);
    }
  }
}
</script>

<style scoped lang="scss">
    #map-detail {
      margin-bottom: 20px;
    }

    table {
      td, th {
        text-align: left;
      }
      th {
        padding-right: 20px;
      }
    }
</style>
