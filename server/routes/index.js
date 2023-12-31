const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/products", require("./products.routes"));
router.use("/categories", require("./categories.routes"));
router.use("/feedback", require("./feedback.routes"));
router.use("/auth", require("./auth.routes"));
router.use("/user", require("./user.routes"));
router.use("/sizes", require("./sizes.routes"));

module.exports = router;
