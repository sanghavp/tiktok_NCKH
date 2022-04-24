const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs');
// Connect selemium hub 
const URI = "https://www.tiktok.com/tag/onhiemmoitruong"; 

request('https://www.tiktok.com/tag/onhiemmoitruong', (error, response, body) => { // gửi request đến trang 
  if(error) {
    console.log(error);
    response.render("trangchu", {html:"co loi xay ra"})
  }else{
    $ = cheerio.load(body);
    let listAuthor = $(body).find("a.tiktok-nafpq5-StyledLink")
    listAuthor.each( function(i, e) {
      console.log( $(this).text() );
      console.log(e["attribs"]["href"]);
      console.log(e["attribs"]["title"]);
    })
    let listTitle = $(body).find("a.tiktok-1wrhn5c-AMetaCaptionLine");
    // console.log(listTitle)
    listTitle.each( function(i, e) {
      console.log(i + 1);
      console.log( $(this).text() );
      console.log(e["attribs"]["title"]);
    })
    // console.log(listAuthor);
  }
}); 