function saveMetrics(metrics){
	return new Promise(function(resolve, reject) {
		console.log(metrics);
		//metrics.unshift(["Timestamp","Distance", "Velocity", "Clicks", "Pause", "Events", "Eccentricity", "Degree", "Time" ]);
		metrics.unshift(["Timestamp","Mean Click Duration", "Mean Degree", "Mean Stroke Duration", "Task Total Time", "Total Time Typing", "Events Number", "-", "-" ]);
		var stringMetrics = JSON.stringify(metrics, null, '\t');
		
		console.log(stringMetrics);
		
		stringMetrics = stringMetrics.replace(/\t+/g, "" );
		stringMetrics = stringMetrics.replace(/\n/g, "" );
		stringMetrics = stringMetrics.replace(/\],/g, "\n" );
		stringMetrics = stringMetrics.replace(/\]/g, "\n" );
		
		stringMetrics = stringMetrics.replace(/\],/g, "");
		stringMetrics = stringMetrics.replace(/\[/g, "");
		
		ext = "-metrics.csv";
		var blob = new Blob([stringMetrics], {type: "text/json;charset=utf-8"});
		
		var date = new Date(); 
        var fileName = "" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "T" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ext;
		console.log(blob);	
		saveAs(blob, fileName);
		resolve('a');
	});
}

function init(backPage){
	console.log(backPage);
	Promise.all([saveMetrics(backPage.loggerPack.metrics)]).then(function(){
		console.log("promise");
		myPort.postMessage({done: 1});
	});
	
	//Saving dot file
	/*var blob = new Blob([dotFile], {type: "text/csv;charset=utf-8"});
	
	var date = new Date(); 
	var filename = "" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "T" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "-graph.dot";
	
	//saveAs(blob, filename, true);*/
	
	//myPort.postMessage({done: 1});
}

var background = browser.runtime.getBackgroundPage();
console.log(background);

var myPort = browser.runtime.connect({name:"port-from-download"});

background.then(init);	  