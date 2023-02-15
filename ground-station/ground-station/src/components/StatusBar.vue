<!--
    StatusBar

    Contains information about the status of the rocket (coordinates, connection status,
    current altitude), sensors (current voltage), and the status of the 
    serial port
-->
<template>
    <div class="statbar">
        <span>Status: DISCONNECTED</span>
        <span>Coordinates: Blah blah</span>
        <span>Altitude: 172 ft</span>
        <span>Voltage: 14 V</span>
    </div>
</template>

<script lang="ts">
export default {
    name: "Status Bar"
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
        width:100%;
        text-align: center;
        background-color: #980;
        color: #000;
    }
</style>