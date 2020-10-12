/*
	Custom checkbox and radio button - Jun 18, 2013
	(c) 2013 @ElmahdiMahmoud 
	license: http://www.opensource.org/licenses/mit-license.php
*/   
$('input[name="radio-btn"]').wrap('<div class="radio-btn"><i></i></div>');
$(".radio-btn").on('click', function () {
    var _this = $(this),
        block = _this.parent().parent();
    block.find('input:radio').attr('checked', false);
    block.find(".radio-btn").removeClass('checkedRadio');
    _this.addClass('checkedRadio');
    _this.find('input:radio').attr('checked', true);
});
$('input[name="check-box"]').wrap('<div class="check-box"><i></i></div>');
$.fn.toggleCheckbox = function () {
    this.attr('checked', !this.attr('checked'));
}
$(document).on('click','.check-box', function () {
	$('.check-box').removeClass('checkedBox');
	$('input[name="check-box"]').removeAttr('checked');
    $(this).find(':checkbox').toggleCheckbox();
    $(this).toggleClass('checkedBox');
});


$(document).ready(function(){  
 //    var name=$('div').eq(0).attr('check-box');
	// console.log(name)
	$('.check-box:first').addClass('checkedBox');
	$('.check-box:first').find('input[name="check-box"]').attr('checked','true');
}); 