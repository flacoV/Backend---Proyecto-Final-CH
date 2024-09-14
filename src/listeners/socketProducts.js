import ProductManager from "../dao/controllers/Mongo/productManagerMongo.js";
import { __dirname } from "../utils.js";
import CartManager from "../dao/controllers/Mongo/cartManagerMongo.js";
const pm = new ProductManager()

const carts = {}

const socketProducts = (socketServer) => {
    const realtimeProductsNamespace = socketServer.of('/realtimeproducts');
    realtimeProductsNamespace.on("connection",async(socket)=>{
        console.log("client connected con ID:",socket.id)

        const listadeproductos=await pm.getProductsView()
        console.log(listadeproductos)
        realtimeProductsNamespace.emit("enviodeproducts",listadeproductos)

        socket.on("addProduct",async(obj)=>{
            await pm.addProduct(obj)
            const listadeproductos=await pm.getProductsView()
            realtimeProductsNamespace.emit("enviodeproducts",listadeproductos)
        })

        socket.on("deleteProduct",async(id)=>{
           await pm.deleteProduct(id)
            const listadeproductos=await pm.getProductsView()
            realtimeProductsNamespace.emit("enviodeproducts",listadeproductos)
        })
        
    })

    const cartNamespace = socketServer.of('/cart');
    const cartManager = new CartManager()
    cartNamespace.on("connection",async(socket)=>{
        let cartId = socket.handshake.query.cartId;
        const cart = await cartManager.getCartById(cartId)
        cartNamespace.emit(`${cartId}/update`, cart)

        console.log("client connected con cartID:",cartId)
        socket.on(`addToCart`,async(socket)=>{
            const {cartId, productId} = socket;
            console.log(`cartId: ${cartId} productId: ${productId}`)

            let items = []
            const cart = await cartManager.getCartById(cartId)

            console.log(cart)

            if (cart){
                items = cart.items.map(i => {
                    return { product: i.product._id.toString(), quantity: i.quantity}
                })
            }

            const item = items.find(i => i.product === productId)

            if (item){
                item.quantity += 1
            } else {
                items.push({ product: productId, quantity: 1})
            }


            const savedCart = await cartManager.save(cartId, {items: items})
            cartNamespace.emit(`${cartId}/update`, savedCart)
        })

        socket.on(`removeToCart`,async(socket)=>{
            const {cartId, productId} = socket;
            console.log(`cartId: ${cartId} productId: ${productId}`)

            let items = []
            const cart = await cartManager.getCartById(cartId)

            console.log(cart)

            if (cart){
                items = cart.items.map(i => {
                    return { product: i.product._id.toString(), quantity: i.quantity}
                })
            }

            const item = items.find(i => i.product === productId)

            if (item){
                item.quantity -= 1

                if (item.quantity === 0)
                    items = items.filter(i => i.product !== productId)

                const savedCart = await cartManager.save(cartId, {items: items})
                cartNamespace.emit(`${cartId}/update`, savedCart)
            }
        })
    })
};

export default socketProducts;