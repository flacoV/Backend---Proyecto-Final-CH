import mongoose, {Schema} from "mongoose";
const cartCollection ="carts"

const cartSchema = new mongoose.Schema({
    _id: String,
    items: [{
        product: { type: Schema.Types.ObjectId, ref: 'products' },
        quantity: {type: Number}
    }]
})

export const cartsModel = mongoose.model(cartCollection,cartSchema);