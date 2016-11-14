/**
 * Created by abondar on 11/13/16.
 */

angular.module("FoodMenu").controller("CreateItemController",[
    "$scope", "$meteor", "$state",
    function ($scope, $meteor, $state) {
        var setVal = function () {
            $scope.item = {
                name: "",
                chef_name: "",
                time: "Lunch",
                image: "",
                quantity: 1,
                price: 20,
                is_published: true,
                is_deleted: false,
                created_at: "",
                updated_at: null
            };
        }
        setVal();
        $scope.selectImage = function (element) {
            $scope.item.image = element.files[0];
        }
        $scope.save = function () {
            Images.insert($scope.item.image,function (err, res) {
               if (!err){
                   $scope.item.image = res._id;
                   $meteor.call("SaveItem", $scope.item);
                   setVal();
                   $state.go("list");
               }  else {
                   console.log(err);
               }
            });
        }
    }
]);