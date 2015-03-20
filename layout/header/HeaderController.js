/**
 * Created by Kathleen on 06/02/2015.
 */
/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', '$modal', '$log', '$timeout', '$http', '$state', 'growl', function($scope, $modal, $log, $timeout, $http, $state, growl) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });

    $scope.addSpecialWarnMessage = function() {
        growl.addWarnMessage("This adds a warn message");
        growl.addInfoMessage("This adds a info message");
        growl.addSuccessMessage("Successful!");
        growl.addErrorMessage("Oops! Something went wrong. Try again?");
    }

    $http.get("http://larastart.api/api/v1/projects")
        .success(function(projects){
            $scope.projects = projects;

        })

    $scope.showFormProject = function () {

        var modalInstance = $modal.open({
            templateUrl: 'modal-project-form.html',
            controller: ModalInstanceProjectCtrl,
            scope: $scope,
            resolve: {
                projectForm: function () {
                    return $scope.projectForm;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

}]);

var ModalInstanceProjectCtrl = function ($scope, $modalInstance, $http, projectForm, $state, growl) {
    $scope.form = {}
    $scope.submitForm = function () {
        if ($scope.form.projectForm.$valid) {

            $scope.inserted = {
                id: $scope.projects.length+1,
                name: $scope.name,
                status: null,
                group: null
            };
            $scope.projects.push($scope.inserted);

            var dataObject = {
                name : $scope.name
            };

            var responsePromise = $http.post("http://larastart.api/api/v1/projects", dataObject, {});
            responsePromise.success(function(dataFromServer, status, headers, config, $urlRouterProvider) {
                growl.addSuccessMessage('successful!');
                $state.go('projects-general', {id: dataFromServer.id});
                //console.log(dataFromServer);

            });

            responsePromise.error(function(data, status, headers, config) {
                growl.addErrorMessage('Oops! Something went wrong. Try again?');
            });


            $modalInstance.close('closed');
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

