$(document).ready(function(){
	$('#footer').load("footer.html")
});


       function showPage(pageName) {
            $("#"+pageName).addClass('active');
            $("#"+pageName+" .container").load(pageName+'.html');
        }

        function hidePage(pageName){
            $('#'+pageName).removeClass('active');
        }

