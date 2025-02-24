import Product from "../models/product.model.js";
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {

    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products })
    } catch (error) {
        console.log("Error in fetching proudcts:", error.message);

    }
}


export const createProduct = async (req, res) => {
    const product = req.body; //user will send thsi data

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: 'Please provide all fields' })
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in Create product: ", error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }

}

export const updatedProducts = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Product Deleted " });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Product not found' })
        console.log("error in deleting product:", error.message);

    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;



    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" })
    }

    try {
        const updatedProducts = await Product.findByIdAndUpdate(id, product, { new: true })
        res.status(200).json({ success: true, data: updatedProducts })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }

}


