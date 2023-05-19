var packFile = "";
var ownId = 0;
var seen = 0;
timeStart = 0;

var lastScrollTop = 0;

var settings = {
	"interval" : 500,
	"packSize" : 1000,
	"eventAndFlags": {"blur" : 1, "focus" : 1, "focusin" : 1, "focusout" : 1, "load" : 1, "resize" : 1, "scroll" : 1, "unload" : 1, "beforeunload" : 1, "click" : 1, "dblclick" : 1, "mousedown" : 1, "mouseup" : 1, "mousemove" : 1, "mouseover" : 1, "mouseout" : 1, "mouseenter" : 1, "mouseleave" : 1, "change" : 1, "select" : 1, "submit" : 1, "keypress" : 1, "keydown" : 1, "keyup" : 1, "error" : 1, "touchstart" : 1, "touchmove" : 1, "touchend" : 1, "touchcancel" : 1, "gesturestart" : 1, "gesturechange" : 1, "gestureend" : 1, "orientationchange" : 1, "DOMNodeInserted" : 1, "DOMNodeRemoved" : 1, "devicemotion" : 1, "deviceorientation" : 1, "geolocationchange" : 1, "pageview" : 1, "hashchange" : 1},
	"dataType" : "html",
	"columnMarker" : ",",
	"lineMarker" : ";",
	"nullMarker" : "-",
	"escapeMarker" : "\\",
	"recording" : 0
};

var methods = {
	getNodeIndex : function (obj) {
		if (!obj.previousSibling) {
			return 0;
		}
		else {
			return 1 + methods.getNodeIndex(obj.previousSibling);
		}
	},

	getNodePath : function (obj) {
		if (!obj.parentNode) {
			return "";
		}
		else {
			return methods.getNodePath(obj.parentNode) + "/" + obj.nodeName.toLowerCase() + "/" + methods.getNodeIndex(obj);
		}
	},
	
	getXPath : function (obj) {
		var path = methods.getNodePath(obj);
		
		return path == "" ? "-" : path;
	},
	
	getOwnId : function () {
		return ownId.toString();
	},

	getURL : function () {
		var encodedURL = encodeURI(document.URL);
		return encodedURL.replace(settings.columnMarker, settings.escapeMarker + settings.columnMarker, "g").replace(settings.lineMarker, settings.escapeMarker + settings.lineMarker, "g");
	},

	getReferer : function () {
		var encodedReferer = encodeURI(document.referrer);
		return ( (encodedReferer == "" || typeof(encodedReferer) === undefined) ? "-" : encodedReferer );
	},

	// Dealing with firefox bug because welfit.jQuery's event.timeStamp is always 0
	getTimeStamp : function (event) {
		return (new Date).getTime().toString();
	},

	getEvent : function (event) {
		return event.type;
	},

	getId : function (event) {
		return ((typeof (event.target.id) != 'undefined' && event.target.id) ? event.target.id : ((typeof (event.target.name) != 'undefined' && event.target.name) ? event.target.name : settings.nullMarker));
	},
	
	//Filtering data in target.type == password
	getWhich : function (event) {
		var whichKey = settings.nullMarker;
		if(typeof (event.which) != 'undefined' && event.which){
			whichKey = event.which.toString();
			if(event.target.type == "password") whichKey = "*";
		}
		
		return whichKey;
	},

	getExtraInfo : function (event) {
		var extra = "";

		switch (event.type) {
			case "pageview": //DOUBT
				//extra = location.href + "|" + $(window).width() + "x" + $(window).height(); //DOUBT $ DOUBT
				lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
				extra = location.href + "|" + $(document).width() + "x" + $(document).height();
				extra.replace(settings.columnMarker, settings.escapeMarker + settings.columnMarker, "g").replace(settings.lineMarker, settings.escapeMarker + settings.lineMarker, "g");
				break;
			case "geolocationchange":
				navigator.geolocation.getCurrentPosition(  // WatchPosition can be more useful: http://dev.w3.org/geo/api/spec-source.html#watch-position
			    function (position) {
					extra = position.coords.latitude + "x" + position.coords.longitude;
				}
				);
				break;
			case "resize":
				extra = "" + $(window).width() + "x" + $(window).height();
				break;
			case "mouseout":
				var f = event.relatedTarget || event.toElement;
				if (!f || f.nodeName == "HTML") {
					extra = 'leftWindow';
				}
				break;
			case "scroll":
				console.log('scroll');
				var place = $(event.target);
				extra = place.scrollLeft().toFixed(0) + 'x' + place.scrollTop().toFixed(0);
				getScrollDirections();
				break;
			case "click":
			case "dblclick":
			case "mousemove":
			case "submit":
				extra = event.pageX + "x" + event.pageY + "|" + event.screenX + "x" + event.screenY;//CHANGED
				break;
			default:
				extra = settings.nullMarker;
		}

		return extra;
	},

	getLogLine : function (event) {
		var logLine = [];

		logLine[0] = methods.getOwnId();
		logLine[1] = methods.getReferer(event);
		logLine[2] = methods.getTimeStamp(event);
		logLine[3] = methods.getEvent(event);
		logLine[4] = methods.getId(event);
		logLine[5] = methods.getXPath(event.target);
		logLine[6] = methods.getWhich(event);
		logLine[7] = methods.getExtraInfo(event);

		return logLine;
	},

	sendLine : function (logLine) {		
		myPort.postMessage({line: logLine});
	},

	record : function (event) {
		//verifying if it is the first time the user is seeing the webpage
		
		if(!seen){
			seen = 1;
			$(window).trigger('pageview');
			console.log("pageview");
			lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
			//console.log(document.getElementsByClassName("home--destaques")[0]);
			//console.log(event.target.id);
			if(!timeStart){
				console.log(timeStart);
				metricsTimeOut.setup();
				timeStart = 1;
			}
			
			//generate blob
			var blob = screenshotPage();
			var id = methods.getOwnId();
			var pageviewHref = location.href;
			
			myPort.postMessage({blob: blob, id: id, pageview: pageviewHref});
						
		}
		
		var resize = event.type == 'resize' && event.target.location.toString().search('loggerPopup.html') != -1;
		var eRecorded = event.target.id == 'count' && (event.type == 'DOMNodeInserted' || event.type == 'DOMNodeRemoved');
				
		if(settings.eventAndFlags[event.type] == 1 && !resize && !eRecorded){			
			var logLine = methods.getLogLine(event);
			methods.sendLine(logLine);
		}
	}
	
}
var scrollDown = 0;
function getScrollDirections(){
	//console.log('getScrollDirections');
	//console.log( window.pageYOffset );
	//console.log(  document.documentElement.scrollTop );
	//console.log(  lastScrollTop );
	
	var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
	if (st > lastScrollTop) {
		// downscroll code
		scrollDown = scrollDown + 1;
		//console.log("down scroll");
	} else if (st < lastScrollTop) {
		 console.log('scrollD', scrollDown);
		// upscroll code
		if(scrollDown > 50 && st < 53){
			console.log('top');
			scrollDown = 0;
			methods.sendLine('scroll');
			//console.log('2 top top top');
			//console.log('1 top top top');
		}
		//console.log('up scroll');
	} 
	else{
		console.log(lastScrollTop, st);
	}// else was horizontal scroll
	lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

	// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
	/*window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
	   var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
	   if (st > lastScrollTop) {
		  // downscroll code
		  console.log("down scroll");
	   } else if (st < lastScrollTop) {
		  // upscroll code
		  console.log('up scroll');
	   } // else was horizontal scroll
	   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
	}, false);*/
}

function bindEvents(){	
	for(events in settings.eventAndFlags){
	    $(window).bind(events, methods.record);
	}	
}

// --- alarm timeout
	
var metricsTimeOut = {
	timeOut: function(aMessage) {
		console.log(aMessage);
		//reset time
		delete this.timeoutID;
		this.cancelar();
		this.setup();
		
		//call background metrics	
		var logLine = [];

		logLine[0] = methods.getOwnId();
		logLine[1] = "-";
		logLine[2] = methods.getTimeStamp(null);
		logLine[3] = "metrics";
		logLine[4] = "-";
		logLine[5] = "-";
		logLine[6] = "-";
		logLine[7] = "-";
		methods.sendLine(logLine);
		
		
		
	},

	setup: function() {
		if (typeof this.timeoutID === 'number') {
			this.cancelar();
		}
		console.log("TIMEOUT");

		this.timeoutID = window.setTimeout(function(msg) {
			this.timeOut(msg);
		}.bind(this), 10000, 'Time out!');
	},

  cancelar: function() {
	window.clearTimeout(this.timeoutID);
  }
};

//// --- alarm end

function messageReceiver(message){
	
	var action = message.string;	
	console.log(action);
	switch(action){
		case 'init':
			//metricsTimeOut.setup();
			settings = message.settings;
			ownId = message.id;
			if(settings.recording == 1){
				bindEvents();
			}			
			break;
		case 'record':
			console.log('rec');
			if(!timeStart){
				metricsTimeOut.setup();
				timeStart = 1;
			}
			//0----- teste
			/*var destaque = document.getElementById('destaque');
			var list = document.createElement('ul');
			
			for(i=0; i < 4; i++)
			{
				var li = document.createElement("li");
				var a = document.createElement("a");
				a.href = "#"+"link-"+i;
				a.textContent = "Link "+i;
				li.appendChild(a);
				list.appendChild(li);
			}
			
			
			//var links = "<ul>  <li><a href='#'>Coffeeasdf</a></li>   <li>Tea</li>   <li>Milk</li> </ul>  ";
			
			destaque.innerHTML = '';
			var header = document.createElement('h1');
			//var header = links;
			header.textContent = "Links";
			destaque.appendChild(header);
			destaque.appendChild(list);
			/*
			document.body.textContent = "";

			var header = document.createElement('h1');
			header.textContent = "This page has been eaten";
			document.body.appendChild(header);*/
			//console.log("TESTESTESTET");
			//--- teste end
			settings = message.settings;
			bindEvents();
			break;
		case 'pause':
			metricsTimeOut.cancelar();
			settings = message.settings;
			seen = 0;
			for(events in settings.eventAndFlags){
				$(window).unbind(events, methods.record);
			}
			break;
		case 'eventUpdate':
			settings = message.settings;
			break;
		default:
			console.log(action);
	}
}

var myPort = browser.runtime.connect({name:"port-from-cs"}); //NAMEUNIQUELY
myPort.onMessage.addListener(messageReceiver);

			
//function to generate screenshots
			
 function urlsToAbsolute(nodeList) {
	if (!nodeList.length) {
		return [];
	}
	var attrName = 'href';
	if (nodeList[0].__proto__ === HTMLImageElement.prototype
	|| nodeList[0].__proto__ === HTMLScriptElement.prototype) {
		attrName = 'src';
	}
	nodeList = [].map.call(nodeList, function (el, i) {
		var attr = el.getAttribute(attrName);
		if (!attr) {
			return;
		}
		var absURL = /^(https?|data):/i.test(attr);
		if (absURL) {
			return el;
		} else {
			return el;
		}
	});
	return nodeList;
}

function screenshotPage() {
	urlsToAbsolute(document.images);
	urlsToAbsolute(document.querySelectorAll("link[rel='stylesheet']"));
	var screenshot = document.documentElement.cloneNode(true);
	var b = document.createElement('base');
	b.href = document.location.protocol + '//' + location.host;
	var head = screenshot.querySelector('head');
	head.insertBefore(b, head.firstChild);
	screenshot.style.pointerEvents = 'none';
	screenshot.style.overflow = 'hidden';
	screenshot.style.webkitUserSelect = 'none';
	screenshot.style.mozUserSelect = 'none';
	screenshot.style.msUserSelect = 'none';
	screenshot.style.oUserSelect = 'none';
	screenshot.style.userSelect = 'none';
	screenshot.dataset.scrollX = window.scrollX;
	screenshot.dataset.scrollY = window.scrollY;
	var script = document.createElement('script');
	script.textContent = '(' + addOnPageLoad_.toString() + ')();';
	screenshot.querySelector('body').appendChild(script);
	//var blob = new Blob([screenshot.outerHTML], {
	//	type: 'text/html'
	//});
	
	//return blob;
	return screenshot.outerHTML;
}

function addOnPageLoad_() {
	window.addEventListener('DOMContentLoaded', function (e) {
		var scrollX = document.documentElement.dataset.scrollX || 0;
		var scrollY = document.documentElement.dataset.scrollY || 0;
		window.scrollTo(scrollX, scrollY);
	});
	console.log("addOnPageLoad_")
}

function generate() {
	window.URL = window.URL || window.webkitURL;
	
	var x = document.createElement('iframe');
	x.id = "#myframe";
	
	var bb = screenshotPage();
	
	x.src = window.URL.createObjectURL(bb);
	x.width = document.body.clientWidth + 20;
	x.height = document.body.clientHeight;
	document.body.appendChild(x);
	
	//window.open(window.URL.createObjectURL(screenshotPage()));
}