import { sample_river_plot, sample_area_plot } from '../../vendor/apexcharts/sample.js';


class Dashboard {
    constructor(db) {
        this.db = db;
    }

    assemble_dashboard() {
        // want all plots to load at same time, and sample plots are quick
        this._make_biome_plot("SWAMP").then(result => {
            sample_river_plot();
            sample_area_plot();
        })
        // this._make_biome_plot("RIVER");
        // this._make_depth_plot();

        

    }

    _make_biome_plot(biome) {
        // console.log('Making swamp plot');
        var cases = [{'1': biome},
                     {'2': biome},
                     {'3': biome},
                     {'4': biome},
                     {'5': biome}, 
                     {'6': biome},
                     {'7': biome},
                     {'8': biome}];

        var case_queries_promises = cases.map(this.db.gsiQuery.bind(this.db));
        var results = Promise.all(case_queries_promises);

        return results.then(data => {
                    return this._get_quartile_stats(data)})
                .then(data => {
                    this._make_box_and_whisker_plot(data, biome)
                }); 
    }

    _query() {
        return this.db.gsiQuery;
    }

    _make_box_and_whisker_plot(data_, biome) {
        var color_choices = {"SWAMP": {upper: '#046242',
                                      lower: '#00e395'},
                             "RIVER": {upper: '#27d5f1d1',
                                      lower: '#73423d40'}};

        var options = {
            series: [
                {
                    type: 'boxPlot',
                    data: data_
                }
            ],
            chart: {
              type: 'boxPlot',
              height: 300
            },
            title: {
              text: 'Diamond Z-axis Offsets in '
                    + biome.charAt(0).toUpperCase() 
                    + biome.slice(1).toLowerCase(),
              align: 'center'
            },
            xaxis: {
              title: {
                text: 'Case #'
              }
            },
            plotOptions: {
              boxPlot: {
                colors: color_choices[biome]
              }
            }
        };

        var id_selector = '#' + biome.toLowerCase();
        var chart = new ApexCharts(document.querySelector(id_selector), options);
        chart.render();

        
    }

    _get_quartile_stats(data) {
        return new Promise(function (resolve, reject) {
            data.forEach(case_ => {
            
                var z_offset_vals = [];

                var diamond_clusters = Array.from(case_.y.Items);
                diamond_clusters.forEach(cluster => {
                    var z_data = cluster.INFO.DIAMOND_LOCATIONS.Z;
                    var patch_center_z = cluster.INFO.PATCH_CENTER_Z;

                    z_data.forEach(zpoint => {
                        z_offset_vals.push(patch_center_z - zpoint);
                    })

                })
                z_offset_vals.sort(function (a, b) {
                    return a - b;
                });

                var quartiles = [
                    d3.quantile(z_offset_vals, 0),
                    d3.quantile(z_offset_vals, 0.25),
                    d3.quantile(z_offset_vals, 0.5),
                    d3.quantile(z_offset_vals, 0.75),
                    d3.quantile(z_offset_vals, 1)
                ];

                case_.y = quartiles;
            });

            resolve(data);
        });
        
    }


}


export { Dashboard };