/* Sound Bath by Wyatt — shared behavior for every page.
   Content (schedule, events, reviews, photos) lives in content.js. */
(function () {
  "use strict";

  var CONTENT = (typeof SITE_CONTENT !== "undefined") ? SITE_CONTENT : {};
  var CONTACT_EMAIL = "Soundbathbywyatt@gmail.com";   // EDIT: CONTACT
  var CONTACT_PHONE = "+17753135875";                  // EDIT: CONTACT

  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var delayClass = function (i) { return i % 3 === 1 ? " d1" : i % 3 === 2 ? " d2" : ""; };
  var safe = function (fn) { try { fn(); } catch (err) { if (window.console) console.error(err); } };
  var mapLink = function (text, address) {
    return '<a href="https://www.google.com/maps/search/?api=1&amp;query=' + encodeURIComponent(address) +
           '" target="_blank" rel="noopener">' + text + '</a>';
  };

  /* ---------------- Dates ---------------- */
  var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var WEEKDAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var ORDINALS = { "1st": 1, "first": 1, "2nd": 2, "second": 2, "3rd": 3, "third": 3, "4th": 4, "fourth": 4, "last": -1 };
  var ORDINAL_WORDS = { "1": "First", "2": "Second", "3": "Third", "4": "Fourth", "-1": "Last" };

  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // "2nd Friday" -> { n: 2, day: 5 }   ·   "last Sunday" -> { n: -1, day: 0 }
  function parseRepeat(text) {
    var m = String(text || "").toLowerCase().match(/(1st|first|2nd|second|3rd|third|4th|fourth|last)\s+(sun|mon|tue|wed|thu|fri|sat)/);
    if (!m) return null;
    return { n: ORDINALS[m[1]], day: ["sun","mon","tue","wed","thu","fri","sat"].indexOf(m[2]) };
  }
  // The date of that pattern in a given month (month index may overflow into the next year)
  function dateInMonth(year, month, rule) {
    if (rule.n > 0) {
      var first = new Date(year, month, 1);
      return new Date(year, month, 1 + ((rule.day - first.getDay() + 7) % 7) + (rule.n - 1) * 7);
    }
    var last = new Date(year, month + 1, 0);
    return new Date(year, month, last.getDate() - ((last.getDay() - rule.day + 7) % 7));
  }
  function parseDate(str) {
    var p = String(str || "").split("-");
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return isNaN(d) ? null : d;
  }
  function isoDate(d) {
    return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
  }
  function nextDate(c) {
    if (c.date) {                               // one-time: "YYYY-MM-DD"
      var d = parseDate(c.date);
      return !d || d < today ? null : d;
    }
    var rule = parseRepeat(c.repeats);
    if (!rule) return null;
    var skip = [].concat(c.skip || []);
    for (var i = 0; i < 4; i++) {
      var next = dateInMonth(today.getFullYear(), today.getMonth() + i, rule);
      if (next >= today && skip.indexOf(isoDate(next)) === -1) return next;
    }
    return null;
  }
  function longDate(d) {
    return WEEKDAYS[d.getDay()] + ", " + MONTHS[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  }

  /* ---------------- Special events (big featured cards) ---------------- */
  function renderSpecialEvents() {
    var box = document.getElementById("specialEvents");
    if (!box) return;
    var compact = box.getAttribute("data-compact") === "true";
    var events = (CONTENT.specialEvents || []).map(function (e) {
      var d = parseDate(e.date);
      return d && d >= today ? { e: e, d: d } : null;
    }).filter(Boolean).sort(function (a, b) { return a.d - b.d; });

    if (!events.length) { box.hidden = true; return; }

    box.innerHTML = events.map(function (item) {
      var e = item.e, d = item.d;
      var link = (e.link || "").trim();
      var btn = link
        ? '<a class="btn btn-primary" href="' + esc(link) + '" target="_blank" rel="noopener">' + esc(e.cta || "Book your place") + '</a>'
        : '<a class="btn btn-primary" href="contact.html?topic=' + encodeURIComponent(e.title || "Special event") + '#contact-form">Ask about tickets</a>';
      var where = esc(e.where || "");
      if (where && e.map) where = mapLink(where, e.map);
      return (
        '<article class="event-feature reveal">' +
          (e.image ? '<div class="ev-media"><img src="' + esc(e.image) + '" alt="' + esc(e.imageAlt || e.title || "") + '" loading="lazy"></div>' : '') +
          '<div class="ev-body">' +
            (e.badge ? '<span class="ev-badge">' + esc(e.badge) + '</span>' : '') +
            '<h3>' + esc(e.title || "Special event") + '</h3>' +
            (e.tagline ? '<p class="ev-tagline">' + esc(e.tagline) + '</p>' : '') +
            '<ul class="ev-facts">' +
              '<li><span class="ev-label">When</span><span><time datetime="' + isoDate(d) + '">' + longDate(d) + '</time>' +
                (e.time ? '<br>' + esc(e.time) : '') + '</span></li>' +
              (where ? '<li><span class="ev-label">Where</span><span>' + where + '</span></li>' : '') +
              (e.tickets ? '<li><span class="ev-label">Tickets</span><span>' + esc(e.tickets) + '</span></li>' : '') +
            '</ul>' +
            (!compact && e.desc ? '<p class="ev-desc">' + esc(e.desc) + '</p>' : '') +
            '<div class="ev-actions">' + btn + (e.note ? '<p class="ev-note">' + esc(e.note) + '</p>' : '') + '</div>' +
          '</div>' +
        '</article>'
      );
    }).join("");
  }

  /* ---------------- Monthly sessions ---------------- */
  function renderSchedule() {
    var list = document.getElementById("scheduleList");
    if (!list) return;
    var limit = parseInt(list.getAttribute("data-limit") || "0", 10);

    var items = (CONTENT.classes || []).map(function (c) {
      var d = nextDate(c);
      if (!d) return null;
      var extra = c[MONTHS[d.getMonth()].toLowerCase()] || {};   // e.g. october: { ... }
      var s = {};
      for (var k in c) s[k] = c[k];
      for (var k2 in extra) s[k2] = extra[k2];
      s.dateObj = d;
      return s;
    }).filter(Boolean).sort(function (a, b) { return a.dateObj - b.dateObj; });
    if (limit > 0) items = items.slice(0, limit);

    if (!items.length) {
      list.innerHTML =
        '<p class="schedule-empty reveal">New sessions are being scheduled. ' +
        '<a href="#newsletter">Join the email list</a> and you\'ll be the first to know when the next one opens.</p>';
      return;
    }

    var labels = { few: "Few spots left", full: "Full" };
    list.innerHTML = items.map(function (c, i) {
      var d = c.dateObj;
      var isToday = d.getTime() === today.getTime();
      var status = (c.status || "").toLowerCase();
      var isFull = status === "full";
      var link = (c.link || "").trim();
      var href = link ? esc(link) : "contact.html?topic=" + encodeURIComponent("Upcoming session") + "#contact-form";
      var target = link ? ' target="_blank" rel="noopener"' : "";
      var label = esc((c.cta && c.cta.trim()) || (isFull ? "Join the waitlist" : "View dates & book"));
      var btnClass = isFull ? "btn-outline-dark" : "btn-primary";

      var where = esc(c.where || "");
      if (where && c.map) where = mapLink(where, c.map);
      var meta = '<span class="class-time">' + esc(c.time || "") + '</span>';
      if (where) meta += '<span class="dot">·</span>' + where;

      var rule = parseRepeat(c.repeats);
      var repeatText = rule ? ORDINAL_WORDS[String(rule.n)] + " " + WEEKDAYS[rule.day] + " of every month" : "";
      var fullDate = longDate(d);
      var pill = isToday ? '<span class="status today">Today</span>'
               : (labels[status] ? '<span class="status ' + status + '">' + labels[status] + '</span>' : '');

      return (
        '<article class="class-card reveal' + (isFull ? " is-full" : "") + delayClass(i) + '">' +
          '<div class="class-main">' +
            '<time class="class-date" datetime="' + isoDate(d) + '" title="' + fullDate + '">' +
              '<span class="cd-m">' + MONTHS[d.getMonth()].slice(0, 3) + '</span>' +
              '<span class="cd-d">' + d.getDate() + '</span>' +
              '<span class="cd-w">' + WEEKDAYS[d.getDay()].slice(0, 3) + '</span>' +
            '</time>' +
            '<div class="class-info">' +
              '<h3>' + esc(c.title || "Sound Bath Session") + '</h3>' +
              '<div class="class-when">' + meta + '</div>' +
              (c.desc ? '<p class="class-desc">' + esc(c.desc) + '</p>' : '') +
              (repeatText ? '<p class="class-repeat">' + repeatText + '</p>' : '') +
            '</div>' +
          '</div>' +
          '<div class="class-action">' + pill +
            '<a class="btn ' + btnClass + '" href="' + href + '"' + target +
              ' aria-label="' + label + ': ' + esc(c.title || "session") + ', ' + fullDate + '">' + label + '</a>' +
          '</div>' +
        '</article>'
      );
    }).join("");
  }

  /* ---------------- Reviews ---------------- */
  function renderReviews() {
    var grid = document.getElementById("quoteGrid");
    if (!grid) return;
    var reviews = (CONTENT.reviews || []).slice();
    if (!reviews.length) { var sec = grid.closest("section"); if (sec) sec.hidden = true; return; }
    if (grid.getAttribute("data-shuffle") === "true") {
      for (var i = reviews.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1)); var t = reviews[i]; reviews[i] = reviews[j]; reviews[j] = t;
      }
    }
    var limit = parseInt(grid.getAttribute("data-limit") || "0", 10);
    if (limit > 0) reviews = reviews.slice(0, limit);
    grid.innerHTML = reviews.map(function (r, i) {
      return (
        '<div class="quote reveal' + delayClass(i) + '">' +
          '<span class="mark" aria-hidden="true">&ldquo;</span>' +
          '<p>' + esc(r.text || "") + '</p>' +
          '<p class="who">' + esc(r.name || "") + (r.location ? '<span>' + esc(r.location) + '</span>' : '') + '</p>' +
        '</div>'
      );
    }).join("");
  }

  /* ---------------- Gallery ---------------- */
  function renderGallery() {
    var grid = document.getElementById("galleryGrid");
    if (!grid) return;
    var photos = (CONTENT.photos || []).filter(function (p) { return p && p.src && String(p.src).trim(); });
    grid.innerHTML = photos.map(function (p, i) {
      return (
        '<div class="gallery-item reveal' + delayClass(i) + '">' +
          '<img src="' + esc(String(p.src).trim()) + '" alt="' + esc(p.alt || "Sound Bath by Wyatt") + '" loading="lazy" />' +
        '</div>'
      );
    }).join("");
  }

  safe(renderSpecialEvents);
  safe(renderSchedule);
  safe(renderReviews);
  safe(renderGallery);

  /* ---------------- Old one-page links (#schedule etc.) ---------------- */
  // Links people saved to the old one-page site still land in the right place.
  safe(function () {
    if (document.body.getAttribute("data-page") !== "home" || !location.hash) return;
    var moved = {
      "#schedule": "sessions.html", "#sessions": "sessions.html#what-to-expect",
      "#private-sessions": "sessions.html#private-sessions",
      "#about": "about.html", "#gallery": "about.html#gallery", "#monochord": "about.html#monochord",
      "#contact": "contact.html", "#contact-form": "contact.html#contact-form"
    };
    if (moved[location.hash]) location.replace(moved[location.hash]);
  });

  /* ---------------- Header + menu ---------------- */
  safe(function () {
    var header = document.getElementById("header");
    var onScroll = function () {
      if (window.scrollY > 60) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    var closeMenu = function () {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    };
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    links.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  });

  /* ---------------- Scroll reveal ---------------- */
  safe(function () {
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }
  });

  /* ---------------- Contact form (Netlify Forms) ---------------- */
  safe(function () {
    var form = document.getElementById("contactForm");
    if (!form) return;
    var status = document.getElementById("formStatus");
    var formWrap = document.getElementById("contactFormWrap");
    var formSuccess = document.getElementById("formSuccess");
    var formCard = document.getElementById("contact-form");
    var topicSelect = document.getElementById("cf-topic");

    // contact.html?topic=Private%20session  ->  that topic is picked for them
    var topic = new URLSearchParams(location.search).get("topic");
    if (topic && topicSelect) {
      var found = false;
      for (var i = 0; i < topicSelect.options.length; i++) {
        if (topicSelect.options[i].value.toLowerCase() === topic.toLowerCase()) { topicSelect.selectedIndex = i; found = true; break; }
      }
      if (!found) {
        var opt = document.createElement("option");
        opt.value = topic; opt.textContent = topic;
        topicSelect.insertBefore(opt, topicSelect.firstChild);
        topicSelect.value = topic;
      }
      if (formCard) {
        formCard.classList.add("highlight");
        setTimeout(function () { formCard.classList.remove("highlight"); }, 2400);
      }
      setTimeout(function () {
        var first = document.getElementById("cf-name");
        if (first) { try { first.focus({ preventScroll: true }); } catch (e) { first.focus(); } }
      }, 600);
    }

    function resetForm() {
      form.reset();
      status.textContent = "";
      formSuccess.hidden = true;
      formWrap.hidden = false;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("cf-name").value.trim();
      var email = document.getElementById("cf-email").value.trim();
      if (!name || !email) { status.textContent = "Please add your name and email so Wyatt can reply."; return; }

      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true; btn.textContent = "Sending…"; status.textContent = "";

      var data = new URLSearchParams(new FormData(form));
      data.set("form-name", "contact");

      fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: data.toString() })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          document.getElementById("formSuccessText").textContent =
            "Thanks, " + name.split(" ")[0] + ". Wyatt will reply to " + email + " soon.";
          formWrap.hidden = true;
          formSuccess.hidden = false;
          try { formSuccess.focus({ preventScroll: true }); } catch (err) { formSuccess.focus(); }
        })
        .catch(function () {
          // Backup plan: hand the visitor a ready-to-send email so no inquiry is lost.
          var phone = document.getElementById("cf-phone").value.trim();
          var t = topicSelect ? topicSelect.value : "";
          var message = document.getElementById("cf-message").value.trim();
          var body = "Name: " + name + "\nEmail: " + email + "\n" + (phone ? "Phone: " + phone + "\n" : "") +
                     (t ? "Topic: " + t + "\n" : "") + "\n" + (message || "");
          var mailto = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent("Sound bath inquiry from " + name) +
                       "&body=" + encodeURIComponent(body);
          status.innerHTML = "Sorry — that didn't go through. " +
            '<a href="' + mailto + '">Tap here to send it by email instead</a>, ' +
            'or call/text <a href="tel:' + CONTACT_PHONE + '">(775) 313-5875</a>.';
        })
        .then(function () { btn.disabled = false; btn.textContent = "Send message"; });
    });

    document.getElementById("formAgain").addEventListener("click", function () {
      resetForm();
      document.getElementById("cf-name").focus();
    });
  });

  /* ---------------- Email list (Mailchimp, in the footer) ---------------- */
  safe(function () {
    var mcForm = document.getElementById("mc-embedded-subscribe-form");
    if (!mcForm) return;
    var mcStatus = document.getElementById("mcStatus");
    mcForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var emailInput = document.getElementById("mce-EMAIL");
      var mcBtn = document.getElementById("mc-embedded-subscribe");
      if (!emailInput.value.trim()) { mcStatus.className = "nl-status err"; mcStatus.textContent = "Please enter your email address."; return; }

      mcBtn.disabled = true; mcBtn.textContent = "Joining…";
      mcStatus.className = "nl-status"; mcStatus.textContent = "";

      var cbName = "mcCallback" + Date.now();
      var script = document.createElement("script");
      var done = function (ok, msg) {
        mcBtn.disabled = false; mcBtn.textContent = "Subscribe";
        mcStatus.className = "nl-status " + (ok ? "ok" : "err");
        mcStatus.textContent = msg;
        if (ok) mcForm.reset();
        try { delete window[cbName]; } catch (err) { window[cbName] = undefined; }
        if (script.parentNode) script.parentNode.removeChild(script);
      };
      var timer = setTimeout(function () {
        done(false, "Sorry — we couldn't reach the sign-up service. Please try again in a moment.");
      }, 12000);

      window[cbName] = function (resp) {
        clearTimeout(timer);
        // Mailchimp messages can contain HTML and a "0 - " prefix; keep plain text only.
        var tmp = document.createElement("div");
        tmp.innerHTML = String((resp && resp.msg) || "").replace(/^\d+\s*-\s*/, "");
        var msg = (tmp.textContent || "").trim();
        if (resp && resp.result === "success") done(true, msg || "Thank you — you're on the list!");
        else if (/already subscribed/i.test(msg)) done(true, "You're already on the list — thank you!");
        else done(false, msg || "Something went wrong. Please check your email address and try again.");
      };

      var params = new URLSearchParams(new FormData(mcForm));
      params.set("c", cbName);
      script.src = mcForm.action.replace("/post?", "/post-json?") + "&" + params.toString();
      script.onerror = function () {
        clearTimeout(timer);
        done(false, "Sorry — we couldn't reach the sign-up service. Please try again in a moment.");
      };
      document.body.appendChild(script);
    });
  });

  /* ---------------- FAQ: search + open linked question ---------------- */
  safe(function () {
    var search = document.getElementById("faqSearch");
    if (!search) return;
    var items = [].slice.call(document.querySelectorAll(".faq-item"));
    var groups = [].slice.call(document.querySelectorAll(".faq-group"));
    var count = document.getElementById("faqCount");
    var empty = document.getElementById("faqEmpty");
    var texts = items.map(function (it) { return it.textContent.toLowerCase(); });
    var wasSearching = false;

    function run() {
      var terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      var shown = 0;
      items.forEach(function (it, i) {
        var match = terms.every(function (t) { return texts[i].indexOf(t) !== -1; });
        it.hidden = !match;
        if (match) shown++;
        if (terms.length) it.open = match;
        else if (wasSearching) it.open = false;
      });
      groups.forEach(function (g) { g.hidden = !g.querySelector(".faq-item:not([hidden])"); });
      count.textContent = terms.length ? (shown + (shown === 1 ? " question matches" : " questions match")) : "";
      empty.hidden = shown !== 0;
      wasSearching = terms.length > 0;
    }
    search.addEventListener("input", run);

    function openFromHash() {
      if (!location.hash) return;
      var el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (el && el.classList.contains("faq-item")) {
        el.open = true;
        setTimeout(function () { el.scrollIntoView({ block: "start" }); }, 50);
      }
    }
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
  });

  /* ---------------- Footer year ---------------- */
  safe(function () { document.getElementById("year").textContent = new Date().getFullYear(); });
})();
