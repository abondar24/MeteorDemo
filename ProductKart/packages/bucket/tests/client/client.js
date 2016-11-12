/**
 * Created by abondar on 11/12/16.
 */

describe("Template test",function () {
    it ("Bucket template should be defined in client", function () {
       except(Template.Bucket).not.toBeUndefined();
    });
});