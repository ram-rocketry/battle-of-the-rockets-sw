<!--
	Modals

	Modals are just fancy windows within the app itself. These can be used to show important
	information as well as error messages or critical notifications that may need to show
	up at any point. Modals will be used for the config screens and critical alerts.
-->

<template>
	<div class="modal" :id="id" v-if="shouldViz && visible">
		<div class="titlebar">
			<h3 id="title">{{ title }}</h3>
			<a class="exitbtn" @click="closeModal()">&times;</a>
		</div>
		<hr>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "Modal",
	props: [
		'title', 'data', 'id', 'shouldViz'
	],
	data() {
		return {
			visible:true
		}
	},
	methods: {
		closeModal() {
			this.visible = false
		},
		visibleCallback() {
			
		}
	}
}

function clearModal() {
	
}
</script>

<style scoped>
div.modal {
	background-color: darkslategray;
	border: 1px solid white;
	border-radius: 5px;
	position: absolute;
	padding: 5px;
	width: 60vw;
	min-height: 50vh;
	top: 50%;
	left: 50%;
	margin-right: -50%;
	transform: translate(-50%, -50%);
}

div.titlebar {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

a.exitbtn {
	display: block;
	background-color: darkred;
	color: white;
	text-decoration: none;
	padding: 5px 10px;
	size: 16pt;
	transition: unset;
	animation: unset;
}

a.exitbtn:hover {
	background-color: red;
}
</style>