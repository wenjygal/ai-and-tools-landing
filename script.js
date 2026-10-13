(function () {
  "use strict";

  /* Respect prefers-reduced-motion: stop the ambient robot loop and show
     its static poster frame instead of an autoplaying video. */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var robotVideo = document.querySelector(".robot-video");
  if (robotVideo && reduceMotion) {
    robotVideo.removeAttribute("autoplay");
    robotVideo.removeAttribute("loop");
    robotVideo.pause();
    robotVideo.currentTime = 0;
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

  /* Form submission is handled by Brevo's own main.js (loaded in index.html),
     which validates #EMAIL, toggles #error-message / #success-message, and
     manages the submit button's loading state. We only gate on local consent. */
  var consentBox = document.getElementById("consent");
  var sibForm = document.getElementById("sib-form");
  if (consentBox && sibForm) {
    sibForm.addEventListener("submit", function (e) {
      if (!consentBox.checked) {
        e.preventDefault();
        consentBox.focus();
      }
    });
  }
})();
