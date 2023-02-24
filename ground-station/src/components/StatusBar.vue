<!--
	StatusBar

	Contains information on the serial port status and configuration, and connectivity
	with the rocket
-->
<template>
	<div class="statbar">
		<span>Port: {{ port === undefined ? "UNKNOWN" : port }}</span>
		<span>Status: {{ status === "con" ? "CONNECTED" : (status === "dis" ? "DISCONNECTED" : "UNKNOWN") }}</span>
		<span><button @click="$emit('createConfigMenu')">Configuration</button></span>
	</div>
</template>

<script>
export default {
	name: "Status Bar",
	props: [
		'port','status','rocketStatus' //TODO: work these out a little more
	]
}
</script>

<style scoped>
	div.statbar {
		padding: 0 15px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		position:fixed;
		bottom:0;
		width:98.1%;
		text-align: center;
		background-color: #980;
		color: #000;
	}
</style>