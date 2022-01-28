import axios from "axios";

const menusAPI = axios.create({
  baseURL: "https://midas-food-delivery-shop.herokuapp.com"
})

export default menusAPI