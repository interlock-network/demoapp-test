"use strict";
//
// INTERLOCK NETWORK & ALEPH ZERO
// PSP34 UNIVERSAL ACCESS NFT - CLIENT CREATE WALLET
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
var prompts = require("prompts");
var fs = require("fs");
// specify color formatting
var color = require("cli-color");
var red = color.red.bold;
var green = color.green.bold;
var blue = color.blue.bold;
var cyan = color.cyan;
var yellow = color.yellow.bold;
var magenta = color.magenta;
// utility functions
var utils_1 = require("./utils");
var mnemonic;
var address;
function createWallet() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            try {
                console.log(green("\nACCESSNFT: ") +
                    color.bold("First we need to add a quick and dirty wallet for signing transactions."));
                console.log(green("ACCESSNFT: ") +
                    color.bold("This wallet will be a file stored locally containing an account-mnemonic pair.\n"));
                console.log(red("\nACCESSNFT: ") +
                    color.bold("THIS APPLICATION IS FOR DEMONSTRATION PURPOSES ONLY."));
                console.log(red("ACCESSNFT: ") +
                    color.bold("WE RECOMMEND YOU USE A THROW-AWAY ACCOUNT FOR CREATING THIS WALLET.\n"));
                console.log(color.bold.magenta("ACCESSNFT: ") +
                    color.bold("Create a new account here:"));
                console.log(color.bold.magenta("ACCESSNFT: ") +
                    color.bold("https://test.azero.dev/#/accounts\n"));
                console.log(color.bold.magenta("ACCESSNFT: ") +
                    color.bold("And if you do, please make sure it has enough TZERO by visiting the faucet here:"));
                console.log(color.bold.magenta("ACCESSNFT: ") +
                    color.bold("https://faucet.test.azero.dev\n"));
                console.log(red("ACCESSNFT: ") +
                    color.bold("Please only add address containing real assets if you trust the machine or device"));
                console.log(red("ACCESSNFT: ") +
                    color.bold("that this application is running on.\n"));
                console.log(green("\nACCESSNFT: ") +
                    color.bold("IF YOU WISH, YOU MAY USE THE DEFAULT CLIENT WALLET."));
                console.log(green("ACCESSNFT: ") +
                    color.bold("PROVIDED BY US FOR DEMONSTRATION PURPOSES.\n"));
                // prompt
                //
                // proceed to create new wallet?
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var responseChoice, choice;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, prompts({
                                    type: 'confirm',
                                    name: 'choice',
                                    message: 'Do you wish to create your own account instead of using the default?'
                                })];
                            case 1:
                                responseChoice = _a.sent();
                                choice = responseChoice.choice;
                                console.log('');
                                if (choice == false) {
                                    process.send('done');
                                    process.exit();
                                }
                                // first prompt: address
                                return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                                        var responseAddress;
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, prompts({
                                                        type: 'text',
                                                        name: 'address',
                                                        message: 'Please enter the address for the account you wish to use.\n',
                                                        validate: function (address) { return (!(0, utils_1.isValidSubstrateAddress)(address) && (address.length > 0)) ?
                                                            red("ACCESSNFT: ") + "Invalid address" : true; }
                                                    })];
                                                case 1:
                                                    responseAddress = _a.sent();
                                                    address = responseAddress.address;
                                                    console.log('');
                                                    // second prompt: mnemonic
                                                    return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                                                            var responseMnemonic;
                                                            return __generator(this, function (_a) {
                                                                switch (_a.label) {
                                                                    case 0: return [4 /*yield*/, prompts({
                                                                            type: 'text',
                                                                            name: 'mnemonic',
                                                                            message: 'Please enter the mnemonic for the account you wish to use.\n',
                                                                            validate: function (mnemonic) { return !(0, utils_1.isValidMnemonic)(mnemonic) ?
                                                                                red("ACCESSNFT: ") + "Invalid mnemonic" : true; }
                                                                        })];
                                                                    case 1:
                                                                        responseMnemonic = _a.sent();
                                                                        mnemonic = responseMnemonic.mnemonic;
                                                                        console.log('');
                                                                        fs.writeFileSync('.wallet.json', "{\"CLIENT_ADDRESS\":\"".concat(address, "\",\n") +
                                                                            "\"CLIENT_MNEMONIC\":\"".concat(mnemonic, "\"}"));
                                                                        console.log(green("ACCESSNFT: ") +
                                                                            color.bold("You entered a valid address and mnemonic"));
                                                                        console.log(green("ACCESSNFT: ") +
                                                                            color.bold("that will be stored locally to sign for transaction."));
                                                                        console.log(green("ACCESSNFT: ") +
                                                                            color.bold("At no point will your mnemonic be transmitted beyond this device.\n"));
                                                                        console.log(yellow("ACCESSNFT: ") +
                                                                            color.bold("If you would like to purge your address and mnemonic information from this application,"));
                                                                        console.log(yellow("ACCESSNFT: ") +
                                                                            color.bold("you may do so from the main menu.\n"));
                                                                        return [4 /*yield*/, (0, utils_1.returnToMain)('return to main menu to mint universal access NFT')];
                                                                    case 2:
                                                                        _a.sent();
                                                                        return [2 /*return*/];
                                                                }
                                                            });
                                                        }); })()];
                                                case 2:
                                                    // second prompt: mnemonic
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })()];
                            case 2:
                                // first prompt: address
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })();
            }
            catch (error) {
                console.log(red("ACCESSNFT: ") + error);
                process.send('program-error');
                process.exit();
            }
            return [2 /*return*/];
        });
    });
}
createWallet();
