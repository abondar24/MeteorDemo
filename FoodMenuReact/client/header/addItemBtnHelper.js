/**
 * Created by abondar on 11/14/16.
 */
Template.addItemBtn.helpers({
    AddItemLink: function () {
        return AddItemLink;
    },
    currentUser: function () {
        return Meteor.user();
    }
});

