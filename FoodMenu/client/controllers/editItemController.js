/**
 * Created by abondar on 11/14/16.
 */

angular.module("FoodMenu").controller("EditItemController", [
    "$scope", "$meteor", "$stateParams", "$state",
    function ($scope, $meteor, $stateParams, $state) {
        $scope.edit = true;
        $scope.item = $meteor.object(FoodMenu, $stateParams.itemId, false);
        $scope.imageSrc = "";

        var imageId = $scope.item.image;
        $meteor.subscribe('images', {_id: $scope.item.image}).then(function () {
            try {
                $scope.imageSrc = Images.findOne({_id: $scope.item.image}).url();
            } catch (e) {
            }
        });
        $scope.selectImage = function (element) {
            $scope.item.image = element.files[0];
            var fileReader = new FileReader();
            fileReader.readAsDataURL($scope.item.image);
            fileReader.onloadend = function () {
                $scope.$apply(function () {
                    $scope.imageSrc = fileReader.result;
                });
            }
        }
        $scope.$watch("item.is_deleted", function (newValue, oldValue) {
            if (newValue === true) {
                $scope.item.is_published = false;
            } else {
                $scope.item.is_published = true;
            }
        });
        $scope.$watch("item.is_published", function (newValue, oldValue) {
            if (newValue === true) {
                $scope.item.is_deleted = false;
            } else {
                $scope.item.is_deleted = true;
            }
        });
        $scope.save = function () {
            if ($scope.item.image instanceof File) {
                Images.remove({_id: imageId});
                Images.insert($scope.item.image, function (err, res) {
                    if (!err) {
                        $scope.item.image = res._id;
                        $meteor.call("UpdateItem",
                            $scope.item.getRawObject());
                        $state.go("list");
                    } else {
                        console.log(err);
                    }
                });
            } else {
                $meteor.call("UpdateItem", $scope.item.getRawObject());
                $state.go("list");
            }
        }
    }
]);