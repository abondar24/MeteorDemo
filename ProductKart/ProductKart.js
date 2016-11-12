/**
 * Created by abondar on 11/11/16.
 */
ProductsCollection = new Mongo.Collection("products")


//client
if (Meteor.isClient) {
    Meteor.subscribe("products");
    Template.ProductList.helpers({
        products: function () {
            return ProductsCollection.find({});
        }
    });
}


//server(sarvar)
if (Meteor.isServer) {
    Meteor.startup(function () {
        var products = [{
            name: "Cat",
            image: "cat.jpg",
            price: 12000
        }, {
            name: "Bmw",
            image: "bmw.jpg",
            price: 67000
        }, {
            name: "Salo",
            image: "salo.jpg",
            price: 700
        }];
        if (ProductsCollection.find({}).count() <= 0) {
            products.forEach(function (item) {
                item.createdAt = new Date();
                item.updatedAt = null;
                ProductsCollection.insert(item);
            });
        }
    });
    Meteor.publish("products", function () {
        return ProductsCollection.find({});
    })
}