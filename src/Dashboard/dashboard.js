// create box and whisker plots
class Dashboard {
    constructor(db) {
        this.db = db;

        this._assemble_dashboard();
    }

    _assemble_dashboard() {
        this._make_swamp_plot();
        this._make_river_plot();
        this._make_depth_plot();

    }

    _make_swamp_plot() {
        // console.log('Making swamp plot');
        this._query().then(result => {
            this._make_box_and_whisker_plot(result);
        })

    }

    _make_river_plot() {
        // console.log('Making river plot');
    }

    _make_depth_plot() {
        // console.log('Making depth plot');
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