const recordModel = require('../Models/record');
const recordName = require('../Models/recordName')
const addRecord = async (req, res) => {
   const {link, name, ...body} = req.body;
   const rcName = new recordName({
      link,
      name,
      userId: req.user.id
   })
   // console.log(record);
   await rcName.save();
   const id = {
      recordId: rcName.id
   }
   const record = new recordModel(Object.assign(body, id));
   record.save();
   res.status(200).json(record);
}
const deleteLink = async (req, res)=> {
   const params = {
      link: req.body.link,
      userId: req.user.id
   }
   const del = await recordModel.deleteMany(params);
   if(req.body.userId != req.user.id){
      res.status(403).send("Bạn không có quyền thực hiện thao tác này!");
   }
   if(del.deletedCount == 0){
      res.status(404).send("Không tìm thấy bài viết bạn yêu cầu, hãy thử lại!")
   }
   else{
      res.status(200).send("Xóa thành công!");
   }
}
module.exports = {
   addRecord,
   deleteLink,
}
