/**
 * Created by abondar on 11/11/16.
 */
BucketCollection = new Mongo.Collection("user_s_bucket");

Meteor.methods({
    "addToBucket": function (product) {
        BucketCollection.insert({
            item: product,
            product_id: product._id,
            createdAt: new Date(),
            updatedAt: null
        });
    },
    "removeFromBucket": function (product) {
        BucketCollection.remove({
            product_id: product._id
        });
    }
});

if (Meteor.isClient){
    Meteor.subscribe("bucket");
}

if (Meteor.isServer){
    Meteor.publish("bucket", function () {
        return BucketCollection.find({});
    });
}

