/**
 * Created by abondar on 11/8/16.
 */


Router.configure({
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading'
});

Router.onBeforeAction('loading'); //show loading template

Router.route("/", {
    name: "home",
    layoutTemplate: "homeLayout",
    template: "home",

    yieldRegions: {
        travelSearch: {to: "search"}
    }
});

Router.route("/create-travel", {
    name: "createTravel",
    layoutTemplate: "createTravel",
    template: "createTravel"
});


Router.route("/book/:_id",{
    name: "book",
    layoutTemplate: "createTravelLayout",
    template: "bookTravel",
    waitOn: function () {
        Meteor.subscribe("BlockedSeats",this.params._id);
        Meteor.subscribe("Reservations",this.params._id);
    },

    data: function () {
        templateData = {
            _id: this.params._id,
            bus: BusServices.findOne({_id: this.params._id}),
            reservations: Reservations.find({bus: this.params._id}).fetch(),
            blockedSeats: BlockedSeats.find({bus: this.params._id}).fetch()
        };
    return templateData;
    }
});

