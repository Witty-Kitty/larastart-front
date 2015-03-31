'use strict';

MetronicApp.controller('DashboardController', function($rootScope, $scope, $timeout, $modal, $log, growl, Project, confirm) {

    growl.addSuccessMessage('successful!');
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        Metronic.initAjax();
    });

    $rootScope.sidebar = [];


    var projects = Project.query(function() {
        $scope.projects = projects;
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageSidebarClosed = false;

    //Accordion code
    $scope.oneAtATime = true;


    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };

    $rootScope.crumbs = [{
        link: "#/dashboard.html",
        name: "Home"
    }]

    $rootScope.creations = [{
        formMethod: "showFormProject()",
        name: "New Project"
    }]

    $scope.archive = function (id) {
        confirm( "Are you sure you want to archive?" ).then(
            function( response ) {
                console.log(id);
                $scope.project.$delete(function() {

                })
                console.log( "Confirm accomplished with", response );
            },
            function() {
                console.log( "Confirm failed :(" );
            }
        );
    };

    $scope.modal =  {
        label : 'New Project',
        name : 'Project',
        object: new Project,
        state: 'view-project'
    };

    //$scope.showFormProject = function () {
    //
    //    var modalInstance = $modal.open({
    //        templateUrl: 'modal-project-form.html',
    //        controller: ModalInstanceProjectCtrl,
    //        scope: $scope,
    //        resolve: {
    //            projectForm: function () {
    //                return $scope.projectForm;
    //            }
    //        }
    //    });
    //
    //    modalInstance.result.then(function (selectedItem) {
    //        $scope.selected = selectedItem;
    //    }, function () {
    //        $log.info('Modal dismissed at: ' + new Date());
    //    });
    //};
})

//
//var ModalInstanceCtrl = function ($scope, $modalInstance, $http, projectForm) {
//    $scope.form = {}
//    $scope.submitForm = function () {
//        if ($scope.form.projectForm.$valid) {
//
//            $scope.inserted = {
//                id: $scope.projects.length+1,
//                name: $scope.name,
//                status: null,
//                group: null
//            };
//            $scope.projects.push($scope.inserted);
//
//            var dataObject = {
//                name : $scope.name
//            };
//
//            var responsePromise = $http.post("http://larastart.api/api/v1/projects", dataObject, {});
//            responsePromise.success(function(dataFromServer, status, headers, config) {
//                console.log('It works!');
//            });
//
//            responsePromise.error(function(data, status, headers, config) {
//            });
//
//
//            $modalInstance.close('closed');
//        }
//    };
//
//    $scope.cancel = function () {
//        $modalInstance.dismiss('cancel');
//    };
//};

