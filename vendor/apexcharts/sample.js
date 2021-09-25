window.Apex = {
  chart: {
    foreColor: '#ccc',
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
                x: 'Jan 2015',
                y: [54, 66, 69, 75, 88]
              },
              {
                x: 'Jan 2016',
                y: [43, 65, 69, 76, 81]
              },
              {
                x: 'Jan 2017',
                y: [31, 39, 45, 51, 59]
              },
              {
                x: 'Jan 2018',
                y: [39, 46, 55, 65, 71]
              },
              {
                x: 'Jan 2019',
                y: [29, 31, 35, 39, 44]
              },
              {
                x: 'Jan 2020',
                y: [41, 49, 58, 61, 67]
              },
              {
                x: 'Jan 2021',
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
          text: 'Swamp Biome',
          align: 'left'
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
                x: 'Jan 2015',
                y: [54, 66, 69, 75, 88]
              },
              {
                x: 'Jan 2016',
                y: [43, 65, 69, 76, 81]
              },
              {
                x: 'Jan 2017',
                y: [31, 39, 45, 51, 59]
              },
              {
                x: 'Jan 2018',
                y: [39, 46, 55, 65, 71]
              },
              {
                x: 'Jan 2019',
                y: [29, 31, 35, 39, 44]
              },
              {
                x: 'Jan 2020',
                y: [41, 49, 58, 61, 67]
              },
              {
                x: 'Jan 2021',
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
          text: 'Riverbed',
          align: 'left'
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
            type: 'boxPlot',
            data: [
              {
                x: 'Jan 2015',
                y: [54, 66, 69, 75, 88]
              },
              {
                x: 'Jan 2016',
                y: [43, 65, 69, 76, 81]
              },
              {
                x: 'Jan 2017',
                y: [31, 39, 45, 51, 59]
              },
              {
                x: 'Jan 2018',
                y: [39, 46, 55, 65, 71]
              },
              {
                x: 'Jan 2019',
                y: [29, 31, 35, 39, 44]
              },
              {
                x: 'Jan 2020',
                y: [41, 49, 58, 61, 67]
              },
              {
                x: 'Jan 2021',
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
          text: 'Patch Area',
          align: 'left'
        },
        plotOptions: {
          boxPlot: {
            colors: {
              upper: '#e08537d9',
              lower: '#d24008d9'
            }
          }
        }
        };

var chart_area = new ApexCharts(document.querySelector("#areaPlot"), options_area);
chart_area.render();









