"use strict";
//
// INTERLOCK NETWORK & ALEPH ZERO
// PSP34 UNIVERSAL ACCESS NFT - UTILITIES
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
exports.isValidMnemonic = exports.discoSocket = exports.hasCollection = exports.isValidSubstrateAddress = exports.returnToMain = exports.hexToString = exports.getHash = exports.terminateProcess = exports.sendMicropayment = exports.setupSession = exports.contractDoer = exports.contractGetter = void 0;
// imports (anything polkadot with node-js must be required)
var _a = require('@polkadot/api'), ApiPromise = _a.ApiPromise, WsProvider = _a.WsProvider, Keyring = _a.Keyring;
var _b = require('@polkadot/api-contract'), ContractPromise = _b.ContractPromise, CodePromise = _b.CodePromise;
var _c = require('@polkadot/keyring'), decodeAddress = _c.decodeAddress, encodeAddress = _c.encodeAddress;
var WeightV2 = require('@polkadot/types/interfaces');
// environment constants
var dotenv = require("dotenv");
var crypto = require("crypto");
var prompts = require("prompts");
dotenv.config();
// specify color formatting
var color = require("cli-color");
var red = color.red.bold;
var green = color.green.bold;
var blue = color.blue.bold;
var cyan = color.cyan;
var yellow = color.yellow.bold;
var magenta = color.magenta;
// constants
var ACCESS_METADATA = require('./access/target/ink/metadata.json');
var ACCESS_CONTRACT = process.env.ACCESS_CONTRACT;
var OWNER_MNEMONIC = process.env.OWNER_MNEMONIC;
var APP_PROCESS = process.env.APP_PROCESS;
var WEB_SOCKET = process.env.WEB_SOCKET;
var TRUE = '0x74727565';
var FALSE = '0x66616c7365';
var ISAUTHENTICATED = '0x697361757468656e74696361746564';
var ISWAITING = '0x697377616974696e67';
var AMOUNT = 1;
//
// call smart contract getter
//
function contractGetter(api, socket, contract, origin, method) {
    var args = [];
    for (var _i = 5; _i < arguments.length; _i++) {
        args[_i - 5] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var keyring, OWNER_PAIR, gasLimit, _a, gasRequired, storageDeposit, result, output, OUTPUT, RESULT, outputerror;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    keyring = new Keyring({ type: 'sr25519' });
                    OWNER_PAIR = keyring.addFromUri(OWNER_MNEMONIC);
                    gasLimit = api.registry.createType('WeightV2', {
                        refTime: Math.pow(2, 53) - 1,
                        proofSize: Math.pow(2, 53) - 1
                    });
                    return [4 /*yield*/, (_b = contract.query)[method].apply(_b, __spreadArray([OWNER_PAIR.address, { gasLimit: gasLimit }], args, false))];
                case 1:
                    _a = _c.sent(), gasRequired = _a.gasRequired, storageDeposit = _a.storageDeposit, result = _a.result, output = _a.output;
                    OUTPUT = JSON.parse(JSON.stringify(output));
                    RESULT = JSON.parse(JSON.stringify(result));
                    if (result.isOk) {
                        // check if OK result is reverted contract that returned error
                        if (RESULT.ok.flags == 'Revert') {
                            // is this error a custom error?  
                            if (OUTPUT.ok.err.hasOwnProperty('custom')) {
                                // logging custom error
                                outputerror = hexToString(OUTPUT.ok.err.custom.toString().replace(/0x/, ''));
                                console.log(red("ACCESSNFT:") +
                                    " ".concat(outputerror));
                            }
                            else {
                                // if not custom then print Error enum type
                                outputerror = OUTPUT.ok.err;
                                console.log(red("ACCESSNFT:") +
                                    " ".concat(outputerror));
                            }
                            // send message and signature values to servers
                            socket.emit("".concat(origin, "-").concat(method, "-contract-error"), __spreadArray(__spreadArray([], args, true), [outputerror], false));
                            return [2 /*return*/, [false, false, false, false]];
                        }
                    }
                    else {
                        // send calling error message
                        outputerror = result.asErr.toHuman();
                        console.log(red("ACCESSNFT:") +
                            " ".concat(outputerror));
                        socket.emit("".concat(origin, "-").concat(method, "-calling-error"), __spreadArray(__spreadArray([], args, true), [outputerror], false));
                        return [2 /*return*/, [false, false, false, false]];
                    }
                    return [2 /*return*/, [gasRequired, storageDeposit, RESULT, OUTPUT]];
            }
        });
    });
}
exports.contractGetter = contractGetter;
//
// call smart contract doer
//
function contractDoer(api, socket, contract, storageMax, refTimeLimit, proofSizeLimit, origin, method) {
    var args = [];
    for (var _i = 8; _i < arguments.length; _i++) {
        args[_i - 8] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var keyring, OWNER_PAIR, _a, gasRequired, storageDeposit, RESULT, OUTPUT, gasLimit, extrinsic;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    keyring = new Keyring({ type: 'sr25519' });
                    OWNER_PAIR = keyring.addFromUri(OWNER_MNEMONIC);
                    return [4 /*yield*/, contractGetter.apply(void 0, __spreadArray([api,
                            socket,
                            contract,
                            origin,
                            method], args, false))];
                case 1:
                    _a = _c.sent(), gasRequired = _a[0], storageDeposit = _a[1], RESULT = _a[2], OUTPUT = _a[3];
                    gasLimit = api.registry.createType('WeightV2', {
                        refTime: refTimeLimit,
                        proofSize: proofSizeLimit
                    });
                    // too much gas required?
                    if (gasRequired > gasLimit) {
                        // emit error message with signature values to server
                        console.log(red("ACCESSNFT:") +
                            ' tx aborted, gas required is greater than the acceptable gas limit.');
                        socket.emit("".concat(origin, "-").concat(method, "-gaslimit"), __spreadArray([], args, true), gasRequired);
                        discoSocket(socket, origin);
                        process.send('gas-limit');
                        process.exit();
                    }
                    // too much storage required?
                    if (storageDeposit > storageMax) {
                        // emit error message with signature values to server
                        console.log(red("ACCESSNFT:") +
                            ' tx aborted, storage required is greater than the acceptable storage limit.');
                        socket.emit("".concat(origin, "-").concat(method, "-storagelimit"), __spreadArray([], args, true), storageDeposit);
                        discoSocket(socket, origin);
                        process.send('gas-limit');
                        process.exit();
                    }
                    return [4 /*yield*/, (_b = contract.tx)[method].apply(_b, __spreadArray([{ storageMax: storageMax, gasLimit: gasLimit }], args, false)).signAndSend(OWNER_PAIR, function (result) {
                            // when tx hits block
                            if (result.status.isInBlock) {
                                // logging
                                console.log(yellow("ACCESSNFT:") + " ".concat(method, " in a block"));
                                // when tx is finalized in block, tx is successful
                            }
                            else if (result.status.isFinalized) {
                                // logging and terminate
                                console.log(green("ACCESSNFT:") +
                                    color.bold(" ".concat(method, " successful")));
                                // emit success message with signature values to server
                                socket.emit("".concat(method, "-complete"), __spreadArray([], args, true));
                                discoSocket(socket, origin);
                                process.send("".concat(method, "-complete"));
                                process.exit();
                            }
                        })];
                case 2:
                    extrinsic = _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.contractDoer = contractDoer;
//
// setup blockchain connection session
//
function setupSession(origin) {
    return __awaiter(this, void 0, void 0, function () {
        var wsProvider, API, CONTRACT;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // setup session
                    //
                    // logging
                    console.log('');
                    console.log(blue("ACCESSNFT:") +
                        " establishing ".concat(origin, " websocket connection with Aleph Zero blockchain..."));
                    wsProvider = new WsProvider(WEB_SOCKET);
                    return [4 /*yield*/, ApiPromise.create({ provider: wsProvider })];
                case 1:
                    API = _a.sent();
                    // logging
                    console.log(blue("ACCESSNFT:") +
                        " established ".concat(origin, " websocket connection with Aleph Zero blockchain ") +
                        cyan("".concat(WEB_SOCKET)));
                    console.log('');
                    CONTRACT = new ContractPromise(API, ACCESS_METADATA, ACCESS_CONTRACT);
                    return [2 /*return*/, [API, CONTRACT]];
            }
        });
    });
}
exports.setupSession = setupSession;
//
// send micropayment to verify wallet owner is true 
//
function sendMicropayment(api, wallet, id) {
    return __awaiter(this, void 0, void 0, function () {
        var keyring, OWNER_PAIR, transfer, hash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    keyring = new Keyring({ type: 'sr25519' });
                    OWNER_PAIR = keyring.addFromUri(OWNER_MNEMONIC);
                    // logging transfer intention
                    console.log(green("ACCESSNFT:") +
                        color.bold(" wallet contains valid unauthenticated nft: ") + red("ID ".concat(id)));
                    console.log(yellow("ACCESSNFT:") +
                        " sending micro payment to wallet " + magenta("".concat(wallet)));
                    transfer = api.tx.balances.transfer(wallet, AMOUNT);
                    return [4 /*yield*/, transfer.signAndSend(OWNER_PAIR)];
                case 1:
                    hash = _a.sent();
                    // loggin transfer success
                    console.log(green("ACCESSNFT:") +
                        color.bold(" authentication transfer sent"));
                    console.log(green("ACCESSNFT:") +
                        " for record, transfer hash is " + magenta("".concat(hash.toHex())));
                    return [2 /*return*/, hash.toHex()];
            }
        });
    });
}
exports.sendMicropayment = sendMicropayment;
//
// emit message, disconnect socket, and exit process
//
function terminateProcess(socket, origin, message, values) {
    // emit message to parent process and relay then exit after printing to log
    process.send(message);
    socket.emit(message, values);
    console.log(blue("ACCESSNFT:") +
        " ".concat(origin, " socket disconnecting, ID ") + cyan("".concat(socket.id)));
    socket.disconnect();
    process.exit();
}
exports.terminateProcess = terminateProcess;
//
// calculate SHA256 hash
//
function getHash(input) {
    var digest = crypto
        .createHash('sha256')
        .update(input)
        .digest('hex');
    return digest;
}
exports.getHash = getHash;
//
// convert hex string to ASCII string
//
function hexToString(hex) {
    // iterate through hex string taking byte chunks and converting to ASCII characters
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
}
exports.hexToString = hexToString;
//
// prompt to return to main menu
//
function returnToMain(message) {
    return __awaiter(this, void 0, void 0, function () {
        var choice;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prompts({
                        type: 'select',
                        name: 'return',
                        message: 'Options:',
                        choices: [{ title: message, value: 'return' }]
                    })];
                case 1:
                    choice = _a.sent();
                    process.send('done');
                    process.exit();
                    return [2 /*return*/];
            }
        });
    });
}
exports.returnToMain = returnToMain;
//
// checks address to make sure valid substrate address
//
function isValidSubstrateAddress(wallet) {
    try {
        encodeAddress(decodeAddress(wallet));
        // address encodes/decodes wo error => valid address
        return true;
    }
    catch (error) {
        // encode/decode failure => invalid address
        return false;
    }
}
exports.isValidSubstrateAddress = isValidSubstrateAddress;
//
// Check if wallet has collection
//
function hasCollection(api, contract, wallet) {
    return __awaiter(this, void 0, void 0, function () {
        var keyring, OWNER_PAIR, gasLimit, _a, gasRequired, storageDeposit, result, output, RESULT, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    keyring = new Keyring({ type: 'sr25519' });
                    OWNER_PAIR = keyring.addFromUri(OWNER_MNEMONIC);
                    gasLimit = api.registry.createType('WeightV2', {
                        refTime: Math.pow(2, 53) - 1,
                        proofSize: Math.pow(2, 53) - 1
                    });
                    return [4 /*yield*/, contract.query['getCollection'](OWNER_PAIR.address, { gasLimit: gasLimit }, wallet)];
                case 1:
                    _a = _b.sent(), gasRequired = _a.gasRequired, storageDeposit = _a.storageDeposit, result = _a.result, output = _a.output;
                    RESULT = JSON.parse(JSON.stringify(result));
                    // if this call reverts, then only possible error is 'credential nonexistent'
                    if (RESULT.ok.flags == 'Revert') {
                        // the only possible error is the custom 'no collection' type
                        //
                        // :. wallet has no collection
                        return [2 /*return*/, false];
                    }
                    // wallet has collection
                    return [2 /*return*/, true];
                case 2:
                    error_1 = _b.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.hasCollection = hasCollection;
//
// disconnect socket
//
function discoSocket(socket, origin) {
    console.log(blue("ACCESSNFT:") +
        " ".concat(origin, " socket disconnecting, ID ") + cyan("".concat(socket.id)));
    socket.disconnect();
}
exports.discoSocket = discoSocket;
// 
// check if valid mnemonic
//
function isValidMnemonic(mnemonic) {
    var wordCount = mnemonic.trim().split(' ').length;
    if (wordCount != 12)
        return false;
    return true;
}
exports.isValidMnemonic = isValidMnemonic;
