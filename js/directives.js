angular.module('myApp').directive('inlineEdit', ['$timeout', function($timeout){
	return {
		restrict: 'AE',
		scope: {
			model: '=editItem',
			saveCallBack: '&'
		},
		template: '<span>{{model.name}}</span>',
		link: function($scope, elem, attr, controller) {
			elem.on('click', function(){
				if(!elem.attr('editing')) {
					elem.attr('editing', true);
					var textBox = '<input type="text" value="'+ $scope.model.name + '"/>';
					elem.html(textBox);
					elem.find('input')[0].focus();
					elem.find('input').on('blur keydown keypress', function(evt){
						var editEle = this,
							parEle = editEle.parentElement,
							newValue = this.value;
						if(
							(((evt.type === 'keydown' || 'keypress') && evt.which === 13)
							|| evt.type === 'blur')
						) {
							
							if(/^[A-z,0-9]+[A-z,0-9,\s]{1,100}/.test(newValue) && $scope.model.name !== newValue) {
							parEle.removeAttribute('editing');
							$scope.model.name = newValue; 
							$scope.saveCallBack($scope.model);
							parEle.innerHTML = '<span>'+$scope.model.name+'</span>';
							} else {
								parEle.removeAttribute('editing');
								parEle.innerHTML = '<span>'+$scope.model.name+'</span>';
							}	
						}
						
					});
					elem.off('blur keydown keypress');
				}
			});

		}
	};
}]);