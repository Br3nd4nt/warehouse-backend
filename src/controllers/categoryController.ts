import { Request, Response } from 'express'
import Category  from '../models/Category'

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body
        const checkIfExists = await Category.findOne({name})
        if (checkIfExists) {
            console.error(`Category already exists.`)
            res.status(404).json({message: "Category already exists."})
        } else {
            const newCategory = new Category({name})
            await newCategory.save()
            res.status(201).json(newCategory)
        }

    } catch (error) {
        console.error(`Internal server error: ${error}`)
        res.status(500).json({message: `Internal server error: ${error}`})
    }
}

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (error) {
        console.error(`Internal server error: ${error}`)
        res.status(500).json({message: `Internal server error: ${error}`})
    }
}

export const getcategoryById = async (req: Request, res: Response) => {
    try {
        const category = await Category.findById(req.params.id)
        
        if (!category){
            console.error(`Category not found.`)
            res.status(404).json({message: "Category not found."})
        } else {
            res.json(category)
        }
    } catch (error) {
        console.error(`Internal server error: ${error}`)
        res.status(500).json({message: `Internal server error: ${error}`})
    }
}

export const updateCategoryById = async (req: Request, res: Response) => {
    try {
        const { name } = req.body
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
          );
        if (!updatedCategory) {
            console.error(`Category not found.`)
            res.status(404).json({message: "Category not found."})
        } else {
            res.json(updatedCategory)
        }
    } catch (error) {
        console.error(`Internal server error: ${error}`)
        res.status(500).json({message: `Internal server error: ${error}`})
    }
}

export const deleteCategoryById = async (req: Request, res: Response) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id)
        if (!deletedCategory) {
            console.error(`Category not found.`)
            res.status(404).json({ message: 'Category not found.' })
        } else {
            res.json({ message: 'Category deleted.' })
        }
    } catch (error) {
        console.error(`Internal server error: ${error}`)
        res.status(500).json({message: `Internal server error: ${error}`})
    }
}