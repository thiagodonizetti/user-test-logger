	var testing = true;
	var tree = "";
	var taskIniTime = 0;
	var taskEndTime = 0;
	var taskTotalTime = 0;

	

	var clicksModel = 0;
	var pauseBefModel = 0;
	var pauseBefSumModel = 0;
	var pauseBefMeanModel = 0;
	
	// New tree model including mean click duration
	var mouseDownTime = 0;
	var mouseup = 0;
	var clickDuration = 0;
	var updown = 0;
	var clickDurationSum = 0;
	var meanClickDuration = 0;
	
	var vetModel = [];
	
	var timeStampToLog = 0;
	var distSumModel = 0;
	var countMovesModel = 0;
	var distMeanModel = 0;
	var velMeanModel = 0;
	var lastMoveModel = 0;
	var currMoveModel = 0;
	var moveTimeSumModel = 0;
	
	//--- new tree model including stroke
	var strokeLength = 0;
	var strokeDuration = 0;
	var straightness = 0;
	var pauseThreshold = 1000;
	var strokeIniTime = 0;
	var x1Stroke = y1Stroke = xNStroke = yNStroke = 0;
	var strokeLengthSum = 0;
	var strokeDurationSum = 0;
	var straightnessSum = 0;
	var strokes = 0;
	var meanStrokeDuration = 0;
	 
	
	var meanDegreeModel = 0;
	var eventsModel = 0;
	var eccentricityModel = 0;
	
	
	var	x1=x2=y1=y2= false;
	
	var countLines = 0;
	var deltaTime = 0;
	
	//--- new tree model including key typing metrics
	var backspace = 0;
	var del = 0;
	var keyThreshold = 60000;
	
	var firstKey = 0;
	var lastKey = 0;
	var keysNumber = 0;
	var totalKeysNumber = 0;
	var keysTotalTime = 0;
	var velTotal = 0;
	var intervalNumber = 0;
	//------------
	
	// --- alarm timeout
	
	
	
	
	
	
	function metricsTimeHandler(line){
		//set timestamp to log (current system time)
		timeStampToLog = new Date().getTime();	
		
		//set taskEndTime to current time
		taskEndTime = timeStampToLog;
		
		//calc taskTotalTime (end - ini)/1000
		taskTotalTime = (taskEndTime - taskIniTime)/1000;	// div 1000 to miliseconds	
		
		if(loggerPack.length > 0)
			writeLine(loggerPack);
	}
	
	var metricsTimeOut = {
		timeOut: function(aMessage) {
			console.log(aMessage);
			//reset time
			delete this.timeoutID;
			this.cancelar();
			this.setup();
			
			//set timestamp to log (current system time)
			timeStampToLog = new Date().getTime();	
			
			//set taskEndTime to current time
			taskEndTime = timeStampToLog;
			
			//calc taskTotalTime (end - ini)/1000
			taskTotalTime = (taskEndTime - taskIniTime)/1000;	// div 1000 to miliseconds	
			
			if(loggerPack.length > 0)
				writeLine(loggerPack);
			
			
			
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
	
	function writeLine(data){
		createGraph(data, (graph)=> {
			calcEccentricity(graph, anxietyLevel);
		});		
	}
			
	function euclideanDistance(x1, y1, x2, y2){
		return (Math.sqrt( Math.pow((x2-x1), 2) + Math.pow((y2-y1), 2)));
	}

	//--- new tree model including key typing metrics
	function keydownHandler(line){
	}
	
	function keyMetricsHandler(){
		//console.log("keys tempo", parseInt(line[2]) - lastKey);
		time = lastKey - firstKey;
		if( time == 0){
			velKey = 1;
		}
		else{
			velKey = keysNumber / (time / 60000);
		}
			
		console.log("Tempo, numero, vel ", time, keysNumber, velKey, intervalNumber+1, totalKeysNumber + keysNumber);
		
		velTotal += velKey;
		keysTotalTime += time;
		totalKeysNumber += keysNumber;
		intervalNumber += 1;
		
	}
	//--- new tree model including key typing metrics
	
	
	function mouseDownHandlerMOdel(line){
		//New Tree: Including strokeDuration
		mouseDownTime =  parseFloat(line[2]);
		
		if(strokeLength == 0){
			strokeDuration = straightness = 0;
			console.log("stroke 0 MDOWN");
		}
		else{
			strokeDuration = parseInt(line[2]) - strokeIniTime;
			straightness  =  Math.sqrt(Math.pow(x1Stroke - xNStroke, 2) + Math.pow(y1Stroke - yNStroke, 2))/strokeLength;	
			console.log("stroke MDOWN: "+mouseDownTime + "- " + strokeDuration + " - " + strokeDurationSum/strokes );	
		}
		
		if(currMoveModel != 0){
			pause = mouseDownTime - currMoveModel;			
		}
		else{
			pause = 0;
		}
		pauseBefModel++;
		pauseBefSumModel += pause;
		pauseBefMeanModel = pauseBefSumModel / pauseBefModel;
		
		//New Tree: Including strokeDuration
		strokeDurationSum += strokeDuration;
		strokeLengthSum += strokeLength;
		straightnessSum += straightness;
		console.log("stroke antes: "+strokes);	
		strokes += 1;
		meanStrokeDuration = (strokeDurationSum/strokes)/1000;
		console.log("stroke depois: "+strokes);			
		strokeLength =  strokeIniTime = 0;
	}
	
	function clicksHandlerModel(line){
		//debugger;
		clicksModel++;		
		//console.log(line);
	}
	function mouseUpHandler(line){
		mouseup = parseFloat(line[2]);
		clickDuration = mouseup - mouseDownTime;
		clickDurationSum += clickDuration;
		//print(lineNumber, mousedown, mouseup, data[3], clickDuration, clickDurationSum)
		mouseDownTime = 0;
		mouseup = 0;
		updown += 1;
		meanClickDuration = (clickDurationSum / updown)/1000;
		//console.log("clickk----------"+ meanClickDuration);
	}
	
	function moveHandlerModel(line){
		
		countMovesModel++;
		
		lastMoveModel = currMoveModel;
		currMoveModel = parseFloat(line[2]);
		coord = line[7].split("x");
		//console.log(coord);
		
		if(!x1){
			x1 = parseInt(coord[0]);
			//console.log(coord[1].split("|"));
			//console.log(parseFloat(coord[1].split("|")));
			y1 = parseInt(coord[1].split("|")[0]);
			
			//New Tree: Including strokeDuration
			if(strokeIniTime == 0){
				strokeIniTime = parseInt(line[2]);
				x1Stroke = x1;
				y1Stroke = y1;
			}	
			strokeLength += Math.sqrt( Math.pow(x1, 2) + Math.pow(y1,2) );
			//Math.sqrt( Math.pow((x2-x1), 2) 
		}
		else{			
			x2 =  parseInt(coord[0]);
			y2 = parseInt(coord[1].split("|")[0]);
			
			//New Tree: Including strokeDuration
			if(strokeIniTime == 0){
				strokeIniTime = parseInt(line[2]);;
				x1Stroke = x2;
				y1Stroke = y2;
			}	
			xNStroke = x2;
			yNStroke = y2;
			strokeLength += Math.sqrt( Math.pow(x2, 2) + Math.pow(y2,2) );
			
			//calc distancia
			dist = euclideanDistance(x1,y1,x2,y2);
			distSumModel += dist;			
			moveTimeSumModel += currMoveModel - lastMoveModel;
			distMeanModel = parseFloat((distSumModel / countMovesModel).toFixed(3));
			velMeanModel = distSumModel / (moveTimeSumModel/1000);
			
			
			/* console.log("dist ", x1,y1,x2,y2, dist, distSumModel);
			console.log("time", moveTimeSumModel);
			console.log("velMeanModel", velMeanModel);	

			console.log("dist media", distSumModel / countMovesModel); */
			x1 = x2;
			y1 = y2;			

		}
		
		//console.log(lastMoveModel);
	}
	
	
	
	
	
	
	
	var reportsOpen = 0;
	var webPagesIds = 0;
	var connections = 0;
    var loggerPack = [];
	localStorage['metrics'] = "";
	loggerPack.metrics = [];
	var blobs = {};
	var portsFromCS = {};
	var message = {
			string: "",
			settings: {},
			id: 0
	}
	var settings = {
		"interval" : 500,
		"eventAndFlags": {"blur" : 1, "focus" : 1, "focusin" : 1, "focusout" : 1, "load" : 1, "resize" : 1, "scroll" : 1, "unload" : 1, "beforeunload" : 1, "click" : 1, "dblclick" : 1, "mousedown" : 1, "mouseup" : 1, "mousemove" : 1, "mouseover" : 1, "mouseout" : 1, "mouseenter" : 1, "mouseleave" : 1, "change" : 1, "select" : 1, "submit" : 1, "keypress" : 1, "keydown" : 1, "keyup" : 1, "error" : 1, "touchstart" : 1, "touchmove" : 1, "touchend" : 1, "touchcancel" : 1, "gesturestart" : 1, "gesturechange" : 1, "gestureend" : 1, "orientationchange" : 1, "DOMNodeInserted" : 1, "DOMNodeRemoved" : 1, "devicemotion" : 1, "deviceorientation" : 1, "geolocationchange" : 1, "pageview" : 1, "hashchange" : 1},
		"dataType" : "html",
		"columnMarker" : ",",
		"lineMarker" : ";",
		"nullMarker" : "-",
		"escapeMarker" : "\\",
		"recording" : 0,
		"report" : 0
	}; 
	 
	function connected(p) {
		if(p.name == 'port-from-report'){
			reportsOpen++;
			settings.report = 1;
			p.onDisconnect.addListener(function(m){
				reportsOpen--;
				if(reportsOpen == 0){
					settings.report = 0;
				}
				console.log('REPORT CLOSED');
			});
		}
		else if(p.name == 'port-from-cs'){
			connections++;
			currentPort = (webPagesIds++).toString();
			portsFromCS[currentPort] = p;
		
			//Sending the first message to update sender's settings
			message.string = 'init';
			message.settings = settings;
			
			//now sending the tab id, if it is the logger popup sets to 0
			if(p.sender.tab != undefined)
				message.id = p.sender.tab.id;
			else
				message.id = 0
			
			portsFromCS[currentPort].postMessage(message);
		
			portsFromCS[currentPort].onMessage.addListener(function(m) {
				if(m.blob == undefined){
					loggerPack.push(m.line);
					countLines++;
					
					//console.log(m.line[3]);
					if(keysNumber > 0){
						if(parseInt(m.line[2]) - lastKey > keyThreshold){
							keyMetricsHandler();
							keysNumber = 0;
							
						}
					}
					
					if(m.line[3] == "click")
					{
						clicksHandlerModel(m.line);
						//clicksModel++;
					}
					else if(m.line[3] == "mousemove"){
						moveHandlerModel(m.line);
					}
					else if(m.line[3] == "mousedown"){
						mouseDownHandlerMOdel(m.line);
					}
					else if(m.line[3] == "metrics"){
						metricsTimeHandler(m.line);
					}
					//New Tree: Including mean click duration
					else if(m.line[3] == "mouseup" && mouseDownTime != 0){
						//console.log("---mousoeup-----")
						mouseUpHandler(m.line);
					}
					else if(m.line[3] == "mouseup"){
						//console.log("---mousoeup-----")
						mouseUpHandler(m.line);
					}
					else if(m.line[3] == "keydown"){
						if(keysNumber > 0){
							if(parseInt(m.line[2]) - lastKey > keyThreshold){
								keyMetricsHandler();
								keysNumber = 1;
								firstKey = lastKey = parseInt(m.line[2]);
							}
							else{
								lastKey = parseInt(m.line[2]);
								keysNumber += 1;
							}
						}
						else {
							firstKey = lastKey = parseInt(m.line[2]);
							keysNumber = 1;							
						}
						
					}
					//New Tree: Including strokeDuration
					else{
						current_time = parseFloat(m.line[2]);
						
						if(strokeLength > 0 && current_time - currMoveModel > pauseThreshold){
							
							if(strokeLength == 0){
								strokeDuration = straightness = 0;
								console.log("stroke 0 PAUSE: "+current_time + "- " + strokeDuration + " - " + strokeDurationSum/strokes );
							}
							else{
								strokeDuration = parseInt(m.line[2]) - strokeIniTime;
								straightness  =  Math.sqrt(Math.pow(x1Stroke - xNStroke, 2) + Math.pow(y1Stroke - yNStroke, 2))/strokeLength;	
								console.log("stroke 0 PAUSE 1: "+current_time + "- " + strokeDuration + " - " + strokeDurationSum/strokes );								
							}
							
							strokeDurationSum += strokeDuration;
							strokeLengthSum += strokeLength;
							straightnessSum += straightness;
							strokeLength =  strokeIniTime = 0;
							strokes += 1;
							meanStrokeDuration = (strokeDurationSum/strokes) / 1000;
							console.log("stroke 0 PAUSE 2: "+current_time + "- " + strokeDuration + " - " + strokeDurationSum/strokes );		
							//strokeLength =  strokeIniTime = 0
							
							
						}
						
					}
					//if(countLines > 100 && !testing){
					/* if(m.line[2] - deltaTime > 10000 && !testing){
						console.log("TESTING FAIL");
						//countLines = 0;
						timeStampToLog = m.line[2];
						taskEndTime = new Date().getTime();		
						//console.log(taskEndTime);
						// TODO: Alterado para 100 para considerar a divisao por 100 linhas
						taskTotalTime = (taskEndTime - taskIniTime)/1000;	// div 100 para miliseconds				
						countLines = 0;
						deltaTime = m.line[2];
						writeLine(loggerPack);
					} */
				}
				else{
					if(blobs[m.id] == undefined){
						blobs[m.id] = {};
					}
					blobs[m.id][m.pageview] = m.blob;
				}
			});
		}
		else if(p.name == 'port-from-download'){
			p.onMessage.addListener(function(m, port){
				if(m.done == 1){
					
					browser.tabs.remove(port.sender.tab.id);
					
				}
			});
		}
	}
	
	function callRecordCS(){
		
		localStorage["teste"] = "deu certo";
		var a = localStorage['teste'];
		//console.log(a);
		taskIniTime = new Date().getTime();		
		//console.log(taskIniTime);
		deltaTime = taskIniTime;
		//readJsonTree();
		if (testing)
			teste();
		//else
		//	metricsTimeOut.setup();
		console.log("testing... ", testing);
		message.string = "record";
		settings.recording = 1;
		message.settings = settings;
		 
		//try, maybe switch to if
		for (ports in portsFromCS){
			try{
				portsFromCS[ports].postMessage(message);
			}
			catch(e){
				delete portsFromCS[ports];
				connections--;
			}
		}
	}
	
	function callPauseCS(){
		//metricsTimeOut.cancelar();
		taskEndTime = new Date().getTime();		
		console.log(taskEndTime);
		console.log(distSumModel);
		console.log(countMovesModel);
		//loggerPack.teste = "Teste logger";
		if(keysNumber > 0){
			keyMetricsHandler();
		} 
		
		
		//console.log(loggerPack);
		// var downlog = browser.extension.getURL('download/downloadLog.html');
		// console.log( downlog );
	
		// var downlog = browser.tabs.create({
			// url:downlog
		// });
		
		timeStampToLog = taskEndTime;	
		taskTotalTime = (taskEndTime - taskIniTime)/1000; //div 1000 for miliseconds
		
		
		writeLine(loggerPack);
		
		message.string = "pause";
		settings.recording = 0;
		message.settings = settings;
		console.log("PAUSEEEEE");
		console.log(localStorage['metrics']);
		//console.log(clicksModel);
		
		//console.log(vetModel);
		
		
		//try, maybe switch to if
		for(ports in portsFromCS){
			try{
				portsFromCS[ports].postMessage(message);
			}
			catch(e){
				delete portsFromCS[ports];
				connections--;
			}
		}
	}
	
	function callEventUpdateCS(){
		message.string = "eventUpdate";
		message.settings = settings;
		
		//try, maybe switch to if
		for(ports in portsFromCS){
			try{
				portsFromCS[ports].postMessage(message);
			}
			catch(e){
				delete portsFromCS[ports];
				connections--;
			}
		}
	}
	
	function eventUpdate(eventName){
		settings.eventAndFlags[eventName] = Math.abs( settings.eventAndFlags[eventName] - 1 );
		callEventUpdateCS();
	}
	
	function emptyPack(){
		loggerPack = [];
	}
	
	
	function reportGraph(){
		var reportPage = browser.extension.getURL('report/reportGraph.html');
		console.log( reportPage );
	
		var reportTab = browser.tabs.create({
			url:reportPage
		});			
	}
	
	function reportMp(){
		var reportPage = browser.extension.getURL('report/reportMousePlot.html');
		console.log( reportPage );
	
		var reportTab = browser.tabs.create({
			url:reportPage
		});			
	}
	
	function reportHeatmap(){
		var reportPage = browser.extension.getURL('report/reportHeatmap.html');
		console.log( reportPage );
	
		var reportTab = browser.tabs.create({
			url:reportPage
		});	
	}
	
	function reportPatterns(){
		var reportPage = browser.extension.getURL('report/reportPatterns.html');
		console.log( reportPage );
	
		var reportTab = browser.tabs.create({
			url:reportPage
		});	
	}
	
	function reportIncidents(){
		var reportPage = browser.extension.getURL('report/reportIncidents.html');
		console.log( reportPage );
	
		var reportTab = browser.tabs.create({
			url:reportPage
		});	
	}
	
	function anxietyLevel(){
		//task time = 257000 ate 2691000 segundos
		//mouse mean distance = 0 ate 33.383 px
		//mouse mean speed = 0 ate 279611 px/sec 
		//clicks = 0 ate 99000 clicks
		//mean pause = 0 ate 18029 sec 
		//total events = 392000 ate 4059000
		//eccentricity = 2000 ate 13000
		//mean degree = 1308 ate 1819
		//
		//
		
		//console.log(distMeanModel.toFixed(2));
		//distMeanModel = parseFloat((distSumModel / countMovesModel).toFixed(3));
		//console.log(distMeanModel.toFixed(2));
		//checking if the value is the new max value
		if(distMeanModel >= 33.383)
			distNorm = 1.0;
		else
			distNorm = parseFloat(((distMeanModel - 0) / (33.383 - 0)).toFixed(2));
		//console.log("dist ", distNorm);
		
		//console.log(velMeanModel);
		//velMeanModel = distSumModel / (moveTimeSumModel/1000);
		if(velMeanModel >= 279.611)
			velNorm = 1.0;
		else
			velNorm = parseFloat(((velMeanModel - 0) / (279.611 - 0)).toFixed(2));
		//console.log("vel ", velNorm);
		
		
		//console.log(clicksModel);
		if(clicksModel >= 99)
			clickNorm = 1.0;
		else
			clickNorm = parseFloat(((clicksModel - 0) / (99 - 0)).toFixed(2));
		//console.log("click ", clickNorm);
		
		
		pauseNorm = pauseBefMeanModel / 1000;
		//console.log(pauseNorm);
		if(pauseNorm >= 18.029)
			pauseNorm = 1.0;
		else
			pauseNorm = parseFloat(((pauseNorm - 0) / (18.029 - 0)).toFixed(2));
		//console.log("pause ", pauseNorm);
		
		
		//console.log(eventsModel);
		eventNorm = 0;
		if(eventsModel < 392)
			eventNorm = 0;
		else if(eventsModel >= 4059)
			eventNorm = 1.0;
		else
			eventNorm = parseFloat(((eventsModel - 392) / (4059 - 392)).toFixed(2));
		//console.log("events ", eventNorm);
		
		//console.log(eccentricityModel);
		eccentricityNorm = 0;
		if(eccentricityModel < 2)
			eccentricityNorm = 0;
		else if(eccentricityModel >= 13)
			eccentricityNorm = 1.0;
		else
			eccentricityNorm = parseFloat(((eccentricityModel - 2) / (13 - 2)).toFixed(2));
		//console.log("eccentr " , eccentricityNorm);
		
		
		//console.log(meanDegreeModel);
		degreeNorm = 0;
		if(meanDegreeModel < 1.308)
			degreeNorm = 0;
		else if(meanDegreeModel >= 1.819)
			degreeNorm = 1.0;
		else 
			degreeNorm = parseFloat(((meanDegreeModel - 1.308) / (1.819 - 1.308)).toFixed(2));
		//console.log("degree ", degreeNorm);
		
		
		//console.log(taskTotalTime);
		timeNorm = 0;
		if(taskTotalTime < 257)
			timeNorm = 0;
		else if(taskTotalTime >= 2691)
			timeNorm = 1.0;
		else
			timeNorm = parseFloat(((taskTotalTime - 257) / (2691 - 257)).toFixed(2));
		//console.log("time ", timeNorm);
		
		
		
		
		//console.log(distNorm);
		//console.log(eventNorm);
		
		anxiety = "";
		
		if(distNorm < 0.32){
			if(eventNorm  < 0.18 ){
				//console.log("High Anxiety");
				anxiety = "High Anxiety";
			}
			else if(velNorm < 0.19){
				//console.log("No Anxiety");
				anxiety = "No Anxiety";
			}
			else if(clickNorm < 0.34){
				//console.log("No Anxiety");
				anxiety =  "No Anxiety";
			}
			else {
				//console.log("High Anxiety");
				anxiety =  "High Anxiety";
			}
		}
		else {
			if(pauseNorm < 0.12){
				if(timeNorm < 0.15){
					//console.log("High Anxiety");
					anxiety =  "High Anxiety";
				}
				else if(eccentricityNorm < 0.05){
					//console.log("Low Anxiety");
					anxiety =  "Low Anxiety";
				}
				else{
					//console.log("No Anxiety");
					anxiety =  "No Anxiety";
				}
			}
			else if(degreeNorm < 0.66){
				//console.log("Low Anxiety");
				anxiety =  "Low Anxiety";
				
			}
			else{
				//console.log("No Anxiety");
				anxiety =  "No Anxiety";
			}
		}
		var line = [];
		/*line[0] = distNorm;
		line[1] = velNorm;
		line[2] = clickNorm;
		line[3] = pauseNorm;
		line[4] = eventNorm;
		line[5] = eccentricityNorm;
		line[6] = degreeNorm;
		line[7] = timeNorm;
		line[8] = anxiety;*/
		//console.log(timeStampToLog);
		line[0] = timeStampToLog;
		line[1] = distNorm;
		line[2] = velNorm;
		line[3] = clickNorm;
		line[4] = pauseNorm;
		line[5] = eventNorm;
		line[6] = eccentricityNorm;
		line[7] = degreeNorm;
		line[8] = timeNorm;
		line[9] = anxiety;
		loggerPack.metrics.push(line);
		
		//if(loggerPack.metrics.length > 100)
		//	loggerPack.metrics = [];
		
		localStorage['metrics'] = localStorage['metrics'] + ";" + line;
		//localStorage ['log'] = loggerPack;
		//console.log(localStorage['metrics']);
		
 		
		//loggerPack.metrics.push(distMeanModel + "," + velMeanModel + "," +  anxiety);
		//console.log("ANXIETY");
		
	}
	
	function downloadGraph(){
		var downloadPage = browser.extension.getURL('download/downloadGraph.html');
		//console.log( downloadPage );
	
		var downloadTab = browser.tabs.create({
			url:downloadPage
		});
		//var graph = createGraph(loggerPack);
		//eccentricityModel = calcEccentricity(graph);
		//createGraph(loggerPack, (graph)=> {
		//	calcEccentricity(graph, ()=>{
				
				
				//task time = 257000 ate 2691000 segundos
				//mouse mean distance = 0 ate 33383 px
				//mouse mean speed = 0 ate 279611 px/sec 
				//clicks = 0 ate 99000 clicks
				//mean pause = 0 ate 18029 sec 
				//total events = 392000 ate 4059000
				//eccentricity = 2000 ate 13000
				//mean degree = 1308 ate 1819
				//
				//
				

				
				// if(distMeanModel < 0.32){
					  // if(eventsModel  < 0.18 ){
							// console.log("High Anxiety");
					  // }
					  // else if(eventsModel >= 0.18) {
						  // if(velMeanModel < 0.19){
							  // console.log("No Anxiety");
						  // }
						  // else if(velMeanModel >= 019){
							  // if(clicksModel < 0.34){
								  // console.log("No Anxiety");
							  // }
							  // else {
									// console.log("High Anxiety");
								// }
							// }
					  // }
				// }
				// else {
					// if(pauseBefMeanModel < 0.12){
						// if(taskTotalTime < 0.15){
							// console.log("High Anxiety");
						// }
						// else if(eccentricityModel < 0.05){
							// console.log("Low Anxiety");
						// }
						// else{
							// console.log("No Anxiety");
						// }
					// }
					// else if(meanDegreeModel < 0.66){
						// console.log("Low Anxiety");
						
					// }
					// else{
						// console.log("No Anxiety");
					// }
				// }						
											
							
			// });
		//});
		
	}
	
	function downloadMousePlot(){
		var downloadPage = browser.extension.getURL('download/downloadMousePlot.html');
		console.log( downloadPage );
	
		var downloadTab = browser.tabs.create({
			url:downloadPage
		});
	}
	
	function downloadHeatmap(){
		var downloadPage = browser.extension.getURL('download/downloadHeatmap.html');
		console.log( downloadPage );
	
		var downloadTab = browser.tabs.create({
			url:downloadPage
		});
		
	}
	
	function downloadPatterns(){
		var downloadPage = browser.extension.getURL('download/downloadPatterns.html');
		console.log( downloadPage );
	
		var downloadTab = browser.tabs.create({
			url:downloadPage
		});
		
	}
	
	function downloadIncidents(){
		var downloadPage = browser.extension.getURL('download/downloadIncidents.html');
		console.log( downloadPage );
	
		var downloadTab = browser.tabs.create({
			url:downloadPage
		});
		
	}
	
	function downloadAll(){
		var downloadPage = browser.extension.getURL('download/downloadAll.html');
		console.log( downloadPage );
	
		var downloadTab = browser.tabs.create({
			url:downloadPage
		});
		
	}
	
	function uploadSetup(){
		var page = browser.extension.getURL('upload/setup.html');
		console.log( page );
	
		var tab = browser.tabs.create({
			url:page
		});
	}
	
	browser.runtime.onConnect.addListener(connected);
	
	
	
	
	
/*------------------------------------------------------------------------------------------------------------------------------------------------------*/	
/*------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------*/
	
	
	
	//new
function neighbourhoodDev(node, mean){	
	var sum = 0;
	for(let x of node.adjList){
		sum += Math.pow( (x.meanDistance - mean), 2 )
	}
	
	return Math.sqrt( (sum/node.adjList.length) );
	
}
//new
function neighbourhoodMean(node){	
	var sum = 0;
	for(let x of node.adjList){
		sum += x.meanDistance;
	}
	
	return sum/node.adjList.length;
	
}

//node id: event@id@path:targetid
function getNodeId(line){
	return line[0] + '@' + line[3] + '@' + line[5] + ':' + line[4];
}

function createNode(line, id, distance, initialTs){
	var node = {};
	node.id = id;
	node.meanDistance = distance;
	node.meanTimestamp = Number( line[2] ) - initialTs;
	node.occurrences = 1
	node.eventName = line[3]
	node.path = line[5];
	node.tabId = line[0];
	node.elementId = line[4];
	//new
	node.adjList = [];
	
	return node;
}

function createEdge(previousNodeId, nodeId){
	var link = {};
	link.source = previousNodeId;
	link.target = nodeId;
	link.weight = 1;
	
	return link;
}

function calcMean (oldMean, value, n){
	return ( (oldMean * (n - 1) ) + value)/n;
}

var distances;
function calcEccentricity(graph, callback){
	//var eccentricities = [];
	freq1=[];
	//var start = graph.nodes[0];
	mf = 0;
	graph.nodes.forEach(function (start){
		var q = new Queue();
		distances = [];
		var i = 0;
		graph.nodes.forEach(function (node){
			node.color = 0;
			//node.pre = -1;
			//node.distance = -1;
			node.n = i;
			distances[node.n] = -1;
			
			i++;
			
		});
		//start.distance = 0;
		distances[start.n] = 0;
		//start.pre = start;
		
		q.enqueue(start);
		
		while(!q.isEmpty()){
			var nextNode = q.dequeue();
			//console.log(nextNode);
			nextNode.color = 1;
			
			nextNode.adjList.forEach(function (adjNode){
				//console.log(adjNode);
				
				if(adjNode.color == 0){
					adjNode.color = 1;
					//console.log("mudou a cor");
					
					// if(nextNode.distance == -1){
						// nextNode.distance = 1;
						// distances[nextNode] = 1;
						// console.log("DISTANE");
					// }
					// else{
						//adjNode.distance = nextNode.distance + 1;
						distances[adjNode.n] = distances[nextNode.n] + 1;
						//console.log(distances[adjNode.n]);
						//console.log("soma distance");
					//}
					
					//adjNode.pre = nextNode;
					q.enqueue(adjNode);
					
				}				
			});
			nextNode.color = 2;			
		}
		
		
		//console.log(graph.nodes);
		
		//console.log(distances);
	//	eccentricities.push(Math.max(...distances));
		if(freq1[Math.max(...distances)] == undefined)
			freq1[Math.max(...distances)] = 1;
		else
			freq1[Math.max(...distances)]++;
		
		if(freq1[Math.max(...distances)] > mf)
			mf = freq1[Math.max(...distances)];
		
	});
	//console.log(eccentricities);
	//console.log(freq1);

	
	//var prev = freq1[0]; 
	var peaks = 0;
	var maxFreq = 0;
		
	freq1.forEach(function (a){
	  if(a > maxFreq)
		  maxFreq = a;
	});
	
	//console.log("maxFre ", maxFreq);
	//console.log("mf", mf);
	
	//if(freq1[0] > 0)
	if(freq1[0]/maxFreq * 0.96 > 0 && freq1[0]/maxFreq * 0.96 > freq1[1]/maxFreq)
		peaks = 1;
	
	
	
	for(i = 1; i < freq1.length-1; i++){
		//if(freq1[i] > freq1[i-1] && freq1[i] > freq1[i+1]){
		if(freq1[i]/maxFreq * 0.96 > freq1[i-1]/maxFreq && freq1[i]/maxFreq * 0.96 > freq1[i+1]/maxFreq){
			peaks++;
			//console.log(i);
		}
	}
	
	/*freq1.forEach(function (f){
		if(f != freq1[0]){
			if(f > prev){
				peaks++;
			}
			prev = f;
		}
	});*/
	//console.log(peaks);
	eccentricityModel = peaks;
	graph = [];
	freq1 = [];
	return callback(peaks);
		
	/* var freq = [];
	eccentricities.forEach(function (e){
		if(freq[e] == undefined)
			freq[e] = 1;
		else
			freq[e]++;
	});
	console.log(freq); */
}

function createGraph(loggerPack, callback){
	eventsModel = 0;
	var graph = {
		nodes : [],
		links : [],
		addNode : function (node){
			graph.nodes.push(node);
		},
		getNode : function (nodeId){
			for(let node of graph.nodes){
				if(node.id == nodeId){
					return node;
				}
			}
			return null;
		},
		getNumberOfNodes : function (){
			return graph.nodes.length;
		},
		addEdge : function (link){
			graph.links.push(link);
		},
		getEdge : function (previousId, id){
			for(let link of graph.links){
				if( previousId == link.source && id == link.target ){
					return link;
				}
			}
			return null;
		}
	}
	
	var initialTs = 0;
	var previousNode = {};
	var node = {};
	var link = {};
	var distance = 0;
	var currentId = "";
		
	var start = {};
	start.id = "start";
	start.meanDistance = -1;
	start.meanTimestamp = -1;
	start.occurrences = 1;
	start.eventName = 'start';
	start.path = '-';
	start.tabId = '-1';
	start.elementId = '-';
	start.adjList = [];
		
	graph.addNode(start);
	previousNode = start;
	
	initialTs = Number( loggerPack[0][2] );
	for(i = 0; i < 8; i++){
		node = createNode(loggerPack[0], "-", 0, 0);
		graph.addNode(node);
	}
		
		
	for (let line of loggerPack) {
		if(line[0] == "Tab id")
			continue;
		currentId = getNodeId(line);
		node = graph.getNode(currentId);
		if( node == null ){
			node = createNode(line, currentId, distance, initialTs);
			graph.addNode(node);
			
			if(currentId.split("@")[0] != "0")
				eventsModel++;
			
		}
		else{
			node.occurrences++;
			node.meanDistance = calcMean(node.meanDistance, distance, node.occurrences);
			node.meanTimestamp = calcMean(node.meanTimestamp, ( Number( line[2] ) - initialTs ), node.occurrences); 
		}
		
		link = graph.getEdge(previousNode.id, node.id);
		
		if(link == null){
			link = createEdge(previousNode.id, node.id);
			graph.addEdge(link);
			previousNode.adjList.push(node);
		}
		else{
			link.weight++;
		}
		previousNode = node;
		distance++;
	}
	//console.log(eventsModel);
	//???????
	var end = {};
	end.id = "end";
	end.meanDistance = previousNode.meanDistance;///convention
	end.meanTimestamp = -1;
	end.occurrences = 1;
	end.eventName = 'end';
	end.path = '-';
	end.tabId = '-1';
	end.elementId = '-';
	end.adjList = [];
	
	graph.addNode(end);
	graph.addEdge( createEdge(previousNode.id, end.id) );
	previousNode.adjList.push(end);
	
	//graph finished

	sam(graph);
	start.sam = 'regular';
	end.sam = 'regular';
	/*graph.nodes.forEach(function(d) {
	  d.inDegree = 0;
	  d.outDegree = 0;
	});
	graph.links.forEach(function(d) {
	  graph.getNode(d.source).outDegree++;
	  graph.getNode(d.target).inDegree++;
	  //graph.nodes[d].outDegree += 1;
	  //graph.nodes[d].inDegree += 1;
	});
	
	var degreesI = 0;
	var degreesO = 0;
	graph.nodes.forEach(function(d){
		degreesO += d.outDegree;
		degreesI += d.inDegree;		
	});
	console.log(degreesI, degreesO, graph.nodes.length, degreesI/graph.nodes.length, degreesO/graph.nodes.length);*/
	
	meanDegreeModel = graph.links.length/graph.nodes.length;
	
	//console.log(graph);
	//console.log("grau medio ", graph.links.length/graph.nodes.length);
	return callback(graph);	
}

function sam(graph){	
	for(let node of graph.nodes){		
		var meanNeighbours = neighbourhoodMean(node);
		var devNeighbours = neighbourhoodDev(node, meanNeighbours);
		node.devNeighbours = devNeighbours;
		node.meanNeighbours = meanNeighbours;
		if( node.meanDistance > (meanNeighbours + 2*devNeighbours) ){
			node.sam = 'incident';
		}
		else if( node.meanDistance < (meanNeighbours - 2*devNeighbours) ){
			node.sam = 'shortcut';
		}
		else{
			node.sam = 'regular';
		}		
	}
}

//formatting timestamp -> human readable
function getTimestamp(time){	
	var timehr = '';
	var x = 0;	
	x = Math.floor(time/3600000);
	if(x < 10 && x > -1)
		timehr += '0' + x;
	else	
		timehr += '' + x;
	
	time = time%3600000;
	x = Math.floor(time/60000);
	if(x < 10 && x > -1)
		timehr += ':0' + x;
	else
		timehr += ':' + x;
	
	time = time%60000;
	x = Math.floor(time/1000);
	if(x < 10 && x > -1)
		timehr += ':0' + x;
	else
		timehr += ':' + x;
	
	time = Math.floor(time%1000);
	x = Math.floor(time/1000);
	if(time < 10 && x > -1){
		timehr += '.00' + time;
	}
	else if(time < 100 && x > -1){
		timehr += '.0' + time;
	}
	else{
		timehr += '.' + time;
	}
	return timehr;	
}

//code.iamkate.com
function Queue(){var a=[],b=0;this.getLength=function(){return a.length-b};this.isEmpty=function(){return 0==a.length};this.enqueue=function(b){a.push(b)};this.dequeue=function(){if(0!=a.length){var c=a[b];2*++b>=a.length&&(a=a.slice(b),b=0);return c}};this.peek=function(){return 0<a.length?a[b]:void 0}};


function readTreeFile(){
	
	var requestURL = 'data//tree.json';
	
	//console.log(requestURL);
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	console.log(request);
	//var tree;
	//vals = {'Mean Click Duration (sec)': meanClickDuration, 'Mean Degree': meanDegreeModel, 'Mean Stroke Duration (sec)': meanStrokeDuration, 'Task Time (sec)': taskTotalTime, 'Total Time Typing (sec)': keysTotalTime, 	'Events Number': countLines };
	//var pred_class = "";
	//console.log(vals['Mean Click Duration (sec)']);
	//console.log("clicks------" + meanClickDuration);
	request.onload = function() {
		tree = request.response;
		console.log(tree);
	}
}
function readJsonTree(){	

	vals = {'Mean Click Duration (sec)': meanClickDuration, 'Mean Degree': meanDegreeModel, 'Mean Stroke Duration (sec)': meanStrokeDuration, 'Task Time (sec)': taskTotalTime, 'Total Time Typing (sec)': keysTotalTime/1000, 'Events Number': countLines};
	var pred_class = "";
	var node = tree;
	//console.log(node);
	//console.log(tree);
	while(node.rule !== undefined ){
	  r = node.rule.split(" ")
	  if(r[r.length-2] === '<='){
		//console.log('menor igual')
		rule = ""
		for(i = 0; i < r.length-2; i++){
		  rule = rule + r[i] + " "
		}
		rule = rule.trim()
		//console.log(rule)
		value = r[r.length-1]
		pos = 'b'
		//console.log(vals)
		console.log(vals[rule] + ' ' + rule + ' <= ' + value)
		if(vals[rule] <= value){
			node = node.left
		}
		else{
			node = node.right
		}
	  }
	  else if(r[r.length-2] === '>'){
		console.log('maior')
	  }
	  else{
		console.log('igual')
	  }
	}
	console.log(node.id, node.Class)
	pred_class = node.Class;
	console.log(pred_class);
	
	console.log("-----------class "+ pred_class);
	var line = [];
	/*line[0] = distNorm;
	line[1] = velNorm;
	line[2] = clickNorm;
	line[3] = pauseNorm;
	line[4] = eventNorm;
	line[5] = eccentricityNorm;
	line[6] = degreeNorm;
	line[7] = timeNorm;
	line[8] = anxiety;*/
	//console.log(timeStampToLog);
	line[0] = timeStampToLog;
	line[1] = meanClickDuration;
	line[2] = meanDegreeModel;
	line[3] = meanStrokeDuration;
	line[4] = taskTotalTime;
	line[5] = keysTotalTime/1000;
	line[6] = countLines;
	line[7] = 0;
	line[8] = 0;
	line[9] = pred_class;
	loggerPack.metrics.push(line);
	console.log(pred_class);
	
	//if(loggerPack.metrics.length > 100)
	//	loggerPack.metrics = [];
	
	localStorage['metrics'] = localStorage['metrics'] + ";" + line;
	//localStorage ['log'] = loggerPack;
		
	

	//var requestURL = 'p14.json';
	
	//var requestURL = 'data//tree.json';
	
	//console.log(requestURL);
	//var request = new XMLHttpRequest();
	//request.open('GET', requestURL);
	//request.responseType = 'json';
	//request.send();
	//console.log(request);
	//var tree;
	//vals = {'Mean Click Duration (sec)': meanClickDuration, 'Mean Degree': meanDegreeModel, 'Mean Stroke Duration (sec)': meanStrokeDuration, 'Task Time (sec)': taskTotalTime, 
	//'Total Time Typing (sec)': keysTotalTime, 	'Events Number': countLines 
	//};
	//var pred_class = "";
	//console.log(vals['Mean Click Duration (sec)']);
	//console.log("clicks------" + meanClickDuration);
	/*request.onload = function() {
		tree = request.response;
		//console.log(arq);		
		val = 30000;
		while(tree.rule !== undefined )
		{
		  r = tree.rule.split(" ")
		  if(r[r.length-2] === '<='){
			//console.log('menor igual')
			rule = ""
			for(i = 0; i < r.length-2; i++)
			{
			  rule = rule + r[i] + " "
			}
			rule = rule.trim()
			//console.log(rule)
			value = r[r.length-1]
			pos = 'b'
			//console.log(vals)
			console.log(vals[rule] + ' ' + rule + ' <= ' + value)
			if(vals[rule] <= value){
				tree = tree.left
			}
			else{
				tree = tree.right
			}
		  }
		  else if(r[r.length-2] === '>'){
		  console.log('maior')
		  }
		  else{
			console.log('igual')
		  }
		}
		console.log(tree.id, tree.Class)
		pred_class = tree.Class;
		console.log(pred_class);
		
		console.log("-----------class "+ pred_class);
		var line = [];
		/*line[0] = distNorm;
		line[1] = velNorm;
		line[2] = clickNorm;
		line[3] = pauseNorm;
		line[4] = eventNorm;
		line[5] = eccentricityNorm;
		line[6] = degreeNorm;
		line[7] = timeNorm;
		line[8] = anxiety;*/
		//console.log(timeStampToLog);
		/*line[0] = timeStampToLog;
		line[1] = meanClickDuration;
		line[2] = meanDegreeModel;
		line[3] = meanStrokeDuration;
		line[4] = taskTotalTime;
		line[5] = keysTotalTime;
		line[6] = countLines;
		line[7] = 0;
		line[8] = 0;
		line[9] = pred_class;
		loggerPack.metrics.push(line);
		console.log(pred_class);
		
		//if(loggerPack.metrics.length > 100)
		//	loggerPack.metrics = [];
		
		localStorage['metrics'] = localStorage['metrics'] + ";" + line;
		localStorage ['log'] = loggerPack;
	}*/
}

function getClass(line, t1, t2, data){
	//if(line[2] - deltaTime > 10000){
	//console.log("delta, t2, difference", deltaTime, line[2], line[2] - deltaTime);
	//console.log("Delta time", deltaTime);
	//deltaTime = line[2];
	t2 = line[2];
	timeStampToLog = t2;
	//console.log(timeStampToLog);
	taskTotalTime = (t2 - t1)/1000;
	
	if(strokes > 0){
		console.log('meanStroke', strokes, strokeDurationSum);
		meanStrokeDuration = (strokeDurationSum/strokes)/1000;
	}
	if(keysNumber > 0){
		console.log("keys timeout");
		keysTotalTime += lastKey - firstKey;
		console.log("keys "  + keysTotalTime);
		/*keyMetricsHandler();					
		keysNumber = 1;
		totalKeysNumber -= 1;
		firstKey = lastKey;
		
		velTotal += velKey
		firstKey = lastKey = int(data[2].strip('"')) 
		tempoTotal += time
		numeroTotalTeclas += numeroTeclas
		numeroTeclas = 1
		numeroIntervalos += 1*/
	} 

	/*createGraph(data, (graph)=> {
		calcEccentricity(graph, anxietyLevel);
	});*/
	createGraph(data, (graph)=> {
		calcEccentricity(graph, readJsonTree);
		
		if(keysNumber > 0){
			
			keysTotalTime -= lastKey - firstKey;
			console.log("keys 2**"  + keysTotalTime);
		}
	});
				
}
function asdf(){
	readTreeFile();
	//fileList = ['p01.json', 'p5.json', 'p6.json', 'p7.json'];
	fileList = ['p01.json', 'p5.json'];
	
	fileList.forEach(function (file) {
		var testing = true;
		var tree = "";
		var taskIniTime = 0;
		var taskEndTime = 0;
		var taskTotalTime = 0;

		

		var clicksModel = 0;
		var pauseBefModel = 0;
		var pauseBefSumModel = 0;
		var pauseBefMeanModel = 0;
		
		// New tree model including mean click duration
		var mouseDownTime = 0;
		var mouseup = 0;
		var clickDuration = 0;
		var updown = 0;
		var clickDurationSum = 0;
		var meanClickDuration = 0;
		
		var vetModel = [];
		
		var timeStampToLog = 0;
		var distSumModel = 0;
		var countMovesModel = 0;
		var distMeanModel = 0;
		var velMeanModel = 0;
		var lastMoveModel = 0;
		var currMoveModel = 0;
		var moveTimeSumModel = 0;
		
		//--- new tree model including stroke
		var strokeLength = 0;
		var strokeDuration = 0;
		var straightness = 0;
		var pauseThreshold = 1000;
		var strokeIniTime = 0;
		var x1Stroke = y1Stroke = xNStroke = yNStroke = 0;
		var strokeLengthSum = 0;
		var strokeDurationSum = 0;
		var straightnessSum = 0;
		var strokes = 0;
		var meanStrokeDuration = 0;
		 
		
		var meanDegreeModel = 0;
		var eventsModel = 0;
		var eccentricityModel = 0;
		
		
		var	x1=x2=y1=y2= false;
		
		var countLines = 0;
		var deltaTime = 0;
		
		//--- new tree model including key typing metrics
		var backspace = 0;
		var del = 0;
		var keyThreshold = 60000;
		
		var firstKey = 0;
		var lastKey = 0;
		var keysNumber = 0;
		var totalKeysNumber = 0;
		var keysTotalTime = 0;
		var velTotal = 0;
		var intervalNumber = 0;
		
		localStorage["teste"] = "deu certo";
		var a = localStorage['teste'];
		//console.log(a);
		taskIniTime = new Date().getTime();		
		//console.log(taskIniTime);
		deltaTime = taskIniTime;
		
		teste2("data//"+file);
		console.log(localStorage['metrics']);
		localStorage['metrics'] = "";
	});
	
	
}

//const pattern1 = "https://developer.mozilla.org/*";
/*const pattern1 = "moz-extension://39492eac-c2f9-4f1e-bac7-849b08e18a1f/download/downloadLog.html";
const pattern2 = "moz-extension://39492eac-c2f9-4f1e-bac7-849b08e18a1f/download/downloadLog.html";*/

const filter = {
  url:
  [
    {pathContains : "download/downloadLog.html"}/*,
    {hostPrefix: "developer"}*/
  ]
}


function downloadCompleteHandler(tabId, changeInfo, tabInfo) {
	console.log(`Updated tab: ${tabId}`);
	console.log("Changed attributes: ", changeInfo);
	console.log("New tab Info: ", tabInfo);
	
	testing = true;
	//tree = "";
	taskIniTime = 0;
	taskEndTime = 0;
	taskTotalTime = 0;



	clicksModel = 0;
	pauseBefModel = 0;
	pauseBefSumModel = 0;
	pauseBefMeanModel = 0;

	// New tree model including mean click duration
	mouseDownTime = 0;
	mouseup = 0;
	clickDuration = 0;
	updown = 0;
	clickDurationSum = 0;
	meanClickDuration = 0;

	vetModel = [];

	timeStampToLog = 0;
	distSumModel = 0;
	countMovesModel = 0;
	distMeanModel = 0;
	velMeanModel = 0;
	lastMoveModel = 0;
	currMoveModel = 0;
	moveTimeSumModel = 0;

	//--- new tree model including stroke
	strokeLength = 0;
	strokeDuration = 0;
	straightness = 0;
	pauseThreshold = 1000;
	strokeIniTime = 0;
	x1Stroke = y1Stroke = xNStroke = yNStroke = 0;
	strokeLengthSum = 0;
	strokeDurationSum = 0;
	straightnessSum = 0;
	strokes = 0;
	meanStrokeDuration = 0;
	

	meanDegreeModel = 0;
	eventsModel = 0;
	eccentricityModel = 0;


	x1=x2=y1=y2= false;

	countLines = 0;
	deltaTime = 0;

	//--- new tree model including key typing metrics
	backspace = 0;
	del = 0;
	keyThreshold = 60000;

	firstKey = 0;
	lastKey = 0;
	keysNumber = 0;
	totalKeysNumber = 0;
	keysTotalTime = 0;
	velTotal = 0;
	intervalNumber = 0;

	localStorage["teste"] = "deu certo";
	a = localStorage['teste'];
	//console.log(a);
	//taskIniTime = new Date().getTime();		
	//console.log(taskIniTime);
	deltaTime = taskIniTime;

	//teste2("data//"+file);
	console.log(localStorage['metrics']);
	localStorage['metrics'] = "";
	loggerPack = [];
	localStorage['metrics'] = "";
	loggerPack.metrics = [];
	
	
	fileId += 1;
	console.log("Teste: ", tabInfo);
	teste();
	console.log("Teste2: ", tabInfo);
}

//browser.tabs.onCompleted.addListener(handleUpdated, filter);
browser.webNavigation.onCompleted.addListener(downloadCompleteHandler, filter);


var fileList = ['p36.json', 'p37.json', 'p38.json', 'p40.json', 'p42.json', 'p43.json'];
var fileId = 0;
function teste(){	
		if (tree == "")
			readTreeFile();

		//var requestURL = 'p14.json';
		
		//var requestURL = 'data//p26.json';
		
		if(fileId >= fileList.length){
			console.log("return");
			return;
		}
		console.log("fileId", fileList.length, fileId, fileList);
		var requestURL = "data//"+fileList[fileId];
		
		//console.log(requestURL);
		var request = new XMLHttpRequest();
		request.open('GET', requestURL);
		request.responseType = 'json';
		request.send();
		//console.log(request);
		var arq;
		request.onload = function() {
			arq = request.response;
			//console.log(arq);		
			var data = arq;
			var t1 = data[1][2];
			var t2 = 0;
			var deltaTime = data[1][2];
			data.forEach(function (line) {
				countLines++;
				loggerPack.push(line);
				if(keysNumber > 0){
					if(parseInt(line[2]) - lastKey > keyThreshold){
						keyMetricsHandler();
						keysNumber = 0;						
					}
				}
				if(line[4] == "pause"){
					t2 = line[2];
				}
				//loggerPack.push(m.line);
				if(line[3] == "click")
				{
					clicksHandlerModel(line);
					//clicksModel++;
				}
				else if(line[3] == "beforeunload"){
					getClass(line, t1, t2, data);
				}
				else if(line[3] == "mousemove"){
					moveHandlerModel(line);
				}
				else if(line[3] == "mousedown"){
					mouseDownHandlerMOdel(line);
				}
				else if(line[3] == "mouseup" && mouseDownTime != 0){
					//console.log("---mousoeup-----")
					
					mouseUpHandler(line);
				}
				else if(line[3] == "keydown"){
					if(keysNumber > 0){
						if(parseInt(line[2]) - lastKey > keyThreshold){
							keyMetricsHandler();
							keysNumber = 1;
							firstKey = lastKey = parseInt(line[2]);
						}
						else{
							lastKey = parseInt(line[2]);
							keysNumber += 1;
						}
					}
					else {
						firstKey = lastKey = parseInt(line[2]);
						keysNumber = 1;							
					}					
				}
				else{
					current_time = parseFloat(line[2]);
					
					if(strokeLength > 0 && parseInt(line[2]) - currMoveModel > pauseThreshold){
						
						if(strokeLength == 0){
							strokeDuration = straightness = 0;
							console.log("stroke 0 PAUSE: "+current_time + "- " + strokeDuration + " - " + strokeDurationSum/strokes );
						}
						else{
							strokeDuration = parseInt(line[2]) - strokeIniTime;
							straightness  =  Math.sqrt(Math.pow(x1Stroke - xNStroke, 2) + Math.pow(y1Stroke - yNStroke, 2))/strokeLength;	
							console.log("stroke 0 PAUSE 1: "+current_time + "- " + strokeDuration + " - " + strokeDurationSum/strokes );								
						}
						
						strokeDurationSum += strokeDuration;
						strokeLengthSum += strokeLength;
						straightnessSum += straightness;
						strokeLength =  strokeIniTime = 0;
						strokes += 1;
						meanStrokeDuration = (strokeDurationSum/strokes)/1000;
						console.log("stroke 0 PAUSE 2: "+current_time + "- " + strokeDuration + " - " + strokeDurationSum/strokes );		
						//strokeLength =  strokeIniTime = 0
						
						
					}
						
				}
				/*else if(line[3] == "mouseup"){
					console.log("---mousoeup-----")
					mouseUpHandler(line);
				}*/
				//deltaTime = line[2] - t1;
				//console.log("delta, t2, difference", deltaTime, line[2], line[2] - deltaTime);
				if(line[2] - deltaTime > 10000){
					//console.log("delta, t2, difference", deltaTime, line[2], line[2] - deltaTime);
					//console.log("Delta time", deltaTime);
					deltaTime = line[2];
					t2 = line[2];
					timeStampToLog = t2;
					//console.log(timeStampToLog);
					taskTotalTime = (t2 - t1)/1000;
					
					if(strokes > 0){
						console.log('meanStroke', strokes, strokeDurationSum);
						meanStrokeDuration = (strokeDurationSum/strokes)/1000;
					}
					if(keysNumber > 0){
						console.log("keys timeout");
						keysTotalTime += lastKey - firstKey;
						console.log("keys "  + keysTotalTime);
						/*keyMetricsHandler();					
						keysNumber = 1;
						totalKeysNumber -= 1;
						firstKey = lastKey;
						
						velTotal += velKey
						firstKey = lastKey = int(data[2].strip('"')) 
						tempoTotal += time
						numeroTotalTeclas += numeroTeclas
						numeroTeclas = 1
						numeroIntervalos += 1*/
					} 
			
					/*createGraph(data, (graph)=> {
						calcEccentricity(graph, anxietyLevel);
					});*/
					createGraph(data, (graph)=> {
						calcEccentricity(graph, readJsonTree);
						
						if(keysNumber > 0){
							
							keysTotalTime -= lastKey - firstKey;
							console.log("keys 2**"  + keysTotalTime);
						}
					});
					
				}
			});
			//console.log("t1, t2", t1, t2);
			
			taskTotalTime = (t2 - t1)/1000;
			
			
			if(strokes > 0){
				meanStrokeDuration = (strokeDurationSum/strokes)/1000;
			}
			if(keysNumber > 0){
				keyMetricsHandler();
			} 
		
			createGraph(data, (graph)=> {
				calcEccentricity(graph, readJsonTree);
				console.log("Final Time", taskTotalTime);
				
				var downlog = browser.extension.getURL('download/downloadLog.html');
				console.log( downlog );							
			
				var downlog = browser.tabs.create({
					url:downlog
				});
			//var level = anxietyLevel();
			//console.log(level);
			
				
				
				//task time = 257000 ate 2691000 segundos
				//mouse mean distance = 0 ate 33383 px
				//mouse mean speed = 0 ate 279611 px/sec 
				//clicks = 0 ate 99000 clicks
				//mean pause = 0 ate 18029 sec 
				//total events = 392000 ate 4059000
				//eccentricity = 2000 ate 13000
				//mean degree = 1308 ate 1819
				//
				//
				
				// distMeanModel = (distMeanModel - 0) / (33383 - 0);
				// velMeanModel = (velMeanModel - 0) / (279611 - 0);
				// clicksModel = (clicksModel - 0) / (99000 - 0);
				// pauseBefMeanModel = (pauseBefMeanModel - 0) / (18029 - 0);
				// eventsModel = (eventsModel - 392000) / (4059000 - 392000);
				// eccentricityModel = (eccentricityModel - 2000) / (13000 - 2000);
				// meanDegreeModel = (meanDegreeModel - 1308) / (1819 - 1308);
				// taskTotalTime = (1040 - 257000) / (2691000 - 257000);
				
				
				
				// if(distMeanModel < 0.32){
					  // if(eventsModel  < 0.18 ){
							// console.log("High Anxiety");
					  // }
					  // else if(eventsModel >= 0.18) {
						  // if(velMeanModel < 0.19){
							  // console.log("No Anxiety");
						  // }
						  // else if(velMeanModel >= 019){
							  // if(clicksModel < 0.34){
								  // console.log("No Anxiety");
							  // }
							  // else {
									// console.log("High Anxiety");
								// }
							// }
					  // }
				// }
				// else {
					// if(pauseBefMeanModel < 0.12){
						// if(taskTotalTime < 0.15){
							// console.log("High Anxiety");
						// }
						// else if(eccentricityModel < 0.05){
							// console.log("Low Anxiety");
						// }
						// else{
							// console.log("No Anxiety");
						// }
					// }
					// else if(meanDegreeModel < 0.66){
						// console.log("Low Anxiety");
						
					// }
					// else{
						// console.log("No Anxiety");
					// }
				// }						
											
							
			});
		}
}