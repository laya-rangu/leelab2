import axios from "axios";

// ✅ Fetch recent tweets (Twitter/X API v2)
export const fetchTweets = async () => {
  try {
    const url = "https://api.twitter.com/2/tweets/search/recent?query=leelab";

    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
      }
    });

    return res.data.data || [];
  } catch (err) {
    console.error("Twitter fetch failed:", err.message);
    return [];
  }
};
console.log("Twitter token exists:", !!process.env.TWITTER_BEARER_TOKEN);
