<template>
  <div style="height: 100%;">
      <div id="mapid" style="height: 100%;"></div>

      <Detail class="detail" v-if="isDetail" />
  </div>
</template>

<script>

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Detail from './Detail';

const L = leaflet;

export default {
  name: 'Map',
  components: {
    Detail
  },
  props: {
    msg: String
  },

  methods: {
    async showPopup(id) {
      this.$store.dispatch('showDetail');
      this.$store.dispatch('loadPointDetail', id);
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
          // circle.bindPopup();

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
    },
    isDetail() {
      return this.$store.state.main.isDetail
    }
  },

  watch: {
    points(current) { this.renderPoints(current) }
  }
}
</script>

<style scoped>

#mapid {
  z-index: 10;
}
.detail {
  position: absolute;
  z-index: 20;
  display: block;
  width: 30%;
  top: 20px; right: 20px;
  border: 6px solid #fff;
}
</style>
