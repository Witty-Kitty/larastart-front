/**
 * Created by Kathleen on 10/02/2015.
 */

/* Setup Layout Part - Breadcrumb */
MetronicApp.controller('BreadcrumbController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });
}]);