function simplifyPageReceiver(request, sender, sendResponse) {
	console.log(request);
	if(request.replacement){
		eatPage(request.replacement);
	}
	else if(request.carousel){
		console.log('carousel', request.carousel);
		if(request.carousel == 'carousel-home' || request.carousel ==  'carousel-other')
			menuLinks();
		carousel();	  
	}
	else if(request.unity){
		mouseOverUnity();
	}
	else if(request.search){
		openSearch();		
	}
	else if(request.program){
		openProgramFilter();		
	}
	else if(request.menulinks){
		menuLinks();
	}
}
browser.runtime.onMessage.addListener(simplifyPageReceiver);

function menuLinks(){
	
	var styles=[];
	styles.push(".nav-wrapper span, a{text-decoration: underline !important;text-decoration-color: white !important;font-weight: 800;}");

	styles.push("h6{text-decoration: underline!important;text-decoration-color: #3477c8 !important;font-weight: 800;} ");

	styles.push("#dropdownMenuButton {text-decoration: underline !important;text-decoration-color: white !important;font-weight: 800;}");

	for(s in styles){
		console.log(document.styleSheets);
		console.log(styles[s]);
		document.styleSheets[0].insertRule(styles[s], 0);
	}
	//document.styleSheets[0].insertRule("nav.nav-wrapper span, a{text-decoration: underline;} ", 0);
	//document.styleSheets[0].insertRule(styles, 0);
}
function pageBorder(){
	document.body.style.border = "5px solid red";
}

function eatPage(replacement){
	/*document.body.textContent = "";
	let header = document.createElement('h1');
	header.textContent = "This page has been eaten";
	document.body.appendChild(header);*/
	document.body.textContent = "";
	let header = document.createElement('h1');
	header.textContent = replacement;
	document.body.appendChild(header);
}

function carousel(){
	//document.getElementsByClassName("carrossel--itens")[0].remove();
	//document.getElementsByClassName("carrossel--itens")[0].id = 'carrossel';
	if(document.getElementsByClassName("home--destaques").length > 0){
		document.getElementsByClassName("home--destaques")[0].id = 'carrossel';
		document.getElementById("carrossel").style.display = "none";
	}
	else{
		car = document.getElementsByClassName("carrossel");
		if(car.length > 0)
			car[0].style.display = "none";
	}
}

function openSearch(){
	//abrir busca
	search = document.getElementsByClassName("sc-bqWxrE beWxO nav-button toogle-modal");
	search[0].click();
}

function openProgramFilter(){
	//Menu de programação
	document.getElementById('dropdownMenuButton').click();
}

var unityOpen = false;

/*document.getElementsByClassName('sc-iJnaPW exFzrr toogle-dropdown')[1].onclick = () => {
  console.log('clicked');
  menu = document.getElementsByClassName("sc-hBxehG dnsJqu nav-modal");
  console.log(menu);
}*/

function mouseOverUnity(){
	//Menu unidades:
	
	//get unity buttom
	unidades = document.getElementsByClassName('sc-iJnaPW exFzrr toogle-dropdown');
	//add mouse over/out listener		sc-gikAfH eYAQtw toogle-dropdown
	unidades[1].addEventListener("mouseover", (event) => {
		//open
		console.log("over", unidades[1]);
		if(document.getElementsByClassName("sc-hBxehG dnsJqu nav-modal").length == 0){
			console.log("click");
			unidades[1].click(function() {
				console.log(document.getElementsByClassName("sc-hBxehG dnsJqu nav-modal"));
			});
			
			bar = document.getElementsByClassName('sc-lllmON dVWbfY nav-item');
			for(i=2; i < bar.length; i++){
				bar[i].addEventListener("mouseover", (event) => {
					//close unity
					console.log("over bar");
					//console.log(document.getElementsByClassName("sc-hBxehG dnsJqu nav-modal").length );
					if(document.getElementsByClassName("sc-hBxehG dnsJqu nav-modal").length > 0){
						console.log("bar ");
						unidades[1].click(); 
					}
		
				});
			}
			
			
			
		}
		/*window.setTimeout(function(){
		menu = document.getElementsByClassName("sc-hBxehG dnsJqu nav-modal");
		console.log(menu);
		menu[0].addEventListener("mouseout", (event) => {
			//close unity
			console.log("out menu");
			//console.log(document.getElementsByClassName("sc-hBxehG dnsJqu nav-modal").length );
			if(document.getElementsByClassName("sc-hBxehG dnsJqu nav-modal").length > 0){
				console.log("bar ");
				a[1].click(); 
			}

		});
		}, 1000);*/
	});
	
	
	
	
	/*a[1].addEventListener("mouseout", (event) => {
		//close unity
		if(document.getElementsByClassName("sc-hBxehG dnsJqu nav-modal").length > 0)
			a[1].click(); 
		//added to close other menu
		document.getElementsByClassName('sc-gikAfH gYIFLn toogle-dropdown')[0].click();
	});*/

}



