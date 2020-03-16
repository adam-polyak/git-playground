document.addEventListener("DOMContentLoaded", function(event) {
	if (document.getElementsByClassName('SurveyContent')[0] == null || document.getElementsByClassName('SurveyContent')[0] == undefined){
		console.log(0);
		document.getElementsByClassName('sub')[0].style.marginLeft = '14.0625%';
		//document.getElementsByClassName('submit')[0].disabled = 'disabled';
		document.getElementsByClassName('submit')[0].type = 'button';
		document.getElementsByClassName('submit')[0].onclick = function(){
																			window.location.assign('https://www.wizzair.com');
																		};
		//document.getElementsByClassName('submit')[0].hidden = 'hidden';
		document.getElementsByClassName('submit')[0].value = 'WIZZAIR.COM';
		document.getElementsByClassName('consectetur-adipiscing')[0].hidden = 'hidden';
	}else{
		//var url = new URL(window.location.href);
		var over = getUrlVars()["over"];
		//var over = url.searchParams.get("over");
		var token = document.querySelectorAll('input[id$="token"]');
		SatisfactionSurveyController.updateCase(token[0].value, 0, over
				,function(result, event){
					if(event.status) {
						console.log(result);
					} else if(event.type === 'exception') {
						console.log('event.message: ' + event.message);
					} else {
						console.log('event.message: ' + event.message);
					}
		});
	}
});
/*
function GetURLParameter (sParam){
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++) {
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) {
			return sParameterName[1];
		}
	}
}​*/

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
/*document.addEventListener("DOMContentLoaded", function(event) { 
	SatisfactionSurveyController.doInit(caseId, function(result, event){
					finished = result;
					console.log(finished);
					if (finished == "false"){
						document.getElementsByClassName('SurveyContent')[0].style.display = 'block';
						document.getElementsByClassName('FEEDBACK')[0].style.display = 'none';
						document.getElementsByClassName('sub')[0].style.marginLeft = '';
					}else{
						document.getElementsByClassName('SurveyContent')[0].style.display = 'none';
						document.getElementsByClassName('FEEDBACK')[0].style.display = 'block';
						document.getElementsByClassName('sub')[0].style.marginLeft = '14.0625%';
					}

					if(event.status) {
						console.log(result);
					} else if(event.type === 'exception') {
						console.log('event.message: ' + event.message);
					} else {
						console.log('event.message: ' + event.message);
					}
	});

});*/

var WebToCase = {
	jt: null,
	remoteUpdateObj: function ( oEvent ) {
		if (oEvent.id == null || oEvent.id == '' || oEvent.id == undefined){
			var question = oEvent.htmlFor.split("_")[0].charAt(1);
			var answer = oEvent.htmlFor.split("_")[1].charAt(1);
		}else{
			var idSplitted = oEvent.id.split('_');
			if (idSplitted.length > 0){
				var question = idSplitted[0].charAt(1);
			}
			if (idSplitted.length == 2){
				var answer = oEvent.id.split("_")[1].charAt(1);
			}else if (idSplitted.length > 2) {
				var answer = oEvent.value;
			}
		}
		var token = document.querySelectorAll('input[id$="token"]');
		SatisfactionSurveyController.updateCase(token[0].value, question, answer
				,function(result, event){
					if(event.status) {
						console.log(result);
					} else if(event.type === 'exception') {
						console.log('event.message: ' + event.message);
					} else {
						console.log('event.message: ' + event.message);
					}
		});
	},
	scheduler: function( oEvent) {
		if(WebToCase.jt !== null) { window.clearTimeout(WebToCase.jt); }
		WebToCase.jt = window.setTimeout(WebToCase.remoteUpdateObj( oEvent), 500);
	}
};

function textAreaSetAnswer(oEvent){
	document.querySelectorAll('input[id$="q2Desc"]')[0].value = oEvent.value;
	WebToCase.scheduler(oEvent);
}

function radioSetAnswer(oEvent){
	for (var i = 0; i < oEvent.value; i++){
		$(oEvent).parent().find('input')[i].checked = true;
	}
	for (var i = parseInt(oEvent.value); i < 5; i++){
		$(oEvent).parent().find('input')[i].checked = false;
	}
	document.querySelectorAll('input[id$="' + oEvent.id.split("_")[0] + '"]')[0].value = oEvent.id.split("_")[1].charAt(1);
	WebToCase.scheduler( oEvent);
}

function showHideHiddenTextArea(oEvent){
	document.querySelectorAll('input[id$="' + oEvent.htmlFor.split("_")[0] + '"]')[0].value = oEvent.htmlFor.split("_")[1].charAt(1);
	if (oEvent.htmlFor == "q2_a1"){
		$('#q2_a2').prop('checked', false);
		$('.hidden-text-area').css('display','none');
		$('.answer[Name=answer2]').css('margin-bottom','8.04694%');
		WebToCase.scheduler( oEvent);
	}else{
		$('#q2_a1').prop('checked', false);
		$('.hidden-text-area').css('display','block');
		$('.answer[Name=answer2]').css('margin-bottom','5.70143%');
		WebToCase.scheduler( oEvent);
	}
	if (oEvent.htmlFor == "q2_a2" &&  $('#q2_a2').prop('checked')){
		$('#q2_a1').prop('checked', false);
		$('.hidden-text-area').css('display','none');
		$('.answer[Name=answer2]').css('margin-bottom','8.04694%');
	}
	
}

	


/*
var url = new URL(window.location.href);
var caseId = url.searchParams.get("token");
var finished = "undefined";
if (caseId != null && caseId.length < 10) {
	caseId = 'dnjkvNzAUcepd7xmvN8iqHTKVXIZiRN9sSvHhPfXBFAhnjVfOmyVuAcKFKaj1o98gFB4ooUqiW9lMLRJ2fmsbkxs3zy7Qtn4oqkDm6OPXISZB9X4GAqGOlID6LcGcQ';
}
SatisfactionSurveyController.doInit(caseId,function(result, event){
					console.log(event);
					console.log(event.status);
					console.log(result);
					finished = result;
					console.log(finished);
					if (finished != "false"){
						console.log(0);
						var divsToHide = document.getElementsByClassName("divTable");
						console.log(divsToHide);
						for (var i = 0; i < divsToHide.length; i++){
							divsToHide[i].style.display = "none";
						}
						document.getElementsByClassName('divButton')[0].style.display = "none";
						console.log(document.getElementsByClassName('divButton')[0]);
						document.getElementsByClassName('divFinished')[0].style.display = "table";
						console.log(document.getElementsByClassName('divFinished')[0]);
					}else{
						var divsToHide = document.getElementsByClassName("divTable");
						for (var i = 0; i < divsToHide.length; i++){
							divsToHide[i].style.display = "table";
						}
						document.getElementsByClassName('divButton')[0].style.display = "table";
						document.getElementsByClassName('divFinished')[0].style.display = "none";

					}



					if(event.status) {
						console.log(result);
					} else if(event.type === 'exception') {
						console.log('event.message: ' + event.message);
					} else {
						console.log('event.message: ' + event.message);
					}
});

var cells = document.getElementsByClassName('divTableCell');
var tables = document.getElementsByClassName('divTable');

var WebToCase = {
	jt: null,
	remoteUpdateObj(caseId, sSolID, oEvent ) {
		for (var i = 0; i < oEvent.target.parentNode.childNodes.length; i++){
			var node = oEvent.target.parentNode.childNodes[i];
			if (node.nodeName == "DIV"){
				node.style.backgroundColor = "white";
			}
		}
		oEvent.target.style.backgroundColor = "#FF1493";
		SatisfactionSurveyController.updateCase(caseId, parseInt((parseInt(oEvent.target.id) + 5) / 5), oEvent.target.id % 5 + 1
				,function(result, event){
					if(event.status) {
						console.log(result);
					} else if(event.type === 'exception') {
						console.log('event.message: ' + event.message);
					} else {
						console.log('event.message: ' + event.message);
					}
		});
	},
	scheduler: function(caseId, sSolID, oEvent) {
		if(WebToCase.jt !== null) { window.clearTimeout(WebToCase.jt); }
		WebToCase.jt = window.setTimeout(function(){WebToCase.remoteUpdateObj(caseId, sSolID, oEvent);}, 500);
	}
};
for ( i = 0; i < cells.length; i++){
	cells[i].id = i;
	cells[i].onclick = function(oEvent){
		var sSolID = parseInt((parseInt(oEvent.target.id) + 5) / 5);
		WebToCase.scheduler(caseId, sSolID, oEvent);
	}
}
function submit(){
	location.reload();
}
*/
