import mongoose from "mongoose";
import PayMode from "../utils/PayMode";
import PayStatus from "../utils/PayStatus";

const orderSchema = new mongoose.Schema(
    {
        products: {
            type: [
                {
                    productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Product",
                        required: true
                    },
                    count: Number,
                    price: Number
                }
            ],
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        coupon: String,
        transactionId: String,
        status: {
            type: String,
            enum :Object.values(PayStatus),
            default: PayStatus.ORDERED,
            // can we improve this ?
        },
        //paymentMode: UPI, creditcard or wallet, COD
        transactionMode : {
            type : String,
            enum :Object.values(PayMode),
            default: PayMode.COD,

        },
        deliveryFee :{
            type : Number,
            default : 0
        }
    },
    {
        timestamps: true
    }
)


export default mongoose.model("Order", orderSchema)
