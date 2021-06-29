<template>
  <div style="width: 100%">
    <div style="display: flex;width: 100%">
      <div class="color-squr-wrapper">
        工作日:
        <div class="color-squr" style="background: #27727b" />
      </div>
      <div class="color-squr-wrapper">
        节假日:
        <div class="color-squr" style="background: #fe8463" />
      </div>
      <div class="color-squr-wrapper">
        星期日:
        <div class="color-squr" style="background: #9bca63" />
      </div>
      <div class="color-squr-wrapper">
        星期六:
        <div class="color-squr" style="background: #ff0000" />
      </div>
    </div>
    <div
      :id="id"
      :class="className"
      :style="{ height: height, width: width }"
    />
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    dayPropetieList: {
      type: Array,
    },
    formDataDetial: {
      type: Object,
    },
    bb: {
      type: Number,
    },
    className: {
      type: String,
      default: "chart",
    },
    id: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "600px",
    },
    height: {
      type: String,
      default: "300px",
    },
  },
  data() {
    return {
      chart: null,
      aa: [],
    };
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  created() {
    this.dayPropetieList.forEach((item) => (item.value = Math.random()));
    // console.log(100000, this.dayPropetieList);
  },
  methods: {
    formateXAxis(val) {
      let data = [
        // "1日",
        // "2日",
        // "3日",
        // "4日",
        // "5日",
        // "6日",
        // "7日",
        // "8日",
        // "9日",
        // "10日",
        // "11日",
        // "12日",
        // "13日",
        // "14日",
        // "15日",
        // "16日",
        // "17日",
        // "18日",
        // "19日",
        // "20日",
        // "21日",
        // "22日",
        // "23日",
        // "24日",
        // "25日",
        // "26日",
        // "27日",
        // "28日",
        // "29日",
        // "30日",
        // "31日",
      ];
      return Array.from({ length: this.dayPropetieList.length }).map(
        (v, k) => `${k + 1}日`
      );
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      const option = {
        title: {
          // text: '月分日曲线'
        },
        tooltip: {},
        legend: {
          show: false,
          data: ["销量"],
        },
        xAxis: {
          data: this.formateXAxis(),
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            color: "gray",
            data: this.dayPropetieList,
            // data: [5, 21, 36, 120, 310, 20,5, ],
            // data: [
            //   { value: 20.0, color: "red" },
            //   { value: 23.0, color: "red" },
            //   { value: 28.0, color: "pink" },
            //   { value: 12.0, color: "pink" },
            //   { value: 40.0, color: "pink" },
            //   { value: 60.0, color: "pink" },
            //   { value: 30.0, color: "red" },
            //   { value: 60.0, color: "red" },
            //   { value: 20.0, color: "red" },
            //   { value: 30.0, color: "red" },
            //   { value: 25.0, color: "red" },
            //   { value: 26.0, color: "red" },
            //   { value: 35.0, color: "green" },
            //   { value: 23.0, color: "green" },
            //   { value: 27.0, color: "green" },
            //   { value: 39.0, color: "green" },
            //   { value: 38.0, color: "green" },
            //   { value: 22.0, color: "green" },
            //   { value: 3.0, color: "red" },
            //   { value: 40.0, color: "red" },
            //   { value: 50.0, color: "red" },
            //   { value: 20.0, color: "red" },
            //   { value: 60.0, color: "orange" },
            //   { value: 34.0, color: "orange" },
            //   { value: 55.0, color: "orange" },
            //   { value: 63.0, color: "orange" },
            //   { value: 34.0, color: "orange" },
            //   { value: 3.0, color: "red" },
            //   { value: 34.0, color: "red" },
            //   { value: 66.0, color: "red" },
            //   { value: 66.0, color: "red" },
            // ],
            itemStyle: {
              normal: {
                color: function (params) {
                  // console.log('echarts-params--', params);
                  // return params.data.color ? params.data.color : params.color;
                  if (params.data.dayType == "HOLIDAY") {
                    return "#FE8463";
                  } else if (params.data.dayType == "WEEKDAY") {
                    return "#27727B";
                  } else if (params.data.dayType == "SATURDAY") {
                    return "#9BCA63";
                  } else if (params.data.dayType == "SUNDAY") {
                    return "#ff0000";
                  }
                  // return "#9BCA63";
                  // if(params.value >0 && params.value <100){
                  // 	return "#FE8463";
                  // }else if(params.value >=100 && params.value<=300 ){
                  // 	return "#27727B";
                  // }
                  // return "#9BCA63";
                },
              },
            },
          },
        ],
      };
      this.chart.setOption(option);
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
    },
  },
};
</script>
<style lang="scss" scoped>
.color-squr-wrapper {
  display: flex;
  align-items: center;
  padding-right: 16px;
}
.color-squr {
  margin-left: 4px;
  width: 14px;
  height: 14px;
}
</style>