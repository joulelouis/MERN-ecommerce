const mongoose = require ("mongoose");
const userId = require ("./User");
const productId = require ("./Product");
const cartId = require ("./Cart");

const orderSchema = new mongoose.Schema ({
	userId : {
		type : mongoose.ObjectId,
		ref : "User",
		required : [true, "User ID is required."]
	},
	cartId : {
		type : mongoose.ObjectId,
		ref : "Cart",
		required : [true, "Cart ID is required."]
	},
	products : [
		{
			productId : {
				type : mongoose.ObjectId,
				ref: "Product",
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
	},
	purchasedOn : {
		type : Date,
		default : new Date()
	}
});

// ========== EXPORTING ==========
module.exports = mongoose.model("Order", orderSchema);
// ===============================