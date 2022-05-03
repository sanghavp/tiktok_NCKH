const Users = require('../Models/users');

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