<template>
	<div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "echarts"
export default {
	name: 'Chart',
	props: {
		className: {
			type: String,
			default: 'chart'
		},
		width: {
			type: String,
			default: '100%'
		},
		height: {
			type: String,
			default: '350px'
		},
		autoResize: {
			type: Boolean,
			default: true
		},
		chartData: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			chart: null
		}
	},
	watch: {
		chartData: {
			deep: true,
			handler(val) {
				this.setOptions(val)
			}
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.initChart()
			this.setOptions(this.chartData)
		})
	},
	methods: {
		initChart() {
			this.chart = echarts.init(this.$el);
		},
		setOptions(chartData) {
			this.chart.setOption({
				legend: {},
				ooltip: {},
				dataset: {
					dimensions: chartData.dimensions,
					source: chartData.sources			
				},
				xAxis: {type: 'category'},
				yAxis: {},
				// series: chartData.dimensions ? chartData.dimensions.map( item => {
				// 	{type: 'bar'}
				// }).slice(0, -1) : []
				series: chartData.dimensions ? ((count) => {
					var l = []
					for (let i=0; i<count; i++){
						l.push({type: 'bar'})
					}
					return l
				})(chartData.dimensions.length - 1) : []
			})
		}
	}
}
</script>