
const data = require("../CrawlData/crawler");
const Videos = require("../Model/video");

exports.test = async function(req, res) {
   res.send("truy cập thành công!");
}
let listVideo = [];
exports.addVideo = async function(req, res, next) {
   for(let i=0; i < data.userName.length; i++){
      const video = {
         title: data.Title[i],
         tag: data.tag[i],
         music: data.MusicId[i],
         likeCount: data.likeCount[i],
         commentCount: data.commentCount[i],
         shareCount: data.shareCount[i],
         author: data.userName[i]
      }
      listVideo.push(video)
   };
   Videos.insertMany(listVideo)
      .then(function (docs) {
         res.json(docs);
      })
      .catch(function (err) {
         res.status(500).send(err);
      });
};
exports.getAllVideo = async function(req, res, next) {
   let videos = await Videos.find({}).exec();
   res.send(videos)
}