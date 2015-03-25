/**
 * Created by Kathleen on 25/03/2015.
 */

MetronicApp.factory('Package', function($resource, $stateParams) {
    console.log($stateParams.id);
    return $resource('http://larastart.api/api/v1/projects/:project_id/packages/:id', {project_id: $stateParams.id, id: '@_id'}, {
        update: {
            method: 'PUT'
        }
    });
});