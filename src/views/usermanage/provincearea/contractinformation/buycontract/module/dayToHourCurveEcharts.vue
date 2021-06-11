<template>
<div>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</div>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    rest:{
      type: Array
    },
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart1'
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
      chart: null,
      // rest: []
    }
  },
  mounted() {
    this.initChart()
    
  },
  beforeDestroy() {
    console.log(4567890);
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    //处理父级数据dayToHourDivisionData
    formatDivisionData(){
      let data= ["0点","1点","2点","3点","4点","5点","6点","7点","8点","9点","10点","11点","12点","13点","14点","15点","16点","17点","18点","19点","20点","21点","22点","23点"]
      // let rest = []
      // for(let aa in this.divisionData){
      //   if(aa.indexOf('p') == 0){
      //     rest.push({[aa]: this.divisionData[aa], value: this.divisionData[aa]})
      //   }
      // }
      // this.rest = rest
      let arr = Array.from({ length: this.rest.length }).map(
        (v, k) => `${k + 1}点`
      );
      return arr
    },
    initChart(){
        this.chart = echarts.init(document.getElementById(this.id))
        const option = {
            title: {
                // text: '日分时曲线'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross'
              }
            },
            legend: {
                show: false,
                data:['键值']
            },
            xAxis:{
              data: this.formatDivisionData()
            },
            // xAxis: {
            //     data: ["0点","1点","2点","3点","4点","5点","6点","7点","8点","9点","10点","11点","12点","13点","14点","15点","16点","17点","18点","19点","20点","21点","22点","23点"]
            //     },
            yAxis: {},
            series: [{
                name: '值',
                type: 'bar',
                color: 'gray',
                // data: [5, 21, 36, 120, 310, 20,5, 21, 36, 10, 10, 20,5, 21, 36, 10, 10, 20,5, 21, 36, 10,5, 21, 36, 10, 10, 20,5, 21, 36],
                data: this.rest,
                // data: [
                //     {value:20.0}, 
                //     {value:23.0}, 
                //     {value:28.0}, 
                //     {value:12.0}, 
                //     {value:40.0}, 
                //     {value:60.0}, 
                //     {value:30.0}, 
                //     {value:60.0}, 
                //     {value:20.0}, 
                //     {value:30.0}, 
                //     {value:25.0}, 
                //     {value:26.0}, 
                //     {value:35.0}, 
                //     {value:23.0}, 
                //     {value:27.0}, 
                //     {value:39.0}, 
                //     {value:38.0}, 
                //     {value:22.0}, 
                //     {value:32.0}, 
                //     {value:40.0}, 
                //     {value:50.0}, 
                //     {value:20.0}, 
                //     {value:60.0}, 
                // ],
                itemStyle:{
                  normal:{
                    color:function(params){
                      // console.log('echarts-params--', params);
                      // return params.data.color ? params.data.color : params.color

                      // if(params.value >0 && params.value <100){
                      // 	return "#FE8463";
                      // }else if(params.value >=100 && params.value<=300 ){
                      // 	return "#27727B";
                      // }
                      return "#9BCA63";
                    }
                  }
                }
            }]
        }
        this.chart.setOption(option)
    },
  }
}
</script>
