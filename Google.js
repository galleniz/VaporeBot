require("dotenv").config();
const fetch = require('node-fetch');
const logger = require("./Logger")
const { google } = require('googleapis');
const translate = require("node-google-translate-skidz");
 const youtube = google.youtube({
  version: 'v3',
  auth: process.env.GOOGLE,
});
// google.assistant
module.exports = class Google {
    constructor()
    {
      /**
       * @type {logger}
       */
      this.logger;
    }
  async translate(from,to,text)
  {
   try {
    let trans = text;
    await translate({
      text: text,
      source: from,
      target: to,
    },
    function (result)
    {
     trans =result.translation
    }
    )
    return trans;
      } catch(e)
      
      {
          this.logger.log("eror",e)
        return text;

      }
  }
  async randomGif(query)
  {
    if (typeof query !== "string")
      throw "Wants to have a string, have a " + typeof query;
    let a = (await this.gif(query))[this.randomNumber(0,7)];

    return a
  }
  /**
       * 
       * @param {Number} min 
       * @param {Number} max 
       * @returns 
       */
  randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
    async gif(query)
    {
      const curl = `https://tenor.googleapis.com/v2/search?q=${query}&key=${process.env.TENOR}&client_key=${"niz"}&limit=8`
      const response = await fetch(curl);
      const data = await response.json();
      let gifs = [];
      
      for (let gif of data.results)
        gifs.push(gif.media_formats.gif.url);
  
      return gifs;
    }
    async searchYouTubeVideo(query,limit)
    {
        return youtube.search.list({
            part: 'id',
            q: query,
            maxResults: limit,
            type: 'video',
          }).then(response=>{
              const videoId = response.data.items[0].id.videoId;
      
              const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
              return this.getVideoInfo(videoId).then(video=>{
            return {video, videoUrl};
            })
          });
    }
   
    async  searchGoogle(query,images) {
        const url = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE}&cx=${process.env.GOOGLEE}&q=${query}${images ? "&type=image" : ""}`;
    
        const response = await fetch(url);
        const data = await response.json();
    
        if (!data.items || data.items.length === 0) {
        return 'No result';
        }
        console.log(data.items);
        const results = data.items.map(item => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet
        }));
    
        return results;
    }
    
    async getVideoInfo(videoId) {
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${process.env.GOOGLE}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        const video = data.items[0];
        const title = video.snippet.title;
        const description = video.snippet.description;
        const thumbnail = video.snippet.thumbnails.high.url;
        const channelTitle = video.snippet.channelTitle;
        const channelId = data.items[0].snippet.channelId;
        const _ch = await this.getChannelInfoFromID(channelId)

        const channel = {title: channelTitle, name: _ch.name, avatar: _ch.avatar, id:channelId}

        return { title, thumbnail,description, channel };
      }
     async getChannelInfoFromID(id)
      {
        const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${id}&key=${process.env.GOOGLE}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        const channel = data.items[0];

        const name = channel.snippet.title;
        const avatar = channel.snippet.thumbnails.default.url;
        return {name, avatar}

      }
}