/**
 * Created by Kathleen on 31/03/2015.
 */

MetronicApp.factory(
    "confirm",
    function( $window, $q ) {
// Define promise-based confirm() method.
        function confirm( message ) {
            var defer = $q.defer();
// The native confirm will return a boolean.
            if ( $window.confirm( message ) ) {
                defer.resolve( true );
            } else {
                defer.reject( false );
            }
            return( defer.promise );
        }
        return( confirm );
    }
);