const { Router } = require("express");

const {
    createService,
    getServices,
    deleteService
} = require("../controllers/ServiceController");
const router = Router();
const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/validateJWT");
router.use(validateJWT)
router.post(
    "/new",
    [check("name", "name is required").not().isEmpty().trim()],
    createService
);


router.get("/getServices", getServices)
router.put('/delete/:id', deleteService)


module.exports = router;