module.exports = function () {
    var q = require("q");
    var mongoose = require("mongoose");
    var userSchema = require("./user.schema.server.js")();
    var userModel = mongoose.model("User", userSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function createUser(user) {
        var deferred = q.defer();
        userModel.create(user, function (err, user) {
            if (err) { deferred.abort(err); }
            else { deferred.resolve(user); }
        });
        return deferred.promise;
    }
    
    function findUserById(userId) {
        var deferred = q.defer();
        userModel.findOne({_id: userId}, function (err, user) {
            if (err) { deferred.abort(err); }
            else { deferred.resolve(user); }
        });
        return deferred.promise;
    }
    
    function findUserByUsername(username) {
        var deferred = q.defer();
        userModel.findOne({username: username}, function (err, user) {
            if (err) { deferred.abort(err); }
            else { deferred.resolve(user); }
        });
        return deferred.promise;
    }
    
    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        userModel.findOne({username: username, password: password}, function (err, user) {
            if (err) { deferred.abort(err); }
            else { deferred.resolve(user); }
        });
        return deferred.promise;
    }
    
    function updateUser(userId, user) {
        var deferred = q.defer();
        userModel.update({_id: userId},
            {
                username: user.username,
                firstName:user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone
            },
            function (err, user) {
                if (err) { deferred.abort(err); }
                else { deferred.resolve(user); }
            }
        );
        return deferred.promise;
    }
    
    function deleteUser(userId) {
        var deferred = q.defer();
        userModel.remove({_id: userId}, function (err, status) {
            if (err) { deferred.abort(err); }
            else { deferred.resolve(status); }
        });
        return deferred.promise;
    }
};