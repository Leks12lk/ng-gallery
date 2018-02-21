
app.controller('photoCtrl', ['photoFactory', 'localStorageService', function (photoFactory, localStorageService) {
    var self = this;

    /*PRIVATE*/
    // an array of all photos
    self.photos = [];
    // an array of active(current) photos
    self.currentPhotos = [];
    // an array of photos which have been already shown
    self.shownPhotos = [];
    // a bool variable which detects is application run from server host (false if it's run from file system)
    self.isServerHost = location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname.indexOf('http') != -1;

    // function to get data
    function getPhotos() {
        // if application run with server host get the data via $http in a phactory
        if (self.isServerHost) {
            photoFactory.getPhotos()
                .then(function (response) {
                    self.photos = response.data.photo;
                    setCurrentPhotos();
                    self.activePhoto = self.currentPhotos[self.currentPage - 1];
                    self.activePhoto.description = self.activePhoto.description.trim() != '' ? self.activePhoto.description.trim() : 'No description';
                    localStorageService.set('allPhotos', self.photos);
                }, function (error) {
                    console.log('Unable to load data: ' + error.message);
                    self.isError = true;
                    self.errorMessage = 'Unable to load the data';
                });
        } else {            
            self.photos = photosData;            
            setCurrentPhotos();
            self.activePhoto = self.currentPhotos[self.currentPage - 1];
            self.activePhoto.description = self.activePhoto.description.trim() != '' ? self.activePhoto.description.trim() : 'No description';
            localStorageService.set('allPhotos', self.photos);
        }       
    }

    // function to get random number in a range [min,...,max]
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // function to set active(current) photos
    function setCurrentPhotos() {       
        self.currentPhotos = [];
        var i = 1;
        while (i <= 5) {
            var random = getRandomNumber(0, self.photos.length);
            var randomPhoto = self.photos[random];           
            if (self.shownPhotos.length > 0 && _.find(self.shownPhotos, { id: randomPhoto.id }) != undefined) {
                continue;
            } else {
                self.currentPhotos.push(randomPhoto);
            }
            i++;
        }
    }
    /* end of PRIVATE*/
   
    // number of the current page
    self.currentPage = 1;
    // an array of pages for paging
    self.pages = [1, 2, 3, 4, 5];
    // flag to show error modal popup
    self.isError = false;
    // error message in error modal popup (by default set it as global error)
    self.errorMessage = 'Error during the process';    
   
    // function to set active page (page whis is displayed for user)
    self.setActivePage = function (pageNumber) {
        var index = pageNumber - 1;
        self.currentPage = pageNumber;
        self.activePhoto = self.currentPhotos[index];
        self.activePhoto.description = self.activePhoto.description.trim() != '' ? self.activePhoto.description.trim() : 'No description';
    }

    // function to shuffle current photos (get other random photos)
    self.shuffle = function () {      
        self.shownPhotos = self.shownPhotos.concat(self.currentPhotos);
        self.currentPhotos = [];
        setCurrentPhotos();
        self.activePhoto = self.currentPhotos[self.currentPage - 1];
        self.activePhoto.description = self.activePhoto.description.trim() != '' ? self.activePhoto.description.trim() : 'No description';        
    }

    // function to go to the next page (photo item)
    self.goNext = function () {
        if (self.currentPage === self.pages.length) {
            return false;
        } else {
            self.setActivePage(self.currentPage + 1);
        }
    }

    // function to go to the previous page (photo item)
    self.goPrev = function () {
        if (self.currentPage === self.pages[0]) {
            return false;
        } else {
            self.setActivePage(self.currentPage - 1);
        }
    }

    self.closeErrorPopup = function () {
        self.isError = false;
        self.errorMessage = '';
    }

    // if the data is in local storage - get the data from it
    if (localStorageService.get('allPhotos') != null) {       
        self.photos = localStorageService.get('allPhotos');
        setCurrentPhotos();
        self.activePhoto = self.currentPhotos[self.currentPage - 1];
        self.activePhoto.description = self.activePhoto.description != '' ? self.activePhoto.description : 'No description';
    } else {
        getPhotos();
    }   

}]);