/*import axios from "axios";

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
*/
import axios from "axios";

const BASE_URL = "https://api.twitter.com/2";

// ✅ CHANGE THIS TO YOUR X USERNAME (WITHOUT @)
const TWITTER_USERNAME = "RanguLaya";  

export const fetchMyTweets = async () => {
  try {
    // ✅ Step 1: Get your user ID by username
    const userRes = await axios.get(
      `${BASE_URL}/users/by/username/${TWITTER_USERNAME}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
        }
      }
    );

    const userId = userRes.data.data.id;

    // ✅ Step 2: Get your latest tweets
    const tweetRes = await axios.get(
      `${BASE_URL}/users/${userId}/tweets?max_results=5`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
        }
      }
    );

    return tweetRes.data.data || [];
  } catch (err) {
    console.error(
      "Twitter fetch failed:",
      err.response?.data || err.message
    );
    return [];
  }
};
