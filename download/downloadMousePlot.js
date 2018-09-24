function init(backPage){	
	mousePlot(backPage.loggerPack);
	//The mouseplot was generated by the mousePlot script
	//Saving using the library saveSvgAsPng
	x = saveSvgAsPng(document.getElementsByTagName("svg")[0], "mouseplot.png", {backgroundColor: 'white'});
}

var background = browser.runtime.getBackgroundPage();

var myPort = browser.runtime.connect({name:"port-from-download"});

background.then(init);

