/**
 * Created by abondar on 11/20/16.
 */
Template.profileForm.events({
    "submit form": function (e) {
        e.preventDefault();
        var name = e.target.querySelector("#name").value;
        var phone = e.target.querySelector("#phone").value;
        Meteor.call("updateProfile", name, phone, function (error, result) {
            if (!error) {
                FlowRouter.go("/contacts");
            }
        })
    }
});