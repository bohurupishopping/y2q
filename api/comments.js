import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = process.env.YOUTUBE_API_KEY;

router.get('/:videoId', async (req, res) => {
  const { videoId } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/commentThreads`, {
      params: {
        part: 'snippet',
        videoId,
        maxResults: 50,
        key: API_KEY,
      },
    });
    res.json(response.data.items.map(item => ({
      text: item.snippet.topLevelComment.snippet.textDisplay,
      authorName: item.snippet.topLevelComment.snippet.authorDisplayName,
      authorProfileImageUrl: item.snippet.topLevelComment.snippet.authorProfileImageUrl.replace('http://', 'https://'),
    })));
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).send('Error fetching comments');
  }
});

export default router;
