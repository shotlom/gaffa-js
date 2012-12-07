(function(undefined) {
    var viewType = "group",
    gaffa = window.gaffa;
    
    window.gaffa.views = window.gaffa.views || {};
    window.gaffa.views[viewType] = window.gaffa.views[viewType] || newView();
    
    function createElement(viewModel) {
        var classes = viewType;
        
        var renderedElement = $(document.createElement('div')).addClass(classes)[0];
        
        viewModel.views.groups.element = renderedElement;
		viewModel.views.empty.element = renderedElement;
        
        return renderedElement;
    }

    function newView() {
        
        function view() {
        }    
        
        view.prototype = {
            update: {             
                groups: window.gaffa.propertyUpdaters.group(
                    "groups",                     
                    //increment
                    function(viewModel, groups, addedItem){
                        var listViews = viewModel.views.groups,
                            property = viewModel.groups,
                            expression = "(filterKeys [~] {item (= item." + property.group + " " + addedItem.group + ")})";
                            
                        $.extend(true, addedItem, property.template);
                        
                        addedItem.properties.list.binding = expression;
                            
                        window.gaffa.views.add(addedItem, viewModel, listViews);
                        window.gaffa.views.render(listViews, listViews.element);
                    },
                    //decrement
                    function(viewModel, groups, removedItem){
                        $(removedItem.renderedElement).remove();
                    },
                    //empty
                    function(viewModel, insert){
                        var emptyViews = viewModel.views.empty,
                            property = viewModel.groups;
							
						if(!property.emptyTemplate){
							return;
						}
						
						if(insert){
							if(!emptyViews.length){
								window.gaffa.views.add($.extend(true, {}, property.emptyTemplate), viewModel, emptyViews);
								window.gaffa.views.render(emptyViews, emptyViews.element);
							}
						}else{
							while(emptyViews.length){
								viewModel.renderedElement.removeChild(emptyViews.pop().renderedElement);
							}
						}
                    }
                )
            },
            defaults: {
                views:{
                    groups: [],
                    empty: []
                },
                properties: {
                    groups: {}
                }
            }
        };
        
        $.extend(true, view.prototype, window.gaffa.views.base(viewType, createElement), view.prototype);
                
        return new view();
    }
})();