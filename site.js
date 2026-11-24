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

  var BOOKING = (CONTENT.bookingLink || "https://linktr.ee/soundbaths").trim();

  /* ---------------- Booking buttons ---------------- */
  // Every link marked  data-booking  goes to the booking link set in content.js.
  function wireBookingLinks() {
    document.querySelectorAll("a[data-booking]").forEach(function (a) {
      a.href = BOOKING;
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  /* ---------------- Session cards ---------------- */
  function renderSessions() {
    var grid = document.getElementById("sessionGrid");
    if (!grid) return;
    var compact = grid.getAttribute("data-compact") === "true";
    var items = (CONTENT.sessions || []).filter(function (s) { return s && s.title && !(compact && s.wide); });
    if (compact) items = items.slice(0, 4);
    grid.innerHTML = items.map(function (s, i) {
      return (
        '<article class="offer reveal' + (s.wide ? " wide" : "") + delayClass(i) + '">' +
          (s.where ? '<span class="tag">' + esc(s.where) + '</span>' : '') +
          '<h3>' + esc(s.title) + '</h3>' +
          (s.desc ? '<p class="offer-desc">' + esc(s.desc) + '</p>' : '') +
          (compact ? '' :
            '<a class="btn ' + (s.wide ? "btn-primary" : "btn-outline-dark") + '" href="' + esc(BOOKING) + '" target="_blank" rel="noopener"' +
            ' aria-label="Book a session: ' + esc(s.title) + '">' + (s.wide ? "See upcoming events" : "Book a session") + '</a>') +
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

  safe(renderSessions);
  safe(wireBookingLinks);
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
