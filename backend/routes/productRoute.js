// ========== IMPORTING AND INITIALIZATION ==========
// Express.js
const express = require ("express");
const router = express.Router();

// LOCAL
const productController = require ("../controllers/productController");
const auth = require ("../auth");
// ==================================================

// ========== ROUTES ==========
router.post ("/product/add-item", auth.verify, (req, res) => {
	
	const userData = auth.decode (req.headers.authorization);

	productController.addProduct (req.body, userData).then (result => res.send (result)).catch (err => res.send (err));
});

router.get ("/product/all", auth.verify, (req, res) => {
	
	const userData = auth.decode (req.headers.authorization);

	productController.retrieveAllProducts (userData).then (result => res.send (result)).catch (err => res.send (err));
});

router.put ("/product/update/:id", auth.verify, (req, res) => {
	
	const userData = auth.decode (req.headers.authorization);

	productController.updateProduct (req.params.id, req.body, userData).then (result => res.send (result)).catch (err => res.send (err));
});

router.patch ("/product/:id/status", auth.verify, (req, res) => {
	
	const userData = auth.decode (req.headers.authorization);

	productController.toggleProductStatus (req.params.id, req.body, userData).then (result => res.send (result)).catch (err => res.send (err));
});

router.get ("/all-orders", auth.verify, (req, res) => {
	
	const userData = auth.decode (req.headers.authorization);

	productController.retrieveAllOrders (userData).then (result => res.send (result)).catch (err => res.send (err));
});

// ========== EXPORTING ==========
module.exports = router;
// ===============================