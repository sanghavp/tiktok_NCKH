const search = require('../Models/search');


exports.addSearchKey = async function(req, res) {
   try {
      const searchKey = new search({
         key: req.body.searchKey, 
         userID: req.user.id
      })
      searchKey.save();
      res.status(200).json("Đã thêm vào yêu thích!")
   } catch (error) {
      res.status(500).json(error)
   }
}
exports.getSearchKey = async function(req, res) {
   const searchKeys = await search.find({userID: req.user.id}).limit(10).exec();
   res.send(searchKeys)
}
exports.deleteSearchKey = async function(req, res) {
   try {
      await search.findByIdAndDelete(req.params.id);
      res.status(200).json("Thành công!");
   } catch (error) {
      res.status(500).json(error);
   }
}