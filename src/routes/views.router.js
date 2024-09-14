import { Router } from 'express';
import ProductManager from '../dao/controllers/Mongo/productManagerMongo.js'
import { __dirname } from "../utils.js"
import CartManager from "../dao/controllers/Mongo/cartManagerMongo.js";

const pm=new ProductManager()
const cm=new CartManager()
const routerV = Router()


routerV.get("/",async(req,res)=>{
    const listadeproductos=await pm.getProducts()
    res.render("home",{listadeproductos})
})

routerV.get("/realtimeproducts",(req,res)=>{
res.render("realtimeproducts")
})

routerV.get("/cart",async (req, res) => {
    res.render("cart")
})


export default routerV