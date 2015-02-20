/**
 * Created by Kathleen on 16/02/2015.
 */

'use strict';

MetronicApp.controller('ModalController', function($rootScope, $scope, $modalInstance, items, packages) {


    //$scope.items = items;
    $scope.items = packages;

    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

});