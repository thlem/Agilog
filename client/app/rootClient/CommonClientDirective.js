(function(){
	'use strict';

	/**
	 * @Type        : Directive
	 * @Name        : inputText
	 * @Usage       : <balise input-text></balise>
	 * @Param       : function() : Le corps de la directive
	 * @Description : Cette directive gère côté les JS les événements 
	 *                utilisateur liés aux champs formulaire
	 */
	angular.module("agilogClient").directive("inputText", getInputText);

	function getInputText(){
		return{
			restrict:"A",
			link:function(scope, element, attrs){

				var currentInputText 		= $(element[0]),
					currentInputTextLabel 	= $(currentInputText.siblings()[0]);

				currentInputText.on("focus", function(){
					if(!$(currentInputText).val()){
						currentInputTextLabel.addClass("moveLabelToBottom");
					}
				});
				currentInputText.on("focusout", function(){
					if($(currentInputText).val()){
						currentInputTextLabel.addClass("labelOnBottom");
					}
					else{
						currentInputTextLabel.removeClass("labelOnBottom");
					}
					currentInputTextLabel.removeClass("moveLabelToBottom");
				});
			}
		}
	};
})();