// create box and whisker plots
class Dashboard {
    constructor(db) {
        this.db = db
    }

    get_query_results() {
        return this.db.pkQuery('PATCH#GRAVEL');
    }

}


export { Dashboard }