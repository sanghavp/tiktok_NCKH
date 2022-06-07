const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const cralwData = async (numScroll) => {
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
  const browser = await puppeteer.launch({headless: false, devtools: true})
  const page = await browser.newPage()
  await page.goto('https://www.tiktok.com')
  let listData = [];
  const MAX_SCROLL = numScroll;

 
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
  const author = $(content).find("a.tiktok-1lqhxf7-StyledAuthorAnchor");
  const authorUserName = $(content).find("a.tiktok-1lqhxf7-StyledAuthorAnchor > h3");
  const authorNickName = $(content).find("a.tiktok-1lqhxf7-StyledAuthorAnchor > h4");
  const title = $(content).find("div.tiktok-1ejylhp-DivContainer");
  const music = $(content).find("h4.tiktok-zo4ukd-H4Link > a");
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
  console.log(dem)
  userName.forEach((data,i) => {
    listData.push({    
      userName: data,
      authorName: authorName[i],
      authorHref: authorHref[i],
      Title: Title[i],
      tag: tag[i],
      Music: Music[i],
      MusicHref: MusicHref[i],
      MusicId: MusicId[i],
      likeCount: likeCount[i],
      commentCount: commentCount[i],
      shareCount: shareCount[i]
    })
  })
  await browser.close();
  return listData;

};

const oneRecord = async (link) => {
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

  const browser = await puppeteer.launch({headless: false, devtools: true})
  const page = await browser.newPage()
  await page.goto(link);

  let listData = [];
  let content = await page.content();
  let $ = cheerio.load(content);
  const test = $(content).find("div.eqrezik3");
  if(!test){
    const text = 'Không tìm thấy bài viết được yêu cầu!';
    return text;
  }
  let author = $(content).find("span.e17fzhrb2");
  let authorUserName = $(content).find("span.e17fzhrb1");
  let title = $(content).find("div.e1h0bjw60");
  let music = $(content).find("h4.e11ku0eu0 > a");
  let btnAction = $(content).find("strong.edu4zum2");
  if(author == 0){
    author = $(content).find("h4.emt6k1z2");
    authorUserName = $(content).find("h3.emt6k1z0");
    title = $(content).find("div.e1h0bjw60");
    music = $(content).find("h4.e11ku0eu0 > a");
    btnAction = $(content).find("strong.e1pqpokj2");
    // await browser.close();
  }

  let dem = 0;
  authorUserName.each(function(i,e) {
    dem++;
    authorHref.push(`https://www.tiktok.com/@${$(this).text()}`);
  });
  authorUserName.each( function(i,e) {
    userName.push($(this).text())
  });
  author.each( function(i,e) {
    const fullName = $(this).text().split('·');
    authorName.push(fullName[0].trim())
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
  console.log(dem)
  
  userName.forEach((data,i) => {
    listData.push({    
      userName: data,
      authorName: authorName[i],
      authorHref: authorHref[i],
      Title: Title[i],
      tag: tag[i],
      Music: Music[i],
      MusicHref: MusicHref[i],
      MusicId: MusicId[i],
      likeCount: likeCount[i],
      commentCount: commentCount[i],
      shareCount: shareCount[i]
    })
  })
  await browser.close();
  return listData[0];
}
module.exports = {
  oneRecord,
  cralwData,
}