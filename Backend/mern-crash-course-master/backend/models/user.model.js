import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		username: {
			type: Number,
			required: true,
		},
		password: {
			type: String,
			required: true,
		}, 
		daystreak: {
			type: String,
			required: true,
		}, 
		Badges: {
			type: String,
			required: true,
		}, 
		coins: {
			type: String,
			required: true,
		}, 
		subject: {
			type: String,
			required: true,
		}, 
		Achievements: {
			type: String,
			required: true,
		}, 
		Gamerewards: {
			type: String,
			required: true,
		}, 
	},
	{
		timestamps: true, // createdAt, updatedAt
	}
);

const Product = mongoose.model("Product", productSchema);

export default Product;
