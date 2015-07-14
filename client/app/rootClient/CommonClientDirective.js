(function(){
	'use strict';
/**
 * @Type        : Directive
 * @Name        : menuIcoDir
 * @Usage       : <balise menu-ico-dir></balise>
 * @Description : Cette directive gère côté JS les événements 
 *                utilisateur liés aux éléments du menu
 */
angular.module("agilogClient").directive("menuIcoDir", [function(){
	/**
	 * @Type  : function
	 * @Param : scope   : Le scope de la directive
	 * @Param : element : L'élément HTML contenant la directive
	 */
	return function(scope, element){

		// Récupération dans une variable jQuery de l'élément HTML courant
		var menuIco = $(element[0]);
		// Récupération dans une variable du sous menu de l'élément HTML courant
		var hiddenMenuItems = $(menuIco).find("#hiddenMenuItems");

		// Lorsque l'utilisateur survol l'élément
		menuIco.on("mouseenter", function(){
			// On ajoute la classe isHover dont l'animation
			// est géré côté CSS
			menuIco.addClass("isHover");
			// On supprime la classe hideDataTitle qui
			// cache le tooltip de l'élément
			menuIco.removeClass("hideDataTitle");
		});
		// Lorsque l'utilisateur ne survol plus l'élément
		menuIco.on("mouseleave", function(){
			// On supprime la classe isHover ce qui retire le style "survolé"
			menuIco.removeClass("isHover");
			// On supprime la classe hideDataTitle
			menuIco.removeClass("hideDataTitle");
			// On supprime la classe active du sous menu ce qui
			// le cache
			hiddenMenuItems.removeClass("active");
		});
		// Lorsque l'utilisateur click sur l'élément
		menuIco.on("click", function(){
			// On ajoute la classe hideDataTitle qui permet de cacher
			// le tooltip
			menuIco.addClass("hideDataTitle");
			// Calcul de la position du sous menu à afficher
			var topPosition = $(hiddenMenuItems).height();
			// Le sous menu possède : 
			// - Un padding de 5px
			// - Un border de 5px
			// Soit un rajout de 10px en haut et en bas du cadre
			topPosition += 20;
			// On affecte la position du sous menu
			$(hiddenMenuItems).css({top:'-'+topPosition+'px'});
			// Et on lui ajoute la classe active pour l'afficher
			hiddenMenuItems.addClass("active");
		});
	}
}]);

/**
 * @Type        : Directive
 * @Name        : inputText
 * @Usage       : <balise input-text></balise>
 * @Param       : function() : Le corps de la directive
 * @Description : Cette directive gère côté les JS les événements 
 *                utilisateur liés aux champs formulaire
 */
angular.module("agilogClient").directive("inputText", [function(){
	return function(scope, element){

		// Récupération dans une variable jQuery du champ courant
		var input = $(element[0]);
		// Récupération dans une variable jQuery du label associé au champ
		var label = $(input.siblings()[0]);

		// Lorsque l'utilisateur cible le champ
		input.on("focus", function(){
			// Si le champ ne contient aucune valeur on ajoute à son label
			// la classe moveLabelToBottom qui anime en CSS le label
			// en le déplacant vers le bas
			if(!$(input).val()){
				label.addClass("moveLabelToBottom");
			}
			// Si le champ contient déjà une valeur alors on n'anime pas le label
		});
		// Lorsque l'utilisateur quitte le champ
		input.on("focusout", function(){
			// Si le champ contient une valeur
			if($(input).val()){
				// On ajoute à son label la classe labelOnBottom
				// qui permet de le maintenir en bas
				label.addClass("labelOnBottom");
			}
			// Si le champ ne contient pas de valeur
			else{
				// On retire la classe labelOnBottom pour repositionner
				// le label à son emplacement d'origine
				label.removeClass("labelOnBottom");
			}
			// Quelque soit la saisie on supprime la classe liée 
			// à l'animation du label
			label.removeClass("moveLabelToBottom");
		});
	}
}]);
})();