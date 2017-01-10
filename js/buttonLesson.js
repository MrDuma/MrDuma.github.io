$(".classes").swipe({
	tap:function(event, target) {
		if($(target).hasClass('card')) {
			bla($(target));
		} else if($(target).parent().hasClass('card')) {
			bla($(target).parent());
		} else if($(target).parent().parent().hasClass('card')) {
			bla($(target).parent().parent());
		}
	}
});
function bla(elem) {
	var employment = new Object;
	employment.title = elem.find('.card__title').text();
	employment.teacher = elem.find('.card__subtitle span').text();
	employment.classroom = elem.find('.card__subtitle p').text();
	employment.begin = elem.find('.timeblock .begin').text();
	employment.end = elem.find('.timeblock .end').text();
	employment.clas = 'physical-edu';
	employment.className = 'Физкультура';
	if(elem.find('.time').hasClass('lecture')) {
		employment.clas = 'lecture';
		employment.className = 'Лекция';
	} else if(elem.find('.time').hasClass('laboratory')) {
		employment.clas = 'laboratory';
		employment.className = 'Лабораторная работа';
	} else if(elem.find('.time').hasClass('practice')) {
		employment.clas = 'practice';
		employment.className = 'Практика';
	}
	var backData = new Object;
	backData.back = elem.parent().parent().index();
	backData.table = 1;
	if(elem.parent().parent().parent().parent().hasClass('table2')) {
		backData.table = 2;
	}
	localStorage.setItem('employment', JSON.stringify(employment));
	localStorage.setItem('backData', JSON.stringify(backData));
	window.location = "employment.html";
}