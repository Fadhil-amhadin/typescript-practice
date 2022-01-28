import axios from "axios";

const shopApi = axios.create({
  baseURL: "https://midas-food-delivery-shop.herokuapp.com"
})

export default shopApi