
const data = require("../CrawlData/crawler");
const Videos = require("../Models/video");

exports.test = async function(req, res) {
   res.send("truy cập thành công!");
}
let listVideo = [];
exports.addVideo = async function(req, res, next) {
   const { numScroll } = req.body;
   const list = await data.cralwData(numScroll)
   res.status(200).json(list);
};
exports.getAnVideo = async (req, res) => {
   const { link } = req.body; 
   const video = await data.oneRecord(link);
   res.send(video)
}
exports.getAllVideo = async function(req, res, next) {
   let videos = await Videos.find({}).exec();
   res.send(videos);
}