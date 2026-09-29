/*! Guide chain picker for static doc pages (no React).
 *  Marks: <a href="/#guide" data-guide-picker>User Guide</a>
 *  Load: <script src="/guide-picker.js" defer></script>
 */
(function () {
  var BASE_GUIDE = "/public/guides/base.html";
  var CELO_GUIDE = "/public/guides/celo.html";
  var ROBINHOOD_GUIDE = "/public/guides/robinhood.html";

  function close(root) {
    if (root && root.parentNode) root.parentNode.removeChild(root);
    document.documentElement.style.overflow = "";
  }

  function open() {
    if (document.getElementById("guide-picker-root")) return;
    document.documentElement.style.overflow = "hidden";
    var root = document.createElement("div");
    root.id = "guide-picker-root";
    root.className = "modal-back";
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.innerHTML =
      '<div class="modal" style="max-width:480px">' +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">' +
          '<div>' +
            '<div class="meta" style="margin-bottom:6px">USER GUIDE · CHOOSE CHAIN</div>' +
            '<h2 class="plakat" style="font-size:28px;margin:0;letter-spacing:0.01em">Which guide do you need?</h2>' +
          "</div>" +
          '<button type="button" data-guide-close aria-label="Close" style="background:transparent;border:none;color:var(--ink-mute);cursor:pointer;padding:6px;font-size:20px">×</button>' +
        "</div>" +
        '<p style="font-family:var(--f-sans);color:var(--ink-mute);font-size:15px;margin:12px 0 20px;line-height:1.45">' +
          "Base is the simple path. Celo is full participation. Robinhood Chain is a testnet experiment." +
        "</p>" +
        '<div style="display:grid;gap:10px">' +
          '<a href="' + BASE_GUIDE + '" class="guide-pick" style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border:1px solid var(--line);border-radius:10px;color:var(--ink);text-decoration:none;background:var(--bg-elev-2)">' +
            "<div><div style=\"font-weight:600;font-size:14px\">Base guide</div>" +
            '<div style="color:var(--ink-dim);font-size:12px;margin-top:2px">Simple submission · community verify · tokens and level</div></div>' +
            '<span style="width:32px;height:32px;border-radius:8px;background:#0052FF;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0">' +
              '<img src="/public/base-mark.svg" alt="" width="20" height="20" style="display:block;object-fit:contain;filter:brightness(0) invert(1)" />' +
            "</span>" +
          "</a>" +
          '<a href="' + CELO_GUIDE + '" class="guide-pick" style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border:1px solid var(--line);border-radius:10px;color:var(--ink);text-decoration:none;background:var(--bg-elev-2)">' +
            "<div><div style=\"font-weight:600;font-size:14px\">Celo guide</div>" +
            '<div style="color:var(--ink-dim);font-size:12px;margin-top:2px">Full app · AI and human verify · Hypercerts · governance</div></div>' +
            '<span style="width:32px;height:32px;border-radius:8px;background:#FAFF00;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0">' +
              '<img src="/public/celo-mark.svg" alt="" width="20" height="20" style="display:block;object-fit:contain;filter:none" />' +
            "</span>" +
          "</a>" +
          '<a href="' + ROBINHOOD_GUIDE + '" class="guide-pick" style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border:1px solid var(--line);border-radius:10px;color:var(--ink);text-decoration:none;background:var(--bg-elev-2)">' +
            "<div><div style=\"font-weight:600;font-size:14px\">Robinhood Chain guide</div>" +
            '<div style="color:var(--ink-dim);font-size:12px;margin-top:2px">Testnet experiment · community verify · demo $rDCU</div></div>' +
            '<span style="width:32px;height:32px;border-radius:8px;background:#CCFF00;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0">' +
              '<img src="/public/robinhood-feather.svg" alt="" width="20" height="20" style="display:block;object-fit:contain;filter:none" />' +
            "</span>" +
          "</a>" +
        "</div>" +
        '<p class="meta" style="margin-top:20px;text-align:center">OPENS THE MATCHING GUIDE</p>' +
      "</div>";

    root.addEventListener("click", function (e) {
      if (e.target === root || e.target.hasAttribute("data-guide-close")) close(root);
    });
    document.addEventListener("keydown", function onKey(e) {
      if (e.key === "Escape") {
        document.removeEventListener("keydown", onKey);
        close(root);
      }
    });
    document.body.appendChild(root);
  }

  function bind() {
    document.querySelectorAll("[data-guide-picker]").forEach(function (el) {
      if (el.__guideBound) return;
      el.__guideBound = true;
      el.addEventListener("click", function (e) {
        e.preventDefault();
        open();
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
  window.DeCleanupOpenGuidePicker = open;
})();
