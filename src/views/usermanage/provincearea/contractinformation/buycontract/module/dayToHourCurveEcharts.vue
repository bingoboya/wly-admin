<template>
<div>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</div>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart(){
        this.chart = echarts.init(document.getElementById(this.id))
        const option = {
            title: {
                // text: '月分点曲线'
            },
            tooltip: {},
            legend: {
                show: false,
                data:['销量']
            },
            xAxis: {
                data: ["0点","1点","2点","3点","4点","5点","6点","7点","8点","9点","10点","11点","12点","13点","14点","15点","16点","17点","18点","19点","20点","21点","22点","23点"]
                },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                color: 'gray',
                // data: [5, 21, 36, 120, 310, 20,5, 21, 36, 10, 10, 20,5, 21, 36, 10, 10, 20,5, 21, 36, 10,5, 21, 36, 10, 10, 20,5, 21, 36],
                data: [
                    {value:20.0}, 
                    {value:23.0}, 
                    {value:28.0}, 
                    {value:12.0}, 
                    {value:40.0}, 
                    {value:60.0}, 
                    {value:30.0}, 
                    {value:60.0}, 
                    {value:20.0}, 
                    {value:30.0}, 
                    {value:25.0}, 
                    {value:26.0}, 
                    {value:35.0}, 
                    {value:23.0}, 
                    {value:27.0}, 
                    {value:39.0}, 
                    {value:38.0}, 
                    {value:22.0}, 
                    {value:32.0}, 
                    {value:40.0}, 
                    {value:50.0}, 
                    {value:20.0}, 
                    {value:60.0}, 
                    10
                ],
                itemStyle:{
					normal:{
						color:function(params){
                            // console.log('echarts-params--', params);
                            return params.data.color ? params.data.color : params.color

							// if(params.value >0 && params.value <100){
							// 	return "#FE8463";
							// }else if(params.value >=100 && params.value<=300 ){
							// 	return "#27727B";
							// }
							// return "#9BCA63";
						}
					}
				}
            }]
        }
        this.chart.setOption(option)
    },
    initChart1() {
    //   this.chart = echarts.init(document.getElementById(this.id))
    //   const xData = (function() {
    //     const data = []
    //     for (let i = 1; i < 13; i++) {
    //       data.push(i + 'month')
    //     }
    //     return data
    //   }())
    //   this.chart.setOption({
    //     backgroundColor: '#344b58',
    //     title: {
    //       text: 'statistics',
    //       x: '20',
    //       top: '20',
    //       textStyle: {
    //         color: '#fff',
    //         fontSize: '22'
    //       },
    //       subtextStyle: {
    //         color: '#90979c',
    //         fontSize: '16'
    //       }
    //     },
    //     tooltip: {
    //       trigger: 'axis',
    //       axisPointer: {
    //         textStyle: {
    //           color: '#fff'
    //         }
    //       }
    //     },
    //     grid: {
    //       left: '5%',
    //       right: '5%',
    //       borderWidth: 0,
    //       top: 150,
    //       bottom: 95,
    //       textStyle: {
    //         color: '#fff'
    //       }
    //     },
    //     legend: {
    //       x: '5%',
    //       top: '10%',
    //       textStyle: {
    //         color: '#90979c'
    //       },
    //       data: ['female']
    //     },
    //     calculable: true,
    //     xAxis: [{
    //       type: 'category',
    //       axisLine: {
    //         lineStyle: {
    //           color: '#90979c'
    //         }
    //       },
    //       splitLine: {
    //         show: false
    //       },
    //       axisTick: {
    //         show: false
    //       },
    //       splitArea: {
    //         show: false
    //       },
    //       axisLabel: {
    //         interval: 0

    //       },
    //       data: xData
    //     }],
    //     yAxis: [{
    //       type: 'value',
    //       splitLine: {
    //         show: false
    //       },
    //       axisLine: {
    //         lineStyle: {
    //           color: '#90979c'
    //         }
    //       },
    //       axisTick: {
    //         show: false
    //       },
    //       axisLabel: {
    //         interval: 0
    //       },
    //       splitArea: {
    //         show: false
    //       }
    //     }],
    //     dataZoom: [{
    //       show: true,
    //       height: 30,
    //       xAxisIndex: [
    //         0
    //       ],
    //       bottom: 30,
    //       start: 10,
    //       end: 80,
    //       handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
    //       handleSize: '110%',
    //       handleStyle: {
    //         color: '#d3dee5'

    //       },
    //       textStyle: {
    //         color: '#fff' },
    //       borderColor: '#90979c'

    //     }, {
    //       type: 'inside',
    //       show: true,
    //       height: 15,
    //       start: 1,
    //       end: 35
    //     }],
    //     series: [{
    //       name: 'female',
    //       type: 'bar',
    //       stack: 'total',
    //       barMaxWidth: 35,
    //       barGap: '10%',
    //       itemStyle: {
    //         normal: {
    //           color: 'rgba(255,144,128,1)',
    //           label: {
    //             show: true,
    //             textStyle: {
    //               color: '#fff'
    //             },
    //             position: 'insideTop',
    //             formatter(p) {
    //               return p.value > 0 ? p.value : ''
    //             }
    //           }
    //         }
    //       },
    //       data: [
    //         709,
    //         1917,
    //         2455,
    //         2610,
    //         1719,
    //         1433,
    //         1544,
    //         3285,
    //         5208,
    //         3372,
    //         2484,
    //         4078
    //       ]
    //     },

    //     ]
    //   })
    }
  }
}
</script>
