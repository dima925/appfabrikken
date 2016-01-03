#!/usr/bin/env node

//this hook installs all your plugins

// add your plugins to this list--either 
// the identifier, the filesystem location 
// or the URL
var pluginlist = [
    'cordova-plugin-device',
    'cordova-plugin-whitelist',
    'cordova-plugin-splashscreen',
    'cordova-plugin-dialogs',
    'cordova-plugin-network-information',
    'cordova-plugin-inappbrowser',
    'cordova-plugin-file-transfer',
    'cordova-plugin-x-toast',
    'cordova-plugin-console',
    'com.ionic.keyboard',
    'cordova-plugin-camera',
    'cordova-plugin-crosswalk-webview'
];

// no need to configure below

var fs = require('fs');
var path = require('path');
var sys = require('sys')
var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
    console.log(stdout);
}

pluginlist.forEach(function (plug) {
    exec("ionic plugin add " + plug, puts);
});