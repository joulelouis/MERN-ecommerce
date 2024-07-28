// ========== IMPORTING AND INITIALIZATION ==========
// Express.js
const express = require ("express");
const router = express.Router();

// LOCAL
const userController = require ("../controllers/userController");
const auth = require ("../auth");
// ==================================================

// ========== ROUTES ==========
router.post ("/register", (req, res) => {

	userController.registerUser (req.body).then (result => res.send (result)).catch (err => res.send (err));
});

router.post ("/login", (req, res) => {

	userController.loginUser (req.body).then (result => res.send (result)).catch (err => res.send (err));
});

router.get ("/product/all", (req, res) => {

	userController.retrieveAllActiveProducts ().then (result => res.send (result)).catch (err => res.send (err));
});

router.get ("/product/:id", (req, res) => {

	userController.retrieveProduct (req.params.id).then (result => res.send (result)).catch (err => res.send (err));
});

router.get ("/details/", auth.verify, (req, res) => {

	const userData = auth.decode (req.headers.authorization);
	
	userController.retrieveUserDetails (userData).then (result => res.send (result)).catch (err => res.send (err));
});

router.patch ("/:username/set-admin-auth", auth.verify, (req, res) => {

	const userData = auth.decode (req.headers.authorization);

	userController.toggleAdmin (req.params.username, req.body, userData).then (result => res.send (result)).catch (err => res.send (err));
});

router.post ("/product/:id", auth.verify, (req, res) => {

	const userData = auth.decode (req.headers.authorization);

	userController.addToCart (req.params.id, req.body, userData).then (result => res.send (result)).catch (err => res.send (err));
});

router.get ("/cart", auth.verify, (req, res) => {

	const userData = auth.decode (req.headers.authorization);

	userController.getCart (userData).then (result => res.send (result)).catch (err => res.send (err));
}); 

router.patch ("/cart/edit", auth.verify, (req, res) => {

	const userData = auth.decode (req.headers.authorization);

	userController.editCart (req.body, userData).then (result => res.send (result)).catch (err => res.send (err));
}); 

router.post ("/cart/:id/checkout", auth.verify, (req, res) => {

	const userData = auth.decode (req.headers.authorization);

	userController.checkout (req.params.id, userData).then (result => res.send (result)).catch (err => res.send (err));
}); 

router.get ("/orders", auth.verify, (req, res) => {
	
	const userData = auth.decode (req.headers.authorization);

	userController.retrieveOrders (userData).then (result => res.send (result)).catch (err => res.send (err));
});
// ========== EXPORTING ==========
module.exports = router;
// ===============================