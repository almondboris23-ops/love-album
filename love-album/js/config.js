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

  // One object per page. Use image: "..." for a photo or video: "..." for a video (optional poster: "..." = cover image).
  // For video pages use align "top" so the message does not cover the play controls.
  //  align: "top" | "center" | "bottom"
  pages: [
    { image: "assets/photos/01.jpg", title: "The day we met", message: "I did not know it yet, but my whole world was about to change.", align: "bottom" },
    { image: "assets/photos/02.jpg", title: "Our first date", message: "You laughed, and I forgot every word I had practiced.", align: "bottom" },
    { video: "assets/photos/03.mp4", poster: "", title: "Little moments", message: "My favorite place is wherever you are.", align: "top" },
    { image: "assets/photos/04.jpg", title: "You, being you", message: "Thank you for loving me on my best and worst days.", align: "bottom" },
    { image: "assets/photos/05.jpg", title: "Still choosing you", message: "Every day, in every version of the story.", align: "bottom" },
    { image: "assets/photos/06.jpg", title: "Quiet nights, warm hearts", message: "Even in the dark, you make everything feel safe and beautiful.", align: "bottom" }
  ],

  // The letter is the last page of the album.
  letter: {
    greeting: "Dear My Love,",
    paragraphs: [
      "I made this album for you because no words can describe how much I love you.",
      "I want to thank you for being my partner, my best friend, my partner in crime, and thank you for being my everything, no words can explain how much I appreciated every little thing about you.",
      "Whatever comes next, I want you to know that I am always here for you, through ups and downs, no matter what may come."
    ],
    closing: "Forever yours,",
    signature: "Almond"
  },

  backCover: "I Love You, Always and In All Ways."
};
