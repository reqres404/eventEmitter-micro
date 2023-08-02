const mongoose = require("mongoose");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const login = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return { status: "error", error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );

    return res.json({ status: "ok", user: token, userdata: user });
  } else {
    return res.json({ status: "error", user: false });
  }
};

const register = async (req, res) => {
  
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
};

const getUser = async (req, res) => {
  const users = await User.find({});
  console.log(users);
  res.status(200).json(users);
};

const getUserRole = async (req, res) => {
	try {
	  const userId = req.params.id;
	  const user = await User.findOne({ _id: userId });
  
	  if (user) {
		const userRole = user.Admin;
	
		res.status(200).json({ userRole });
	  } else {
		console.log('User not found');
		res.status(404).json({ userRole:null });
	  }
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ userRole:null });
	}
  };
  const deleteUser= async(req,res)=>{
    const {id} = await req.params
    try {
      
      const result = await User.deleteOne({ _id: id });
      return res.status(200).json({msg:"User has been deleted"})
      
    } catch (error) {
      return res.status(500).json({msg:"Internal server error"})
    }
  }
  const updateAdminStatus = async (req,res) => {
    const {id} = req.params
    try {
      const result = await User.updateOne({ _id: id }, { Admin: true });
      return res.status(200).json({msg:"User has been updated to admin"})
    } catch (error) {
      return res.status(500).json({msg:"Internal server error"})
    }
  };
  

module.exports = {
  getUser,
  getUserRole,
  login,
  register,
  deleteUser,
  updateAdminStatus
};
