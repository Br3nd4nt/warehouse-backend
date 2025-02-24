import { Router, Request, Response } from 'express'
import { createCategory, deleteCategoryById, getCategories, getcategoryById, updateCategoryById } from '../controllers/categoryController'


const categoriesRoutes = Router()
categoriesRoutes.post("/", createCategory)
categoriesRoutes.get("/", getCategories)
categoriesRoutes.get("/:id", getcategoryById)
categoriesRoutes.put("/:id", updateCategoryById)
categoriesRoutes.delete("/:id", deleteCategoryById)

export default categoriesRoutes