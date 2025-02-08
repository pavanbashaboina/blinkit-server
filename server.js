import fastify from "fastify";
import mongoose from "mongoose";
import { admin, buildAdminRouter } from "./config/setup.js";
import { PORT } from "./config/config.js";



const start = async() => {
    const app = fastify()

    await buildAdminRouter(app)

    mongoose.connect(process.env.MONGO_URL).then((data) => {
        console.log(`${data.connection.host}`)
    })

    const server = app.listen({ port: PORT, host: "0.0.0.0" }, () => {
        console.log(`server started at ${PORT}${admin.options.rootPath}`)
    })

}


start()