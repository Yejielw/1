// Creates the addCtrl Module and Controller. Note that it depends on the 'geolocation' module and service.
const addCtrl = angular.module('addCtrl', ['geolocation']);
addCtrl.controller('addCtrl', function($scope, $http, $rootScope, geolocation, gservice){


    
    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};
    let coords = {};
    let lat = 0;
    let long = 0;

   // Set initial coordinates to the center of the Israel
    $scope.formData.latitude = 32.074466;
    $scope.formData.longitude = 34.791598;

    // Get User's actual coordinates based on HTML5 at window load
    geolocation.getLocation().then(function(data){

        // Set the latitude and longitude equal to the HTML5 coordinates
        coords = {lat:data.coords.latitude, long:data.coords.longitude};

        // Display coordinates in location textboxes rounded to three decimal points
        $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
        $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);

        // Display message confirming that the coordinates verified.
        $scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";

        gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

    });

    // Functions
    // Get coordinates based on mouse click. When a click event is detected....
    $rootScope.$on("clicked", function(){

        // Run the gservice functions associated with identifying coordinates
        $scope.$apply(function(){
            $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
            $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
            $scope.formData.htmlverified = "(Hey You are not in this location...)";
        });
    });

// Create User Function
// ...

    // ----------------------------------------------------------------------------
    // Creates a new user based on the form fields
    $scope.createUser = function() {
        // Grabs all of the text box fields
        var userData = {
            username: $scope.formData.username,
            fullname: $scope.formData.fullname,
            email: $scope.formData.email,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            htmlverified: $scope.formData.htmlverified
        };

        // Saves the user data to the db
        $http.post('/users', userData)
            .success(function (data) {

                // Once complete, clear the form (except location)
                $scope.formData.username = "";
                $scope.formData.email = "";
                $scope.formData.fullname= "";

                gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    };
});