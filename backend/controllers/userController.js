// ========== IMPORTING AND INITIALIZATION ==========
// NPM
const bcrypt = require ("bcrypt");

// LOCAL
const auth = require ("../auth");
const User = require ("../models/User"); // MODEL
const Product = require ("../models/Product"); // MODEL
const Cart = require ("../models/Cart"); // MODEL
const Order = require ("../models/Order"); // MODEL
// ==================================================

// ========== FUNCTIONS ==========
// REGISTRATION

module.exports.registerUser = async (registerBody) => {

	let doesEmailExist = await User.find ({email: registerBody.email}).then ((fetchedEmail) => {
		if (fetchedEmail.length > 0) {
			return true;
		} else {
			return false;
		}	
	}).catch (err => {
		console.error (err);
		res.status (500).send ({error: `Query Error`})
	});

	if (!doesEmailExist) {
		let newUser = new User ({
			email: registerBody.email,
			password: bcrypt.hashSync (registerBody.password, 10),
			firstName: registerBody.firstName,
			lastName: registerBody.lastName,
			address: registerBody.address,
			mobileNo: registerBody.mobileNo
		});

		return newUser.save().then (user => {
			if (user) {
				return ({ message: 'Register success' });
			} else {
				return ({ message: 'Register failed' });
			}
		}).catch (err => {
			console.error (err);
			res.status (500).send ({error: `Register Error`})
		});
	} else if (doesEmailExist) {
		return ({ message: 'Duplicate email' });
	} 
};

// LOGIN

module.exports.loginUser = (loginBody) => {
	return User.findOne ({email: loginBody.email}).then (fetchedUser => {

		if (fetchedUser == null) {
			return ({ message: `User does not exist.` });

		} else {
			const isPasswordCorrect = bcrypt.compareSync (loginBody.password, fetchedUser.password);

			if (isPasswordCorrect) {
				return {access: auth.createAccessToken (fetchedUser)};

			} else {
				return ({ message: `Password is incorrect.` });
			}
		}
	}).catch (err => {
		console.log (err);
		res.status (500).send ({error: `Login Error`})
	});
};

// GET ALL ACTIVE PRODUCTS

module.exports.retrieveAllActiveProducts = () => {
	return Product.find ({isActive : true}).then (allProducts => {
			return allProducts;
			
		}).catch (err => {
			console.log (err);
			res.status (500).send ({error: `Fetch Error`})
		});
};

// GET SPECIFIC PRODUCT

module.exports.retrieveProduct = (productId) => {
	return Product.findById (productId).then (product => {
			if (product.isActive) {
				return product;

			} else {
				return ({ message: `Product Not Found`});
			}
			
		}).catch (err => {
			console.log (err);
			res.status (500).send ({error: `Fetch Error`});
		});
};

// RETRIEVE USER DETAILS

module.exports.retrieveUserDetails = (userData) => {
	return User.findOne ({email : userData.email}, {email : 1, firstName : 1, lastName : 1, isAdmin : 1}).then (user => {
			return user;

		}).catch (err => {
			console.log (err);
			res.status (500).send ({error: `Fetch Error`});
		});
};

// SET/UNSET ADMIN STATUS 

module.exports.toggleAdmin = (username, reqBody, userData) => {
	if (userData.isAdmin) {
		let toggleStatus = {
			isAdmin : reqBody.isAdmin
		};
		
		return User.findOneAndUpdate ({username : username}, toggleStatus).then (fetchedUser => {
				if (fetchedUser.isAdmin == true) {
					return (`User ${username} access is set to Admin!`);

				} else if (fetchedUser.isAdmin == false) {
					return (`${username} Admin access has been revoked.`);

				} else {
					return (`Invalid request.`);
				}
				
			}).catch (err => {
					console.log (err);
					res.status (500).send ({error: `Fetch Error`})
				});
	
	} else {
		return Promise.reject (`Unauthorized Access: You are not an Admin.`);
	}
};

// ========== ADD TO CART ==========
module.exports.addToCart = (productId, reqBody, user) => {
	if (!user.isAdmin) {

		return Cart.findOne ({userId : user.id}).then (fetchedCart => {

			let subTotalAcc = [];
			reqBody.items.forEach ((item) => {
				subTotalAcc.push (item.price * item.quantity);
			});

			let totalAcc = subTotalAcc.reduce ((acc, curr) => {
				return (acc + curr);
			});

			if (fetchedCart == null) {
				let newCart = new Cart ({
					userId : user.id,
					items : reqBody.items,
					totalAmount : totalAcc
				});

				return newCart.save().then (cart => {
					if (cart) {
						return ({ message: `Added to Cart` });
					} else {
						return ({ message: `Error Adding to Cart`});
					}
				}).catch (err => {
					console.log (err);
					res.status (500).send ({error: `Save Error`})
				});

			} else if (fetchedCart.items.some((item) => (item.productId == reqBody.items[0].productId))) {
						return ({ message: `Item Already in Cart` });		
				
			} else {
				fetchedCart.items.push (reqBody.items[0]);

				let newSubTotalAcc = [];
				fetchedCart.items.forEach ((item) => {
					newSubTotalAcc.push (item.price * item.quantity);
				});

				let newTotalAcc = newSubTotalAcc.reduce ((acc, curr) => {
					return (acc + curr);
				});

				fetchedCart.totalAmount = newTotalAcc;

				return fetchedCart.save().then (savedCart => {

					if (savedCart) {
						return ({ message: `Added Item` });

					} else {
						return ({ message: `Error adding to cart.` });
					}
				}).catch (err => {
					console.log (err);
					res.status (500).send ({error: `Save Error`})
				});
			} 

		}).catch (err => {
			console.log (err);
			res.status (500).send ({error: `Bad Request`})
		});

	} else {
		return Promise.reject ({ message: `You are using an Admin account.` });
	}
};

// ========== GET CART ==========
module.exports.getCart = (user) => {
	return Cart.findOne ({userId : user.id}).then (cart => {
			if (cart) {
				return cart;

			} else {
				return ({ message: `No Cart` });
			}
			
		}).catch (err => {
			console.log (err);
			res.status (500).send ({error: `Fetch Error`});
		});
};

// ========== EDIT CART ==========
module.exports.editCart = (editQuantity, userData) => {
	if (!userData.isAdmin) {

		return Cart.findOne ({userId : userData.id}).then (fetchedCart => {
			console.log (editQuantity.items[0].name);

			if (fetchedCart == null) {
				return ({ message: "No Item/s"});

			} else if (fetchedCart.items.some ((item) => (item.productId == editQuantity.items[0].productId))) {
					let fetchedItem = fetchedCart.items.find ((item) => {
							return (item.productId == editQuantity.items[0].productId);
						});

					fetchedItem.quantity = editQuantity.items[0].quantity;
					fetchedItem.subTotal = (fetchedItem.quantity * fetchedItem.price);
					let newSubTotalAcc = [];
					fetchedCart.items.forEach ((item) => {
						newSubTotalAcc.push (item.price * item.quantity);
					});

					let newTotalAcc = newSubTotalAcc.reduce ((acc, curr) => {
						return (acc + curr);
					});

					fetchedCart.totalAmount = newTotalAcc;
					return fetchedCart.save().then (savedItem => {

						if (savedItem) {
							console.log(savedItem);
							return ({ message: "Edit Success"});

						} else {
							return ("Error editing cart.");
						}

					}).catch (err => {
						console.log (err);
						res.status (500).send ({error: "Save Error"})
					});

			} else {
				return (`Could not find item in your cart.`);
			} 
		}).catch (err => {
			console.log (err);
			res.status (500).send ({error: "Bad Request"})
		});

	} else {
		return Promise.reject ({ message: "You are using an Admin account." });
	}
};

// ========== CREATE ORDER / CHECKOUT ==========
module.exports.checkout = async (cartId, user) => {

	if (!user.isAdmin) {

		 let doesCartExist = await Cart.findById (cartId).then (fetchedCart => {
		 	return fetchedCart;
		 });

		 let isOrderCheckedOut = await Order.findOne ({cartId : cartId}).then (fetchedOrder => {

			if (fetchedOrder == null) {
				let newOrder = new Order ({
					userId : user.id,
					cartId : cartId,
					products : doesCartExist.items,
					totalAmount : doesCartExist.totalAmount
				});

				return newOrder.save().then (order => {
					if (order) {
						return true;
					} else {
						return false;
					}
				}).catch (err => {
					console.log (err);
					res.status (500).send ({error: `Save Error`})
				});
				
			} else {
				return (`Cart already checked out.`)
			} 
		}).catch (err => {
			console.log (err);
			res.status (500).send ({error: `Bad Request`})
		});

		if (isOrderCheckedOut) {
			return (`Successfully checked out.`);
		} else {
			return (`Error in checking out.`);
		}

	} else {
		return Promise.reject (`You are using an Admin account.`);
	}
};

// GET ORDERS

module.exports.retrieveOrders = (userData) => {
		return Order.find ({userId : userData.id}).then (allOrders => {
			return allOrders;
			
		}).catch (err => {
			console.log (err);
			res.status (500).send ({error: `Fetch Error`})
		});
};

// ==================================================