angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'lctrl'
		})
		.when('/logout', {
			controller: 'LogoutController'
		})
		.when('/upload', {
			controller: 'myCtrl'
		})
		.when('/p', {
			templateUrl: 'views/p.html',
			controller: 'profilearrayController',
			resolve: {
			logincheck: checkLoggedin
			}
		})
		.when('/admin', {
			templateUrl: 'views/admin.html',
			controller: '',
			resolve: {
			logincheck: checkLoggedin
			}
		})
		.when('/register', {
			templateUrl: 'views/register.html',
			controller: 'rctrl'
		});
	$locationProvider.html5Mode(true);

}]);

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
{
    var deferred = $q.defer();

    $http.get('/loggedin').success(function(user)
    {
		if(user=='0'){
			alert("");
		}
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0')
            deferred.resolve();
        // User is Not Authenticated
        else
        {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
			alert($rootScope.errorMessage);
            $location.url('/login');
        }
    });

    return deferred.promise;
};

// app.controller("NavCtrl", function($rootScope,$scope, $http, $location){
//   $scope.logout= function()
//   {
//      $http.post("/logout").success(function(){
//        $location.url('/home');
//      });
//   }
//
// });
