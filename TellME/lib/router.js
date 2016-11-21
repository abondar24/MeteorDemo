/**
 * Created by abondar on 11/20/16.
 */
FlowRouter.route('/',{
    action: function () {
        if(!Meteor.userId()){
            BlazeLayout.render("loginLayout");
            Accounts._loginButtonsSession
                .set('dropdownVisible',true);
        } else {
            FlowRouter.go("/profile");
        }
    }
});

FlowRouter.route('/profile',{
    action: function () {
        Accounts._loginButtonsSession.set('dropdownVisible',false);
        if (Meteor.userId()){
            BlazeLayout.render("layout",{main:"profileForm"});
        } else {
            FlowRouter.go("/");
        }
    }
});

FlowRouter.route('/contacts',{
    action: function () {
        if(!Meteor.userId()){
            FlowRouter.go("/");
        } else {
            Accounts._loginButtonsSession
                .set('dropdownVisible',false);
            BlazeLayout.render("layout",{main:"contacts"});
        }
    }
});

FlowRouter.route('/messenger/:id',{
    action: function () {
        BlazeLayout.render("messengerLayout", {main:"messenger"});
    }
});

// Tracker.autorun(function () {
//    if (!Meteor.user()){
//        FlowRouter.go("/");
//    } else {
//        var user = Meteor.user();
//        if (user && user.profile && user.profile.phone){
//            FlowRouter.go("/profile");
//        }
//    }
// });

