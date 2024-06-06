const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// router
router.get("/", userController.view);
router.post("/", userController.find);
router.get("/adduser", userController.new);
router.post("/adduser", userController.create);
router.get("/edituser/:id", userController.edit);

router.post("/edituser/:id", userController.updateuser);
router.get("/viewuser/:id", userController.watch);
router.get("/:id", userController.delete);

module.exports = router;
