/* ===================================================================
   SOUND BATH BY WYATT — EVERYDAY EDITS LIVE IN THIS ONE FILE
   -------------------------------------------------------------------
   Session descriptions, the booking link, reviews and gallery photos
   for the whole site come from here. Change this file and every page
   updates.

   Dates and times are NOT on the website — they live on Wyatt's
   Linktree, and every "Book a session" button goes there. So when a
   date, time or location changes, update the Linktree, not this file.

   Keep the punctuation (quotes, commas, brackets) exactly as shown —
   just swap the words between the quote marks.
   =================================================================== */

const SITE_CONTENT = {

  /* ---- BOOKING LINK: where every "Book a session" / "Book now" button goes */
  bookingLink: "https://linktr.ee/soundbaths",

  /* ---- FEATURED EVENT: a big flyer-style card on the Home page ----------
     Shows above the session types until the day after the event, then
     disappears on its own. Add another by copying the { ... } block.
       date:   "YYYY-MM-DD"
       link:   where the button goes (leave out to use the booking link)
       image:  a photo in the images folder (optional)                    */
  specialEvents: [
    {
      title: "The Year-End Reset",
      badge: "Special event · Palm Springs, CA",
      tagline: "Close the year in sound. Make space for what comes next.",
      date: "2026-12-30",
      time: "6:00–7:30 PM · doors open 5:30 PM",
      where: "The Yoga Clinic · 1701 N Palm Canyon Dr, Ste 3, Palm Springs, CA 92262",
      map: "1701 N Palm Canyon Dr, Ste 3, Palm Springs, CA 92262",
      tickets: "20 places only · first-timers welcome",
      desc: "In the quiet between Christmas and New Year, settle in for 55 minutes of sound with planetary gongs, large-format crystal bowls, chimes, and Tibetan bowls. A listening practice with nothing to fix and nothing to get right. Simply rest, listen, and let the year settle.",
      image: "images/year-end-reset.jpg",
      imageAlt: "Five planetary gongs and glowing crystal singing bowls set up beside a pool at night",
      cta: "Book your place"
    }
  ],

  /* ---- SESSIONS: the kinds of sessions Wyatt offers ----------------------
     Shown on the Sessions page (and the first four on the Home page).
       title:  the session's name
       where:  the small label above the name
       desc:   a sentence or two about it
       wide:   true  makes it a full-width dark card (used for special events)
       link:   optional — a different page for this session's button
               (leave it out and the button books through the Linktree)
       cta:    optional — the button's words, e.g. "Event details"        */
  sessions: [
    {
      title: "First Friday Sound Meditation",
      where: "The Studio · Reno",
      desc: "A sound meditation for making space. Settle onto your mat as layers of sound offer a place to exhale."
    },
    {
      title: "Bliss Hammock Sound Meditation",
      where: "Bliss Holistic Center · Reno",
      desc: "Suspended comfort, immersive sound, deep rest. Sink into a gently swaying hammock while soothing sound surrounds you. Coordinate with friends to reserve the same session."
    },
    {
      title: "Karma Sound Meditation for CCC",
      where: "Cancer Community Clubhouse · Reno",
      desc: "A supportive sound meditation for Clubhouse members and the care team — a gentle hour of gongs and bowls in good company.",
      // Not booked on Linktree — this session is for the Clubhouse community.
      link: "https://tockify.com/cancercommunityclubhouse/",
      cta: "Event details"
    },
    {
      title: "Juice Box Yoga Sound Meditation",
      where: "Juice Box Yoga · locations vary",
      desc: "An immersive evening of movement, stillness, and sound. Close the month in a supportive yoga space with the deep, settling tones of planetary gongs."
    },
    {
      title: "Seasonal & special events",
      where: "Throughout the year",
      desc: "Solstice gatherings, year-end sound meditations, and other one-time experiences — in Reno–Sparks and, now and then, beyond.",
      wide: true
    }
  ],

  /* ---- REVIEWS: kind words from clients -------------------------------
     The Home page shows three at a time, picked at random on each visit.
     Add a review by copying one { ... } block.                          */
  reviews: [
    {
      text: "Highly recommend! He understands the sounds of the Universe & brings them to each sound bath I've gone to that he's led. So, so great — just a gorgeous menagerie of sounds at the best possible tone. 💜 I get lost in it. Also, he gives his time to the cancer community!",
      name: "Melody Ann Minx"
    },
    {
      text: "I had a great experience doing the Bliss Hammock sound bath the second Friday of the month. It was lovely to be cocooned into a blissful trance for an hour. Wyatt has an impressive setup of gongs, Tibetan and crystal bowls, as well as chimes that help you escape the monkey mind. I highly recommend it to anyone wanting to go deeper into their meditation practice. 🙏✨",
      name: "Tatiana Magallanes"
    },
    {
      text: "Absolutely amazing experience! If you are looking for someone who values how important it is to connect to yourself through sound, any of Wyatt's sound baths will give you what you are looking for. Personally, I love the hammock experience.",
      name: "Sondra Day Martin"
    },
    {
      text: "What a beautiful and transformative experience! Wyatt's sound bath was incredibly calming and immersive — I'll definitely be looking out for every session he offers in the future. I'm especially excited to try the hammock sound bath next time; it sounds like an amazing way to deepen the experience even more.",
      name: "Amber Brooks"
    },
    {
      text: "AMAZING!!! As someone who's dabbled in many forms of relaxation, this is BY FAR the most relaxing experience I've ever partaken in. Wyatt is kind, gentle, and very knowledgeable. He will help guide you in your journey and immerse you in beautiful sounds. It is a great way to set your intentions and achieve a state of mental clarity. I would highly, HIGHLY recommend a sound bath with Wyatt ❤️",
      name: "Lauryn Haines"
    },
    {
      text: "Wyatt, you are so good at bringing warmth, good energy, balance, healing, and love to the room during your sound bath experiences. I have been to 3 of your sessions and I am hooked in such a good way. ✨ The calmness I feel keeps me craving more. We all need that kind of emotional healing energy, love, and support from each other in this world. 🌍 Thank you!",
      name: "Jamie Allen Vaughn"
    }
  ],

  /* ---- GALLERY: photos on the About page ------------------------------
     Upload a photo into the "images" folder, then add a line here.      */
  photos: [
    { src: "images/gallery-bowls-gongs.jpg", alt: "Crystal singing bowls glowing with candlelight, with gongs in the background" },
    { src: "images/gallery-hammock.jpg",     alt: "A hammock sound bath set up in the studio, with aerial hammocks and a large gong" },
    { src: "images/gallery-bowls.jpg",       alt: "A set of singing bowls with mallets on a woven cloth" }
  ]
};
