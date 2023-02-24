<template>
  <div class="gridview">
    <InfoPanel />
    <Graph title="Rocket Altitude" datasetLabel="Meters" units="m" />
    <Graph title="Rocket Velocity" datasetLabel="M/S" units="m/s" />
    <Graph title="Sensor Voltage" datasetLabel="Volts" units="v" />
    <Graph title="Sensor Temperature" datasetLabel="Celsius" units="C" />
    <Graph title="Sensor Humidity" datasetLabel="Percent" units="%" />
    
  </div>
  <StatusBar />
</template>

<script>
import Graph from './components/Graph.vue';
import StatusBar from './components/StatusBar.vue';
import InfoPanel from './components/InfoPanel.vue';

export default {
  name: 'App',
  components: {
    Graph, StatusBar, InfoPanel
  },
  mounted() {
  }
}
</script>

<style>
div.gridview {
	display: grid;
	padding: 15px;
	grid-template-columns: 50% 50%;
	justify-items: space-between;
	align-items: space-between;
	grid-gap: 2px;
	object-fit: contain;
}
</style>
