/**
 * Created by abondar on 11/20/16.
 */
Template.contacts.onCreated(function () {
    var _this = this;
    this.contacts = [];
    this.loadingContacts = new ReactiveVar(true);
    if (Meteor.isCordova){
        navigator.contactsPhoneNumbers.list(function (contacts) {
            var contacts = _.filter(contacts, function (eachContact) {
                if (eachContact.phoneNumbers.length &&
                eachContact.phoneNumbers[0].type === "MOBILE"){
                    eachContact.phone = eachContact.phoneNumbers[0].number;
                    return true;
                }
            });
            Meteor.call("checkContacts",contacts, function (error, result) {
                if(!error){
                    _this.contacts = result;
                }
                _this.loadingContacts.set(false);
            });
        },
        function (error) {
            _this.loadingContacts.set(false);
            console.error(error);
        });
    } else {
        _this.loadingContacts.set(false);
    }
});

Template.contacts.helpers({
    isLoading: function () {
        return !!Template.instance().contacts.length;
    },
    contacts: function () {
        return Template.instance().contacts;
    }
});

Template.contacts.events({
    "click .list li": function (e) {
        FlowRouter.go("/messenger/"+this._id);
    }
});