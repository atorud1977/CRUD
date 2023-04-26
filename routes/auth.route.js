const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post(
  "/registration",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Parol 6 ta sondan kam bo'lmasligi kerak").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "To'g'ri ma'lumot kiriting",
        });
      }

      const { email, password } = req.body;
      const isUsed = await User.findOne({ email });

      if (isUsed) {
        return res.status(300).json({ message: "Bu email band" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email,
        password: hashedPassword,
      });

      await user.save();

      res.status(201).json({ message: "Foydalanuvchi qo'shildi" });
    } catch (error) {
      console.log(error);
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Parol 6 ta sondan kam bo'lmasligi kerak").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "To'g'ri ma'lumot kiriting",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Bunday email mavjud emas" });
       
      }
      const isMath = await bcrypt.compare(password, user.password);

      if (!isMath) {
        
        return res.status(400).json({ message: "Parol to'gri kelmadi" });
      }

      const jwtSecret = "jjj74hy48ryfy64hf4tgf8ugtye78tyohtgytyhufg9907jju";

      const token = jwt.sign({ userId: user.id }, jwtSecret, {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id });
    } catch (error) {
      console.log(error);
    }
  }
  
);

module.exports = router;
