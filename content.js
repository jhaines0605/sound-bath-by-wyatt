/* ===================================================================
   SOUND BATH BY WYATT — EVERYDAY EDITS LIVE IN THIS ONE FILE
   -------------------------------------------------------------------
   Schedule, special events, reviews and gallery photos for the whole
   site come from here. Change this file and every page updates.

   Keep the punctuation (quotes, commas, brackets) exactly as shown —
   just swap the words between the quote marks.
   =================================================================== */

const SITE_CONTENT = {

  /* ---- SPECIAL EVENTS: one-time events, shown big at the top -------
     Shown at the top of the Sessions page and on the Home page until
     the day after the event, then they disappear on their own.
       date:   "YYYY-MM-DD"
       link:   the ticket page (Eventbrite etc.). Leave "" and the
               button asks people to get in touch instead.
       image:  a photo in the images folder (optional)               */
  specialEvents: [
    {
      title: "The Year-End Reset",
      badge: "Special event · Palm Springs, CA",
      tagline: "Close the year in sound. Make space for what comes next.",
      date: "2026-12-30",
      time: "6:00–7:30 PM · doors open 5:30 PM",
      where: "The Yoga Clinic · 1701 N Palm Canyon Dr, Ste 3, Palm Springs, CA 92262",
      map: "1701 N Palm Canyon Dr, Ste 3, Palm Springs, CA 92262",
      tickets: "$55 per person · 20 places only · first-timers welcome",
      desc: "In the quiet between Christmas and New Year, settle in for 55 minutes of sound with planetary gongs, large-format crystal bowls, chimes, and Tibetan bowls. A listening practice with nothing to fix and nothing to get right. Simply rest, listen, and let the year settle. 55 minutes of sound, approximately 90 minutes together.",
      image: "images/year-end-reset.jpg",
      imageAlt: "Five planetary gongs and glowing crystal singing bowls set up beside a pool at night",
      link: "https://linktr.ee/soundbaths",
      cta: "Book your place",
      note: "Tickets on Eventbrite and through The Yoga Clinic (clinic.yoga)."
    }
  ],

  /* ---- MONTHLY SESSIONS ------------------------------------------------
     The date on each card UPDATES ITSELF. Each session has a  repeats:
     pattern, and the site always shows the next date that matches it.

       repeats:  "1st", "2nd", "3rd", "4th" or "last" + a weekday
                 e.g. "2nd Friday" or "last Sunday"
                 (for a one-time event use  date: "2026-12-12"  instead)
       time / where / desc:  shown on the card
       map:      optional — an address; makes the location a map link
       link:     the booking page every button goes to
       skip:     optional — dates to skip, e.g.  skip: ["2027-01-01"]

     MONTH-ONLY DETAILS: anything inside  october: { ... }  replaces the
     normal details only when the date shown falls in October (every
     October). Add  november: { ... }, december: { ... }  the same way —
     handy for a monthly theme or a rotating location.

     Optional  status:  "few" (Few spots left) or "full" (Full)         */
  classes: [
    {
      title: "First Friday Sound Meditation",
      repeats: "1st Friday",
      skip: ["2027-01-01"],          // no First Friday on New Year's Day 2027
      time: "7:30 PM",
      where: "The Studio · Moran St, Reno",
      desc: "A sound meditation for making space. Settle onto your mat as layers of sound offer a place to exhale.",
      link: "https://linktr.ee/soundbaths",
      october: {
        title: "First Friday “Let It Fall”",
        desc: "A seasonal sound meditation for making space. Settle onto your mat as layers of sound offer a place to exhale and welcome the quieter rhythm of autumn."
      }
    },
    {
      title: "Bliss Hammock Sound Meditation",
      repeats: "2nd Friday",
      time: "6:30 PM or 8:00 PM",
      where: "Bliss Holistic Center · 1100 Kietzke Ln, Reno",
      map: "1100 Kietzke Ln, Reno, NV",
      desc: "Suspended comfort, immersive sound, deep rest. Sink into a gently swaying hammock while soothing sound surrounds you. Coordinate with friends to reserve the same session.",
      link: "https://linktr.ee/soundbaths"
    },
    {
      title: "Karma Sound Meditation for CCC",
      repeats: "2nd Saturday",
      time: "4:00 PM",
      where: "Cancer Community Clubhouse · Reno",
      desc: "A welcoming community sound meditation. Gather for an afternoon of grounding resonance, stillness, and restorative rest — no meditation experience needed.",
      link: "https://linktr.ee/soundbaths"
    },
    {
      title: "Juice Box Yoga Sound Meditation",
      repeats: "last Sunday",
      time: "7:30–8:30 PM",
      where: "Juice Box Yoga · rotating location",
      desc: "An immersive evening of movement, stillness, and sound. Close the month in a supportive yoga space with the deep, settling tones of planetary gongs.",
      link: "https://linktr.ee/soundbaths",
      october: {
        where: "Juice Box Yoga · Legends Mall, Sparks"
      }
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
