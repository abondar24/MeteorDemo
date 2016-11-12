/**
 * Created by abondar on 11/12/16.
 */

describe("Server tests", function () {
    it("BucketCollection should be defined", function () {
       except(BucketCollection).toBeDefined();
    });

    it("Can call getTotalPrize in Bucket variable at server",function () {
       except(Bucket.getTotalPrice()).toBe(0);
    });

});