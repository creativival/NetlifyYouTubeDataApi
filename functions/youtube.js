// functions/youtube.js
import fetch from "node-fetch";

export async function handler(event) {
  const videoId = event.queryStringParameters.videoId;
  if (!videoId) {
    return { statusCode: 400, body: "Missing videoId" };
  }

  const API_KEY = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/videos?` +
              new URLSearchParams({
                key: API_KEY,
                part: "snippet,contentDetails,statistics",
                id: videoId,
              });

  try {
    const res = await fetch(url);
    const data = await res.json();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
}
