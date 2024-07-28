const mongoose = require ("mongoose");
const cartId = require ("./Cart");

const userSchema = new mongoose.Schema (
	{
		email : {
			type : String,
			required : [true, "The Email field is required."]
		},
		password : {
			type : String,
			required : [true, "The Password field is required."]
		},
		isAdmin : {
			type : Boolean,
			default : false
		},
		firstName : {
			type : String,
			required : [true, "The First name field is required."]
		},
		lastName : {
			type : String,
			required : [true, "The Last name field is required."]
		},
		address : {
			type : String
		},
		mobileNo : {
			type : String, 
			required : [true, "The Mobile No. field is required."]
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
module.exports = mongoose.model("User", userSchema);
// ===============================