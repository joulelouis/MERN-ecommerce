const mongoose = require ("mongoose");

const productSchema = new mongoose.Schema (
	{
		name : {
			type : String,
			required : [true, "Name is required."]
		},
		description : {
			type : String,
			required : [true, "Description is required."]
		},
		price: {
			type : Number,
			required : [true, "Price is required."]
		},
		isActive : {
			type : Boolean,
			default : true
		}
	},
	{
		timestamps : {
			createdAt : "product_created_at",
			updatedAt : "product_updated_at"
		}
	}
);

// ========== EXPORTING ==========
module.exports = mongoose.model("Product", productSchema);
// ===============================