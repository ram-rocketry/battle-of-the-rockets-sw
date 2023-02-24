<template>
	<div class="infoPanel">
		<h3>Rocket Information</h3>
		<hr>
		<span>Rocket: {{ rocketName === undefined ? "UNKNOWN" : rocketName }}<br></span>
		<span>Coordinates: {{ coordinates === undefined ? "UNKNOWN" : coordinates }}<br></span>
		<span>Current Altitude: {{ altitude === undefined ? "UNKNOWN" : altitude }}<br></span>
		<span>Rocket Voltage: {{ voltage === undefined ? "UNKNOWN" : voltage }}<br></span>
	</div>
</template>

<style scoped>
div.infoPanel {
	background-color: #555;
	border: 1px solid white;
	padding: 5px;
	border-radius: 5px;
}
</style>

<script>
export default {
	name: "Info Panel",
	props: [
		'rocketName', 'voltage', 'altitude', 'coordinates'
	],
	data() {
		return {}
	}
}

</script>