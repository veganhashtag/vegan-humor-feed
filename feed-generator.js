// Vegan Humor Feed Generator with Photo Prioritization
const HASHTAGS = ['#veganhumor', '#veganhumour', '#veganmemes', '#veganlols', '#veganhashtag'];
const KEYWORDS = ['vegan', 'veganism', 'veganize', 'plant-based', 'veganuary', 'tofu', 'seitan'];
const HUMOR_WORDS = ['funny', 'lol', 'joke', 'meme', '😂', '🤣', 'humor'];

module.exports = {
  generateFeed: (posts) => {
    return posts
      .filter(post => {
        const text = post.text.toLowerCase();
        const hasHashtag = HASHTAGS.some(tag => text.includes(tag));
        const hasKeyword = KEYWORDS.some(keyword => text.includes(keyword));
        const hasHumor = HUMOR_WORDS.some(word => text.includes(word));
        return hasHashtag || (hasKeyword && hasHumor);
      })
      .sort((a, b) => {
        const aHasPhoto = a.media && a.media.length > 0; // Check if 'media' array exists and has items
        const bHasPhoto = b.media && b.media.length > 0;
        return bHasPhoto - aHasPhoto; // Prioritize posts with photos
      });
 
