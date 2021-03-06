module.exports = function () {
    var q = require("q");
    var mongoose = require("mongoose");
    var widgetSchema = require("./widget.schema.server.js")();
    var widgetModel = mongoose.model("Widget", widgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };
    return api;

    function createWidget(pageId, widget) {
        var d = q.defer();
        widget._page = pageId;
        widgetModel.create(widget, function (err, widget) {
            if (err) { d.reject(err); }
            else { d.resolve(widget); }
        });
        return d.promise;
    }

    function findAllWidgetsForPage(pageId) {
        var d = q.defer();
        widgetModel.find({_page: pageId}, function (err, widgets) {
            if (err) { d.reject(err); }
            else { d.resolve(widgets); }
        });
        return d.promise;
    }

    function findWidgetById(widgetId) {
        var d = q.defer();
        widgetModel.findOne({_id: widgetId}, function (err, widget) {
            if (err) { d.reject(err); }
            else { d.resolve(widget); }
        });
        return d.promise;
    }

    function updateWidget(widgetId, widget) {
        var d = q.defer();
        widgetModel.update({_id: widgetId}, {$set: widget}, function (err, widget) {
            if (err) { d.reject(err); }
            else { d.resolve(widget); }
        });
        return d.promise;
    }

    function deleteWidget(widgetId) {
        var d = q.defer();
        widgetModel.remove({_id: widgetId}, function (err, status) {
            if (err) { d.reject(err); }
            else { d.resolve(status); }
        });
        return d.promise;
    }

    function reorderWidget(pageId, start, end) {
        
    }
};