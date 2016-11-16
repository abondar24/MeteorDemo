/**
 * Created by abondar on 11/12/16.
 */

Meteor.methods({
    "SaveItem": function (item) {
        item.created_at = new Date();
        return FoodMenu.insert(item, function (err, res) {
            console.log(err,res);
        });
    },

    "UpdateItem": function (item) {
        item.updated_at = new Date();
        var id = item._id;
        delete item._id;
        FoodMenu.update(id, {$set: item}, function (err, res) {
            console.log(err,res);
        });
    },
});

