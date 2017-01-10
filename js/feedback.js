MyApp.controller('ToolbarCtrl', function($scope) {

});
MyApp.controller('BackCtrl', function($scope,$mdDialog,$http,myutils) {
    $scope.user = {
      email: '',
      biography: '',
    };
	$scope.send = function () {
		myutils.showWait();
		if ($scope.user.biography.length <= 4) {
			myutils.hideWait();
			$mdDialog.show(
				   $mdDialog.alert()
				  .title('Упс!')
				  .textContent('Сообщение слишком короткое')
				  .ok('Ок')
			);
		};
	var url = 'https://doorbell.io/api/applications/5138/submit?key=Lqj3ygP5LQfochvmsvfuU2CvxGYXa4U3fFbH2AKYWuzLpzCsWeK3ZHitA0iLBSc7';
	var data = {
		'User-Agent': 'AngularJS',
		'email': $scope.user.email,
        'message': $scope.user.biography		
	};
		  $http.post(url, data)
			  .success(function(data) {
				$scope.user.email = '';
				$scope.user.biography = '';
				myutils.hideWait();
				console.log(data);
				$mdDialog.show(
				   $mdDialog.alert()
				  .title('Ваше сообщение отправлено.')
				  .textContent('')
				  .ok('Ок')
				);
				
			}).error(function (err) {
				myutils.hideWait();
				console.log('Что-то пошло не так')
			})
    };
  });
 (function () {
    angular.module('MyApp').controller('waitCtrl', waitCtrl);
    waitCtrl.$inject = ['$mdDialog', '$rootScope'];

    function waitCtrl($mdDialog, $rootScope) {
        var vm = this;

       
        
      $rootScope.$on("hide_wait", function (event, args) {
            $mdDialog.cancel();
        }); 
        

    }
})(); 
(function(){
	angular.module('MyApp').service('myutils', myutils);
    myutils.$inject = ['$mdDialog', '$rootScope'];
    function myutils($mdDialog,  $rootScope){ 
     
     return {
       hideWait: hideWait,
       showWait: showWait
     }
     
     function hideWait(){
          setTimeout(function(){
                   $rootScope.$emit("hide_wait"); 
                },5);
      }
      
     function showWait(){
              $mdDialog.show({
                controller: 'waitCtrl',
                template: '<md-dialog id="plz_wait" style="background-color:transparent;box-shadow:none;overflow:hidden;">' +
                            '<div layout="row" layout-sm="column" layout-align="center center" aria-label="wait">' +
                                '<md-progress-circular class="md-hue-2" md-mode="indeterminate" ></md-progress-circular>' +
                            '</div>' +
                         '</md-dialog>',
                parent: angular.element(document.body),
                clickOutsideToClose:false,
                fullscreen: false
              })
              .then(function(answer) {
                
              });
       }
  
    }
})();