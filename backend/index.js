// ========== MODULES (NPM) ==========
const express = require ("express");
const mongoose = require ("mongoose");
const cors = require ("cors");
// =============================

// ========== MODULES (LOCAL) ==========
const userRoute = require ("./routes/userRoute");
const productRoute = require ("./routes/productRoute");
// ===================================

// ========== DATABASE CONNECTION ==========

let db = mongoose.connection;
mongoose.connect ("mongodb+srv://admin:admin1234@b256buencido.lmfwv9e.mongodb.net/B256_EcommerceAPI?retryWrites=true&w=majority",
 
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}	
);
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log(`Were connected to the cloud database`));
// =========================================

// ========== Express.js INITIALIZATION ==========
const app = express();
app.use (cors());
app.use (express.json());
app.use (express.urlencoded ({extended: true}));
// ===============================================

// ========== ROUTES CONNECTION ==========
app.use ("/user", userRoute);
app.use ("/admin", productRoute);
// ============================

// ========== API CONNECTION ==========
app.listen (4000, () => console.log (`API is now online on port 4000`));

// ====================================