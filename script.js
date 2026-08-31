const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll("#nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

document.getElementById("year").textContent = new Date().getFullYear();

const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");
const today = new Date().toISOString().split("T")[0];
checkIn.min = today;
checkOut.min = today;

checkIn.addEventListener("change", () => {
  checkOut.min = checkIn.value || today;
  if (checkOut.value && checkOut.value < checkIn.value) checkOut.value = "";
});

document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("guestName").value.trim();
  const phone = document.getElementById("guestPhone").value.trim();
  const inDate = document.getElementById("checkIn").value;
  const outDate = document.getElementById("checkOut").value;
  const guests = document.getElementById("guests").value;
  const room = document.getElementById("roomType").value;
  const note = document.getElementById("guestMessage").value.trim();

  const message = [
    "Assalam o Alaikum, I want to enquire about a booking at Parbat Resort.",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Check-in: ${inDate}`,
    `Check-out: ${outDate}`,
    `Guests: ${guests}`,
    `Room: ${room}`,
    note ? `Message: ${note}` : ""
  ].filter(Boolean).join("\n");

  window.open(`https://wa.me/923558144855?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});

async function loadGoogleReviews() {
  const grid = document.getElementById("reviewGrid");

  try {
    const response = await fetch("/api/google-reviews");
    if (!response.ok) throw new Error("Reviews endpoint not configured");

    const data = await response.json();

    if (data.rating) {
      document.getElementById("ratingValue").textContent = Number(data.rating).toFixed(1);
      document.getElementById("heroRating").textContent = Number(data.rating).toFixed(1);
    }

    if (data.userRatingCount) {
      document.getElementById("reviewCount").textContent = data.userRatingCount;
      document.getElementById("heroReviewCount").textContent = `${data.userRatingCount}+`;
    }

    if (data.googleMapsUri) {
      document.getElementById("allReviewsLink").href = data.reviewsUri || data.googleMapsUri;
      document.getElementById("writeReviewLink").href = data.writeAReviewUri || data.googleMapsUri;
    }

    if (Array.isArray(data.reviews) && data.reviews.length) {
      grid.innerHTML = data.reviews.map(review => {
        const author = review.authorAttribution || {};
        const photo = author.photoUri
          ? `<img src="${escapeHtml(author.photoUri)}" alt="${escapeHtml(author.displayName || "Guest")}">`
          : "";
        const stars = "★".repeat(Math.max(1, Math.min(5, Math.round(review.rating || 5))));
        const text = review.text?.text || review.originalText?.text || "Guest review on Google.";

        return `
          <article class="review-card">
            <span class="stars">${stars}</span>
            <p>${escapeHtml(text)}</p>
            <div class="review-author">
              ${photo}
              <div>
                <strong>${escapeHtml(author.displayName || "Google User")}</strong>
                <span>${escapeHtml(review.relativePublishTimeDescription || "")}</span>
              </div>
            </div>
          </article>
        `;
      }).join("");
    }
  } catch (err) {
    console.info("Google reviews demo mode:", err.message);
  }
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

loadGoogleReviews();
