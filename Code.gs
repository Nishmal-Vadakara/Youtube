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
}

