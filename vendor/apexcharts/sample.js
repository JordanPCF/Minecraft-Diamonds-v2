function sample_river_plot() {
  var options_river = {
          series: [
          {
            type: 'boxPlot',
            data: [
              {
                x: '1',
                y: [2, 3, 5, 8, 10]
              },
              {
                x: '2',
                y: [-1, 5, 8, 9, 10]
              },
              {
                x: '3',
                y: [4, 7, 9, 12, 13]
              },
              {
                x: '4',
                y: [6, 7, 8, 9, 10]
              },
              {
                x: '5',
                y: [4, 4, 5, 6, 9]
              },
              {
                x: '6',
                y: [3, 5, 6, 10, 11]
              },
              {
                x: '7',
                y: [5, 8, 9, 11, 12]
              },
              {
                x: '8',
                y: [7, 8, 9, 11, 12]
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
}




function sample_area_plot() {
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


}


export { sample_river_plot, sample_area_plot };






