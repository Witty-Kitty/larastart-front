/**
 * Created by Kathleen on 25/03/2015.
 */

MetronicApp.factory('Module', function($resource, $stateParams) {
    return $resource('http://larastart.api/api/v1/projects/'+$stateParams.id+'/modules/:mid', {id: '@id'}, {
        update: {
            method: 'PUT'
        }
    });
});