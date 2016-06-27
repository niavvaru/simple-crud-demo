angular.module('myApp', ['ngRoute', 'firebase']);

angular.module('myApp').config(['$routeProvider',function($routeProvider) {
	$routeProvider.
		when('/login', {
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		}).
		when('/signup', {
			templateUrl: 'views/signup.html',
			controller: 'RegistrationController'
		}).
		when('/tasks', {
			templateUrl: 'views/tasks.html',
			controller: 'TasksController',
			resolve: {
				isAuthenticated: function(AuthService){
					return AuthService.requireAuth();
				}
			}
		}).
	    otherwise({
	      redirectTo: '/login'
	    });
}]);

angular.module('myApp').run(['$rootScope', '$location',  function($rootScope, $location) {
    $rootScope.$on('$routeChangeError',
      function(event, next, previous, error) {
        if (error=='AUTH_REQUIRED') {
          $rootScope.message = 'Sorry, you must log in to access that page';
          $location.path('/login');
        }
      });
  }]);
