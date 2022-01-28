"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const favouriteAPI_1 = __importDefault(require("../apis/favouriteAPI"));
const menusApi_1 = __importDefault(require("../apis/menusApi"));
const shopApi_1 = __importDefault(require("../apis/shopApi"));
const db_1 = __importDefault(require("../db/db"));
class HomeController {
    static findAllData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { signature, access_token } = req.headers;
                const signatureOutput = String(signature);
                const accessTokenOutput = String(access_token);
                // get favourites api
                const favourites = yield (0, favouriteAPI_1.default)({
                    method: 'GET',
                    headers: {
                        signature: signatureOutput,
                        access_token: accessTokenOutput
                    },
                    url: 'v1/getFavourites'
                });
                let favouriteContainer = { favourites: favourites.data.payload };
                let favouritesData = favouriteContainer.favourites;
                // get topRestaurant api
                const topRestaurants = yield (0, shopApi_1.default)({
                    method: 'GET',
                    headers: {
                        signature: signatureOutput,
                        access_token: accessTokenOutput
                    },
                    url: 'v1/shopsRating'
                });
                let shopContainer = { topRestaurant: topRestaurants.data.payload };
                let topRestaurantsData = shopContainer.topRestaurant[0].shops;
                // get bestCuisine api
                const bestCuisine = yield (0, menusApi_1.default)({
                    method: 'GET',
                    headers: {
                        signature: signatureOutput,
                        access_token: accessTokenOutput
                    },
                    url: 'v1/menusRating'
                });
                let menusContainer = { bestCuisine: bestCuisine.data.payload };
                let bestCuisineData = menusContainer.bestCuisine[0].menus;
                // get banner api
                const banner = yield db_1.default.query('SELECT code, promo, image FROM banners');
                res.status(200).json({
                    payload: [
                        {
                            banners: banner.rows,
                            topRestaurants: topRestaurantsData,
                            bestCuisines: bestCuisineData,
                            favourites: favouritesData
                        }
                    ]
                });
            }
            catch (error) {
                console.log("error");
                next(error);
            }
        });
    }
}
exports.default = HomeController;
