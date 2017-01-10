var MyApp = angular.module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngSanitize','swipe']);
MyApp.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('pink')
		.accentPalette('orange');
});
MyApp.controller('PositionDemoCtrl', function DemoCtrl($mdDialog) {
    var originatorEv;
    this.menuHref = "http://www.google.com/design/spec/components/menus.html#menus-specs";
    this.openMenu = function($mdMenu, ev) {
		originatorEv = ev;
		$mdMenu.open(ev);
    };
    this.announceClick = function(index, itemName) {
		if (itemName == 'Расписание') {
			if (window.location.pathname.indexOf('tt.html') == -1)
				window.location = 'tt.html';	
		} else if (itemName == 'Настройки групп') {
			if (window.location.pathname.indexOf('settings.html') == -1)
				window.location = 'settings.html';	
		} else if (itemName == 'О приложении') {
			if (window.location.pathname.indexOf('about.html') == -1)
				window.location = 'about.html';	
		} else if (itemName == 'Обратная связь') {
			if (window.location.pathname.indexOf('feedback.html') == -1)
				window.location = 'feedback.html';	
		}
    };
});