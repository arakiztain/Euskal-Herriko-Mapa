import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      _id: user._id
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.json({ token });
};

const register = async(req,res)=>{
    const { username, email, password} = req.body;

    const user = await userModel.findOne({email});
    const usernameUser = await userModel.findOne({username});
    if(user){
        return res.status(400).json({error:"Email already in use"});
    }

    if(usernameUser){
        return res.status(400).json({error:"Username already in use"});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new userModel({username, email, password:hashedPassword});
    await newUser.save();
    res.json({message:"User created"});
}

export default {login,register};