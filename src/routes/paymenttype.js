const { Router } = require("express");

const {
    createPaymentType,
    getPaymentTypes,
    deletePaymentType,
} = require("../controllers/PaymentTypeController");

const router = Router();
const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/validateJWT");
// router.use(validateJWT);
router.post(
    "/new",
    [check("name", "name is required").not().isEmpty().trim()],
    createPaymentType
);
router.get("/getPaymentTypes", getPaymentTypes);
router.put("/delete/:id", deletePaymentType);

module.exports = router;
