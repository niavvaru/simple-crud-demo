angular.module('myApp').service('AuthService', ['$rootScope', '$location', '$firebaseAuth','$firebaseObject', 'FIREBASE_URL' , function($rootScope, $location, $firebaseAuth, $firebaseObject, FIREBASE_URL){
	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);

	auth.$onAuth(function(authUser) {
		if(authUser) {
			var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
			var userData = $firebaseObject(userRef);
			$rootScope.currentUser = userData;
		} else {
			$rootScope.currentUser = '';
		}
	});

	var myAuthAPI = {
		login: function(user){
			auth.$authWithPassword({
				email: user.email,
				password: user.password
			}).then(function(regUser) {
				$location.path('/tasks');
				$rootScope.message = '';
			}).catch(function(error) {
				$rootScope.error = error.message;
			});
		},
		logout: function() {
			window.localStorage.setItem('currentUser', "{}");
			return auth.$unauth();
		},
		register: function(user) {
				auth.$createUser({
				email: user.email,
				password: user.password,
				firstname: user.firstname,
				lastname: user.lastname
			}).then(function(userData) {
				var userFirebaseObj = new Firebase(FIREBASE_URL+'users')
					.child(userData.uid).set({
						uid: userData.uid,
						firstname: user.firstname,
						lastname: user.lastname,
						email: user.email
					});
				myAuthAPI.login(user);
				$rootScope.message = '';
			}).catch(function(error) {
				$rootScope.error = error.message;
			})
		},
		requireAuth: function() {
			return auth.$requireAuth();
		}
	};

	return myAuthAPI;
}])