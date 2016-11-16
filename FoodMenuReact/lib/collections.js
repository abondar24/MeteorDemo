/**
 * Created by abondar on 11/12/16.
 */
FoodMenu = new Mongo.Collection("foodMenu");

Images = new FS.Collection("images",{
    stores: [new FS.Store.GridFS("images")],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

