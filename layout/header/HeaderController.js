/**
 * Created by Kathleen on 06/02/2015.
 */
/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', '$modal', '$log', '$timeout', '$http', '$state', 'growl', 'Project', 'Package', 'Module', function($scope, $modal, $log, $timeout, $http, $state, growl, Project, Package, Module) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });

    $scope.addSpecialWarnMessage = function() {
        growl.addWarnMessage("This adds a warn message");
        growl.addInfoMessage("This adds a info message");
        growl.addSuccessMessage("Successful!");
        growl.addErrorMessage("Oops! Something went wrong. Try again?");
    }

    var projects = Project.query(function() {
        $scope.projects = projects;
    });

    //$scope.modal =  {
    //    label : 'New Project',
    //    name : 'Project',
    //    object: new Project,
    //    state: 'view-project'
    //};
    // ,{
    //    label : 'New Package',
    //    name : 'Package',
    //    object: new Package,
    //    state: 'view-package'
    //},{
    //    label : 'New Module',
    //    name : 'Module',
    //    object: new Module,
    //    state: 'view-module'
    //}



    $scope.showForm = function () {

        var modalInstance = $modal.open({
            templateUrl: 'modal-form.html',
            controller: ModalInstanceCtrl,
            scope: $scope,
            resolve: {
                Form: function () {
                    return $scope.Form;
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

var ModalInstanceCtrl = function ($scope, $modalInstance, Form, $state,  $stateParams, growl) {
    $scope.form = {}
    $scope.submitForm = function () {
        if ($scope.form.Form.$valid) {

            console.log( $stateParams.id);
            $scope.modal.object.$save(function(){
                console.log($scope.modal.object);
                $modalInstance.close('closed');
                $state.go($scope.modal.state,{id:$scope.modal.object.id});
                $scope.modal = {};
            });

            return;

            //$scope.inserted = {
            //    id: $scope.projects.length+1,
            //    name: $scope.name,
            //    status: null,
            //    group: null
            //};
            //$scope.projects.push($scope.inserted);

            var dataObject = {
                name : $scope.name,
                slug : null
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

