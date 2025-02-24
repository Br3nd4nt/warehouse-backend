require("dotenv").config();
import express from 'express'
import productsRoutes from './routes/productRoutes'
import categoriesRoutes from './routes/categoryRoutes'
import { connectDB } from './db';
import { logger } from './middleware';

connectDB()

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())
app.use('/', logger)
app.use('/api/products', productsRoutes)
app.use('/api/categories', categoriesRoutes)

app.listen(port, () => {
    console.log(`Server is running on 0.0.0.0:${port}`)
})