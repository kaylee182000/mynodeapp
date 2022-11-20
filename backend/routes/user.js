const userController = require("../controllers/userController")

const router = require("express").Router()

//add user
router.post('/', userController.addUser)
router.get('/', userController.getAllUser)
//router.get("/:id",userController.getUserById)

module.exports = router