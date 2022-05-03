const data = require("../CrawlData/crawler");
const Music = require("../Models/music");


let listMusic = [];
exports.addMusic = async function(req, res) {
   for(let i=0; i < data.userName.length; i++) {
      const music = {
         _id: data.MusicId[i],
         name: data.Music[i], 
         href: data.MusicHref[i]
      }
      listMusic.push(music);
   };
   Music.insertMany(listMusic)
      .then(function(docs){
         res.json(docs)
      })
      .catch(function (err) {
         res.status(500).json(err)
      })
}

exports.getAllMusic = async function( req, res) {
   let musics = await Music.find({}).exec();
   res.send(musics)
}
