(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {
            "createWidget": createWidget,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "findWidgetById": findWidgetById,
            "findWidgetsByPageId": findWidgetsByPageId
        };
        return api;

        function createWidget(pageId, widget) {
            return $http.post("/api/page/" + pageId + "/widget", widget);
        }

        function updateWidget(widgetId, widget) {
            return $http.put("/api/widget/" + widgetId, widget);
        }

        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/" + widgetId);
        }

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/" + widgetId);
        }

        function findWidgetsByPageId(pageId) {
            return $http.get("/api/page/" + pageId + "/widget");
        }
    }
})();