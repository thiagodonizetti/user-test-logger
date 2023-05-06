function eatPageReceiver(request, sender, sendResponse) {
	console.log("teste");
	if(request.replacement){
		eatPage(request.replacement);
	}
	else if(request.carousel){
		console.log('carousel');
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
}
browser.runtime.onMessage.addListener(eatPageReceiver);


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
	document.getElementsByClassName("home--destaques")[0].id = 'carrossel';
	document.getElementsByClassName("home--destaques")[0].style.display = "none";
}

function openSearch(){
	//abrir busca
	a = document.getElementsByClassName("sc-bqWxrE beWxO nav-button toogle-modal")
	a[0].click()
}

function openProgramFilter(){
	//Menu de programação
	document.getElementById('dropdownMenuButton').click()
}

var unityOpen = false;

document.getElementsByClassName('sc-iJnaPW exFzrr toogle-dropdown')[1].onclick = () => {
  console.log('clicked');
  menu = document.getElementsByClassName("sc-hBxehG dnsJqu nav-modal");
  console.log(menu);
}
function mouseOverUnity(){
	//Menu unidades:
	
	//get unity buttom
	a = document.getElementsByClassName('sc-iJnaPW exFzrr toogle-dropdown');
	//add mouse over/out listener		sc-gikAfH eYAQtw toogle-dropdown
	a[1].addEventListener("mouseover", (event) => {
		//open
		console.log("over");
		if(document.getElementsByClassName("sc-hBxehG dnsJqu nav-modal").length == 0){
			console.log("click");
			a[1].click(function() {
				console.log(document.getElementsByClassName("sc-hBxehG dnsJqu nav-modal"));
			});
			
			bar = document.getElementsByClassName('sc-lllmON dVWbfY nav-item');
			bar[2].addEventListener("mouseover", (event) => {
				//close unity
				console.log("over bar");
				//console.log(document.getElementsByClassName("sc-hBxehG dnsJqu nav-modal").length );
				if(document.getElementsByClassName("sc-hBxehG dnsJqu nav-modal").length > 0){
					console.log("bar ");
					a[1].click(); 
				}
		
			});
			
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



