app.factory('photoFactory', ['$http', 'baseUrl', '$sce', function ($http, baseUrl, $sce) {
    // object to return
    var service = {
        // the function which makes http request and returns a promise
        getPhotos: function () {
            console.log('getPhotosFromThirdParty');
            return $http.get(baseUrl);
        }
    };

    /*Example of jsonp call*/
    /*There was some issues with jsonp request:
     * it seems the server works with json but not jsonp.
     * When tried to make simple get request - the CORS error appeared (probably appropriate server settings are needed).
     * Below is an example of jsonp request
     */
    //// for jsonp request first of all we need to add the url as trusted (to add in a whitelist)
    //$sce.trustAsResourceUrl(baseUrl);

    //$http.jsonp(baseUrl)
    //    .then(function (response) {
    //        // handling response when success
    //    }, function (response) {
    //        // handling response when error
    //    });



    return service;

}]);