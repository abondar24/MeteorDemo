/**
 * Created by abondar on 11/16/16.
 */

Router.onBeforeAction(function () {
    if (this.request.method == 'OPTIONS') {
        this.response.setHeader("Access-Control-Allow-Origin", "*");
        this.response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
    this.next();
});

Router.route("/author-details", {where: "server"})
    .post(function () {
        var data = this.request.body;
        AuthorDetails.insert(data, function (err, res) {
            if (!err) {
                this.response.statusCode = 201;
                this.response.setHeader("Access-Control-Allow-Origin", "*");
                this.response.setHeader("Content-Type", "application/json");
                this.response.setHeader('Access-Control-Allow-Headers',
                    'Origin, X-Requested-With, Content-Type, Accept');
                this.response.setHeader('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
                this.response.end(JSON.stringify({
                    status: "success",
                    response: {id: res}
                }));
            }
        }.bind(this));
    })
    .get(function () {
        this.response.statusCode=200;
        this.response.statusCode = 201;
        this.response.setHeader("Access-Control-Allow-Origin", "*");
        this.response.setHeader("Content-Type", "application/json");
        this.response.setHeader('Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept');
        this.response.setHeader('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
        this.response.end(JSON.stringify({
            status: "success",
            response: AuthorDetails.find({}).fetch()
        }));
    });