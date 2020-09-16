$(function () {
    var lang = sessionStorage.getItem('lang');
    if(!lang) lang = "zh";

    $("#languages>li").on("click",function () {
        var langs = $(this).attr("attr");
        sessionStorage.setItem('lang',langs);
        location.reload();
    });

    // if(lang == 'zh'){
    //     $("#lang_text").text('中文');
    // }else if(lang == 'en'){
    //     $("#lang_text").text('English');
    // }

    loadProperties('main', '/i18n/',lang);
});
function loadProperties(name, path, lang){
    console.log("a", name, path, lang);
    var lang = lang || navigator.language;

    jQuery.i18n.properties({
        name:name,
        path:path,
        mode:'map',
        language: lang,
        callback: function() {
            $("[data-lang]").each(function() {
                var elem = $(this),
                    localizedValue = jQuery.i18n.map[elem.data("lang")];
                if (elem.is("input[type=text]") || elem.is("input[type=password]") || elem.is("input[type=email]") || elem.is("input[type=number]")) {
                    elem.attr("placeholder", localizedValue);
                } else if (elem.is("input[type=button]") || elem.is("input[type=submit]")) {
                    elem.attr("value", localizedValue);
                } else {
                    elem.text(localizedValue);
                }
            });
        }
    });
};
