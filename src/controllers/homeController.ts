import { Response, Request, NextFunction } from "express"
import favouriteAPI from "../apis/favouriteAPI";
import menusAPI from "../apis/menusApi";
import shopApi from "../apis/shopApi";
import pool from "../db/db";


export default class HomeController {
    static async findAllData(req: Request, res: Response, next: NextFunction) {
        try {
            const { signature, access_token } = req.headers
            const signatureOutput = String(signature)
            const accessTokenOutput = String(access_token)
            // get favourites api
            const favourites = await favouriteAPI({
                method: 'GET',
                headers: {
                    signature: signatureOutput,
                    access_token: accessTokenOutput
                },
                url: 'v1/getFavourites'
            })
            let favouriteContainer = { favourites: favourites.data.payload }
            let favouritesData = favouriteContainer.favourites
            
            // get topRestaurant api
            const topRestaurants = await shopApi({
                method: 'GET',
                headers: {
                    signature: signatureOutput,
                    access_token: accessTokenOutput
                },
                url: 'v1/shopsRating'
            })
            let shopContainer = { topRestaurant: topRestaurants.data.payload }
            let topRestaurantsData = shopContainer.topRestaurant[0].shops

            // get bestCuisine api
            const bestCuisine = await menusAPI({
                method: 'GET',
                headers: {
                    signature: signatureOutput,
                    access_token: accessTokenOutput
                },
                url: 'v1/menusRating'
            })
            let menusContainer = { bestCuisine: bestCuisine.data.payload }
            let bestCuisineData = menusContainer.bestCuisine[0].menus

            // get banner api
            const banner = await pool.query('SELECT code, promo, image FROM banners')
            res.status(200).json({
                payload: [
                    {
                        banners: banner.rows,
                        topRestaurants: topRestaurantsData,
                        bestCuisines: bestCuisineData,
                        favourites: favouritesData
                    }
                ]
            })
        } catch (error) {
            console.log("error")
            next(error)
        }
    }
}
