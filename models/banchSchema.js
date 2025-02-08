import mongoose, { Schema } from "mongoose";


const branchSchema = new mongoose.Schema({
    name: { type: String, required: true },

    liveLocation: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        },
    },
    address: { type: String },
    deliverPartners: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DeliveryPartner"
        }
    ]
})


const branch = mongoose.model("branch", branchSchema)

export default branch