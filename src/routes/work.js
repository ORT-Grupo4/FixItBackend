const { Router } = require("express");

const {
    createWork,
    getWorks,
    deleteWork,
} = require("../controllers/WorkController");
const router = Router();
const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/validateJWT");
// router.use(validateJWT);
router.post(
    "/new",
    [],
    createWork
);

router.get("/getWorks", getWorks);
router.put("/delete/:id", deleteWork);

module.exports = router;
