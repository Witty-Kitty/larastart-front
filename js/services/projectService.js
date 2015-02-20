/**
 * Created by Kathleen on 05/02/2015.
 */

MetronicApp.factory('projectService', function($resource) {
    return $resource('/api/v1/projects/:id', {id: '@id'},{
        update: {
            method: 'PUT'
        }
    });
});

