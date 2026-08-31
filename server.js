import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("."));

app.get("/api/google-reviews", async (req, res) => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return res.status(503).json({
      error: "Google Places API is not configured yet."
    });
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;

    const googleResponse = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": [
          "displayName",
          "rating",
          "userRatingCount",
          "reviews",
          "googleMapsUri",
          "googleMapsLinks"
        ].join(",")
      }
    });

    if (!googleResponse.ok) {
      const body = await googleResponse.text();
      console.error("Google Places error:", googleResponse.status, body);
      return res.status(502).json({ error: "Could not load Google reviews." });
    }

    const place = await googleResponse.json();

    res.json({
      name: place.displayName?.text,
      rating: place.rating,
      userRatingCount: place.userRatingCount,
      googleMapsUri: place.googleMapsUri,
      reviewsUri: place.googleMapsLinks?.reviewsUri,
      writeAReviewUri: place.googleMapsLinks?.writeAReviewUri,
      reviews: place.reviews || []
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while loading Google reviews." });
  }
});

app.listen(PORT, () => {
  console.log(`Parbat Resort website: http://localhost:${PORT}`);
});
