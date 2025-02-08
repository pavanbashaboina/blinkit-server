import AdminJS from "adminjs";
import AdminJsFastify from "@adminjs/fastify"
import * as MongooseAdmin from "@adminjs/mongoose"
import * as Models from "../models/index.js"
import { authenticate, COOKIE_PASSWORD, sessionStore } from "./config.js";

AdminJS.registerAdapter(MongooseAdmin)


export const admin = new AdminJS({
    resources: [
        {
            resource: Models.Customer,
            options: {
                listProperties: ["phone", "role", "isActivated"],
                filterProperties: ["phone", "role"]
            }
        },
        {
            resource: Models.DeliveryPartner,
            options: {
                listProperties: ["email", "role", "isActivated"],
                filterProperties: ["email", "role"]
            }
        },
        {
            resource: Models.Admin,
            options: {
                listProperties: ["email", "role", "isActivated"],
                filterProperties: ["email", "role"]
            }
        },
        {
            resource: Models.Branch
        },
        {
            resource: Models.Category
        },
        {
            resource: Models.Product
        },
    ],

    branding: {
        companyName: "Pavan's Blinkit",
        withMadeWithLove: false
    },
    rootPath: "/admin"
})


export const buildAdminRouter = async (app) => {
    await AdminJsFastify.buildAuthenticatedRouter(
        admin,
        {
            authenticate,
            cookiePassword: COOKIE_PASSWORD,
            cookieName: "adminjs"
        },
        app,
        {
            store: sessionStore,
            saveUninitialized: true,
            secret: COOKIE_PASSWORD,
            cookie: {
                httpOnly: process.env.NODE_ENV === "production",
                secure: process.env.NODE_ENV === "production",

            }
        }
    )
}