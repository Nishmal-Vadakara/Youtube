function UpdateOneYouTubeVideo() {
  var videoID = 'e4JSw_voX1Q';
  var part = 'snippet,statistics';
  var params = {'id': videoID};

  var response = YouTube.Videos.list(part, params);
  var video = response.items[0];
  var videoViewsCount = video.statistics.viewCount;
  var videoLikeCount = video.statistics.likeCount;
  var videoDislikeCount = video.statistics.dislikeCount;
  var videoCommentCount = video.statistics.commentCount;

  var videoTitle = 'This awesome fantastic video has ' + videoViewsCount + ' views, ' + videoLikeCount + ' likes and ' + videoDislikeCount + ' dislikes. It also has ' + videoCommentCount + ' comments!!!';

  video.snippet.title = videoTitle;

  try {
    var updateResponse = YouTube.Videos.update(video, part);
    console.log('Video title updated successfully!');
  } catch (e) {
    console.log('Error updating video title:', e);
  }
}const puppeteer = require('puppeteer');

async function updateVideoTitle() {
  const videoID = 'e4JSw_voX1Q'; // Replace with your video ID
  const url = `https://www.youtube.com/watch?v=${videoID}`;
  const titleElementSelector = 'h1.title yt-formatted-string';

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle0' });

  // Get the current view count from the page
  const viewCount = await page.evaluate(() => {
    const viewCountElement = document.querySelector('#count > yt-view-count-renderer > span.view-count');
    return viewCountElement ? viewCountElement.innerText : '';
  });

  // Get the current time
  const currentTime = new Date().toLocaleString();

  // Generate the updated title
  const updatedTitle = `This awesome fantastic video has ${viewCount} views and was updated at ${currentTime}`;

  // Update the video title on the YouTube page
  await page.click(titleElementSelector, { clickCount: 3 });
  await page.type(titleElementSelector, updatedTitle);
  await page.keyboard.press('Enter');

  console.log('Video title updated successfully!');

  await browser.close();
}

// Run the updateVideoTitle function every 3 minutes
setInterval(updateVideoTitle, 3 * 60 * 1000);
