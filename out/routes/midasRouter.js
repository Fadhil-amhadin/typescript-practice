"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const homeController_1 = __importDefault(require("../controllers/homeController"));
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const midasRouter = express_1.default.Router();
midasRouter.use(authentication_1.default);
exports.default = midasRouter.get('/test', homeController_1.default.findAllData);
