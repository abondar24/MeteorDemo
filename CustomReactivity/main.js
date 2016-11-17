var trackerDeps = new Tracker.Dependency;
function counterVal() {
    trackerDeps.depend();
    return Math.floor(Math.random() * (100 - 10 + 1)) + 10;
}
function changeCounterVal() {
    trackerDeps.changed();
}
function getRandomInt(min, max) {
    return;
}

Tracker.autorun(function () {
    console.log(counterVal())
});

if (Meteor.isClient) {
    Template.hello.helpers({
        counter: function () {
            return counterVal();
        }
    });
    Template.hello.events({"click button": changeCounterVal});
}

var market = new ReactiveDict;
market.set("sale", "hight");
market.set("demand", "less");

var saleRun = Tracker.autorun(function () {
    console.log(market.get("sale"));
    var demandRun = Tracker.autorun(function () {
        console.log(market.get("demand"));
    });
});