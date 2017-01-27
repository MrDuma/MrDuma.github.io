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
	this.announceLink = function(page) {
		window.location = page + '.html';
    };
});