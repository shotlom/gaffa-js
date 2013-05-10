(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        throw "Gaffa must be compiled with browserify";
    }
}(this, function(){
    var Gaffa = require('gaffa'),
        actionType = "switch";
    
    function Switch(){}
    Switch = Gaffa.createSpec(Switch, Gaffa.Action);
    Switch.prototype.type = actionType;
    Switch.prototype['switch'] = new Gaffa.Property();

    Switch.prototype.trigger = function() {
        this.__super__.trigger.apply(this, arguments);

        this.gaffa.actions.trigger(this.actions[this['switch'].value], this);
    };
    
    
    
    return Switch;
    
}));