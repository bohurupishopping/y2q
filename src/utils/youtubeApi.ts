const BASE_URL = 'https://y2q.vercel.app/api'; // Update this to your deployed API URL

export interface CommentData {
  text: string;
  authorName: string;
  authorProfileImageUrl: string;
}

export interface VideoData {
  title: string;
  channelTitle: string;
  channelThumbnailUrl: string;
  videoThumbnailUrl: string;
}

export const fetchVideoComments = async (videoId: string): Promise<CommentData[]> => {
  try {
    const response = await fetch(`${BASE_URL}/comments/${videoId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const fetchVideoDetails = async (videoId: string): Promise<VideoData> => {
  try {
    const response = await fetch(`${BASE_URL}/videos/${videoId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const videoData = await response.json();
    return videoData;
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw error;
  }
};

export const extractVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};
