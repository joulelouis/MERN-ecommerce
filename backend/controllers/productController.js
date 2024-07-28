// ========== IMPORTING AND INITIALIZATION ==========
// NPM
const bcrypt = require ("bcrypt");

// LOCAL
const auth = require ("../auth");
const Product = require ("../models/Product"); // MODEL
const Order = require ("../models/Order"); // MODEL
// ==================================================

// ========== FUNCTIONS ==========
// ADD PRODUCT

module.exports.addProduct = (productBody, userData) => {
	if (userData.isAdmin) {
		return Product.findOne ({name: productBody.name}).then (fetchedProduct => {

			if (fetchedProduct == null) {
				let newProduct = new Product ({
				name: productBody.name,
				description: productBody.description,
				price: productBody.price
				});

				return newProduct.save().then (product => {
					if (product) {
						return ({ message: `Item add success`})
					} else {
						return ({ message: `Oops! Something went wrong...`})
					}
				}).catch (err => {
					console.error (err);
					res.status (500).send ({error: `Item Save Error`})
				});

			} else {
				
				return ({ message: `Item already exists`});
			}
		}).catch (err => {
			console.log (err);
			res.status (500).send ({error: `Add Product Error`})
		});
	} else {
		return Promise.reject ({ message: `Unauthorized Access` });
	}
};

// GET ALL PRODUCTS

module.exports.retrieveAllProducts = (userData) => {
	if (userData.isAdmin) {
		return Product.find ({}).then (allProducts => {
			return allProducts;
			
		}).catch (err => {
			console.log (err);
			res.status (500).send ({error: `Fetch Error`})
		});
	} else {
		return Promise.reject (`Unauthorized Access: You are not an Admin.`);
	}
};

// UPDATE PRODUCT INFORMATION
module.exports.updateProduct = (productId, productInfo, userData) => {
	if (userData.isAdmin) {

		let updatedProduct = {
			name: productInfo.name,
			description: productInfo.description,
			price: productInfo.price
		};

		return Product.findByIdAndUpdate (productId, updatedProduct).then (updatedProduct => {
				return ({ message: "Product Updated" });

		}).catch (err => {
			console.log (err);
			res.status (500).send ({error: `Fetch Error`})
		});
	} else {
		return Promise.reject ({ message: `Unauthorized Access: You are not an Admin` });
	}
};
	
// ARCHIVE & ACTIVATE PRODUCT
module.exports.toggleProductStatus = (productId, productStatus, userData) => {
	if (userData.isAdmin) {

		let updatedStatus = {
			isActive : productStatus.isActive
		};

		if (productStatus.isActive == false) {
			return Product.findByIdAndUpdate (productId, updatedStatus).then (archivedProduct => ({ message: `Product Archived` }))
				.catch (err => {
					console.log (err);
					res.status (500).send ({error: `Fetch Error`})
				});

		} else if (productStatus.isActive == true) {
			return Product.findByIdAndUpdate (productId, updatedStatus).then (archivedProduct => ({ message: `Product Activated` }))
				.catch (err => {
					console.log (err);
					res.status (500).send ({error: `Fetch Error`})
				});
		} else {
			return Promise.reject ({ message: `Invalid status.` });
		}

	} else {
		return Promise.reject ({ message: `Unauthorized Access: You are not an Admin.` });
	}
};

// GET ALL ORDERS

module.exports.retrieveAllOrders = (userData) => {
	if (userData.isAdmin) {
		return Order.find ({}).then (allOrders => {
			return allOrders;
			
		}).catch (err => {
			console.log (err);
			res.status (500).send ({error: `Fetch Error`})
		});
	} else {
		return Promise.reject (`Unauthorized Access: You are not an Admin.`);
	}
};

// ===============================