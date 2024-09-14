import { cartsModel } from "../../models/carts.model.js";

export default class CartManager {

    getCartById = async (id) => {
        try {
            return await cartsModel.findById(id).populate('items.product');
        } catch (err) {
            return {error: err.message}
        }
    }


    addCart = async (cart) => {
        try {
            await cartsModel.create(cart)
            return await cartsModel.findById(cart._id)
        } catch (err) {
            return err
        }
    }

    save = async (id, cart) => {
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        try {
            return await cartsModel.findByIdAndUpdate(id, { $set: cart }, options).populate('items.product')
        } catch (err) {
            return err
        }
    }

}

