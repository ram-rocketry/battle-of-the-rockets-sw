<template>
    <Line :data="data" :options="options" />
</template>

<script lang="ts">
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend)

ChartJS.defaults.color = "#fff"
ChartJS.defaults.animation = false

export default {
    name: 'Graph',
    components: {
        Line
    },
    props: ['title', 'data'],
    data() {
        return {
            data: this.data,
            options: {
                
                responsive: true,
                animation: false,
                plugins: {
                    title: {
                        display: true,
                        text: this.title
                    }
                }
            }
        }
    }
}
</script>