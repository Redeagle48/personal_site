var _settings={useFullScreen:!0,useSectionTransitions:!0,fadeInSpeed:1e3,skel:{prefix:"css/style",resetCSS:!0,useOrientation:!0,boxModel:"border",breakpoints:{max:{range:"*",containers:1440,hasStyleSheet:!1},wide:{range:"-1920",containers:1360},normal:{range:"-1680",containers:1200},narrow:{range:"-1280",containers:960},narrower:{range:"-1000",containers:"95%",lockViewport:!0},mobile:{range:"-640",containers:"95%",grid:{gutters:20},lockViewport:!0},"mobile-narrow":{range:"-480",containers:"95%",grid:{collapse:!0,gutters:10},lockViewport:!0,hasStyleSheet:!1}}},poptrox:{baseZIndex:10001,useBodyOverflow:!1,usePopupEasyClose:!1,overlayColor:"#1f2328",overlayOpacity:.65,usePopupDefaultStyling:!1,usePopupCaption:!0,popupLoaderText:"",windowMargin:50,usePopupNav:!0}};jQuery.fn.formerize=function(){var e=new Array,t=jQuery(this);return t.find("input[type=text],textarea").each(function(){var e=jQuery(this);(""==e.val()||e.val()==e.attr("placeholder"))&&(e.addClass("formerize-placeholder"),e.val(e.attr("placeholder")))}).blur(function(){var e=jQuery(this);e.attr("name").match(/_fakeformerizefield$/)||""==e.val()&&(e.addClass("formerize-placeholder"),e.val(e.attr("placeholder")))}).focus(function(){var e=jQuery(this);e.attr("name").match(/_fakeformerizefield$/)||e.val()==e.attr("placeholder")&&(e.removeClass("formerize-placeholder"),e.val(""))}),t.find("input[type=password]").each(function(){var e=jQuery(this),t=jQuery(jQuery("<div>").append(e.clone()).remove().html().replace(/type="password"/i,'type="text"').replace(/type=password/i,"type=text"));""!=e.attr("id")&&t.attr("id",e.attr("id")+"_fakeformerizefield"),""!=e.attr("name")&&t.attr("name",e.attr("name")+"_fakeformerizefield"),t.addClass("formerize-placeholder").val(t.attr("placeholder")).insertAfter(e),""==e.val()?e.hide():t.hide(),e.blur(function(e){e.preventDefault();var t=jQuery(this),a=t.parent().find("input[name="+t.attr("name")+"_fakeformerizefield]");""==t.val()&&(t.hide(),a.show())}),t.focus(function(e){e.preventDefault();var t=jQuery(this),a=t.parent().find("input[name="+t.attr("name").replace("_fakeformerizefield","")+"]");t.hide(),a.show().focus()}),t.keypress(function(e){e.preventDefault(),t.val("")})}),t.submit(function(){jQuery(this).find("input[type=text],input[type=password],textarea").each(function(e){var t=jQuery(this);t.attr("name").match(/_fakeformerizefield$/)&&t.attr("name",""),t.val()==t.attr("placeholder")&&(t.removeClass("formerize-placeholder"),t.val(""))})}).bind("reset",function(t){t.preventDefault(),jQuery(this).find("select").val(jQuery("option:first").val()),jQuery(this).find("input,textarea").each(function(){var e,t=jQuery(this);switch(t.removeClass("formerize-placeholder"),this.type){case"submit":case"reset":break;case"password":t.val(t.attr("defaultValue")),e=t.parent().find("input[name="+t.attr("name")+"_fakeformerizefield]"),""==t.val()?(t.hide(),e.show()):(t.show(),e.hide());break;case"checkbox":case"radio":t.attr("checked",t.attr("defaultValue"));break;case"text":case"textarea":t.val(t.attr("defaultValue")),""==t.val()&&(t.addClass("formerize-placeholder"),t.val(t.attr("placeholder")));break;default:t.val(t.attr("defaultValue"))}}),window.setTimeout(function(){for(x in e)e[x].trigger("formerize_sync")},10)}),t},jQuery.fn.scrolly=function(e,t){e||(e=1e3),t||(t=0),jQuery(this).off("click.scrolly").on("click.scrolly",function(a){var r,n=jQuery(this),i=n.attr("href");"#"==i.charAt(0)&&1<i.length&&0<(r=jQuery(i)).length&&(i=r.offset().top,n.hasClass("scrolly-centered")?n=i-($(window).height()-r.outerHeight())/2:(n=Math.max(i,0),t&&(n="function"==typeof t?n-t():n-t)),a.preventDefault(),jQuery("body,html").stop().animate({scrollTop:n},e,"swing"))})},function(){var e=$(window),t=$(document),a=1e3;jQuery.fn.scrollwatch=function(e){if(1<this.length){for(var t=0;t<this.length;t++)$(this[t]).scrollwatch(e);return this}var a,r=jQuery.extend({range:.5,anchor:"top",init:null,on:null,off:null,delay:0},e),n=$(this);return r.init&&r.init(n),n.data("scrollwatch-state",0).scrollgress(function(e){window.clearTimeout(a),a=window.setTimeout(function(){0==n.data("scrollwatch-state")?e>=-1*r.range&&e<=r.range&&(n.data("scrollwatch-state",1),r.on)&&r.on(n):(e<-1*r.range||e>=r.range)&&(n.data("scrollwatch-state",0),r.off&&r.off(n))},r.delay)},{anchor:r.anchor},"scrollwatch"),n},jQuery.fn.unscrollwatch=function(){if(1<this.length){for(var e=0;e<this.length;e++)$(this[e]).unscrollwatch();return this}return e=$(this),e.removeData("scrollwatch-state",0).unscrollgress("scrollwatch"),e},jQuery.fn.scrollgress=function(r,n,i){if(1<this.length){for(var o=0;o<this.length;o++)$(this[o]).scrollgress(r,n,i);return this}i||(i="scrollgress");var s=jQuery.extend({anchor:"top",direction:"both",scope:"element",easing:0},n),l=$(this);return l.data(i+"-id")||l.data(i+"-id",a++),n=l.data(i+"-id"),i="scroll."+i+"-"+n,e.off(i).on(i,function(){var a=l.offset().top,n=l.outerHeight();switch(t.height(),s.scope){default:case"element":switch(s.anchor){default:case"top":a=-1*((a-e.scrollTop())/n);break;case"center":a=-1*((a-e.scrollTop()-(e.height()-n)/2)/n);break;case"bottom":a=-1*((a-e.scrollTop()-(e.height()-n))/n)}break;case"window":switch(s.anchor){default:case"top":a=-1*((a-e.scrollTop())/e.height());break;case"center":a=-1*((a-e.scrollTop()-(e.height()-n)/2)/e.height());break;case"bottom":a=-1*((a-e.scrollTop()-(e.height()-n))/e.height())}}"forwards"==s.direction?a=Math.max(0,a):"backwards"==s.direction&&(a=Math.min(0,a)),a>0?a=Math.max(0,a-s.easing/100):0>a&&(a=Math.min(0,a+s.easing/100)),r(a,l)}).trigger("scroll"),l},jQuery.fn.unscrollgress=function(t){if(1<this.length){for(var a=0;a<this.length;a++)$(this[a]).unscrollgress(t);return this}t||(t="scrollgress");var r,a=$(this);return a.data(t+"-id")?(r=a.data(t+"-id"),e.off("scroll."+t+"-"+r),a.removeData(t+"-id"),a):a}}(),skel.init(_settings.skel),jQuery(function(){var e=$(window),t=$("body"),a=$("#header"),r=t.add(a),n=!1;r.addClass("loading").fadeTo(0,1e-4),e.load(function(){window.setTimeout(function(){r.fadeTo(_settings.fadeInSpeed,1,function(){t.removeClass("loading"),r.fadeTo(0,1)})},_settings.fadeInSpeed)}),skel.vars.IEVersion<=9&&(_settings.useSectionTransitions=!1),skel.vars.isTouch&&(_settings.useSectionTransitions=!1,t.addClass("touch")),skel.isActive("mobile")&&(_settings.poptrox.windowMargin=5),skel.vars.IEVersion<10&&$("form").formerize(),$(".gallery").poptrox(_settings.poptrox),skel.onStateChange(function(){skel.isActive("mobile")?t.addClass("touch"):skel.vars.isTouch||t.removeClass("touch"),_settings.useSectionTransitions&&(skel.isActive("mobile")?(n=!1,$(".main.style1").unscrollwatch().removeClass("inactive"),$(".main.style2").unscrollwatch().removeClass("inactive"),$("#work").unscrollwatch().find(".row.images").removeClass("inactive"),$("#contact").unscrollwatch().removeClass("inactive")):n||(n=!0,$(".main.style1").scrollwatch({delay:50,range:.25,anchor:"center",init:function(e){e.addClass("inactive")},on:function(e){e.removeClass("inactive")},off:function(e){e.addClass("inactive")}}),$(".main.style2").scrollwatch({delay:50,range:.5,anchor:"center",init:function(e){e.addClass("inactive")},on:function(e){e.removeClass("inactive")},off:function(e){e.addClass("inactive")}}),$("#work").scrollwatch({delay:25,range:.6,anchor:"center",init:function(e){e.find(".row.images").addClass("inactive")},on:function(e){var t=e.find(".row.images"),a=t.length,r=0;t.each(function(){var e=$(this);window.setTimeout(function(){e.removeClass("inactive")},100*(a-r++))})},off:function(e){var t=e.find(".row.images"),a=t.length,r=0;t.each(function(){var e=$(this);window.setTimeout(function(){e.addClass("inactive")},100*(a-r++))})}}),$("#contact").scrollwatch({delay:25,range:.5,anchor:"center",init:function(e){e.addClass("inactive")},on:function(e){e.removeClass("inactive")},off:function(e){e.addClass("inactive")}}),window.setTimeout(function(){e.trigger("resize").trigger("scroll")},0)))}),e.resize(function(){t.addClass("loading"),window.setTimeout(function(){$("a[href^=#]").scrolly(1500,a.outerHeight()-1),_settings.useFullScreen&&!skel.isActive("mobile")?$(".fullscreen").each(function(){var t=$(this),r=t.children(".content"),n=Math.max(100,Math.round((e.height()-r.outerHeight()-a.outerHeight())/2)+1);t.css("padding-top",n).css("padding-bottom",n)}):$(".fullscreen").css("padding-top","").css("padding-bottom",""),window.setTimeout(function(){t.removeClass("loading"),e.trigger("scroll")},1e3)},100)}),e.load(function(){e.trigger("resize").trigger("scroll")})});