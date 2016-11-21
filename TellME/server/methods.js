/**
 * Created by abondar on 11/20/16.
 */
Meteor.methods({
    updateProfile: function (name, phone) {
        Meteor.users.update(
            {_id: Meteor.userId()},
            {
                $set: {
                    profile: {
                        name: name,
                        phone: phone
                    }
                }
            }
        );
    },

    checkCotacts: function (contacts) {
        contacts = contacts || [];
        if (contacts.length){
            var numbers = _.map(contacts, function (eachContact) {
               return eachContact.phone;
            });
            return Meteor.users.find({"profile.phone":
            {$in: numbers}}).fetch().map(function (user) {
                return _.extend(user.profile,{_id: user._id});
            });
        } else {
            return [];
        }
    }
});