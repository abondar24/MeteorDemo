/**
 * Created by abondar on 11/20/16.
 */
Template.messenger.helpers({
    messages: function () {
        var senderId = Meteor.userId(),
            rxrId = FlowRouter.getParam("id");

        return Messages.find({
            $or: [{
                $and: [{
                    sender_id: Meteor.userId()
                },{
                    receiver_id: rxrId
                }]
            },{
                sender_id: rxrId
            },{
               $and: [{
                   sender_id: rxrId
               },{
                   receiver_id: Meteor.usersId()
               }]
            }]
        });
    },
    mineClass: function () {
        return this.sender_id === Meteor.userId() ? 'mine': 'not-mine';
    },
    namw: function () {
        return Meteor.users.findOne({_id: FlowRouter.getParam("id")}).profile.name;
    }
});

Template.messenger.events({
    "click #send": function(e) {
        e.target.setAttribute("disabled", true);
        var textarea = document.getElementById("message");
        Messages.insert({
            content: textarea.value,
            sender_id: Meteor.userId(),
            receiver_id: FlowRouter.getParam("id"),
            created_at: Date.now(),
            senderName: Meteor.user().profile.name
        }, function(error, result) {
            if(!error) {
                textarea.value = "";
                e.target.removeAttribite("disabled");
            }
        });
    }
});
var months = ["Jan", "Feb", "March", "April", "May", "June",
    "July", "August", "September", "October", "November",
    "December"]
Template.message.helpers({
    readableDate: function() {
        var date = new Date(this.created_at);
        return date.getDate()+", "+months[date.getMonth()].substr(0,
                3);
    }
});