Meteor.startup(function () {
    if (DataViz.find({}).count <= 0) {
        var counter = 1;
        var id = setInterval(Meteor.bindEnvironment(function () {
            DataViz.insert({
                sno: counter++,
                temperature: Math.random() + 30
            });
            if (DataViz.find({}).count() === 20) {
                clearInterval(id);
            }
        }), 2000);
    }
});

