window.Apex = {
  chart: {
    foreColor: '#fff',
    toolbar: {
      show: false
    },
  },
  stroke: {
    width: 3
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    theme: 'dark'
  },
  grid: {
    borderColor: "#535A6C",
    xaxis: {
      lines: {
        show: true
      }
    }
  }
};


var options_swamp = {
          series: [
          {
            type: 'boxPlot',
            data: [
              {
                x: '1',
                y: [54, 66, 69, 75, 88]
              },
              {
                x: '2',
                y: [43, 65, 69, 76, 81]
              },
              {
                x: '3',
                y: [31, 39, 45, 51, 59]
              },
              {
                x: '4',
                y: [39, 46, 55, 65, 71]
              },
              {
                x: '5',
                y: [29, 31, 35, 39, 44]
              },
              {
                x: '6',
                y: [41, 49, 58, 61, 67]
              },
              {
                x: '7',
                y: [54, 59, 66, 71, 88]
              },
              {
                x: '8',
                y: [54, 59, 66, 71, 88]
              }
            ]
          }
        ],
          chart: {
          type: 'boxPlot',
          height: 300
        },
        title: {
          text: 'Diamond Z-axis Offsets in Swamps',
          align: 'center'
        },
        xaxis: {
          title: {
            text: 'Case #'
          }
        },
        plotOptions: {
          boxPlot: {
            colors: {
              upper: '#046242',
              lower: '#00e395'
            }
          }
        }
        };

var chart_swamp = new ApexCharts(document.querySelector("#swampPlot"), options_swamp);
chart_swamp.render();


var options_river = {
          series: [
          {
            type: 'boxPlot',
            data: [
              {
                x: '1',
                y: [54, 66, 69, 75, 88]
              },
              {
                x: '2',
                y: [43, 65, 69, 76, 81]
              },
              {
                x: '3',
                y: [31, 39, 45, 51, 59]
              },
              {
                x: '4',
                y: [39, 46, 55, 65, 71]
              },
              {
                x: '5',
                y: [29, 31, 35, 39, 44]
              },
              {
                x: '6',
                y: [41, 49, 58, 61, 67]
              },
              {
                x: '7',
                y: [54, 59, 66, 71, 88]
              },
              {
                x: '8',
                y: [54, 59, 66, 71, 88]
              }
            ]
          }
        ],
          chart: {
          type: 'boxPlot',
          height: 300
        },
        title: {
          text: 'Diamond Z-axis Offsets in Riverbeds',
          align: 'center'
        },
        xaxis: {
          title: {
            text: 'Case #'
          }
        },
        plotOptions: {
          boxPlot: {
            colors: {
              upper: '#27d5f1d1',
              lower: '#73423d40'
            }
          }
        }
        };

var chart_river = new ApexCharts(document.querySelector("#riverPlot"), options_river);
chart_river.render();



var options_area = {
          series: [
          {
            name: 'Gravel (all biomes)',
            data: [5, 5, 10, 8, 7, 5, 4, null, null, null, 10, 10, 7, 8, 6, 9]
          },
          {
            name: 'Clay (all biomes)',
            data: [10, 15, null, 12, null, 10, 12, 15, null, null, 12, null, 14, null, null, null]
          }],
          chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
          animations: {
            enabled: true
          }
        },
        colors: ['#009dff', '#fb9101'],
        stroke: {
          width: [5,5,4],
          curve: 'straight'
        },
        labels: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        title: {
          text: 'Average Diamond Depth',
          align: 'center'
        },
        xaxis: {
          title: {
            text: 'Patch Area (# of blocks)'
          }
        },
        };

        var chart_area = new ApexCharts(document.querySelector("#areaPlot"), options_area);
        chart_area.render();









