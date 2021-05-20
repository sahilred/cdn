
var inputFields = [];
var textareaFields = [];
var mediaFields = [];
var popupInserted = false;
var apiURL = "localhost/api";
function randomtext() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function esForm(formId){
	inputFields= [];
	$("#"+formId+" input").each(function(){
		var inputObject = {};
		inputObject.name = ($(this).attr("name") == undefined)?randomtext():$(this).attr("name");
		inputObject.value = $(this).val();
		inputFields.push(inputObject);
	});

	$("#"+formId+" textarea").each(function(){
		var textareaField = {};
		textareaField.name = ($(this).attr("name") == undefined)?randomtext():$(this).attr("name");
		textareaField.value = $(this).val();
		inputFields.push(textareaField);
	});

	$("#"+formId+" select").each(function(){
		var inputObject = {};
		inputObject.name = ($(this).attr("name") == undefined)?randomtext():$(this).attr("name");
		inputObject.value = $(this).val();
		inputFields.push(inputObject);
	});
	
	generatePopup();
}

function generatePopup(){
	if(popupInserted == false){
		addPopupDiv();
		popupInserted = true;
	}else{
		$('#es-ajax-popup').show()
	}
	
	var formfields = "";
	
	formfields += "var formOBJ = ";
        formfields += "{";
	for(var i=0;i<inputFields.length;i++){
		if(i!=0){
			formfields += ",";
		}
		formfields += "\""+inputFields[i].name+"\":\""+inputFields[i].value+"\"";
	}
formfields += "}";
	formfields += ";";
	

	var html = formfields+"$.ajax('"+apiURL+"', {";
        html += "    type: 'POST',";  
        html += "    data: JSON.stringify(formOBJ), ";
        html += "    dataType: 'json',";
        html += "    accept:'application/json',";
        html += "    contentType: 'application/json',";
        html += "    crossdomain: true,";
        html += "    success: function (data, status, xhr) {";
        html += "        console.log('Success');";
        html += "        window.location.href = '/thank-you/';";
        html += "    },";
        html += "    error: function (jqXhr, textStatus, errorMessage) {";
        html += "        console.log('Error');";
        html += "    }";
        html += "});";
	$("#es-ajax-code").html(html);
}

function addPopupDiv(){
	var html = "<div style='position: fixed;width: 100%;background: #000000a3;top: 0;bottom: 0;left: 0;right: 0;z-index: 999;color: #fff;' id='es-ajax-popup'>";
		html +=		"<div style='";
		html +=		"	width: 100%;";
		html +=		"	max-width: 500px;";
		html +=		"	margin: 20px auto;";
		html +=		"	background: #fff;";
		html +=		"	padding: 20px;";
		html +=		"	color: #000;";
		html +=		"			'>";
		html += 	" <div style='float: right;'><a hef='#' onclick=\"$('#es-ajax-popup').hide();\" style='cursor: pointer;'>x</a></div><input type='text' id='apiURL' onkeyup='updateAPIURL()' placeholder='API URL ( http://api.com/api-path' /><br />		AJAX Code:<div id='es-ajax-code' style='";
		html +=		"	background: #e6e6e6;";
		html +=		"	padding: 15px;";
		html +=		"'>Code goes here</div></div>";
		html +=    "</div>";
		$("body").prepend(html);
}

function updateAPIURL(){
	apiURL = $("#apiURL").val();
	generatePopup();
}
