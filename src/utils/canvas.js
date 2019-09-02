import utils from './utils'
function option (obj) {
  const data = Object.values(obj.moneyList)
  const income = data.map(res => {
    return res.income
  })
  const disbursement = data.map(res => {
    return res.disbursement
  })
  const result = {
    title: {
      text: '收支明细',
      top: 18,
      left: 10,
      textStyle: {
        fontSize: 12
      }
    },
    // 颜色
    color: ['#3798E3', '#EAC226', '#34BD6F'],
    tooltip: {},
    legend: {
      data: ['收入', '支出'],
      top: 20,
      left: 'center',
      icon: 'rectangle'
    },
    // ['2019-02', '2019-03']
    xAxis: {
      data: obj.results
    },
    yAxis: {},
    // income = [10, 20] 同disbursement
    series: [
      {
        name: '收入',
        type: 'line',
        data: income
      },
      {
        name: '支出',
        type: 'line',
        data: disbursement
      }
    ]
  } // ECharts 配置项
  return result
}

function barOption (obj) {
  const data = Object.values(obj.moneyList)
  const list = data.map(res => +res.total)
  let totalMoney = list.reduce((first, second) => {
    return first + second
  })
  totalMoney = utils.format(totalMoney)
  const total = Object.keys(obj.results).map((index, item) => {
    const result = { value: list[index], name: obj.results[index] }
    return result
  })
  const result = {
    title: {
      text: '收支明细',
      top: 18,
      left: 10,
      textStyle: {
        fontSize: 12
      }
    },
    color: ['#3798E3', '#EAC226', '#34BD6F', '#478EC7', '#34BD6F'],
    legend: {
      // ['派送货', '油补', '安置费']
      data: obj.result,
      top: 'bottom',
      left: 'left',
      icon: 'circle',
      orient: 'vertical',
      selectedMode: false,
      formatter: function (name) {
        var legendIndex = 0
        var clientlabels = total
        var clientcounts = list
        clientlabels.forEach(function (value, i) {
          if (value.name === name) {
            legendIndex = i
          }
        })
        return name + ' ' + '￥' + clientcounts[legendIndex]
      }
    },
    graphic: [{
      type: 'text',
      left: 'center',
      top: '38%',
      style: {
        text: '收支比例',
        textAlign: 'center',
        fill: '#000',
        width: 30,
        height: 30,
        fontSize: 18,
        color: '#4d4f5c',
        fontFamily: 'Microsoft YaHei'
      }
    }, {
      type: 'text',
      left: 'center',
      top: '48%',
      style: {
        text: '总收入',
        textAlign: 'center',
        fill: '#000',
        width: 30,
        height: 30,
        fontSize: 18
      }
    }, {
      type: 'text',
      left: 'center',
      top: '58%',
      style: {
        text: `￥${totalMoney}`,
        textAlign: 'center',
        fill: '#000',
        width: 30,
        height: 30,
        fontSize: 18
      }
    }],
    series: [{
      name: '达标率',
      type: 'pie',
      radius: ['50%', '70%'],
      minAngle: 15,
      startAngle: 220,
      clockWise: false,
      avoidLabelOverlap: false,
      hoverAnimation: false,
      silent: true,
      center: ['50%', '50%'],
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: false,
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: total
    }]
  } // ECharts 配置项
  return result
}

export default {
  option,
  barOption
}
