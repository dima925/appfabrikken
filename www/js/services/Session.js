angular.module('starter.services.Session', [])
  .service('Session', function() {

    // private
    var USER_KEY = 'sokolov-foodlogiq-local-storage-user';
    var TOKEN = 'sokolov-foodlogiq-local-storage-token';
    var BISKEY = 'sokolov-foodlogiq-local-storage-businesseskey';
    var LOCATION = 'sokolov-foodlogiq-local-storage-locations';

    var user,businessesId,token, location;
        

    var _session = {};

    var saveUser = function() {
      if (user)
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    };
    
    var saveToken = function() {
      if (token)
        localStorage.setItem(TOKEN, JSON.stringify(token));
    };
    
    var saveBisKey = function() {
      if (businessesId)
        localStorage.setItem(BISKEY, JSON.stringify(businessesId));
    };
    
    var saveLocation = function() {
      if (location)
        localStorage.setItem(LOCATION, JSON.stringify(location));
    };


    (function Init() {
      user = JSON.parse(localStorage.getItem(USER_KEY)) || false;
      token = localStorage.getItem(TOKEN) || false;
      businessesId = localStorage.getItem(BISKEY) || false;
      location = JSON.parse(localStorage.getItem(LOCATION)) || false;
    })();

    // public
    this.clear = function(cb) {
      user = token = businessesId = location = false;
      localStorage.clear();
      cb();
    };

    

    this.setUser = function(u) {
      user = u;
      saveUser();
    };
    
    this.setToken = function(data) {
      token = data;
      saveToken();
    };
    
    this.saveBisKey = function(data) {
      businessesId = data;
      saveBisKey();
    };
    
    this.saveLocation = function(data) {
      location = data;
      saveLocation();
    };
    
    this.user = function() {
      return user;
    };
    
    this.token = function() {
      return token;
    };
    
    this.businessesId = function() {
      return businessesId;
    };
    
    this.location = function() {
      return location;
    };
    

    this.set = function(key, value) {
      _session[key] = value;
    };

    this.get = function(key) {
      return _session[key];
    };

    return this;
  });
