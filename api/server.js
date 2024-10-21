import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = process.env.YOUTUBE_API_KEY;

app.use(cors());

app.get('/api/comments/:videoId', async (req, res) => {
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

app.get('/api/videos/:videoId', async (req, res) => {
  const { videoId } = req.params;
  try {
    const videoResponse = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet',
        id: videoId,
        key: API_KEY,
      },
    });
    const channelId = videoResponse.data.items[0].snippet.channelId;
    const channelResponse = await axios.get(`${BASE_URL}/channels`, {
      params: {
        part: 'snippet',
        id: channelId,
        key: API_KEY,
      },
    });
    res.json({
      title: videoResponse.data.items[0].snippet.title,
      channelTitle: videoResponse.data.items[0].snippet.channelTitle,
      channelThumbnailUrl: channelResponse.data.items[0].snippet.thumbnails.default.url.replace('http://', 'https://'),
      videoThumbnailUrl: videoResponse.data.items[0].snippet.thumbnails.high.url.replace('http://', 'https://'),
    });
  } catch (error) {
    console.error('Error fetching video details:', error);
    res.status(500).send('Error fetching video details');
  }
});

// Export the app for Vercel serverless function
export default app; // Correcting the export statement
