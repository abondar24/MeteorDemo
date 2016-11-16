/**
 * Created by abondar on 11/12/16.
 */

Meteor.publish("foodMenu", function(args){
    args = args || {};
    return FoodMenu.find(_.extend({is_published: true, is_deleted: false},args))
});


Meteor.publish("images", function (argument) {
    argument = argument || {};
    return Images.find(argument);
});