/**
 * Created by abondar on 11/12/16.
 */

FoodMenu.allow({
    insert: function () {
        if (Meteor.user().profile.role === "admin") {
            return true;
        }
    },

    update: function(userId,doc) {
        if (Meteor.user().profile.role === "admin"){
            doc.updated_at = new Date();
            return true;
        }
    },

    remove: function() {
        return true;
    }
});

FoodMenu.deny({
    insert: function () {
        return false;
    },

    update: function () {
        return false;
    },

    remove: function () {
        return false;
    }
});

Images.allow({
    insert: function () {
        return true;
    },
    update: function (userId, doc) {
        return true;
    },
    remove: function () {
        return true;
    },
    download: function () {
        return true;
    }
});