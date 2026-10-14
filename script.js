(function () {
  "use strict";

  /* Respect prefers-reduced-motion: stop the ambient robot loop and show
     its static poster frame instead of an autoplaying video. */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var robotVideo = document.querySelector(".robot-video");
  var formPanel = document.querySelector(".form-panel");
  if (robotVideo) {
    robotVideo.playbackRate = 0.8;
  }
  if (robotVideo) {
    robotVideo.pause();
    robotVideo.currentTime = 0;
  }
  if (robotVideo && !reduceMotion && formPanel) {
    /* idle by default, frozen on the video's own first frame (not a
       separate poster image — that had a different aspect ratio than the
       video, so the idle frame rendered smaller and jumped in size when
       playback started). The source file actually contains two full sip
       cycles back to back (rest → sip → rest around ~7-9s → sip → rest at
       ~15.9s) — playing to the natural "ended" event showed both. We only
       want one, so we stop manually partway through, at the rest point
       between the two cycles. The first time the mouse hovers the form, it
       plays one sip and stops back at rest — and never again after that,
       even on later hovers. Hovering the robot itself (outside the form)
       does nothing. */
    var ONE_SIP_END = 8.0; // seconds — mid-plateau of the rest pose between cycle 1 and 2
    var hasPlayedOnce = false;
    robotVideo.addEventListener("timeupdate", function () {
      if (!robotVideo.paused && robotVideo.currentTime >= ONE_SIP_END) {
        robotVideo.pause();
        // freeze right here — snapping back to the t=0 frame is a visibly
        // different rest pose and caused a jump cut
      }
    });
    formPanel.addEventListener("mouseenter", function () {
      if (hasPlayedOnce || !robotVideo.paused) return;
      hasPlayedOnce = true;
      robotVideo.playbackRate = 0.8;
      robotVideo.currentTime = 0;
      robotVideo.play();
    });
  }

  /* ---------- legal modals (accessibility / privacy / terms) ---------- */
  document.querySelectorAll("[data-modal]").forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      var modal = document.getElementById(trigger.getAttribute("data-modal"));
      if (modal) modal.hidden = false;
    });
  });
  document.querySelectorAll(".modal-overlay").forEach(function (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) overlay.hidden = true;
    });
    overlay.querySelectorAll("[data-close-modal]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        overlay.hidden = true;
      });
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay:not([hidden])").forEach(function (overlay) {
        overlay.hidden = true;
      });
    }
  });

  /* Brevo's own main.js only validates fields carrying its "sib-input" class,
     which ours don't (the markup here is custom-styled, not Brevo's default
     widget skin) — so its validator silently skips EMAIL and consent and would
     submit invalid data. We validate those two fields ourselves and block
     Brevo's submit handler (registered after this one, via its deferred
     script) with stopImmediatePropagation() when invalid. When valid, we let
     the event through so Brevo's own handler still performs the real POST. */
  var consentBox = document.getElementById("consent");
  var sibForm = document.getElementById("sib-form");
  var emailInput = document.getElementById("EMAIL");
  var emailError = sibForm ? sibForm.querySelector(".entry__error--primary") : null;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (sibForm) {
    sibForm.addEventListener("submit", function (e) {
      var emailValid = emailInput && EMAIL_RE.test(emailInput.value.trim());
      var consentValid = !consentBox || consentBox.checked;

      if (emailError) {
        emailError.textContent = emailValid ? "" : "נא להזין כתובת אימייל תקינה";
      }

      if (emailValid && consentValid) return;

      e.preventDefault();
      e.stopImmediatePropagation();

      if (!emailValid) {
        emailInput.focus();
      } else if (!consentValid) {
        consentBox.focus();
      }
    });
  }
})();
