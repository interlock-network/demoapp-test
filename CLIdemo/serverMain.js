"use strict";
//
// INTERLOCK NETWORK & ALEPH ZERO
// PSP34 UNIVERSAL ACCESS NFT - SERVER MAIN
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
// 
// This is the parent script for the access NFT authentication process.
// It runs persistently, and spawns a verifyWalletChild process each time somebody
// wishes to authenticate the fact that they possess an access NFT,
// to establish access credentials of some sort. This script is meant to
// be simple, limited to listening for requests to authenticate, and spawing
// script to gather credentials in the case of authentication success.
//
var child_process_1 = require("child_process");
// child process paths
var path = require("path");
var verifyWallet = path.resolve('serverVerifyWallet.js');
var setCredentials = path.resolve('serverSetCredential.js');
var setAuthenticated = path.resolve('serverSetAuthenticated.js');
var mint = path.resolve('serverMint.js');
// environment constants
var dotenv = require("dotenv");
dotenv.config();
// utility functions
var utils_1 = require("./utils");
// specify color formatting
var color = require("cli-color");
var red = color.red.bold;
var green = color.green.bold;
var blue = color.blue.bold;
var cyan = color.cyan;
var yellow = color.yellow.bold;
var magenta = color.magenta;
// server
var express = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var app = express();
var httpServer = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(httpServer);
// constants
var OWNER_ADDRESS = process.env.OWNER_ADDRESS;
var AMOUNT = 1;
var NFTPRICE = 10000000000000; // pico TZERO = 10 TZERO
// map to keep track of waiting wallet transfers
// mapping is [wallet -> socketID]
var walletInfo = new Map();
var mintQueue = new Map();
function authenticateWallet(socket) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, api, contract, notAuthenticatedId;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, utils_1.setupSession)('authenticateWallet')];
                case 1:
                    _a = _b.sent(), api = _a[0], contract = _a[1];
                    // successful authenticateWallet initialization
                    console.log(green("ACCESSNFT:") +
                        color.bold(" core access authentication service initialized"));
                    console.log('');
                    console.log(color.bold("           ! please initialize or connect NFT access application"));
                    console.log('');
                    // subscribe to system events via storage
                    api.query.system.events(function (events) {
                        // loop through the Vec<EventRecord>
                        events.forEach(function (record) {
                            // get data from the event record
                            var event = record.event, phase = record.phase;
                            // listen for Transfer events
                            if (event.method == 'Transfer') {
                                var sendingWallet = event.data[0];
                                var receivingWallet = event.data[1];
                                var transferAmount = event.data[2];
                                //console.log(event)
                                // check for verification transfers
                                //
                                // from Interlock
                                if (sendingWallet == OWNER_ADDRESS &&
                                    transferAmount == AMOUNT) {
                                    console.log(green("ACCESSNFT:") +
                                        color.bold(" authentication transfer complete to wallet ") + magenta("".concat(event.data[1])));
                                    console.log(yellow("ACCESSNFT:") +
                                        " waiting on returning verification transfer to wallet " + magenta("".concat(event.data[1])));
                                    //
                                    // from wallet holder
                                }
                                else if (receivingWallet == OWNER_ADDRESS &&
                                    transferAmount == AMOUNT) {
                                    var clientWallet_1 = sendingWallet.toHuman();
                                    var clientSocketId_1 = walletInfo.get(clientWallet_1)[0];
                                    var userhash_1 = walletInfo.get(clientWallet_1)[1];
                                    var passhash_1 = walletInfo.get(clientWallet_1)[2];
                                    var nftId_1 = walletInfo.get(clientWallet_1)[3];
                                    console.log(green("ACCESSNFT:") +
                                        color.bold(" verification transfer complete from wallet ") + magenta("".concat(clientWallet_1)));
                                    console.log(green("ACCESSNFT:") +
                                        " wallet " + magenta("".concat(clientWallet_1)) + " is verified");
                                    // notify the client that their transfer was recorded
                                    io.to(clientSocketId_1).emit('payment-received', [nftId_1]);
                                    // change contract state to indicate nft is authenticated
                                    var setAuthenticatedChild = (0, child_process_1.fork)(setAuthenticated);
                                    setAuthenticatedChild.send(clientWallet_1);
                                    // listen for results of setAuthenticated process child
                                    setAuthenticatedChild.on('message', function (message) {
                                        // communicate to client application that isauthenticated is set true
                                        io.to(clientSocketId_1).emit('setAuthenticated-complete', [nftId_1]);
                                        // fork process to set credentials provided at authenticate-wallet call
                                        var setCredentialsChild = (0, child_process_1.fork)(setCredentials);
                                        setCredentialsChild.send({
                                            wallet: clientWallet_1,
                                            id: nftId_1,
                                            userhash: userhash_1,
                                            passhash: passhash_1
                                        });
                                        // listen for results of 
                                        setCredentialsChild.on('message', function () {
                                            io.to(clientSocketId_1).emit('credential-set', [nftId_1, userhash_1, passhash_1]);
                                            walletInfo["delete"](clientWallet_1);
                                        });
                                    });
                                }
                                else if (receivingWallet == OWNER_ADDRESS &&
                                    mintQueue.has(sendingWallet.toHuman()) &&
                                    transferAmount.toNumber() == mintQueue.get(sendingWallet.toHuman())[1]) {
                                    var recipient_1 = sendingWallet.toHuman();
                                    var clientSocketId_2 = mintQueue.get(recipient_1)[0];
                                    console.log(green("ACCESSNFT:") +
                                        color.bold(" NFT payment transfer complete from wallet ") + magenta("".concat(recipient_1)));
                                    console.log(green("ACCESSNFT:") +
                                        " minting NFT for wallet " + magenta("".concat(recipient_1)));
                                    // notify the client that their transfer was recorded
                                    io.to(clientSocketId_2).emit('minting-nft', [NFTPRICE]);
                                    // fire up minting script
                                    var mintChild = (0, child_process_1.fork)(mint);
                                    mintChild.send(recipient_1);
                                    // listen for results of setAuthenticated process child
                                    mintChild.on('message', function (message) { return __awaiter(_this, void 0, void 0, function () {
                                        var _a, gasRequired, storageDeposit, RESULT_collection, OUTPUT_collection, collection, nftId;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0: return [4 /*yield*/, (0, utils_1.contractGetter)(api, socket, contract, 'Main', 'getCollection', recipient_1)];
                                                case 1:
                                                    _a = _b.sent(), gasRequired = _a[0], storageDeposit = _a[1], RESULT_collection = _a[2], OUTPUT_collection = _a[3];
                                                    collection = JSON.parse(JSON.stringify(OUTPUT_collection));
                                                    nftId = Array.from(collection.ok.ok).pop();
                                                    // communicate to client application that mint of nft ID successful
                                                    io.to(clientSocketId_2).emit('mint-complete', [nftId]);
                                                    mintQueue["delete"](recipient_1);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                }
                            }
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
// interprocess and server client-app messaging
io.on('connection', function (socket) {
    // relay all script events to application
    socket.onAny(function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(void 0, void 0, void 0, function () {
            var wallet_1, userhash, passhash, verifyWalletChild, waitingWallet, waitingNftId, recipient_2, hash, nftId, wallet, walletID, clientSocketId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(message == 'authenticate-nft')) return [3 /*break*/, 1];
                        wallet_1 = args[0][0];
                        userhash = args[0][1];
                        passhash = args[0][2];
                        // store wallet -> socketID in working memory
                        if (!walletInfo.has(wallet_1)) {
                            walletInfo.set(wallet_1, [socket.id, userhash, passhash, 0]);
                            verifyWalletChild = (0, child_process_1.fork)(verifyWallet);
                            verifyWalletChild.send(wallet_1);
                            verifyWalletChild.on('message', function (contents) {
                                if (contents == 'all-nfts-authenticated') {
                                    io.to(socket.id).emit('all-nfts-authenticated');
                                    walletInfo["delete"](wallet_1);
                                }
                                else {
                                    io.to(socket.id).emit("".concat(contents));
                                }
                                return;
                            });
                        }
                        else {
                            waitingWallet = walletInfo.get(wallet_1);
                            waitingNftId = waitingWallet[3];
                            io.to(socket.id).emit('already-waiting', [waitingNftId]);
                            socket.disconnect();
                            console.log(red("ACCESSNFT:") +
                                " already waiting for wallet " + magenta("".concat(wallet_1)) + " to return micropayment");
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 4];
                    case 1:
                        if (!(message == 'mint-nft')) return [3 /*break*/, 3];
                        recipient_2 = args[0][0];
                        // log that we are expecting payment of NFTPRICE from recipient in immediate future
                        //
                        // payments to OWNER account that have not requested an nft mint will not be honored
                        mintQueue.set(recipient_2, [socket.id, NFTPRICE]);
                        io.to(socket.id).emit('pay-to-mint', [NFTPRICE]);
                        // remove recipient from mint queue after one minute of no payment receipt
                        //
                        // this is to avoid ddos type scenario where someone crashes server by flooding with mint requests
                        return [4 /*yield*/, setTimeout(function () {
                                if (mintQueue.has(recipient_2)) {
                                    mintQueue["delete"](recipient_2);
                                    console.log(color.magenta.bold("ACCESSNFT: ") +
                                        "mint recipient ".concat(recipient_2, " took too long to pay -- removed from mint queue"));
                                }
                            }, 60000)];
                    case 2:
                        // remove recipient from mint queue after one minute of no payment receipt
                        //
                        // this is to avoid ddos type scenario where someone crashes server by flooding with mint requests
                        _a.sent(); // one minute delay
                        return [3 /*break*/, 4];
                    case 3:
                        if (message == 'waiting') {
                            hash = args[0][0];
                            nftId = args[0][1];
                            wallet = args[0][2];
                            walletID = walletInfo.get(wallet);
                            clientSocketId = walletID[0];
                            walletID[3] = nftId;
                            walletInfo.set(wallet, walletID);
                            io.to(clientSocketId).emit('return-transfer-waiting', [nftId, hash]);
                        }
                        else {
                            // relay message to application
                            socket.emit.apply(socket, __spreadArray(["apprelay-".concat(message)], args, false));
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
});
// fire up http server
var PORT = 3000;
httpServer.listen(PORT, function () {
    console.log(blue("ACCESSNFT:") +
        " listening on " + cyan("*:".concat(PORT)));
});
// setup socket connection to server with listenting
// part of the autheticateWallet script
var ioclient = require('socket.io-client');
var socket = ioclient("http://localhost:".concat(PORT));
socket.on('connect', function () {
    console.log(blue("ACCESSNFT:") +
        " verifyWallet socket connected, ID " + cyan("".concat(socket.id)));
    // initiate async function above that listens for transfer events
    authenticateWallet(socket)["catch"](function (error) {
        console.error(error);
        process.exit(-1);
    });
});
