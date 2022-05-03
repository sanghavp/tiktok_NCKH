const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const { scrollPageToBottom } = require('puppeteer-autoscroll-down');

// Create fields
let userName = [];
let authorName = [];
let authorHref = [];
let Title = [];
let tag = [];
let Music = [];
let MusicHref = [];
let MusicId = [];
let likeCount = [];
let commentCount = [];
let shareCount = [];

(async () => {
  const browser = await puppeteer.launch({headless: false, devtools: true})
  const page = await browser.newPage()
  await page.goto('https://www.tiktok.com')

  const MAX_SCROLL = 0; 

 
  let lastHeight = await page.evaluate('document.body.scrollHeight');
  let numberOfScroll = 0;

while (true) {
    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
    await page.waitForTimeout(2000); // sleep a bit
    let newHeight = await page.evaluate('document.body.scrollHeight');
    if (newHeight === lastHeight || numberOfScroll === MAX_SCROLL) {
        break;
    }
    lastHeight = newHeight;
    numberOfScroll++
}
  let content = await page.content();
  const $ = cheerio.load(content);
  const author = $(content).find("a.tiktok-1wozk2e-StyledAuthorAnchor");
  const authorUserName = $(content).find("a.tiktok-1wozk2e-StyledAuthorAnchor > h3");
  const authorNickName = $(content).find("a.tiktok-1wozk2e-StyledAuthorAnchor > h4");
  const title = $(content).find("div.tiktok-1ejylhp-DivContainer");
  const music = $(content).find("h4.tiktok-9y3z7x-H4Link > a");
  const btnAction = $(content).find("strong.tiktok-1y2yo26-StrongText");
  
  let dem = 0;

  author.each(function(i,e) {
    dem++;
    authorHref.push(`https://www.tiktok.com${e["attribs"]["href"]}`);
  });
  authorUserName.each( function(i,e) {
    userName.push($(this).text())
  });
  authorNickName.each( function(i,e) {
    authorName.push($(this).text())
  });
  title.each( function(i,e) {
    Title.push($(this).text());
    let tagItem = $(this).text().split("#");
    let tagInVideo = [];
    for(index=1; index < tagItem.length; index++) {
      tagInVideo.push(`#${tagItem[index].trim()}`);
    }
    tag.push(tagInVideo);
    // console.log(tagItem);
  });
  music.each( function(i,e) {
    Music.push($(this).text());
    MusicHref.push(`https://www.tiktok.com${e["attribs"]["href"]}`);
    let arrayHref = e["attribs"]["href"].split("-")
    MusicId.push(arrayHref[arrayHref.length - 1])
  })
  btnAction.each( function(i,e) {
    if(e["attribs"]["data-e2e"] === "like-count") {
      likeCount.push($(this).text());
    }
    if(e["attribs"]["data-e2e"] === "comment-count") {
      commentCount.push($(this).text());
    }
    if(e["attribs"]["data-e2e"] === "share-count") {
      shareCount.push($(this).text());
    }
  })
  // console.log("ShareCount: ",ShareCount);
  console.log(`Số bản ghi: ${dem}`)
  await browser.close();
})();

module.exports = {    
  userName,
  authorName,
  authorHref,
  Title,
  tag,
  Music,
  MusicHref,
  MusicId,
  likeCount,
  commentCount,
  shareCount
}