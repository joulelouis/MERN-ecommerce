const mongoose = require ("mongoose");
const userId = require ("./User");
const productId = require ("./Product");

const cartSchema = new mongoose.Schema (
	{
		userId : {
			type : String,
			required : [true, "User ID is required."]
		},
		items : [
			{
				productId : {
					type : String,
					required : [true, "Product ID is required."]
				},
				name : {
					type : String,
					required : [true, "The Name field is required."]
				},
				price : {
					type : Number,
					required : [true, "The Price field is required."]
				},
				quantity : {
					type : Number,
					default : 0
				},
				subTotal : {
					type : Number,
					default: function() {
						return this.price * this.quantity
					}
				}
			}
		],
		totalAmount : {
			type : Number		
		}
	},
	{
		timestamps: {
			createdAt: "account_created_at",
			updatedAt: "account_updated_at"
		}
	}
);

// ========== EXPORTING ==========
module.exports = mongoose.model("Cart", cartSchema);
// ===============================