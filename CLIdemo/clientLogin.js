"use strict";
//
// INTERLOCK NETWORK & ALEPH ZERO
// PSP34 UNIVERSAL ACCESS NFT - CLIENT LOGIN
//
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// imports (anything polkadot with node-js must be required)
var _a = require('@polkadot/api'), ApiPromise = _a.ApiPromise, WsProvider = _a.WsProvider, Keyring = _a.Keyring;
var _b = require('@polkadot/api-contract'), ContractPromise = _b.ContractPromise, CodePromise = _b.CodePromise;
var _c = require('@polkadot/keyring'), decodeAddress = _c.decodeAddress, encodeAddress = _c.encodeAddress;
var WeightV2 = require('@polkadot/types/interfaces');
// imports
var socket_io_client_1 = require("socket.io-client");
var prompts = require("prompts");
// specify color formatting
var color = require("cli-color");
var red = color.red.bold;
var green = color.green.bold;
var blue = color.blue.bold;
var cyan = color.cyan;
var yellow = color.yellow.bold;
var magenta = color.magenta;
var OWNER_MNEMONIC = process.env.OWNER_MNEMONIC;
// setup socket connection with autheticateWallet script
var socket = (0, socket_io_client_1.io)('https://localhost:8443', {
    rejectUnauthorized: false
});
socket.on('connect', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log(blue("ACCESSNFT:") +
            " accessApp socket connected, ID " + cyan("".concat(socket.id)));
        // begin prompt tree
        //
        // first prompt: login username
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var responseUsername, username;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prompts({
                            type: 'text',
                            name: 'username',
                            message: 'Please enter your username.',
                            validate: function (username) { return !isValidUsername(username) ?
                                red("ACCESSNFT: ") + "Too short or contains spaces." : true; }
                        })];
                    case 1:
                        responseUsername = _a.sent();
                        username = responseUsername.username;
                        console.log('');
                        // second prompt: password
                        (function () { return __awaiter(void 0, void 0, void 0, function () {
                            var responsePassword, password;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, prompts({
                                            type: 'password',
                                            name: 'password',
                                            message: 'Please enter your password.',
                                            validate: function (password) { return (password.length < 8) ?
                                                red("ACCESSNFT: ") + "Password invalid." : true; }
                                        })];
                                    case 1:
                                        responsePassword = _a.sent();
                                        password = responsePassword.password;
                                        console.log('');
                                        console.log(green("ACCESSNFT: ") +
                                            "submitting login information over secure connection for verification\n");
                                        socket.emit('request-access', username, password);
                                        socket.onAny(function (message) {
                                            var args = [];
                                            for (var _i = 1; _i < arguments.length; _i++) {
                                                args[_i - 1] = arguments[_i];
                                            }
                                            if (message == 'bad-username') {
                                                console.log(red("ACCESSNFT: ") +
                                                    "username is incorrect or does not exist...please try again");
                                                console.log('');
                                                process.send('fail');
                                                process.exit();
                                            }
                                            else if (message == 'bad-password') {
                                                console.log(red("ACCESSNFT: ") +
                                                    "password is incorrect...please try again");
                                                console.log('');
                                                process.send('fail');
                                                process.exit();
                                            }
                                            else if (message == 'access-granted') {
                                                console.clear();
                                                console.log("SUCCESS!!!\n\n\n\n\n\n\n");
                                                socket.emit('fetch-art');
                                                socket.on('ascii-art', function (art) {
                                                    console.log(red("\n\n".concat(art)));
                                                    console.log("\n\n\n\n\n\n\n");
                                                    // prompt
                                                    //
                                                    // do something useful?
                                                    (function () { return __awaiter(void 0, void 0, void 0, function () {
                                                        var responseSomething, something;
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0: return [4 /*yield*/, prompts({
                                                                        type: 'confirm',
                                                                        name: 'something',
                                                                        message: 'do something useful?'
                                                                    })];
                                                                case 1:
                                                                    responseSomething = _a.sent();
                                                                    something = responseSomething.something;
                                                                    console.log('');
                                                                    if (something) {
                                                                        socket.emit('do-something-useful');
                                                                    }
                                                                    else {
                                                                        socket.emit('do-something-useless');
                                                                    }
                                                                    return [2 /*return*/];
                                                            }
                                                        });
                                                    }); })();
                                                });
                                                socket.on('did-something-useful', function (result) {
                                                    console.log(green('You just did something useful by setting somethingUseful=true in the restricted area..\n'));
                                                    (function () { return __awaiter(void 0, void 0, void 0, function () {
                                                        var choice;
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0: return [4 /*yield*/, prompts({
                                                                        type: 'select',
                                                                        name: 'logout',
                                                                        message: 'Now choose one of the following options:',
                                                                        choices: [{ title: 'logout now', value: 'logout' }]
                                                                    })];
                                                                case 1:
                                                                    choice = _a.sent();
                                                                    console.log('');
                                                                    socket.emit('logout');
                                                                    console.log('goodbye\n');
                                                                    process.send('done');
                                                                    process.exit();
                                                                    return [2 /*return*/];
                                                            }
                                                        });
                                                    }); })();
                                                });
                                                socket.on('did-something-useless', function (result) {
                                                    console.log(red('You just did something useless by setting somethingUseful=false in the restricted area..\n'));
                                                    (function () { return __awaiter(void 0, void 0, void 0, function () {
                                                        var choice;
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0: return [4 /*yield*/, prompts({
                                                                        type: 'select',
                                                                        name: 'logout',
                                                                        message: 'Now choose one of the following options:',
                                                                        choices: [{ title: 'logout now', value: 'logout' }]
                                                                    })];
                                                                case 1:
                                                                    choice = _a.sent();
                                                                    console.log('');
                                                                    socket.emit('logout');
                                                                    console.log('goodbye\n');
                                                                    process.send('done');
                                                                    process.exit();
                                                                    return [2 /*return*/];
                                                            }
                                                        });
                                                    }); })();
                                                });
                                            }
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        }); })();
                        return [2 /*return*/];
                }
            });
        }); })();
        return [2 /*return*/];
    });
}); });
// Check if valid username.
var isValidUsername = function (username) {
    try {
        // search for any whitespace
        if (/\s/.test(username)) {
            // username not valid
            return false;
            // make sure not too short
        }
        else if (username.length < 5) {
            // username not valid
            return false;
        }
        // username valid
        return true;
    }
    catch (error) {
        return false;
    }
};
