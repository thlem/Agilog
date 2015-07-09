var navigationModule = angular.module("navigationModule", []);

/**
 * Service
 */
navigationModule.service("NavigationService", [function(){

	this.menuElements = {
 		elements:[
 			{
 				title:"Accueil",
 				link:"#/",
 				imgSrc:"./images/homeIco.png",
 				show:null,
 				hide:null,
 				subElements:null
 			},
 			{
 				title:"Connexion - Déconnexion",
 				link:null,
 				imgSrc:"./images/loggedIco.png",
 				show:null,
 				hide:null,
 				subElements:[{
 					libelle:"Se Connecter",
 					link:"#/login",
 					show:null,
 					hide:"root.user",
 					subElements:[{
 						libelle:"Se Connecter 22",
	 					link:"#/login",
	 					show:null,
	 					hide:"root.user",
 					}]
				},
				{
					libelle:"Se Déconnecter",
 					link:"#/logout",
 					show:"root.user",
 					hide:null,
 					subElements:null
				},
				{
					libelle:"S'enregistrer",
 					link:"#/register",
 					show:null,
 					hide:"root.user",
 					subElements:null
				}]
			},
			{
 				title:"Gestion de votre compte",
 				link:"#/account",
 				imgSrc:"./images/accountIco.png",
 				show:"root.user",
 				hide:null,
 				subElements:null
 			},
 			{
 				title:"Liste de vos projets",
 				link:"#/",
 				imgSrc:"./images/projectsIco.png",
 				show:"root.user",
 				hide:null,
 				subElements:null
 			}
 		] 		
 	};

}]);

/**
 * Directive
 */
 navigationModule.directive("navigationDir", ["NavigationService", "$compile", function(NavigationService, $compile){
 	
	var getMenuElement = function(elementData){
 		var element = $("<li>", {"class":"navigation-menu-item", "data-title":elementData.title, "navigation-menu-item-dir":""});

 		if(elementData.link){
 			element.append($("<a>", {"href":elementData.link}).append($("<img>", {"src":elementData.imgSrc, "class":"navigation-menu-item-img"})));
 		}
 		else{
	 		element.append($("<img>", {"src":elementData.imgSrc, "class":"navigation-menu-item-img"}));
	 	}

 		if(elementData.subElements){

 			var subElement = $("<ul>", {"id":"navigation-main-sub-menu"});

 			$.each(elementData.subElements, function(){
 				subElement.append(getMenuSubElement(this));
 			});
 			element.append(subElement);
 		}

 		return element;
 	};

 	 var getMenuSubElement = function(subElement){
 		var element = $("<li>", {"class":"navigation-all-sub-menu-item"});
 		element.append($("<a>", {"href":subElement.link, "html":subElement.libelle}));

 		if(subElement.subElements){
 			var sub = $("<ul>", {"class":"navigation-other-sub-menu"});

 			$.each(subElement.subElements, function(){
 				var subSub = getMenuSubElement(this);
 				sub.append(subSub);
 			});
 			
 			element.append(sub);
 		}

 		return element;
 	};

 	return {
 		restrict: "E",
		link: function(scope, element, attrs){

			var nav = $("<nav>", {"role":"navigation"});
			var navOpenClose = $("<navigation-open-close-dir>");
			nav.append(navOpenClose);

			var menu = $("<ul>", {"id":"navigation-menu"});

	 		$.each(NavigationService.menuElements.elements, function(){
	 			menu.append(getMenuElement(this));
	 		});

			nav.append(menu);
			nav = $compile(nav)(scope);
			element.append(nav);
		}
 	}
 }]);

/**
 * Directive
 */
 navigationModule.directive("navigationOpenCloseDir", [function(){
 	return {
 		restrict: "E",
 		template: "<span class='navigationn-open-close-button navigation-close'>Menu</span>",
 		link: function(scope, element, attrs){

 			var isOpen = false;
 			var yValue = 0;
 			var span = $($(element).find("span")[0]);

 			element.on("click", function(){

 				if(isOpen){
 					yValue = -60;
 					span.addClass("navigation-close").removeClass("navigation-open");
 				}
 				else{
 					yValue = 0;
 					span.addClass("navigation-open").removeClass("navigation-close");
 				}
 				isOpen = !isOpen;

 				$(this).parent().clearQueue().stop().animate({
 					bottom : yValue+"px"
 				},500);
 			});

 			element.on("mouseenter", function(){

 				span.addClass("navigation-hover");

 			});

 			element.on("mouseleave", function(){

 				span.removeClass("navigation-hover");

 			});
 		}
 	}
 }]);

/**
 * Directive
 */
 navigationModule.directive("navigationMenuItemDir", [function(){
	/**
	 * @Type  : function
	 * @Param : scope   : Le scope de la directive
	 * @Param : element : L'élément HTML contenant la directive
	 */
	return function(scope, element){

		// Récupération dans une variable jQuery de l'élément HTML courant
		var menuIco = $(element[0]);
		// Récupération dans une variable du sous menu de l'élément HTML courant
		var navigationMainSubMenu = $(menuIco).find("#navigation-main-sub-menu");

		// Lorsque l'utilisateur survol l'élément
		menuIco.on("mouseenter", function(){
			// On ajoute la classe navigation-menu-item-hover dont l'animation
			// est géré côté CSS
			menuIco.addClass("navigation-menu-item-hover");
			// On supprime la classe ide-navigation-menu-item-title qui
			// cache le tooltip de l'élément
			menuIco.removeClass("hide-navigation-menu-item-title");
		});
		// Lorsque l'utilisateur ne survol plus l'élément
		menuIco.on("mouseleave", function(){
			// On supprime la classe navigation-menu-item-hover ce qui retire le style "survolé"
			menuIco.removeClass("navigation-menu-item-hover");
			// On supprime la classe ide-navigation-menu-item-title
			menuIco.removeClass("hide-navigation-menu-item-title");
			// On supprime la classe active du sous menu ce qui
			// le cache
			navigationMainSubMenu.removeClass("active");
		});
		// Lorsque l'utilisateur click sur l'élément
		menuIco.on("click", function(){
			// On ajoute la classe ide-navigation-menu-item-title qui permet de cacher
			// le tooltip
			menuIco.addClass("hide-navigation-menu-item-title");
			// Calcul de la position du sous menu à afficher
			var topPosition = $(navigationMainSubMenu).height();
			// Le sous menu possède : 
			// - Un padding de 5px
			// - Un border de 5px
			// Soit un rajout de 10px en haut et en bas du cadre
			topPosition += 20;
			// On affecte la position du sous menu
			$(navigationMainSubMenu).css({top:'-'+topPosition+'px'});
			// Et on lui ajoute la classe active pour l'afficher
			navigationMainSubMenu.addClass("active");
		});
	}
}]);