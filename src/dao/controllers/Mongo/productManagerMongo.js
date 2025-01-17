import { productsModel } from "../../models/products.model.js";

export default class ProductManager {

    getProducts = async () => {
        try {
            return await productsModel.find().lean();
        } catch (err) {
            return err
        }
    }

    getProductById = async (id) => {
        try {
            return await productsModel.findById(id).lean();
        } catch (err) {
            return {error: err.message}
        }
    }

    getProductsView = async () => {
        try {
            return await productsModel.find().lean();
        } catch (err) {
            return err
        }
    }

    addProduct = async (product) => {
        try {
            await productsModel.create(product)
            return await productsModel.findOne({ title: product.title })
        } catch (err) {
            return err
        }
    }


    updateProduct = async (id, product) => {
        try {
            await productsModel.findByIdAndUpdate(id, { $set: product })
        } catch (err) {
            return err
        }
    }


    deleteProduct = async (id) => {
        try {
            return await productsModel.findByIdAndDelete(id)
        } catch (err) {
            return err
        }
    }
}

