/* --------- HOME CSS ---------*/

menuFixo = `
	.nav-menu{
	  position: fixed !important;
		top: 0;
		z-index:  99;
	}
`;

pageContentCSS = `
	div.container{
		/*max-width: 1092px !important;*/
		max-width: 1186px;
		padding: 0 8px;
		/*padding: 0 5px !important;*/
	}
	
	h6{
		text-decoration: underline!important; 
		text-decoration-color: #3477c8 !important; 
		font-weight: 800; 
		font-size: 18px;
	} 
	
	h6:hover {
		color: darkblue !important;
	} 
	
	.programacao--container .row{
		display: block !important; 
	}
	
	.programacao--item {
		text-align: center;
		margin-left: 175px;
		width: 80%;
		padding-left: 107px;
		padding-right: 211px;
	}
	
	.programacao--item--container {
		paddin: 0 8px !important;
	}
	
	.programacao--item--imagem{
		width: calc(80% + 16px) !important;
		height: 208px !important;
		margin-left: 40px !important;
	}
	
	.item--col--link--conteudo--resumo{
		font-size: 16px !important;
	}
	
	.item--col--link--conteudo--imagem {
		width: calc(50% + 16px);
		height: 143px;
	}
	.__esgotado.programacao--item--imagem--alerta, .alerta.__esgotado{
		left: 232px;
		width: 34%;
	} 
	
	.home--blog .editorial-row{
		display: block !important; 
	}
	
	.item--col {
		max-width: 100%;
		text-align: center;
		margin-left: 175px;
		width: 80%;
		padding-left: 107px;
		padding-right: 211px;	
	}
	
	.item--col--link--conteudo--imagem {
		width: calc(80% + 16px);
		height: 208PX;
		margin-left: 40px;
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
	}	
	
	.programacao--item--complemento{
		font-size: 16px !important;
	}
	.programacao--item--data{
		font-size: 15px !important;
	}
	
`;

programCircleCSS = `
	.fadeCircle{
		
		opacity: 0 !important;
		transform: scale( 1.05 ) !important;
		overflow: hidden !important;
		height: 45px !important;
		transition: transform 1s 0.1s, opacity 4s 0.5s ease-in-out;
		height: 40px !important;
	}
	circle.btnFilter{
		background-color: rgb(7, 248, 218) !important;
		position: absolute;
		transform: scale(0.0);
		opacity: 0.7;	
		margin: 13px;
	}
`;
	
cssBusca = `
	.labelMenu {
		top: 45px;
		position: absolute;
		z-index: 10;
		background-color: rgb(249, 237, 237);
		color: rgb(0, 6, 7);
		text-align: center;
		text-decoration: none;
		padding: 8px;
		margin-left: 16px;
		border: 0.1em solid black;
		visibility: hidden;
		border-radius: 8px;
		font-size: 16px;
		font-weight: 400;
	}
	.fadeLabel {
		visibility: hidden;
		opacity: 0;
		transition: visibility 0s 0.2s, opacity 0.2s linear;
	}
	
	.labelMenuPerfil {
		margin-left: 94px;
		top: 11px !important;
		position: absolute;
		z-index: 10;
		background-color: rgb(249, 237, 237);
		color: rgb(0, 6, 7);
		text-align: center;
		text-decoration: none;
		padding: 8px;			
		border: 0.1em solid black;
		visibility: hidden;
		border-radius: 8px;
	}
	
	button.search-button{

		width: 178px;
		height: 51px;
		border: none;
		color: white;
		font-weight: bold;
		font-size: 16px;
		text-decoration: underline;
		border-radius: 20px;
		font-family: Nunito,sans-serif;
		text-align: center;
		padding: 8px;
	}

	input.sc-dIfARi {
		height: 47px !important;
	}
	.search-button img {
		width: 27px;
		height: 27px;
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


/* serviços */

servicos = `
	#main_header {
		position: fixed !import;
		z-index: 99 !import;
		background-color: white !import;
	}
	
	#content {
		top: 186px;
	}

`;
/*var contentCSS = `
	h6{
		text-decoration: underline!important; 
		text-decoration-color: #3477c8 !important; 
		font-weight: 800; 
		font-size: 1.1rem;
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
	
`;*/


/* --------- UNIDADES CSS ---------*/
unidadesInfoCSS = `
	/* address info  and links */
	nav.nav-unidade .row ul li {
		font-size: 16px;
		font-weight: 800;
	}
	
	nav.nav-unidade .row ul.unidade-detalhes li a {
		text-decoration: underline;	
	}
`;

old_unidadesInfoCSS = `
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
		text-decoration: underline!important; 
		text-decoration-color: #3477c8 !important; 
		font-weight: 800; 
		font-size: 1.1rem;
	} 
	
	h6:hover {
		color: darkblue !important;
	} 
	
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
		/*width: calc(50% + 16px);*/
		/*height: 143px;*/
		width: calc(80% + 16px);
		height: 200px;
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;


	}
    .__esgotado.programacao--item--imagem--alerta, .alerta.__esgotado{
		left: 232px;
		width: 34%;
	}   
	
	.home--blog .editorial-row{
			display: block !important; 
		}
		
	.item--col {
		max-width: 100%;
		text-align: center;
		margin-left: 175px;
		width: 80%;
		padding-left: 107px;
		padding-right: 211px;	
	}
	
	.item--col--link--conteudo--imagem {
		width: calc(80% + 16px);
		height: 208PX;
		margin-left: 40px;
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
	}
	
	
`;

/* --------- ATIVIDADE CSS ---------*/
var atividadeInfo = `
	.evento--sessao--local a {
		color: #3477c8 !important;
		text-decoration: underline !important;
		font-weight: 800 !important;
		font-size: 19px !important;
		
	}
	.evento--sessao--local a:hover {color: darkblue !important;} 
`; 

/* TODO:
	- Check old functions not being used ------- DONE
	- Check changes flow for redundant calls
	- Check changes for how to make 'generic' like apply css changes and listeners according to calls
	- Check distratores file to implement new changes flow
	- Separate CSS and functions of different elements/page in different methods/calls
	- Increase font-size for 'abstract' text in the items (bellow h6)
	- check filter button glow (dleay)
	- Test every page 
*/
function simplifyPageReceiver(request, sender, sendResponse) {
	console.log(request);
	if(request.replacement){
		eatPage(request.replacement);
	}
	else if(request.carousel){
		console.log('carousel', request.carousel);
		carousel();
		if(request.carousel == 'carousel-home' || request.carousel ==  'carousel-other'){
			menuLinks();
			addLabels();
			pageContent();
		}
		
		/*if(request.carousel == 'carousel-unidades'){
			console.log('unidades');
			appendStyleSheet('unidadesInfoCSS', unidadesInfoCSS);
			mouseOverItems();
		}*/
	}
	else if(request.unidades){
		console.log('unidades');
		appendStyleSheet('unidadesInfoCSS', unidadesInfoCSS);
		pageContent();
		carousel();		
	}
	else if(request.unity){
		mouseOverUnity();
	}
	else if(request.searchResults){		
		pageContent();
	}
	else if(request.activity){
		
		activity();
	}
	else if(request.search){
		openSearch();	
		addLabels();		
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
	else if(request.fixmenu){
		
		appendStyleSheet("menuFixo", menuFixo);
	}
	else if(request.other){
		if(request.other == "all"){
			generalPage();
			appendStyleSheet("menuFixo", menuFixo);
		}
	}
}
browser.runtime.onMessage.addListener(simplifyPageReceiver);


/* --------- HOME / GERAL Methods ---------*/

/*- Geral
		- Labels no menu E no logo		
		- Mouseover menu unidades
		- Destaque nos links (todos da pagina com underline) e cor #1797f5
		- Conteúdo em 1 coluna
		- Remover Carrossel
		- botao de busca melhorado
		- Menu fixo
		*/

function generalPage(){
	//addLabels
	addLabels();
	//unitymouseover
	mouseOverUnity();
	
	//Menu Links highlight and page Links highlight
	menuLinks();
	
	// 1 Column content
	pageContent();
	
	//Carousel
	carousel();
		
	// Search button
	//addLabels
	
}


function pageContent(){
	console.log('xcontent');
	
	appendStyleSheet('pageContentCSS', pageContentCSS);
	
	acoes = document.getElementsByClassName('carrossel-acoes');
	if(acoes.length > 0){
		acoes[0].parentNode.style.display = 'none';
	}	
}
function carousel(){
	console.log("carrossel", document.getElementsByClassName("home--destaques"), document.getElementsByClassName("carrossel"));
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


function addLabels(){	
	
	//<span>procurar no site</span>
	/*margin-left: 94px;
top: 11px !important;*/
	console.log('addLabels');
	//label.addEventListener('click', (event) => {label.classList.add('fade');})
	
    
    /*var style = document.createElement("style");
    style.type = "text/css";
    style.id = id;
	head.appendChild(createStyleElement(id, content));*/
	var labelLogo = document.createElement("span");
	labelLogo.classList.add("labelMenu");
    labelLogo.id = 'labelLogo';
	labelLogo.textContent = 'Página inicial';
	
	var logo = "";
	
	console.log('logos');
	if(document.getElementsByClassName('nav-logo').length > 0){
		logo  = document.getElementsByClassName('nav-logo')[0];
		console.log(logo);
		labelLogo.style.top = '55px';
	}
	else if(document.getElementsByClassName('rpl').length > 0){
		logo  = document.getElementsByClassName('rpl')[0];	
		console.log(logo);
		labelLogo.style.top = '95px';
		labelLogo.style.left = '0px';
		labelLogo.style.textIndent = '0';
	}
	else if(document.getElementsByClassName('jss213').length > 0){
		logo  = document.getElementsByClassName('jss213')[0];	
		console.log(logo);
	}
	else if(document.getElementsByClassName('logo').length > 0){
		logo  = document.getElementsByClassName('logo')[0];
		console.log(logo);
		labelLogo.style.top = '74px';
	}
	else if(document.getElementsByTagName('a').length > 0){
		logos = document.getElementsByTagName('a');
		
		
		for(a in logos){
			if(logos[a].href == "https://www.sescsp.org.br/"){
				logo = logos[a];
				console.log(logo);
				labelLogo.style.left = "111px";
			}
		}		
	}
	
	if(logo != ""){
		logo.appendChild(labelLogo);
		
		logo.addEventListener('mouseover', (event) => {		
			labelLogo.classList.remove('fadeLabel');
			labelLogo.visibility = 'visible'
		});
		
		logo.addEventListener('mouseout', (event) => {
			labelLogo.classList.add('fadeLabel');		
		});
		
		logo.addEventListener('click', (event) => {
			labelLogo.classList.add('fadeLabel');
			
		});
		
		labelLogo.style.visibility = 'visible';
		//labelLogo.style.top = '55px';
	}
	
	/*logos = document.getElementsByClassName('nav-logo');	
	if(logos.length == 0){
		logos = document.getElementsByClassName('rpl');
		if(logos.length == 0){
			logos = document.getElementsByClassName('jss213');
			if(logos.length == 0){
				logo = document.getElementsByClassName('logo');
				if(logo.length == 0){
					logos = document.getElementsByTagName('a');
					for(a in logos){
						if(logos[a].href == "https://www.sescsp.org.br/"){
							logo = logos[a];
							console.log(logo);
						}
					}
				}
			}
			else{
				logo = logos[0];
			}			
		}
		else{
			logo = logos[0];
		}
	}
	else {
		console.log(logos);
		logos[0].appendChild(labelLogo);
	}
	*/
	
	//appendStyleSheet('cssBusca', cssBusca);
	//label.addEventListener('mouseover', (event) => {label.classList.add('fadeLabel');});		
	
	
	
	console.log('icons');
	icons = document.getElementsByClassName('sc-bqWxrE');
	appendStyleSheet('cssBusca', cssBusca);
	if(icons.length > 0){
		console.log(icons);
		
		var labelSearch = document.createElement("span");
		labelSearch.classList.add("labelMenu");
		labelSearch.id = 'labelBusca';
		labelSearch.textContent = 'Pesquisar no site';
		icons[0].appendChild(labelSearch);
		
		//label.addEventListener('mouseover', (event) => {label.classList.add('fadeLabel');});		
	
		icons[0].addEventListener('mouseover', (event) => {
			console.log('search');
			if(document.getElementsByClassName('sc-fEXmlR koJJbR search-container').length == 0){
				labelSearch.classList.remove('fadeLabel');
				labelSearch.visibility = 'visible';
			}
			console.log('search 2');
		});
		
		icons[0].addEventListener('mouseout', (event) => {
			labelSearch.classList.add('fadeLabel');
			
		});	
	
		// Done: Change click listener to input on key press listener to add texto to search button
		icons[0].addEventListener('click', (event) => {
			labelSearch.classList.add('fadeLabel');
			setTimeout(function(){
				input = document.getElementsByClassName("sc-dIfARi kuAjmt search-input")[0];
				//console.log(input);
				input.addEventListener('keydown', (event) => {
					setTimeout(function(){
					
						if(event.target.value.length > 2){
							document.getElementsByClassName('search-button')[0].innerHTML = "<img src=\"https://www.sescsp.org.br//wp-content/plugins/sesc-menu/src/assets/loupe.svg\" alt=\"icone de lupa\" width=\"23\" height=\"18\"> Clique para Pesquisar";
						}
					
						//else if(event.target.value.length - 1 < 3){
						else{
							document.getElementsByClassName('search-button')[0].innerHTML = "<img src=\"https://www.sescsp.org.br//wp-content/plugins/sesc-menu/src/assets/loupe.svg\" alt=\"icone de lupa\" width=\"23\" height=\"18\">";
						}
					},100); 
					
				});
			},500); 
			
			/*setTimeout(function(){
				//alert("I am setTimeout");
				document.getElementsByClassName('search-button')[0].innerHTML = "<img src=\"https://www.sescsp.org.br//wp-content/plugins/sesc-menu/src/assets/loupe.svg\" alt=\"icone de lupa\" width=\"23\" height=\"18\"> Clique para Pesquisar";
			},500);   */
			
			
			//console.log("clique");
			
		});	
		labelSearch.style.visibility = 'visible';
		
		var labelPerfil = document.createElement("span");
		labelPerfil.classList.add("labelMenuPerfil");
		labelPerfil.id = 'labelPerfil';
		labelPerfil.textContent = 'Perfil';
		icons[1].appendChild(labelPerfil);
		//appendStyleSheet('cssBusca', cssBusca);
		//label.addEventListener('mouseover', (event) => {label.classList.add('fadeLabel');});		
		
		icons[1].addEventListener('mouseover', (event) => {
			labelPerfil.classList.remove('fadeLabel');
			labelPerfil.visibility = 'visible'
		})	
		icons[1].addEventListener('mouseout', (event) => {
			labelPerfil.classList.add('fadeLabel');
			
		})	
		icons[1].addEventListener('click', (event) => {
			labelPerfil.classList.add('fadeLabel');
			
		})	
		labelPerfil.style.visibility = 'visible';
		
	}
	
	
	
	
	//document.getElementsByClassName('search-button')[0].text
}



function mouseOverUnity(){
	//Menu unidades:
	
	//get unity buttom
	unidades = document.getElementsByClassName('sc-iJnaPW exFzrr toogle-dropdown');
	//add mouse over/out listener		sc-gikAfH eYAQtw toogle-dropdown
	if(unidades.length > 0 ){
		
		unidades[1].addEventListener("mouseover", (event) => {
			//open
			//console.log("over", unidades[1]);
			if(document.getElementsByClassName("sc-hBxehG dnsJqu nav-modal").length == 0){
				//console.log("click");
				unidades[1].click(function() {
					console.log(document.getElementsByClassName("sc-hBxehG dnsJqu nav-modal"));
				});
				
				bar = document.getElementsByClassName('sc-lllmON dVWbfY nav-item');
				for(i=2; i < bar.length; i++){
					bar[i].addEventListener("mouseover", (event) => {
						//close unity
						//console.log("over bar");
						//console.log(document.getElementsByClassName("sc-hBxehG dnsJqu nav-modal").length );
						if(document.getElementsByClassName("sc-hBxehG dnsJqu nav-modal").length > 0){
							//console.log("bar ");
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
	}
	
	
	
	
	/*a[1].addEventListener("mouseout", (event) => {
		//close unity
		if(document.getElementsByClassName("sc-hBxehG dnsJqu nav-modal").length > 0)
			a[1].click(); 
		//added to close other menu
		document.getElementsByClassName('sc-gikAfH gYIFLn toogle-dropdown')[0].click();
	});*/

}


function openProgramFilter(){
	//console.log('program');
	//Menu de programação
	//document.getElementById('dropdownMenuButton').click();
	
	
	button = document.getElementById('dropdownMenuButton');
	circle = document.getElementById('programCircle')
	if(circle){
		circle.classList.remove('fadeCircle');
		circle.style.display = 'block';
		//alert("before setTimeout");
		setTimeout(function(){
			//alert("I am setTimeout");			
			circle.classList.add('fadeCircle');
			setTimeout(function(){
				//alert("I am setTimeout");
				circle.style.display = 'none';
			},3000); //delay is in milliseconds    
	   },300); //delay is in milliseconds 
		
		
	}
	else {
		var circle = document.createElement("circle");
		circle.classList.add("btnFilter");
		circle.id = 'programCircle';
		//circle.style.backgroundColor = 'rgb(203, 208, 214)';//#84a4ca';
		//circle.style.opacity = '0.6';
		circle.style.position = 'absolute';
		
		circle.addEventListener('click', (event) => { 
			document.getElementById('dropdownMenuButton').click();
		});
		
		
		
		//labelSearch.textContent = 'Pesquisar no site';
		button.parentNode.appendChild(circle);
		appendStyleSheet('programCircleCSS', programCircleCSS)//.then(
		
		//alert("before setTimeout");
		setTimeout(function(){
			//alert("I am setTimeout");
			circle.classList.add('fadeCircle');
			
			setTimeout(function(){
				//alert("I am setTimeout");
				circle.style.display = 'none';
			},5000); //delay is in milliseconds    
	   },1000); //delay is in milliseconds 
	}
	   
	//alert("after setTimeout");	
	
}

function menuLinks(){
	
	var styles=[];
	styles.push(".nav-wrapper span, .nav-wrapper a{text-decoration: underline !important; font-weight: 800; font-size: 18px; color: white !important;}");

	styles.push("h6{text-decoration: underline!important; text-decoration-color: #3477c8 !important; font-weight: 800; font-size: 18px;} ");

	styles.push("#dropdownMenuButton {text-decoration: underline !important; text-decoration-color: white !important; font-weight: 800; font-size: 18px; width: 285px;}");
	
	styles.push("a{text-decoration: underline !important; font-weight: 800 !important; font-size: 18px !important; color: #3477C8 !important}");
	styles.push("a:hover{text-decoration: underline !important; font-weight: 800 !important; font-size: 18px !important; color: darkblue !important}");
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
		//console.log(document.styleSheets);
		//console.log(styles[s]);
		document.styleSheets[0].insertRule(styles[s], 0);
	}
	//document.styleSheets[0].insertRule("nav.nav-wrapper span, a{text-decoration: underline;} ", 0);
	//document.styleSheets[0].insertRule(styles, 0);
	appendStyleSheet('homeCSS', homeCSS);
}

/* --------- ACTIVITY Methods ---------*/
// TODO: ADD Change position of name of unity
function activity()
{
	unidade = document.getElementsByClassName('evento--sessao--local');
	if(unidade.length > 0){
		if(unidade[0].children.length > 0)
		{
			if(unidade[0].children[0].tagName == "A");{
				link = unidade[0].children[0];
				var linkElement = document.createElement("a");
				linkElement.href = unidade[0].children[0].href;
				linkElement.text = " (Unidade: " + unidade[0].children[0].text +  ")";
				
				local = document.getElementsByClassName('evento--sessao--entrada--local');
				if(local.length > 0){
					local[0].appendChild(linkElement);
					local[0].classList.add('evento--sessao--local');
				}
			}
		}
		
	}
	appendStyleSheet('atividadeInfo', atividadeInfo);
}


function appendStyleSheet(id, content) {
    if (!document.querySelector("#" + id)) {
        var head = document.head || document.getElementsByTagName("head")[0];
        //console.log(head);
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



/*function addListeners(){
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
}*/


/*function pageBorder(){
	document.body.style.border = "5px solid red";
}*/

/*function eatPage(replacement){
	/*document.body.textContent = "";
	let header = document.createElement('h1');
	header.textContent = "This page has been eaten";
	document.body.appendChild(header);*/
	/*document.body.textContent = "";
	let header = document.createElement('h1');
	header.textContent = replacement;
	document.body.appendChild(header);
}*/



function openSearch(){
	//abrir busca
	//search = document.getElementsByClassName("sc-bqWxrE beWxO nav-button toogle-modal");
	//search[0].click();
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
/*function mouseOverItems(){
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
}*/





