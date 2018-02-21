var app = angular.module('app', ['LocalStorageModule']);

/*
 * Constant for the base url. 
 * Since there were some issues when jsonp call (clarifications are in the photoFactory.js file) at the moment we grab the data from local file.
 * In order to change the data source - we need just change the next url
 */ 
app.constant('baseUrl', '/data/photos.json');

// Setting whitelist of urls example. Since at the moment we use http.get request it's not needed right now
app.config(['$sceDelegateProvider', function ($sceDelegateProvider) {  
    // We must whitelist the JSONP endpoint that we are using to show that we trust it
    //$sceDelegateProvider.resourceUrlWhitelist([
    //  'self',      
    //  'http://j0.wlmediahub.com/App_Themes/api/test/**'
    //]);
}])





