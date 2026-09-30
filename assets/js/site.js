// Fecha o menu de app aberto quando se clica fora dele ou se abre o outro.
// Sem este arquivo os menus continuam funcionando; só ficam abertos até
// o segundo toque.
document.addEventListener("click", function (e) {
  document.querySelectorAll("details.menu[open]").forEach(function (menu) {
    if (!menu.contains(e.target)) menu.removeAttribute("open");
  });
});
document.addEventListener("keydown", function (e) {
  if (e.key !== "Escape") return;
  document.querySelectorAll("details.menu[open]").forEach(function (menu) {
    menu.removeAttribute("open");
  });
});
