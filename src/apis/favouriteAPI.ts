import axios from "axios";

const favouriteAPI = axios.create({
  baseURL: "https://midas-food-delivery-favourites.herokuapp.com"
})

export default favouriteAPI