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
		if(request.carousel == 'carousel-unidades'){
			console.log('unidades');
			appendStyleSheet('unidadesInfoCSS', unidadesInfoCSS);
			mouseOverItems();
		}
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
	else if(request.listeners){
		addListeners();
	}
	else if(request.activity){
		
		activity();
	}
	else if(request.other){
		
		appendStyleSheet('menuFixo', menuFixo);
	}
}
browser.runtime.onMessage.addListener(simplifyPageReceiver);


function addListeners(){
	//window.addEventListener("load", myFunction);
	console.log('loading');
	block = document.getElementById('filter-cards-block-container');
	console.log(block);
	block.addEventListener("onchange", (event) => {
		console.log('load');
		//document.querySelector('.programacao--item--container h6').style.color = 'rgb(39, 153, 193)';
	});
	window.addEventListener("load", (event) => {
		console.log('load');
		//document.querySelector('.programacao--item--container h6').style.color = 'rgb(39, 153, 193)';
	});
	window.onload = (event) => {
    console.log('The page has fully loaded');
	};
}

menuFixo = `
.nav-menu{
  position: fixed !important;
    top: 0;
    z-index:  99;
}
`;
homeCSS = `
	.fNCgwt {
		max-height: 433px;
	}
	.eBaTE {
		max-height: 455px;
	}
	.dnsJqu {
	min-height: 510px;
	}
	.OxmbX {
		margin-left: 5px;
	}
	.search-button{
		width: 46px;
		height: 46px;
		border: 0.2em solid white;
	}
	.search-button img{
		width: 28px;
		height: 23px;		
	}
	.btn-pesquisar.active{
		font-size: 18px !important;
		font-weight: bolder !important;
		padding: 2px 31px !important;
	}
		`;
		
unidadesInfoCSS = `
	nav.nav-unidade .row ul li {
		font-size: 14px;
		font-weight: 800;
	}

	nav.nav-unidade .row ul.unidade-detalhes li a {
		text-decoration: underline;	
	}

	div.container{
		max-width: 1092px !important;
		padding: 0 5px !important;
	}
	
	h6{
		text-decoration: underline!important; text-decoration-color: #3477c8 !important; font-weight: 800; font-size: 1.1rem;
	} 
	h6:hover {color: darkblue !important;} 
	
	.programacao--container .row{
		display: block !important; 
	}
	
	.programacao--item {
		text-align: center;
		margin-left: 150px;
		width: 80%;
		padding-left: 107px;
		padding-right: 211px;
	}
	
	.item--col--link--conteudo--imagem {
		width: calc(50% + 16px);
		height: 143px;
	}
    .__esgotado.programacao--item--imagem--alerta, .alerta.__esgotado{
		left: 232px;
		width: 34%;
	}   
	
	
`;

var atividadeInfo = `
	.evento--sessao--local a {
		color: #3477c8 !important;
		text-decoration: underline;
		font-weight: 800;
		
	}
	.evento--sessao--local a:hover {color: darkblue !important;} 
`; 

var contentCSS = `
	h6{
		text-decoration: underline!important; text-decoration-color: #3477c8 !important; font-weight: 800; font-size: 1.1rem;
	} 
	
	h6:hover {color: darkblue !important;} 
	
	.programacao--container .row{
		display: block !important; 
	}
	
	.programacao--item {
		text-align: center;
		margin-left: 150px;
		width: 80%;
		padding-left: 107px;
		padding-right: 211px;
	}
	
	.item--col--link--conteudo--imagem {
		width: calc(50% + 16px);
		height: 143px;
	}
    .__esgotado.programacao--item--imagem--alerta, .alerta.__esgotado{
		left: 232px;
		width: 34%;
	}   
	
`;


function activity()
{
	appendStyleSheet('atividadeInfo', atividadeInfo);
}
function menuLinks(){
	
	var styles=[];
	styles.push(".nav-wrapper span, a{text-decoration: underline !important; text-decoration-color: white !important; font-weight: 800; font-size: 1.1rem;}");

	styles.push("h6{text-decoration: underline!important; text-decoration-color: #3477c8 !important; font-weight: 800; font-size: 1.1rem;} ");

	styles.push("#dropdownMenuButton {text-decoration: underline !important; text-decoration-color: white !important; font-weight: 800; font-size: 1.1rem; width: 285px;}");
	/*
		.fNCgwt {
			max-height: 433px;
		}
		.eBaTE {
			max-height: 455px;
		}
		.dnsJqu {
		min-height: 510px;
		}
		.OxmbX {
			margin-left: 5px;
		}
	*/

	for(s in styles){
		console.log(document.styleSheets);
		console.log(styles[s]);
		document.styleSheets[0].insertRule(styles[s], 0);
	}
	//document.styleSheets[0].insertRule("nav.nav-wrapper span, a{text-decoration: underline;} ", 0);
	//document.styleSheets[0].insertRule(styles, 0);
	appendStyleSheet('homeCSS', homeCSS);
}



function appendStyleSheet(id, content) {
    if (!document.querySelector("#" + id)) {
        var head = document.head || document.getElementsByTagName("head")[0];
        console.log(head);
        head.appendChild(createStyleElement(id, content));
    }
}

// Creates the style element
function createStyleElement(id, content) {
    var style = document.createElement("style");
    style.type = "text/css";
    style.id = id;

    if (style.styleSheet) {
        style.styleSheet.cssText = content;
    } else {
        style.appendChild(document.createTextNode(content));
    }
    return style;
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

/*window.addEventListener("scroll", (event) => {  
	console.log('teste');
	elements = document.getElementsByClassName('programacao--item--container');
	if(elements.length > 0){
		elements.forEach(item => {
			item.addEventListener("mouseover", (event) => {  
				document.querySelector('.programacao--item--container h6').style.color = 'rgb(39, 153, 193)';
			});
		
			item.addEventListener("mouseout", (event) => {  
				document.querySelector('.programacao--item--container h6').style.color = '#3477c8'
			});
		});
		
	}
}*/
window.addEventListener("load", myFunction);

function myFunction(){
	console.log("asdfadfasf");
}
function mouseOverItems(){
	elements = document.getElementsByClassName('programacao--item--container');
	console.log(elements);
	if(elements.length > 0){
		elements.forEach(item => {
			item.addEventListener("mouseover", (event) => {  
				document.querySelector('.programacao--item--container h6').style.color = 'rgb(39, 153, 193)';
			});
		
			item.addEventListener("mouseout", (event) => {  
				document.querySelector('.programacao--item--container h6').style.color = '#3477c8'
			});
		});
		
	}
	
	
}

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



