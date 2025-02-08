import "dotenv/config"
import mongoose from "mongoose";
import { Category, Product } from "./models/index.js";
import { categories, products } from "./seedData.js";


async function seedDataBase() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        await Product.deleteMany({});
        await Category.deleteMany({})


        const categoryDocs = await Category.insertMany(categories)
        const categoryMap = categoryDocs.reduce((map, category) => {
            map[category.name] = category._id
            return map;
        }, {})


        const productWithCategory = products.map((product) => ({
            ...product,
            category: categoryMap[product.category]
        }))



        await Product.insertMany(productWithCategory)
    } catch (error) {
        console.log(`seeding database error: ${error}`)
    }
    finally {
        mongoose.connection.close()
    }
}


seedDataBase()