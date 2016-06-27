angular.module('myApp').directive('editableTextBox', [function(){
	return {
		restrict: 'A',

		link: function($scope, elem, attr, controller) {
			elem.on('click', function(){
				if(! elem.attr('editing')) {
					elem.attr('editing', true);
					var textBox = '<input type="text" ng-model="task.name" name ="newTaskName" ng-required="true" value="'+ elem[0].innerHTML + '" />';
					elem.html(textBox);
					elem.children()[0].focus();
					elem.children().on('blur keydown keypress', function(evt){
						if(((evt.type === 'keydown' || 'keypress') 
							&& evt.which === 13)
							|| evt.type === 'blur'
						) {
							if(/^[A-z,0-9]+[A-z,0-9,\s]{1,100}/.test(this.value)) {
							this.parentElement.removeAttribute('editing');
							$scope.task.name = this.value; 
							$scope.editTask($scope.task);
							this.parentElement.innerHTML = this.value;
							} else {
								this.parentElement.removeAttribute('editing');
								this.parentElement.innerHTML = $scope.task.name;
							}	
						}
						
					});
					elem.off('blur keydown keypress');
				}
			});

		}
	};
}]);