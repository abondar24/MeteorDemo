/**
 * Created by abondar on 11/14/16.
 */
angular.module("FoodMenu").controller("FoodListController",[
    "$scope", "$meteor",
    function ($scope, $meteor) {
       $scope.foodMenu = $meteor.collection(FoodMenu).subscribe('foodMenu');
        $scope.imageSrc = function (id) {
            return Images.findOne({_id: id}).url();
        }
        $scope.deleteItem = function (item) {
            delete item.$$hashKey;
            item.is_deleted = true;
            item.is_published = false;
            $meteor.call("UpdateItem",item);
        }
    }
]);