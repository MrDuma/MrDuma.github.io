MyApp.controller('ToolbarCtrl', function($scope) {
	$scope.addGroup = function() {
		window.location = "add.html";
	}
});
MyApp.controller('SwipeCtrl', SwipeCtrl);
function SwipeCtrl ( $scope ) {
    var numWeek = weekInfo();
	console.log(numWeek);
	var now = new Date();
	var nD;
	if ( now.getDay() === 0) {
		nD = now.getDay();
		if(numWeek === 2) {
			numWeek = 1;
		} else {
			numWeek = 2;
		}
	} else {
		nD = now.getDay() - 1;
	}
	var fw;
	var sw;
	var nw;
	var nDay1;
	var nDay2;
	if(numWeek === 2) {
		fw = 'I неделя';
		sw = 'II неделя (тек.)';
		nDay1 = 0;
		nDay2 = nD;
	} else {
		fw = 'I неделя (тек.)';
		sw = 'II неделя';
		nDay2 = 0;
		nDay1 = nD;
	};
	console.log(nw);
	$scope.data = {
      selectedIndex1: nDay1,
	  selectedIndex2: nDay2,
	  selectedIndexWeek: nw,
	  nameFirstWeek: fw,
	  nameSecondWeek: sw
    };
    $scope.next1 = function() {
      $scope.data.selectedIndex1 = Math.min($scope.data.selectedIndex1 + 1, 5) ;
    };
    $scope.previous1 = function() {
      $scope.data.selectedIndex1 = Math.max($scope.data.selectedIndex1 - 1, 0);
    };
	$scope.next2 = function() {
      $scope.data.selectedIndex2 = Math.min($scope.data.selectedIndex2 + 1, 5) ;
    };
    $scope.previous2 = function() {
      $scope.data.selectedIndex2 = Math.max($scope.data.selectedIndex2 - 1, 0);
    };
  };
  
MyApp.controller('ListCtrl', function($scope, $mdDialog) {	
  $scope.nameGroup = [];
  var active = localStorage.getItem('activeGroup');
  var retrievedObject = localStorage.getItem('timeTable' + active);
  schedule = JSON.parse(retrievedObject);
  if (schedule === null) {
	  window.location = "add.html"
  };
	$scope.firsttimes = schedule.firsttimes.classes;
	$scope.secondtimes = schedule.secondtimes.classes;
	$scope.nameGroup.push(active); 
	$scope.showsingleclass = function(data, event) {
	    var className = event.target.className;
		var temp;
		if (className.indexOf("single") != -1) {
			temp = 'singleclass.tmpl.html';
			$mdDialog.show({
        templateUrl: temp,
		locals: {
                    selectedItem: data
                },
		controller: ['$scope', 'selectedItem', function($scope, selectedItem) { 
			$scope.selectedItem = data;
			console.log($scope.selectedItem);
			$scope.cancel = function() {
			$mdDialog.hide();
			};

		}],		
        parent: angular.element(document.body),
        clickOutsideToClose:true
      });      
		} else if (className.indexOf("one") != -1) {
			temp = 'classone.tmpl.html';
			$mdDialog.show({
        templateUrl: temp,
		locals: {
                    selectedItem: data
                },
		controller: ['$scope', 'selectedItem', function($scope, selectedItem) { 
			$scope.selectedItem = data;
			console.log($scope.selectedItem);
			$scope.cancel = function() {
			$mdDialog.hide();
			};
		}],		
        parent: angular.element(document.body),
        clickOutsideToClose:true
      });      
		} else if (className.indexOf("two") != -1) {
			temp = 'classtwo.tmpl.html';
			$mdDialog.show({
        templateUrl: temp,
		locals: {
                    selectedItem: data
                },
		controller: ['$scope', 'selectedItem', function($scope, selectedItem) { 
			$scope.selectedItem = data;
			console.log($scope.selectedItem);
			$scope.cancel = function() {
			$mdDialog.hide();
			};

		}],		
        parent: angular.element(document.body),
        clickOutsideToClose:true
      });      
		};
    } ;
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