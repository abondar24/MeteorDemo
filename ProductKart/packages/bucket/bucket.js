/**
 * Created by abondar on 11/12/16.
 */
Bucket = {
    getTotalPrice: function (priceField) {
        priceField = priceField || "price";
        var total = 0, itemsInCart = BucketCollection.find().fetch();
        itemsInCart.map(function (cartItem) {
            total += cartItem.item[priceField];
            return total;
        });
        return total;
    },
    getTotalNumberOfItemInBucket: function () {
        return BucketCollection.find().count();
    }
};