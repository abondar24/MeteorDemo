/**
 * Created by abondar on 11/8/16.
 */

Template.createTravel.events({
    "submit form": function (event) {
        event.preventDefault();

        //object with properties from input
        var busService = {
            name: event.target.name.value,
            agency: event.target.agency.value,
            seats: parseInt(event.target.seats.value, 10),
            source: event.target.startpoint.value,
            destination: event.target.endpoint.value,
            startDateTime: new Date(event.target.startdate.value+ " " + event.target.starttime.value),
            endDateTime: new Date(event.target.enddate.value+ " " + event.target.endtime.value),

            fare: event.target.fare.value
        };

        //checking start time
        if(busService.startDateTime.getTime() > busService.endDateTime.getTime()){
            $(event.target).find(".error").html("Start time is greater than end time");
            return false;
        }

        //persist data
        Meteor.call("createBusService",busService, function (error, result) {
            if (error){
                $(event.target).find(".error").html(error.reason);
            } else {
                Router.go("home")
            }
        });
    }
});

