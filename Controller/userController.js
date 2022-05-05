const Users = require('../Models/users');
const jwt = require("jsonwebtoken");
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy ;
const { ExtractJwt } = require('passport-jwt');


exports.createUser = async function (req, res) {
   try{
      const users = new Users(
         {
            userName: req.body.name,
            nickName: req.body.nickName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            bidthOfdate: req.body.bidthOfdate,
            password: req.body.password,
            gender: req.body.gender,
            isAdmin: req.body.isAdmin
         }
      )
      users.save();
      res.status(200).json("Đăng kí thành công!");
   }catch(err) {
      res.status(500).json(err);
      console.log("lỗi"); 
   }
}
exports.getAllUser = async function(req, res) {
   try {
      if(req.user.isAdmin){
         const users = await Users.find({}).exec();
         res.send(users);
      }else{
         res.status(403).json("Bạn không có quyền thực hiện thao tác này")
      }
   } catch (error) {
      res.status(401).json("hãy đăng nhập và thử lại!")
   }
}
exports.getAnUser = async function(req, res) {
   Users.findById(req.params.id, function(err, user){
      if(err) {
         res.status(500).json(err); 
      }
      res.send(user)
   })
}
exports.updateUser = async function (req, res) {
   try{
      if(req.user.id == req.params.id || req.user.isAdmin) {
         Users.findByIdAndUpdate(req.params.id, {$set : req.body}, function() {
            res.status(200).json("Cập nhật người dùng thành công!")
         })
      }else{
         res.status(403).json("Bạn không được phép làm điều này!")
      }
   }catch(err){
      res.status(500).json(err)
   }
}
exports.deleteUser = async function(req, res, user) {
   console.log(req.params.id)
   try {
      // Kiểm tra nếu đúng là người dùng đó hoặc đó là admin thì mới có thể xóa người dùng
      // Chỉ chính người dùng mới có thẻ xóa được chính mình hoặc chỉ admin mới có thể xóa người dùng
      if(req.user.id == req.params.id || req.user.isAdmin){
         // Xóa người dùng trên hệ thống thật
         // Users.findByIdAndDelete(res.params.id);
         // res.status(200).json("xóa người dùng thành công!")
         // Thông báo giả
         res.status(200).json("xóa người dùng thành công!");
      }else{
         console.log("test");
         res.status(403).json("Bạn không thể xóa người khác!")
      }
   } catch (err) {
      res.status(500).json(err)
   }
}

const GenerateAccessToken = function(user) {
   return jwt.sign({
      id: user.id,
      isAdmin: user.isAdmin
   },
   process.env.JWT_ACCESS_KEY, 
   {expiresIn: "23h"}
   );
}
const GenerateRefreshToken = function(user) {
   return jwt.sign({
      id: user.id,
      isAdmin: user.isAdmin
   },
   process.env.JWT_REFRESH_KEY,
   {expiresIn: "360d"}
   );
}

exports.user_login = async function(req, res) {
   try{
      const user = await Users.findOne({email: req.body.email});
      if(!user){
         res.status(400).json("Tên người dùng không chính xác!");
      };
      const validPassword = await Users.findOne({password: req.body.password});
      if(!validPassword){
         res.status(400).json("Mật khẩu không chính xác!");
      };
      if( user && validPassword){
         const acessToken = GenerateAccessToken(user);
         const refreshToken = GenerateRefreshToken(user);
         res.setHeader('Authorization', acessToken)
         res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
         });
         const {password, ...others} = user._doc;
         res.status(200).json({...others})
      }
   }catch(err){
      res.status(500).json(err);
   }
}
exports.refreshToken = async function(req, res, user) {
   if(req.user.id === req.params.id) {
      const newAccessToken = GenerateAccessToken(user);
      const newRefreshToken = GenerateRefreshToken(user);
      res.cookie("refreshToken", newRefreshToken, {
         httpOnly: true,
         secure: false,
         sameSite: "strict"
      });
      res.status(200).json({accessToken: newAccessToken})
   }
   // res.status(401).json(res.cookie.refreshToken)
}