const express = require('express')
const router = express.Router()
const {getUser, login, register,getUserRole, deleteUser, updateAdminStatus} = require('../controllers/userController')

router.get("",getUser)
router.post("/login",login)
router.post("/register",register)
router.get("/:id",getUserRole)
router.delete("/:id",deleteUser)
router.put("/:id",updateAdminStatus)
module.exports=router