"use strict";
//
// INTERLOCK NETWORK & ALEPH ZERO
// PSP34 UNIVERSAL ACCESS NFT - RESTRICTED AREA
//
exports.__esModule = true;
// imports
var child_process_1 = require("child_process");
var https_1 = require("https");
var fs_1 = require("fs");
var socket_io_1 = require("socket.io");
var express = require("express");
var figlet = require("figlet");
// child process paths
var path = require("path");
var restrictedCredentialCheck = path.resolve('restrictedCredentialCheck.js');
// utility functions
var utils_1 = require("./utils");
// specify color formatting
var color = require("cli-color");
var red = color.red.bold;
var green = color.green.bold;
var blue = color.blue.bold;
var cyan = color.cyan;
var magenta = color.magenta.bold;
// constants
var SERVERPORT = 8443;
var somethingUseful;
// setup server
var app = express();
var options = {
    key: (0, fs_1.readFileSync)('./server-creds/key.pem'),
    cert: (0, fs_1.readFileSync)('./server-creds/cert.pem')
};
var httpsServer = (0, https_1.createServer)(options, app);
var io = new socket_io_1.Server(httpsServer);
io.on('connect', function (socket) {
    console.log(blue("\nUA-NFT") + color.bold("|RESTRICTED-AREA-SERVER: ") +
        "client application connected");
    socket.onAny(function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (message == 'request-access') {
            // deal with cleartext credentials
            var username_1 = args[0];
            var password = args[1];
            // get SHA256 hashes
            var userhash = (0, utils_1.getHash)(username_1);
            var passhash = (0, utils_1.getHash)(password);
            // free and force cleanup sensitive info
            password = 0;
            global.gc();
            // fetch the passhash corresponding to userhash from blockchain
            var restrictedCredentialCheckChild = (0, child_process_1.fork)(restrictedCredentialCheck);
            restrictedCredentialCheckChild.send({ userhash: userhash, passhash: passhash });
            restrictedCredentialCheckChild.on('message', function (results) {
                if (results == 'bad-username') {
                    console.log(red("\nUA-NFT") + color.bold("|RESTRICTED-AREA-SERVER: ") +
                        "login fail bad username for client on socket " + cyan("ID ".concat(socket.id)));
                    socket.emit('bad-username');
                    socket.disconnect();
                }
                else if (results == 'bad-password') {
                    console.log(red("\nUA-NFT") + color.bold("|RESTRICTED-AREA-SERVER: ") +
                        "login fail bad password for client on socket " + cyan("ID ".concat(socket.id)));
                    socket.emit('bad-password');
                    socket.disconnect();
                }
                else if (results == 'not-authenticated') {
                    console.log(red("\nUA-NFT") + color.bold("|RESTRICTED-AREA-SERVER: ") +
                        "login fail NFT not authenticated" + cyan("ID ".concat(socket.id)));
                    socket.emit('not-authenticated');
                    socket.disconnect();
                }
                else if (results == 'access-granted') {
                    console.log(green("\nUA-NFT") + color.bold("|RESTRICTED-AREA-SERVER: ") +
                        "login success for client on socket " + cyan("ID ".concat(socket.id)));
                    socket.emit('access-granted');
                    // any further messages are client requests to restricted area server
                    socket.onAny(function (session) {
                        // RESTRICTED AREA BELOW!!!
                        //
                        // only the privileged few who possess a
                        // universal access NFT may interact in this space
                        //
                        // This space (its functionality) will vary according to the given
                        // universal access nft application
                        //
                        var somethingUseful = false;
                        // a cheeky functionality
                        if (session == 'do-something-useful') {
                            somethingUseful = true;
                            console.log(magenta("\nUA-NFT") + color.bold("|RESTRICTED-AREA-SERVER: ") +
                                cyan("".concat(username_1)) + " on socket " + cyan("ID ".concat(socket.id)) +
                                " just did something extremely useful");
                            console.log(magenta("UA-NFT") + color.bold("|RESTRICTED-AREA-SERVER: ") +
                                color.bold("somethingUseful = ") + green("".concat(somethingUseful)));
                            socket.emit('did-something-useful', somethingUseful);
                            // another cheeky functionality
                        }
                        else if (session == 'do-something-useless') {
                            somethingUseful = false;
                            console.log(magenta("\nUA-NFT") + color.bold("|RESTRICTED-AREA-SERVER: ") +
                                cyan("".concat(username_1)) + " on socket " + cyan("ID ".concat(socket.id)) +
                                " just did something extremely useless");
                            console.log(magenta("UA-NFT") + color.bold("|RESTRICTED-AREA-SERVER: ") +
                                color.bold("somethingUseful = ") + red("".concat(somethingUseful)));
                            socket.emit('did-something-useless', somethingUseful);
                            // serve the client some cool graphics
                        }
                        else if (session == 'fetch-art') {
                            console.log(magenta("\nUA-NFT") + color.bold("|RESTRICTED-AREA-SERVER: ") +
                                cyan("".concat(username_1)) + " on socket " + cyan("ID ".concat(socket.id)) +
                                " just fetched ascii art");
                            // generate ascii art
                            figlet('(:  RESTRICTED AREA  :)\n\n\n\n\n\n         ...YOU ROCK!!!', function (err, data) {
                                if (err) {
                                    console.log('Something went wrong...');
                                    console.dir(err);
                                    return;
                                }
                                socket.emit('ascii-art', data);
                            });
                        }
                        else if (session == 'logout') {
                            console.log(magenta("\nUA-NFT") + color.bold("|RESTRICTED-AREA-SERVER: ") +
                                cyan("".concat(username_1)) + " on socket " + cyan("ID ".concat(socket.id)) +
                                " just logged out");
                            socket.disconnect();
                        }
                        // free and force cleanup sensitive info
                        socket.on('disconnect', function () {
                            username_1 = 0;
                            global.gc();
                        });
                        //
                        //
                        // RESTRICTED ACCESS AREA ABOVE!!!
                    });
                }
            });
        }
    });
});
httpsServer.listen(SERVERPORT, function () {
    console.log(blue("\nUA-NFT") + color.bold("|RESTRICTED-AREA-SERVER: ") +
        color.bold("secure https server running from restricted area, ready for connecting applications"));
});
