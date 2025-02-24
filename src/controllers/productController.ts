import { Request, Response } from 'express'
import Product  from '../models/Product'
import Category from '../models/Category';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, category, numberInWarehouse, price} = req.body
        const existingCategory = await Category.findOne({name: category})
        if (!existingCategory) {
            console.error("Category not found.")
            res.status(400).json({message: "Category not found."})
        } else {
            const newProduct = new Product({
                name, 
                description,
                category: existingCategory._id,
                numberInWarehouse,
                price
            })
            await newProduct.save()
            res.status(201).json(newProduct)
        }
    } catch (error) {
        console.error(`Internal server error: ${error}`)
        res.status(500).json({message: `Internal server error: ${error}`})
    }
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find().populate('category', 'name')
        res.json(products)
    } catch (error) {
        console.error(`Internal server error: ${error}`)
        res.status(500).json({message: `Internal server error: ${error}`})
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = Product.findById(id).populate('category', 'name')
        if (!product) {
            console.error(`Product not found.`)
            res.status(404).json({message: "Product not found."})
        } else {
            res.json(product)
        }
    } catch (error) {
        console.error(`Internal server error: ${error}`)
        res.status(500).json({message: `Internal server error: ${error}`})
    }
}

export const updateProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, description, category, numberInWarehouse, price} = req.body

        const productExists = Product.findById(id)
        if (!productExists) {
            console.error(`Product not found.`)
            res.status(404).json({message: "Product not found."})
        } else {
            const existingCategory = await Category.findOne({name: category})
            if (category && !existingCategory) {
                console.error("Category not found.")
                res.status(400).json({message: "Category not found."})
            } else {
                const updatedProduct = await Product.findByIdAndUpdate(
                    id, {
                        name, description, category: existingCategory?._id, numberInWarehouse, price
                    }, {new: true}
                )
                res.json(updatedProduct)   
            }   
        }
    } catch (error) {
        console.error(`Internal server error: ${error}`)
        res.status(500).json({message: `Internal server error: ${error}`})
    }
}

export const deleteProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            console.error(`Product not found.`)
            res.status(404).json({message: "Product not found."})
        } else {
            res.json({message: "Product deleted."})
        }
    } catch (error) {
        console.error(`Internal server error: ${error}`)
        res.status(500).json({message: `Internal server error: ${error}`})
    }
}