(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        var api = {
            "createPage": createPage,
            "updatePage": updatePage,
            "deletePage": deletePage,
            "findPageById": findPageById,
            "findPageByWebsiteId": findPageByWebsiteId
        };
        return api;

        function createPage(websiteId, page) {
            return $http.post("/api/website/" + websiteId + "/page", page);
        }

        function updatePage(pageId, page) {
            return $http.put("/api/page/" + pageId, page);
        }

        function deletePage(pageId) {
            return $http.delete("/api/page/" + pageId);
        }

        function findPageById(pageId) {
            return $http.get("/api/page/" + pageId);
        }

        function findPageByWebsiteId(websiteId) {
            return $http.get("/api/website/" + websiteId + "/page");
        }
    }
})();