'use strict';

var baseController = function(model) {
    var ctrl = {};
    ctrl.model = model;

    ctrl.list = function() {
        return this.model.find({});
    };

    ctrl.get = function(id) {
        return this.model.findById(id);
    };

    ctrl.create = function(item) {
        return this.model.create(item);
    };

    ctrl.update = function(id, item) {
        return this.model.findByIdAndUpdate(id, item);
    };

    ctrl.delete = function(id) {
        return this.model.findByIdAndRemove(id);
    };

    return ctrl;
};

module.exports = baseController;
