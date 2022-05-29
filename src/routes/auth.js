/**
 * host + api/auth
 */
const { Router } = require("express");
const {
    createUser,
    login,
    renewToken,
    getUsers,
} = require("../controllers/authController");
const router = Router();
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/field-validator");
const { validateJWT } = require("../middlewares/validateJWT");

router.post(
    "/register",
    [
        check("name", "name is required").not().isEmpty().trim(),
        check("email", "email is required").isEmail().normalizeEmail(),
        check("password", "password is required").isLength({ min: 6 }),
        validateFields,
    ],
    createUser
);

router.post(
    "/",
    [
        check("email", "Email is required").isEmail().normalizeEmail(),
        check("password", "Password is required").isLength({ min: 6 }),
        validateFields,
    ],
    login
);

router.get("/renew", [validateJWT], renewToken);
router.get("/getUsers", getUsers);

module.exports = router;
