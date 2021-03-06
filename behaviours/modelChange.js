var Gaffa = require('gaffa'),
    behaviourType = 'modelChange';

    
function executeBehaviour(behaviour, value){
    behaviour.gaffa.actions.trigger(behaviour.actions.change, behaviour);
}

function ModelChangeBehaviour(){}
ModelChangeBehaviour = Gaffa.createSpec(ModelChangeBehaviour, Gaffa.Behaviour);
ModelChangeBehaviour.prototype.type = behaviourType;
ModelChangeBehaviour.prototype.condition = new Gaffa.Property({value: true});
ModelChangeBehaviour.prototype.watch = new Gaffa.Property({
    update: function(behaviour, value){
        var gaffa = behaviour.gaffa;

        if(!behaviour.condition.value){
            return;
        }

        var throttleTime = behaviour.throttle;
        if(!isNaN(throttleTime)){
            var now = new Date();
            if(!behaviour.lastTrigger || now - behaviour.lastTrigger > throttleTime){
                behaviour.lastTrigger = now;
                executeBehaviour(behaviour, value);
            }else{
                clearTimeout(behaviour.timeout);
                behaviour.timeout = setTimeout(function(){
                        behaviour.lastTrigger = now;
                        executeBehaviour(behaviour, value);
                    },
                    throttleTime - (now - behaviour.lastTrigger)
                );
            }
        }else{
            executeBehaviour(behaviour, value);
        }
    },
    sameAsPrevious: function(){
        var changed = typeof this.value === 'object' || this.getPreviousHash() !== this.value;
        this.setPreviousHash(this.value);

        return !changed;
    }
});

module.exports = ModelChangeBehaviour;