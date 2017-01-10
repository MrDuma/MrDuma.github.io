$(document).ready(function() {
	var employment = localStorage.getItem('employment');
	employment = JSON.parse(employment);
	$('.name-edu').text(employment.title);
	$('.teacher-edu div').text(employment.teacher);
	$('.aud-edu div').text(employment.classroom);
	$('.time-edu').text(employment.begin + ' - ' + employment.end);
	$('.header-edu').addClass(employment.clas);
	$('.class-edu').text(employment.className);
	$("#back-button").click(function() {
		localStorage.removeItem('employment');
	});
});