import mongoose, { Schema } from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    role: {
        type: String,
        enum: ["Customer", "Admin", "DeliveryPartner"],
        required: true
    },
    isActivated: {
        type: Boolean,
        default: false
    }
})




// customer Schema

const customerSchema = new mongoose.Schema({
    ...userSchema.obj,
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["Customer"],
        default: "Customer"
    },
    liveLocation: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        },
    },
    address: { type: String }
})



// delivery partner

const DeliveryPartnerSchema = new Schema({
    ...userSchema.obj,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["DeliveryPartner"],
        default: "DeliveryPartner"
    },
    liveLocation: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        },
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "branch",
    },
    address: { type: String }
})


// admin

const AdminSchema = new Schema({
    ...userSchema.obj,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Admin"],
        default: "Admin"
    },

})



export const Customer = mongoose.model("Customer", customerSchema)
export const DeliveryPartner = mongoose.model("DeliveryPartner", DeliveryPartnerSchema)
export const Admin = mongoose.model("Admin", AdminSchema)