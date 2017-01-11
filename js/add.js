MyApp.controller('ToolbarCtrl', function($scope) {

});
MyApp.controller('AddCtrl', function($scope, $http, myutils, $mdDialog) {
	var groups = new Object();
	var data;
	var listOfGroup = new Object();
	$scope.listG = listOfGroup;
	var timeTable = new Object();
	timeTable.firstWeek = new Object();
	timeTable.secondWeek = new Object();
	var nameWeekDay = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	var nameClassDay = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
	$scope.submit = function() {
		var networkState = navigator.network.connection.type;
		if (networkState === Connection.NONE false) {
			$mdDialog.show(
				   $mdDialog.alert()
				  .title('Нет соединения с интернетом')
				  .textContent('Для работы приложения трубуется связь с интернетом.\nУбедитесь, что гаджет онлайн и попробуйте снова')
				  .ok('Ок')
			);
		} else {
        myutils.showWait();
		var nameTable = $scope.type;
		var name = $scope.clientName;
		console.log(nameTable);
		console.log(name);
		var tableGroup;
		if (nameTable === 'bakalavriat') {
			tableGroup = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fportal.esstu.ru%2Fbakalavriat%2Fraspisan.htm%22and%20xpath%3D%22%2F%2Ftable%2Ftbody%2Ftr%22&format=json&diagnostics=true&callback=JSON_CALLBACK';
		} else if (nameTable === 'spezialitet') {
			tableGroup = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fportal.esstu.ru%2Fspezialitet%2Fraspisan.htm%22and%20xpath%3D%22%2F%2Ftable%2Ftbody%2Ftr%22&format=json&diagnostics=true&callback==JSON_CALLBACK';
		} else {
			myutils.hideWait();
			$mdDialog.show(
				   $mdDialog.alert()
				  .title('Ой-ей!')
				  .textContent('Выберите направление')
				  .ok('Ок')
			);
		}
		console.log(tableGroup);
		$http.jsonp(tableGroup).success(function(json) {
			data = json;
			if (data.query.results === null) {
				myutils.hideWait();
				$mdDialog.show(
				   $mdDialog.alert()
				  .title('Упс!')
				  .textContent('Ошибка. Попробуйте позже.')
				  .ok('Ок')
			);
			}
			var groupCheck = true;
			var tableRow = data.query.results.tr;
			tableRow.forEach(
				function(itemRow, i, tableRow) {
					var tableCell = itemRow.td;
					var n = 1;
					tableCell.forEach(
						function(itemCell, j, tableCell) {
							if ('a' in itemCell.p) {
								if ('content' in itemCell.p.a.font) {
									if (itemCell.p.a.font.content.indexOf(name) != -1) {
										var li = listOfGroup[i] = new Object();
										li['i'] = i;
										li['j'] = j;
										li['name'] = itemCell.p.a.font.content;
										li['link'] = itemCell.p.a.href;
										li['table'] = nameTable;
										n = n++;
										groupCheck = false;
									}
								}
							}
						}
					);
				}
			);
			if (groupCheck) {
				myutils.hideWait();
				$mdDialog.show(
				   $mdDialog.alert()
				  .title('Упс!')
				  .textContent('Группа не найдена.')
				  .ok('Ок')
			);
			} else {
				console.log(listOfGroup);
				localStorage.setItem('listOfGroup', JSON.stringify(listOfGroup));
				myutils.hideWait();
				window.location = "result.html";
			}
		});
	};
};
});


MyApp.controller('ListCtrl', function($scope, $http, myutils) {
	var groups = new Object();
	var data;
	var timeTable = new Object();
	timeTable.firstWeek = new Object();
	timeTable.secondWeek = new Object();
	var nameWeekDay = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	var nameClassDay = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
	 var timeKey = new Object;
	  timeKey["first"] = "08:00";
	  timeKey["second"] = "09:45";
	  timeKey["third"] = "12:00";
	  timeKey["fourth"] = "13:45";
	  timeKey["fifth"] = "15:25";
	  timeKey["sixth"] = "17:05";
	  timeKey["firstC"] = "09:35";
	  timeKey["secondC"] = "11:20";
	  timeKey["thirdC"] = "13:35";
	  timeKey["fourthC"] = "15:20";
	  timeKey["fifthC"] = "17:00";
	  timeKey["sixthC"] = "18:40";
	var List = localStorage.getItem('listOfGroup');
	$scope.lg = JSON.parse(List);
	console.log($scope.lg);
	$scope.openTable = function(id, nameOfGroupFunc) {
		var networkState = navigator.network.connection.type;
		if (networkState === Connection.NONE) {
			$mdDialog.show(
				   $mdDialog.alert()
				  .title('Нет соединения с интернетом')
				  .textContent('Для работы приложения трубуется связь с интернетом.\nУбедитесь, что гаджет онлайн и попробуйте снова')
				  .ok('Ок')
			);
		} else {
        myutils.showWait();
		var idlist = id;
		console.log(idlist);
		var i = idlist['i'];
		var j = idlist['j'];
		var retrievedObject = localStorage.getItem('groups');
		var colGroups = localStorage.getItem('colGroups');
		if (retrievedObject !== null) {
			groups = JSON.parse(retrievedObject);
		}
		if (colGroups === null) {
			colGroups = 1;
		}
		var is = false;
		var keyIs;
		var nameGroup = nameOfGroupFunc;
		for (var key in groups) {
			if (nameGroup == groups[key].nameOfGroup) {
				is = true;
				keyIs = key;
			}
		}
		var itemGroup;
		if (is) {
			itemGroup = groups[keyIs] = new Object();
		} else {
			itemGroup = groups['group' + colGroups] = new Object();
		}
		localStorage.setItem('colGroups', ++colGroups);
		var date = new Date();
			var options = {
			  year: 'numeric',
			  month: 'numeric',
			  day: 'numeric',
			};
		itemGroup.update = date.toLocaleString("ru", options);
		itemGroup.nameOfGroup = nameOfGroupFunc;
		itemGroup.linkOfGroup = idlist['link'];
		itemGroup.tableName = idlist['table'];
		itemGroup.tabRow = i;
		itemGroup.tabCell = j;
		localStorage.setItem('groups', JSON.stringify(groups));
		var urlOfGroup = 'http://portal.esstu.ru/' + itemGroup.tableName + '/' + itemGroup.linkOfGroup;
		parseFeed(urlOfGroup, itemGroup.nameOfGroup);
		function parseFeed(url, nameOfGroup) {
			var query = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + url + '" and xpath="//table/tbody/tr"') + '&format=json&diagnostics=true&callback=JSON_CALLBACK';
			$http.jsonp(query).success(function(json) {
				data = json;
				var itemDay = data.query.results.tr;
				if (data.query.results === null) {
					myutils.hideWait();
					alert('Ошибка! Попробуйте позже!');
				}
				itemDay.forEach(
					function(item, i, itemDay) {
						var itemWeekDay;
						if (i >= 2 & i <= 7) {
							itemWeekDay = timeTable.firstWeek[nameWeekDay[i - 2]] = new Object();
						} else if (i >= 8 & i <= 13) {
							itemWeekDay = timeTable.secondWeek[nameWeekDay[i - 8]] = new Object();
						}
						if (i >= 2 & i <= 13) {
							for (var j = 1; j <= 6; j++) {
								var itemPara = item.td[j].p.font.content;
								var itemClassDay = itemWeekDay[nameClassDay[j - 1]] = new Object();
								var classroom = new Object();
								var numsymroom = itemPara.indexOf('а.');
								classroom['one'] = itemPara.substring(numsymroom, itemPara.indexOf(' ', numsymroom));
								if (itemPara.indexOf('а.', numsymroom + 1) != -1) {
									if (classroom['one'] != itemPara.substring(itemPara.lastIndexOf('а.'), itemPara.length))
										classroom['two'] = itemPara.substring(itemPara.lastIndexOf('а.'), itemPara.length);
								}
								var temp = itemPara.split(' ');
								var resulttemp = [];
								temp.forEach(
									function(item, i, temp) {
										if (temp[i] === temp[i].toUpperCase() & isNaN(temp[i])) {
											resulttemp.push(temp[i]);
										}
									}
								);
								var indexdot1;
								var indexdot2;
								var teacher = new Object();
								for (var index = 0; index < resulttemp.length; index++) {
									if (resulttemp[index].split('.').length - 1 == 2) {
										indexdot1 = index;
										teacher['one'] = resulttemp[indexdot1 - 1] + ' ' + resulttemp[indexdot1];
										break;
									}
								}
								for (var index = indexdot1 + 1; index < resulttemp.length; index++) {
									if (resulttemp[index].split('.').length - 1 == 2) {
										indexdot2 = index;
										teacher['two'] = resulttemp[indexdot2 - 1] + ' ' + resulttemp[indexdot2];
									}
								}
								while (itemPara.substring(0, 1) == ' ') {
									itemPara = itemPara.substring(1, itemPara.length);
								}
								if (itemPara.substring(0, 4) == 'лек.') {
									itemPara = itemPara.substring(4, itemPara.length);
									var name = new Object();
									name['one'] = itemPara.substring(0, itemPara.indexOf(teacher['one']));
									if (teacher['two'] !== undefined) {
										if (itemPara.substring(itemPara.indexOf(classroom['one']) + classroom['one'].length, itemPara.indexOf(teacher['two'])).indexOf('	 ') == -1) {
											name['two'] = itemPara.substring(itemPara.indexOf(classroom['one']) + classroom['one'].length, itemPara.indexOf(teacher['two']));
										}
									}
									addClass(itemClassDay, "Лекция", "lecture", classroom, teacher, name);
								} else if (itemPara.substring(0, 4) == 'лаб.') {
									itemPara = itemPara.substring(4, itemPara.length);
									var name = new Object();
									name['one'] = itemPara.substring(0, itemPara.indexOf(teacher['one']));
									if (teacher['two'] != undefined) {
										if (itemPara.substring(itemPara.indexOf(classroom['one']) + classroom['one'].length, itemPara.indexOf(teacher['two'])).indexOf('	 ') == -1) {
											name['two'] = itemPara.substring(itemPara.indexOf(classroom['one']) + classroom['one'].length, itemPara.indexOf(teacher['two']));
										}
									}
									addClass(itemClassDay, 'Лабораторная работа', "laboratory", classroom, teacher, name);
								} else if (itemPara.substring(0, 3) == 'пр.') {
									itemPara = itemPara.substring(3, itemPara.length);
									var name = new Object;
									name['one'] = itemPara.substring(0, itemPara.indexOf(teacher['one']));
									if (teacher['two'] != undefined) {
										if (itemPara.substring(itemPara.indexOf(classroom['one']) + classroom['one'].length, itemPara.indexOf(teacher['two'])).indexOf('	 ') == -1) {
											name['two'] = itemPara.substring(itemPara.indexOf(classroom['one']) + classroom['one'].length, itemPara.indexOf(teacher['two']));
										}
									}
									addClass(itemClassDay, 'Практика', "practice", classroom, teacher, name);
								} else if (itemPara.indexOf('ФИЗКУЛЬТУРА') != -1) {
									itemPara = itemPara.substring(0, itemPara.indexOf('а.'));
									var name = new Object;
									name['one'] = 'Физкультура';
									var teacherPE = new Object;
									teacherPE['one'] = 'ФКС';
									addClass(itemClassDay, 'ФК', "physical-edu", classroom, teacherPE, name);
								};
							}
						}
					}
				);
				var firsttimes = new Object();
				var secondtimes = new Object();
				  var schedule = timeTable;
				  var week = schedule.firstWeek;
				  for (var key in week) {
					var weekDay = week[key];
					var ADay = firsttimes[key] = new Object;
					var howManyClassesCanceled = 0;
					for (var num in weekDay) {
					  var dialog = new Object;
					  var item = weekDay[num]; 
					  var ANum = ADay[num] = new Object();
					  var nameLength = 0;
					  for (var key in item.name) {
						nameLength = nameLength + 1;
					  }
					  var lessonInDay = '';
					 
					  if ((item.name != undefined) && (nameLength <= 1)) {
						dialog = item;
						dialog.timeK = timeKey[num]+ ' - ' +timeKey[num + 'C'];
						lessonInDay = '<div class="md-avatar single">' + timeKey[num]+ ' ' + '<span class="mintime single">'+timeKey[num + 'C']+'</span>' + '</div>' +
						  '<div class="md-list-item-text single">' +
						  '<h4 class = "' + item.classcss + ' typeclass single">' + item.clas + '</h4>' +
						  '<h3 class = "name-class single">' + item.name["one"] + '</h3>' +
						'<p class = "single">' + item.teacher + '</p>' +
						'<p class = "single"> а.' + item.classroom + '</p>' +
						  '</div> <md-divider md-inset=""></md-divider>';

					  } else if ((item.name != undefined) && (nameLength >= 2)) {
						 dialog = item;
						 dialog.timeK = timeKey[num]+ ' - ' +timeKey[num + 'C'];
						lessonInDay = '<div class="md-avatar">' + timeKey[num] + ' ' + '<span class="mintime">'+timeKey[num + 'C']+'</span>' + '</div>' +
						  '<div class="md-list-item-text">' +
						   '<h4 class = "' + item.classcss + ' typeclass">' + item.clas + '</h4>' +
						  '<div class = "one"> <h3 class = "name-class one" style = "margin: 5px 0;">' + item.name["one"] + '</h3>' +
						'<p class = "first-teacher two"> а.' + item.classroom["one"] + ' ' + item.teacher["one"] + '</p></div>' +
						  '<div class = "two"><h3 class = "name-class two" style = "margin: 5px 0;">' + item.name["two"] + '</h3>'+
						'<p class = "two"> а.' + item.classroom["two"] + ' ' + item.teacher["two"] + '</p></div>' +
						  '</div> <md-divider md-inset=""></md-divider>';
					  } else {
						howManyClassesCanceled++;
					  }
					   if (lessonInDay != '') {
							ANum.lesDay = lessonInDay ;
							ANum.lesDi = dialog ;
						}
					
					}
					if (howManyClassesCanceled == 6) {
					 var freeDay =  '<p class = "free">Занятий нет</p>';
					 ADay["off"] = freeDay;
					}
				  }
				  var week = schedule.secondWeek;
				  for (var key in week) {
					var weekDay = week[key]; 
					var ADay = secondtimes[key] = new Object;
					var howManyClassesCanceled = 0;
					for (var num in weekDay) {
					  var item = weekDay[num];
					  var ANum = ADay[num] = new Object();
					  var nameLength = 0;
					  for (var key in item.name) {
						nameLength = nameLength + 1;
					  }
					  var lessonInDay = '';
					  
					  if ((item.name != undefined) && (nameLength <= 1)) {
						dialog = item;
						dialog.timeK = timeKey[num]+ ' - ' +timeKey[num + 'C'];
						lessonInDay = '<div class="md-avatar single">' + timeKey[num]+ ' ' + '<span class="mintime single">'+timeKey[num + 'C']+'</span>' + '</div>' +
						  '<div class="md-list-item-text single" ng-click = "showsingleclass(item[1].dialog)">' +
						  '<h4 class = "' + item.classcss + ' typeclass single">' + item.clas + '</h4>' +
						  '<h3 class = "name-class single">' + item.name["one"] + '</h3>' +
						'<p class = "single">' + item.teacher + '</p>' +
						'<p class = "single"> а.' + item.classroom + '</p>' +
						  '</div> <md-divider md-inset=""></md-divider>';

					  } else if ((item.name != undefined) && (nameLength >= 2)) {
						dialog = item;
						dialog.timeK = timeKey[num]+ ' - ' +timeKey[num + 'C'];
						 lessonInDay = '<div class="md-avatar">' + timeKey[num] + ' ' + '<span class="mintime">'+timeKey[num + 'C']+'</span>' + '</div>' +
						  '<div class="md-list-item-text">' +
						   '<h4 class = "' + item.classcss + ' typeclass">' + item.clas + '</h4>' +
						  '<div class = "one"> <h3 class = "name-class one" style = "margin: 5px 0;">' + item.name["one"] + '</h3>' +
						'<p class = "first-teacher two"> а.' + item.classroom["one"] + ' ' + item.teacher["one"] + '</p></div>' +
						  '<div class = "two"><h3 class = "name-class two" style = "margin: 5px 0;">' + item.name["two"] + '</h3>'+
						'<p class = "two"> а.' + item.classroom["two"] + ' ' + item.teacher["two"] + '</p></div>' +
						  '</div> <md-divider md-inset=""></md-divider>';
					  } else {
						howManyClassesCanceled++;
					  }
					  if (lessonInDay != '') {
							ANum.lesDay = lessonInDay ;
							ANum.lesDi = dialog ;
						}
					  
					}
					if (howManyClassesCanceled == 6) {
					  var freeDay =  '<p class = "free">Занятий нет</p>';
					 ADay["off"] = freeDay;
					}
				  }
			    timeTable.firsttimes = new Object(); 
				timeTable.firsttimes.classes = firsttimes;
				timeTable.secondtimes = new Object();
				timeTable.secondtimes.classes = secondtimes;
				delete timeTable.firstWeek;
				delete timeTable.secondWeek
				localStorage.setItem('timeTable' + nameOfGroup, JSON.stringify(timeTable));
				localStorage.setItem('activeGroup', nameOfGroup);
				myutils.hideWait();
				localStorage.removeItem('listOfGroup');
				window.location = "tt.html";

			});
		};
		function addClass(itemClassDay, nameClass, nameClassCss, classroom, teacher, name) {
			itemClassDay.clas = nameClass;
			itemClassDay.classcss = nameClassCss;
			var teacherLength = 0;
			var nameLength = 0;
			var classroomLength = 0;
			for (var key in teacher) {
				teacherLength = teacherLength + 1;
				if (teacher[key] != 'ФКС') {
					var arr = teacher[key].split(' ');
					var last_name = arr[0].toLowerCase();
					last_name = last_name[0].toUpperCase() + last_name.substring(1, last_name.length);
					teacher[key] = last_name + ' ' + arr[1];
				}
			}
			for (var key in classroom) {
				classroomLength = classroomLength + 1;
				classroom[key] = classroom[key].substring(2, classroom[key].length);
			}
			for (var key in name) {
				nameLength = nameLength + 1;
				while (name[key].substring(0, 1) == ' ') {
					name[key] = name[key].substring(1, name[key].length);
				}
				while (name[key].substring(name[key].length - 1, name[key].length) == ' ') {
					name[key] = name[key].substring(0, name[key].length - 1);
				}
				if(name[key] == "") {
					delete name[key];
					nameLength = nameLength - 1;
				} else if((name[key].indexOf("н/х") != -1) && (key == "two")) {
					delete name[key];
					classroom["one"] = classroom["one"] + " н/х";
					nameLength = nameLength - 1;
				} else if((name[key].indexOf("и/д") != -1) && (key == "two")) {
					delete name[key];
					classroom["one"] = classroom["one"] + " и/д";
					nameLength = nameLength - 1;
				}
			}
			if (teacherLength == 2) {
				if (nameLength == 2) {
					itemClassDay.classroom = classroom;
					itemClassDay.teacher = teacher;
					itemClassDay.name = name;
				} else if (classroomLength == 2) {
					itemClassDay.classroom = classroom['one'] + ', '  + classroom['two'];
					itemClassDay.teacher = teacher['one'] + ', ' + teacher['two'];
					itemClassDay.name = name;
				} else {
					itemClassDay.classroom = classroom['one'];
					itemClassDay.teacher = teacher['one'] + ', ' + teacher['two'];
					itemClassDay.name = name;
				}
			} else {
				itemClassDay.classroom = classroom['one'];
				itemClassDay.teacher = teacher['one'];
				itemClassDay.name = name;
			}
		}
	};
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