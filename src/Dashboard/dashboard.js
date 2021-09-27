// create box and whisker plots
class Dashboard {
    constructor(db) {
        this.db = db;

        this._assemble_dashboard();
    }

    _assemble_dashboard() {
        this._make_biome_plot("SWAMP");
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

        results.then(data => {
                    return this._get_quartile_stats(data)})
                .then(data => {
                    this._make_box_and_whisker_plot(data)
                }); 

    }

    _query() {
        return this.db.gsiQuery;
    }

    _make_box_and_whisker_plot(data) {
        console.log(data);
        
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