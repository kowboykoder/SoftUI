/*
	This must be placed directly in a child folder of the main application in a folder called "SoftUI".
*/

window.toggleSoftUI = function() {
	var obj = document.getElementById("softUI");
	
	if(obj.style.visibility == "hidden")
		obj.style.visibility = "visible";
	else
		obj.style.visibility = "hidden";
}

function kb_keyDown(e) {
	keydown(e.target.getAttribute("command"));
	e.target.style.backgroundImage = "url('SoftUI/btn_pressed.png')";
}

function kb_keyUp(e) {
	keyup(e.target.getAttribute("command"));
	e.target.style.backgroundImage = "url('SoftUI/btn_normal.png')";
}

function cancelEvents(e) {
	if(e.preventDefault)
		e.preventDefault();
		
	return;
}

function resetSoftUI() {
	//if the controller has been added already, remove it. Don't add it twice.
	if(document.body.contains(window.softUI))
		document.body.removeChild(window.softUI);
	
	window.softUI = document.createElement("DIV");
	window.softUI.id = "softUI";
	
	var txtEvents = " onmousedown = 'kb_keyDown(event)' ontouchstart = 'kb_keyDown(event)' onmouseup = 'kb_keyUp(event)' ontouchend = 'kb_keyUp(event)' ontaphold = 'cancelEvents(event)'";
	
	//First, render the DPAD	
	window.softUI.innerHTML = '<div style = "float: left;">' +
  		'<div id = "softUI_btnUp" command = "DPAD_UP" class = "softUI circleButton"' + txtEvents + '>&nbsp;</div>' +
  		'<div id = "softUI_btnLeft" command = "DPAD_LEFT" class = "softUI circleButton"' + txtEvents + '>&nbsp;</div>' +
  		'<div id = "softUI_btnRight" command = "DPAD_RIGHT" class = "softUI circleButton"' + txtEvents + '>&nbsp;</div>' +
  		'<div id = "softUI_btnDown" command = "DPAD_DOWN" class = "softUI circleButton"' + txtEvents + '>&nbsp;</div>' +
  	'</div>';
  	
  	//Now, the B and A buttons
  	window.softUI.innerHTML += '<div style = "float: right;">' +
  		'<div id = "softUI_btnB" command = "FACE_1" class = "softUI circleButton"' + txtEvents + '>&nbsp;</div>' +
  		'<div id = "softUI_btnA" command = "DPAD_UP" class = "softUI circleButton"' + txtEvents + '>&nbsp;</div>' +
  	'</div>';
  	
	//stop the zoom on double tap for androids
	$("body").bind("toubletap", cancelEvents);
	
	//stop the zoom on pinch
	$("body").bind("pinch", cancelEvents); //note: contextmenu and e_pause defined in triggers.js

  	document.body.appendChild(window.softUI);
}