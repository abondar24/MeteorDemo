/**
 * Created by abondar on 11/12/16.
 */
/**
 * Created by abondar on 11/12/16.
 */

Blaze.TemplateInstance.prototype.hasParentTemplate = function (name) {
    var view = Blaze.currentView;
    while (view){
        if (view.name ===name){
            return true;
        }
        view = view.parentView;
    }
    return false;
};


Template.Bucket.helpers({
    item: function () {
        return BucketCollection.find({}).count();
    }
});

Template.Bucket.events({
    "click .bucket": function (e) {
        e.preventDefault();
        if (Session.get("BucketItemsListStatus")==="hidden"){
            Session.set("BucketItemsListStatus", "");
        } else {
            Session.set("BucketItemsListStatus","hidden");
        }
        $(".bucketItemsListContainer").slideToggle();
    }
});

Template.AddOrRemoveButton.events({
    "click .addToBucketBtn": function (e) {
        Meteor.call("addToBucket", Template.parentData());
    },
    "click .removeFromBucketBtn": function (e) {
        Meteor.call("removeFromBucket", Template.parentData());
    }
});

Template.AddOrRemoveButton.helpers({
    remove: function () {
        return Template.instance().hasParentTemplate("BucketItemslistWrapper");
    },

    disabled: function () {
        var product = Template.parentData();
        return !!(BucketCollection.findOne({
            product_id: product._id
        }));
    }
});


Template.BucketItemsList.onRendered(function () {
    this.autorun(function () {
        if (this.subscriptionsReady()) {
            var bucketItems = BucketCollection.find({}).fetch(),
                products = {
                    products: bucketItems.map(function (bucketItem) {
                        return bucketItem.item;
                    })
                },
                selector = Template.instance().$(".bucketItemsListContainer"),
                visibility = selector.is(":visible");
            Template["BucketItemslistWrapper"] = new Template(
                "BucketItemslistWrapper",
                Template[this.data.parentTemplate].renderFunction
            );
            selector.children().remove();
            if (bucketItems.length){
                Blaze.renderWithData(
                    Template["BucketItemslistWrapper"], products, selector[0]);
            } else {
                selector[0].innerHTML = "<div class='no-items'>No items in the cart</div>";
            }
        }
    }.bind(this));
});

Template.BucketItemsList.helpers({
    displayStatus: function () {
        var status = Session.get("BucketItemsListStatus");
    }
});

