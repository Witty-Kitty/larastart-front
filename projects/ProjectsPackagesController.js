/**
 * Created by Kathleen on 31/03/2015.
 */

MetronicApp.controller('ProjectsPackagesController', function($scope, $stateParams, Project, Package, $rootScope, $filter){

    $scope.$on('$viewContentLoaded', function () {
        Metronic.initAjax(); // initialize core components
    });

    $scope.modal =  {
        label : 'New Package',
        name : 'Package',
        object: new Package,
        state: 'packages'
    };

    var project = Project.get({ id: $stateParams.id }, function() {
        $scope.project = project;

        $rootScope.crumbs = [{
            link: "#/dashboard.html",
            name: "Home"
        },
            {
                link: "#/projects_general/p/" + $stateParams.id,
                name: $scope.project['name']
            }]


    })

    var packages = Package.query(function() {
        $scope.packages = packages;
        console.log($scope.packages);
    });

    $rootScope.sidebar = [
        {
            icon: "briefcase",
            title: 'General',
            uri: "#/projects_general/p/" + $stateParams.id
        },
        {
            icon: "puzzle",
            title: "Packages",
            uri: "#/projects_packages/p/" + $stateParams.id
        }
        //{
        //    icon: "refresh",
        //    title: "Modules",
        //    uri: "#/projects_modules/p/" + $stateParams.id
        //}
    ]

    $scope.showOptions = function () {
        var selected = [];
        angular.forEach($scope.packageOptions, function (p) {
            if ($scope.packages.options.indexOf(p.value) >= 0) {
                selected.push(p.text);
            }
        });
        return selected.length ? selected.join(', ') : 'Not set';
    };

    $scope.package0Version = [{
        value: "5.0",
        text: "5.0"
    }, {
        value: "4.2",
        text: "4.2"
    }];

    $scope.showPackageVersion = function () {
        var selected = $filter('filter')($scope.package0Version, {value: $scope.package0Version.version});
        return ($scope.package0Version.version && selected.length) ? selected[0].text : 'Not set';
    };

    //update package
    $scope.savePackage = function (data, id) {

        angular.extend(data, {id: id});
        console.log(data);
        var dataObject = {
            name: data['name'],
            //version  : data['version'],
            options: {
                assets: data['publish.assets'],
                views: data['publish.views'],
                configuration: data['publish.configuration'],
                migrations: data['publish.migrations']
            }
            //providers: data['providers'],
            //aliases: [
            //    {alias: data['alias']},
            //    {facade: data['facade']}
            //]
        };


        console.log(id);

        var package0 = Package.get({id: id}, function() {
            $scope.package0 = package0;

            $scope.package0.name = data['name'];
            //$scope.package0.version = data['version'];
            $scope.package0.options = [{
                assets: data['publish.assets'],
                views: data['publish.views'],
                configuration: data['publish.configuration'],
                migrations: data['publish.migrations']
            }];
            $scope.package0.$update(function () {

            })
        })

    }

    // remove package
    $scope.removePackage = function (index, id) {
        $scope.packages.splice(index, 1);

        var package0 = Package.get({id: id}, function() {
            $scope.package0 = package0;
            $scope.package0.$delete(function () {

            });
        });

    };

})