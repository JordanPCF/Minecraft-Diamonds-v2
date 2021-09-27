// create box and whisker plots
class Dashboard {
    constructor(db) {
        this.db = db;

        this._assemble_dashboard();
    }

    _assemble_dashboard() {
        this._make_biome_plot("SWAMP");
        this._make_biome_plot("RIVER");
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

        var case_queries_promises = cases.map(this._query.bind(this));
        var results = Promise.all(case_queries_promises);

        results.then(data => {
            console.log(data)}); 

        // this._query().then(result => {
        //     this._make_box_and_whisker_plot(result);
        // })

    }

    _query() {
        return this.db.pkQuery('PATCH#GRAVEL');
    }

    _make_box_and_whisker_plot(data) {

        var cleaned_data = this._clean_data(data);
        console.log(cleaned_data);
    }

    _clean_data(data) {
        return data;
    }


}


export { Dashboard };