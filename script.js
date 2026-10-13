(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- head tilt, eased toward the pointer (no CSS transition fighting) ---------- */
  var rotor = document.getElementById("robotRotor");
  var tiltbox = document.getElementById("robotTilt");
  var maxTilt = 9;
  var targetX = 0, targetY = 0, currentX = 0, currentY = 0;
  var pointerActive = false;

  function setTargetFromPoint(px, py) {
    var r = tiltbox.getBoundingClientRect();
    var cx = r.left + r.width / 2;
    var cy = r.top + r.height / 2;
    var dx = (px - cx) / (window.innerWidth / 2);
    var dy = (py - cy) / (window.innerHeight / 2);
    dx = Math.max(-1, Math.min(1, dx));
    dy = Math.max(-1, Math.min(1, dy));
    targetY = dx * maxTilt;
    targetX = -dy * maxTilt;
    pointerActive = true;
  }

  function tick() {
    currentX += (targetX - currentX) * 0.09;
    currentY += (targetY - currentY) * 0.09;
    if (!reduceMotion) {
      rotor.style.transform =
        "rotateX(" + currentX.toFixed(2) + "deg) rotateY(" + currentY.toFixed(2) + "deg)";
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  window.addEventListener("mousemove", function (e) {
    setTargetFromPoint(e.clientX, e.clientY);
  });
  window.addEventListener(
    "touchmove",
    function (e) {
      if (e.touches && e.touches[0]) {
        setTargetFromPoint(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    { passive: true }
  );
  window.addEventListener("mouseleave", function () {
    targetX = 0;
    targetY = 0;
  });

  /* ---------- sip gesture when the pointer crosses onto the form side ---------- */
  var robotImg = document.getElementById("robotImg");
  var formPanel = document.querySelector(".form-panel");

  formPanel.addEventListener("mouseenter", function () {
    if (reduceMotion || !pointerActive) return;
    robotImg.classList.remove("sip");
    void robotImg.offsetWidth; // restart the animation
    robotImg.classList.add("sip");
  });

  /* ---------- form submission is handled by Brevo's own main.js (loaded in index.html),
     which validates #EMAIL, toggles #error-message / #success-message, and manages the
     submit button's loading state. Nothing to wire up here. ---------- */

  var consentBox = document.getElementById("consent");
  var sipForm = document.getElementById("sib-form");
  if (consentBox && sipForm) {
    sipForm.addEventListener("submit", function (e) {
      if (!consentBox.checked) {
        e.preventDefault();
        consentBox.focus();
      }
    });
  }
})();
