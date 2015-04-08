/**
 * Created by Kathleen on 05/02/2015.
 */

MetronicApp.factory('Project', function($resource) {
    return $resource('http://larastart.api/api/v1/projects/:id', {id: '@id'}, {
        update: {
            method: 'PUT'
        },
        archive: {
            method: 'DELETE',
            url: 'http://larastart.api/api/v1/projects/:id/archive'
        }
    });
});

