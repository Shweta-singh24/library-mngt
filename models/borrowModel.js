import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema(
    {
        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
            book:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
                required: true,
            },
            borrowDate:
            {
                type: Date,
                default: Date.now,
            },
            returnDate:
            {
                type: Date,
            },
            isReturned:{
                type: Boolean,
                default: false, 
            },
            fine:
            {
                type: Number,
                default : 0
            },    
    },
  { timestamps: true }
);

const Borrow = mongoose.model("Borrow",borrowSchema)
export default Borrow;
