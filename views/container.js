var Gaffa = require('gaffa');

function Container(){}
Container = Gaffa.createSpec(Container, Gaffa.ContainerView);
Container.prototype.type = 'container';

Container.prototype.render = function(){    
    this.views.content.element = 
    this.renderedElement = 
    document.createElement(this.tagName || 'div');
    
    this.__super__.render.apply(this, arguments);
};

module.exports = Container;