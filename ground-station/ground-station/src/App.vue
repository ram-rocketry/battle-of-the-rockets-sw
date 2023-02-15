<script setup lang="ts">
import Graph from "./components/Graph.vue";
import StatusBar from "./components/StatusBar.vue";

//Temporary data, for show
const alt_vel = {
  labels: ['0', '10', '20', '30', '40', '50', '60'],
  datasets: [
    {
      label: 'Altitude', 
      data: [0, 162, 351, 544, 781, 1046, 1532],
      borderColor: "#ff0000",
      backgroundColor: "#bb0000"
    },
    {
      label: 'Velocity',
      data: [0, 24, 101, 155, 205, 261, 315],
      borderColor: '#00ff00',
      backgroundColor: '#00bb00'
    }
  ]
}
const hum_temp = {
  labels: ['0', '10', '20', '30', '40', '50', '60'],
  datasets: [
    {
      label: 'Temperature',
      data: [23, 23, 23, 23, 22, 22, 22],
      borderColor: '#0000ff',
      backgroundColor: '#0000bb'
    },
    {
      label: 'Humidity',
      data: [51, 51, 51, 51, 51, 51, 50],
      borderColor: '#ffff00',
      backgroundColor: '#bbbb00'
    }
  ]
}
const sen_volt = {
  labels: ['0', '10', '20', '30', '40', '50', '60'],
  datasets: [
    {
      label: "Sensor Station Voltage",
      data: [14, 13, 13, 14, 13, 14, 13],
      borderColor: '#00ffff',
      backgroundColor: '#00bbbb'
    }
  ]
}
</script>

<template>
  <div class="ui">
    <Graph title="Rocket Altitude and Velocity" :data="alt_vel"/>
    <Graph title="Temperature and Humidity" :data="hum_temp"/>
    <Graph title="Sensor Station Voltage" :data="sen_volt"/>
  </div>
  <StatusBar />
</template>

<style scoped>

div.ui {
  display: grid;
  padding: 15px;
  grid-template-columns: auto auto auto;
  justify-items: center;
  align-items: center;
  object-fit: contain;
}

div.ui * {
  size: inherit;
  width: 100% !important;
  height: 100% !important;
}

@media (max-width: 1000px) {
  div.ui {
    display: grid;
    grid-template-rows: 30vh 30vh;
  }
}

</style>
