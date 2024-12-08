require('dotenv').config();
const fs = require('fs');
const { AtpAgent } = require('@atproto/api');

const displayName = "Vegan Humor"; // Feed name
const description = "Laughs and memes for the vegan soul!"; // Feed description
const avatarPath = "avatar.jpg"; // Path to your avatar image
const feedUri = "https://<your-github-pages-url>"; // Replace with your GitHub Pages URL

(async () => {
  const handle = process.env.BLUESKY_HANDLE;
  const password = process.env.BLUESKY_PASSWORD;

  if (!handle || !password) {
    console.error('Error: BLUESKY_HANDLE or BLUESKY_PASSWORD is not set in .env');
    process.exit(1);
  }

  const agent = new AtpAgent({ service: 'https://bsky.social' });

  try {
    await agent.login({ identifier: handle, password });
    console.log('Login successful!');
  } catch (error) {
    console.error('Login failed:', error);
    process.exit(1);
  }

  let did;
  try {
    const profile = await agent.api.app.bsky.actor.getProfile({ actor: handle });
    did = profile.data.did;
    console.log('Retrieved DID:', did);
  } catch (error) {
    console.error('Failed to retrieve DID:', error);
    process.exit(1);
  }

  let avatar;
  try {
    const avatarResult = await agent.api.com.atproto.repo.uploadBlob(
      {
        blob: fs.createReadStream(avatarPath), // Ensure the file exists
      },
      { encoding: 'image/jpeg' }
    );
    avatar = avatarResult.data.blob;
    console.log('Avatar uploaded:', avatar);
  } catch (error) {
    console.error('Failed to upload avatar:', error);
    process.exit(1);
  }

  try {
    const response = await agent.api.com.atproto.repo.createRecord({
      repo: handle,
      collection: 'app.bsky.feed.generator',
      record: {
        did,
        displayName,
        description,
        avatar, // Avatar blob reference
        uri: feedUri,
        createdAt: new Date().toISOString(),
      },
    });

    console.log('Feed published:', response);
  } catch (error) {
    console.error('Feed publishing failed:', error);
    process.exit(1);
  }
})();
