/* ==========================================================
   EDIT THIS FILE ONLY. Everything on the album comes from here.
   Put your photos in assets/photos/ and match the file names.
   ========================================================== */
window.GIFT = {
  to: "My Love",                       // her name or nickname
  from: "Your Name",                   // your name
  title: "For You",                    // cover title
  subtitle: "A little album of us",    // cover subtitle
  hint: "Tap the ribbon",              // text shown under the closed album
  endpaper: "To the one who makes every ordinary day feel like a favorite memory.", // first inside page

  // One object per photo page. align: "top" | "center" | "bottom"
  pages: [
    { image: "assets/photos/01.jpg", title: "The day we met", message: "I did not know it yet, but my whole world was about to change.", align: "bottom" },
    { image: "assets/photos/02.jpg", title: "Our first date", message: "You laughed, and I forgot every word I had practiced.", align: "bottom" },
    { image: "assets/photos/03.jpg", title: "Little moments", message: "My favorite place is wherever you are.", align: "bottom" },
    { image: "assets/photos/04.jpg", title: "You, being you", message: "Thank you for loving me on my best and worst days.", align: "bottom" },
    { image: "assets/photos/05.jpg", title: "Still choosing you", message: "Every day, in every version of the story.", align: "bottom" }
  ],

  // The letter is the last page of the album.
  letter: {
    greeting: "Dear My Love,",
    paragraphs: [
      "I made this album because words alone were not enough to say thank you.",
      "Thank you for your patience, your laughter, and the way you care about me. You make me want to be better every day.",
      "Whatever comes next, I want to keep making memories with you."
    ],
    closing: "Forever yours,",
    signature: "Your Name"
  },

  backCover: "With all my love"
};
