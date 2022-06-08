const recordModel = require('../Models/record');
const recordName = require('../Models/recordName');
const data = require("../CrawlData/crawler");


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
   res.status(200).json(rcName);
}

const getRecordName = async (req, res) => {
   const records = await recordName.find({userId: req.user.id});
   if(!records){
      res.send("Chưa có bài viết nào được tìm kiếm!");
   }
   res.send(records);
}

const getRecords = async(req, res) => {
   const records = await recordModel.find({recordId: req.params.id});
   res.send(records);
}

const deleteLink = async (req, res)=> {
   console.log(req.params);
   const del = await recordName.findByIdAndDelete(req.params.id);
   await recordModel.deleteMany({recordId: req.params.id});
   if(!del){
      res.send('Bai viet khong ton tai!');
   }
   else{
      res.status(200).send("Xóa thành công!");
   }
}
const searchByLink = async(req, res) => {
   const recordId = req.params.id;
   const record = await recordName.findById(recordId);
   const recordCContent = await data.oneRecord(record.link);
   res.send(Object.assign(recordCContent,{recordId}));
}

const addRecordContent = async(req, res) => {
   const content = await new recordModel(req.body);
   await content.save()
   res.send("Them thanh cong !");
}
module.exports = {
   addRecord,
   deleteLink,
   getRecordName,
   getRecords,
   searchByLink,
   addRecordContent
}
