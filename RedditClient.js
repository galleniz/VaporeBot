
const Snoowrap = require('snoowrap');

module.exports = class RedditClient {
    constructor()
    {
        this.r = new Snoowrap({
          userAgent: 'balixd/0.0.1',
          clientId: process.env.REDDITID,
          clientSecret:process.env.REDDIT,
          username:process.env.RDEVUSER,
          password: process.env.RDEVPASS,
        });
    }
    /**
     * get the last post (the first one)
     * @param {String} subreddit 
         * @returns {{link:String, author:any, title:String, text:any, subreddit:{link:String,name:String}}}

     */
    async getLastPost(subreddit,reqImages)
    {
        
        return await this.r.getSubreddit(subreddit).getHot({ limit: 50 })
        .then(posts => {
            if (reqImages === true)
            {
              const imagePosts = posts.filter(post => post.hasImage());
              const post = imagePosts[0]
              return this.postFormat(post)
            }
  
            const post = posts[0];
            return this.postFormat(post)

        })
        .catch(error => {
          console.error('Error al obtener los posts', error);
          return null;
        });
    }
     /**
     * get the first post (the last one) ( IN THE CACHE!)
     * @param {String} subreddit 
          * @returns {{link:String, author:any, title:String, text:any, subreddit:{link:String,name:String}}}

     */
     async getFirstCachePost(subreddit,reqImages)
    {
        if (!reqImages) reqImages = false;
        
        return await this.r.getSubreddit(subreddit).getHot({ limit: 50 })
        .then(posts => {
            if (reqImages === true)
            {
              const imagePosts = posts.filter(post => post.hasImage());
              const post = imagePosts[imagePosts.length - 1]
              return this.postFormat(post)
            }
  
            const post = posts[posts.length - 1];
            return this.postFormat(post)
        })
        .catch(error => {
          console.error('Error al obtener los posts', error);
          return null;

        });
    }
    /**
     * Gets a random post from a any subreddit
     * @param {String} subreddit 
     * @param {Number} limit 
     * @returns {{link:String, author:any, title:String, text:any, subreddit:{link:String,name:String}}}
     */
    async getRandomPost(query, limit, reqImages)
    {
        if (!limit) 
            limit = 50
        if (!reqImages) 
            reqImages = false;

        return await this.r.getSubreddit(query).getHot({ limit: limit })
        .then(async posts => {
            
            
          const post = posts[this.getRandomInt(0, posts.length - 1)];
          post.comments
          if (reqImages === true && this.hasImage(post))
          {
            const imagePosts = posts.filter(post => this.hasImage(post));
            const postFil = imagePosts[this.getRandomInt(0, imagePosts.length - 1)]
            return await this.postFormat(postFil)
          } else
             return await this.postFormat(post)
        })
        .catch(error => {
          console.error('Error al obtener los posts', error);
        });
    }
   async postFormat(post)
    {
        let link = `https://reddit.com/${post.permalink}`
        let title = post.title;
        let text = post.selftext
        let image = post.url
        const subredditName = post.subreddit.display_name;
        const subreddits = await this.r.getSubreddit(subredditName);

        let subreddit = 
        {
          link: `https://reddit.com/${post.subreddit_name_prefixed}/`,
          name: post.subreddit.display_name,
        }
        let author = {
            icon: await post.author.icon_img,
            name: post.author.name
          }
          const te = await this.r.getSubmission(
            post.id
          );

          const comentarios = await te.comments;
          let comments = [];
          for (let i = 0; i < comentarios.length; i++) {
            let comentario = comentarios[i];
            let usuario = comentario.author.name;
            let respuesta = comentario.body + " ";
            if (respuesta.length > 1024) respuesta =respuesta.splice(0,1021) + "...";
            comments.push({name: "Comment of " + usuario, value: respuesta});
            if (i > 4)
            break;
          }
          
        let p = {link, author, title, text, subreddit, image, comments}
        console.log(p)
        
        return p
    }
    /**
     * 
     * @param {Number} min 
     * @param {Number} max 
     * @returns 
     */
     getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
       hasImage(post) {
        // Revisa si el post tiene algún campo de imagen
        if (post.url.includes('.jpg') || post.url.includes('.jpeg') || post.url.includes('.png') || post.url.includes('.gif')) {
          return true;
        }
        
        // Revisa si el post tiene algún campo de preview
        if (post.preview && post.preview.images && post.preview.images.length > 0) {
          const preview = post.preview.images[0];
          if (preview.variants && preview.variants.mp4 && preview.variants.mp4.source.url) {
            return true;
          }
          if (preview.source && preview.source.url) {
            return true;
          }
        }
        
        return false;
      }
}