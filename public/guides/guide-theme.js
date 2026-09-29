/*! Sync guide palette with main site (Nav sun/moon → localStorage "decleanup-palette").
 *  Include as the first <script> in <head> to avoid a theme flash. */
(function () {
  var KEY = "decleanup-palette";
  var palette = "dark";
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === "kraft" || saved === "dark") palette = saved;
  } catch (e) {}
  document.documentElement.setAttribute("data-palette", palette);
})();
