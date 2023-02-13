"use strict";
//
// INTERLOCK NETWORK & ALEPH ZERO
// PSP34 UNIVERSAL ACCESS NFT - CLIENT MAIN
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
// child process paths
var path = require("path");
var menu = path.resolve('clientMain.js');
var createWallet = path.resolve('clientAddWallet.js');
var mint = path.resolve('clientMint.js');
var authenticate = path.resolve('clientAuthenticate.js');
var display = path.resolve('clientDisplay.js');
var reset = path.resolve('clientReset.js');
var login = path.resolve('clientLogin.js');
// imports
var child_process_1 = require("child_process");
var prompts = require("prompts");
// start menu options
var options = [
    { title: 'create or add new wallet for this demo application', value: 'add' },
    { title: 'mint universal access NFT', value: 'mint' },
    { title: 'register universal access NFT', value: 'authenticate' },
    { title: 'display universal access NFT collection', value: 'display' },
    { title: 'login to restricted access area', value: 'login' },
    { title: 'reset username and password', value: 'reset' },
    { title: 'quit application', value: 'quit' }
];
function mainMenu() {
    return __awaiter(this, void 0, void 0, function () {
        var response, createWalletChild, mintChild, authenticateChild, displayChild, loginChild, resetChild, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prompts([
                            {
                                type: 'select',
                                name: 'choice',
                                message: '\nUNIVERSAL ACCESS NFT DEMO APP ~ Please choose an action:\n',
                                choices: options
                            }
                        ])];
                case 1:
                    response = _a.sent();
                    switch (response.choice) {
                        case 'add':
                            createWalletChild = (0, child_process_1.fork)(createWallet);
                            createWalletChild.on('message', function () {
                                var menuChild = (0, child_process_1.fork)(menu);
                            });
                            break;
                        case 'mint':
                            mintChild = (0, child_process_1.fork)(mint);
                            mintChild.on('message', function () {
                                var menuChild = (0, child_process_1.fork)(menu);
                            });
                            break;
                        case 'authenticate':
                            authenticateChild = (0, child_process_1.fork)(authenticate);
                            authenticateChild.on('message', function () {
                                var menuChild = (0, child_process_1.fork)(menu);
                            });
                            break;
                        case 'display':
                            displayChild = (0, child_process_1.fork)(display);
                            displayChild.on('message', function () {
                                var menuChild = (0, child_process_1.fork)(menu);
                            });
                            break;
                        case 'login':
                            loginChild = (0, child_process_1.fork)(login);
                            loginChild.on('message', function () {
                                var menuChild = (0, child_process_1.fork)(menu);
                            });
                            break;
                        case 'reset':
                            resetChild = (0, child_process_1.fork)(reset);
                            resetChild.on('message', function () {
                                var menuChild = (0, child_process_1.fork)(menu);
                            });
                            break;
                        case 'quit application':
                            process.exit();
                            break;
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
console.clear();
console.log("\n");
console.log("Welcome to the Universal Access NFT demonstration application!\n");
console.log("The value proposition for this technology is that it is a blockchain secret");
console.log("(eg, username/passwords) management system (a form of proof of pseudo proof-of-knowledge)");
console.log("that is extremely resistant to compromise:\n");
console.log(". At no point in the process are secrets stored in a database in recoverable form.");
console.log(". Secrets are as vulnerable as the https protocol and cache level security of server and c\n");
console.log("This is just a proof of concept, containing all the key pieces.");
console.log("Production implementations are left to the eyes of the beholder.");
mainMenu();
