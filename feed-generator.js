// Vegan Humor Feed Generator with Equal Balance for Photos and Text
const HASHTAGS = ['#veganhumor', '#veganhumour', '#veganmemes', '#veganlols', '#veganhashtag'];
const KEYWORDS = ['vegan', 'veganism', 'veganize', 'plant-based', 'veganuary', 'tofu', 'seitan'];
const HUMOR_WORDS = ['funny', 'lol', 'joke', 'meme', '😂', '🤣', 'humor'];

module.exports = {
  generateFeed: (posts) => {
    return posts.filter(post => {
      const text = post.text.toLowerCase();
      const hasHashtag = HASHTAGS.some(tag => text.includes(tag));
      const hasKeyword = KEYWORDS.some(keyword => text.includes(keyword));
      const hasHumor = HUMOR_WORDS.some(word => text.includes(word));
      return hasHashtag || (hasKeyword && hasHumor);
    });
  }
};
