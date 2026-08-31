# Parbat Resort Website — Starter

A custom-coded responsive resort website with:

- Premium responsive homepage
- Rooms section
- Facilities section
- Gallery
- Booking enquiry → WhatsApp
- Google Maps location
- Google Reviews integration via Places API (New)
- Server-side API key protection
- Mobile navigation

## Run locally

1. Install Node.js 18+
2. Open this folder in terminal
3. Run:

```bash
npm install
cp .env.example .env
npm start
```

Then open:

http://localhost:3000

## Connect Google Reviews

1. Create/select a project in Google Cloud Console.
2. Enable **Places API (New)**.
3. Create an API key and restrict it appropriately.
4. Find the exact **Place ID** for Parbat Resort.
5. Add both values to `.env`:

```env
GOOGLE_PLACES_API_KEY=...
GOOGLE_PLACE_ID=...
```

6. Restart the server.

The front end calls `/api/google-reviews`. The browser never receives the server API key.

Google Places API (New) can return rating, user rating count and up to 5 reviews for a place. Keep Google/author attribution visible when showing Google review content.

## Replace demo imagery

The current images are generic scenic/room placeholders. Replace them with original Parbat Resort photos before launch.

## Current resort details used

- Name: Parbat Resort
- Location: Arang Kel, Tehsil Sharda, District Neelum
- Phone/WhatsApp: +92 355 8144855
- Maps: https://maps.app.goo.gl/Yi4MBcaCQdbV4Vmg8
- Coordinates used for map preview: 34.8098717, 74.3518744

## Next recommended additions

- Final logo + brand colors
- Real room names/prices/capacity
- Original gallery
- Instagram/Facebook links
- Booking database/admin panel if needed
- Online payment only if the resort wants prepaid reservations
- SEO schema (Hotel / LodgingBusiness)
- Analytics and Search Console
