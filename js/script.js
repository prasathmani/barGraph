/**
* Name: Prasath Mani
*/
var barLimit;

//animate the bar chart
function animate(elem,style,unit,from,to,time) {
    if( !elem) return;
	elem.classList.remove("red");
	if(to<=100 && to>=0) {
		elem.style[style] = to+unit;
	} else if(to>=100){
		elem.classList.add("red");
		elem.style[style] = '100%';
	} else if(to<=0) {
		elem.style[style] = '0%';
	}
	to = (to<=0) ? 0 : to;
	elem.innerHTML = to;
}

//Cross domain AJAX
AJAXRequest = function(url, callback, failCallback) {
  var xmlhttp = new XMLHttpRequest();
  if ("withCredentials" in xmlhttp) {
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200 || xmlhttp.status == 304) {
          callback(xmlhttp.responseText);
        } else {
          setTimeout(failCallback, 0);
        }
      }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  } else {
    // for IE
    var xdr = new XDomainRequest();
    xdr.onerror = function(){setTimeout(failCallback, 0);};
    xdr.ontimeout = function(){setTimeout(failCallback, 0);};
    xdr.onload = function() {
      callback(xdr.responseText);
    };
    xdr.open("get", url);
    xdr.send();
  }
};

// Callback function of AJAX request if the request fails.
failCallback = function() {
  console.log('AJAXRequest failure!');
};


//Callback function of AJAX request if the request succeeds.
callback = function(responseText) {
   var resdata = JSON.parse(responseText);
  createBar(resdata);
  createBarControls(resdata);

};

//create bar and select box
var createBar = function(data) {
	var index;
	var barHtml = '';
	var selectList = '';
	var bars = data.bars;
	barLimit = data.limit;
	for (index = 0; index < bars.length; ++index) {
		barHtml += '<div class="progress-bar-container"><span class="progress-bar" id="bar-'+bars[index]+'" style="width:'+bars[index]+'%">'+bars[index]+'</div></span>';
		selectList += '<option value="'+bars[index]+'">#progress'+(index+1)+'</div>';
	}
	document.getElementById('progress').innerHTML = barHtml;
	document.getElementById('select-bar-controls').innerHTML = selectList;
	
};

//create button controls
var createBarControls = function(data) {
	var index;
	var controlButton = '';
	var buttons = data.buttons;
	for (index = 0; index < buttons.length; ++index) {
		controlButton += '<button onclick="animateBarControl(this)" class="js-btn-control" id="'+buttons[index]+'">'+buttons[index]+'</div>';
	}
	document.getElementById('btn-bar-controls').innerHTML = controlButton;
};

//animate the bar chart
function animateBarControl(event){
	var _this = event;
	var selectBarControl = document.getElementById("select-bar-controls");
	var selectedBarId = selectBarControl.options[selectBarControl.selectedIndex].value;
	var getselectedCurrentBar = document.getElementById("bar-"+selectedBarId);
	var barFrom = parseInt(getselectedCurrentBar.innerHTML);
	var barTo   = (parseInt(_this.id) + barFrom);
	animate(getselectedCurrentBar, "width", "%", barFrom, barTo, 1000);
}

//call API services
 AJAXRequest('//pb-api.herokuapp.com/bars', callback, failCallback);




