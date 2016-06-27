angular.module('myApp').controller('LoginController', ['$scope', 'AuthService', function($scope, AuthService){
	$scope.loginUser = function() {
		AuthService.login($scope.user);
	};
}]).controller('RegistrationController', ['$scope', 'AuthService', function($scope, AuthService){
	$scope.signUp = function() {
		AuthService.register($scope.user);
	};
	$scope.logout = function() {
		AuthService.logout();
	}
	
}]).controller('TasksController', ['$rootScope', '$window', '$scope', 'FIREBASE_URL', '$firebaseArray', '$firebaseAuth', function($rootScope, $window, $scope, FIREBASE_URL, $firebaseArray, $firebaseAuth){	
	
	var firebaseRef = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(firebaseRef);

	auth.$onAuth(function(authUser) {
		if(authUser) {
			var tasksRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/tasks/');
			var tasksInfo = $firebaseArray(tasksRef);


			$scope.tasks = tasksInfo;
			tasksInfo.$loaded().then(function(data){
				$rootScope.tasksCount = tasksInfo.length;
			});

			tasksInfo.$watch(function(data){
				$rootScope.tasksCount = tasksInfo.length;
			})
			$rootScope.tasksCount = 0;

			$scope.addTask = function() {
				tasksInfo.$add({
					name: $scope.taskName,
					date: Firebase.ServerValue.TIMESTAMP
				}).then(function(){
					$scope.taskName = '';
				});
			};

			$scope.deleteTask = function(taskId) {
				if($window.confirm('Do you really want to delete the task, ' + $scope.taskName))
					tasksInfo.$remove(taskId);
			}

			$scope.editTask = function(task) {
				tasksInfo.$save(task);
				//$scope.taskName = task.name;
			}
		}
	});
}]);