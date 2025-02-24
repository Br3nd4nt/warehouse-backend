import { Router } from 'express'
import { createProduct, deleteProductById, getProductById, getProducts, updateProductById } from '../controllers/productController'



const productsRoutes = Router()
productsRoutes.post("/", createProduct)
productsRoutes.get("/", getProducts)
productsRoutes.get("/:id", getProductById)
productsRoutes.put("/:id", updateProductById)
productsRoutes.delete("/:id", deleteProductById)

export default productsRoutes