// imm.creates — shared navbar behavior (scroll shadow + mobile drawer)
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var headerBar = document.getElementById('site-navbar-bar');
    var menuBtn = document.getElementById('mobile-menu-btn');
    var drawer = document.getElementById('mobile-drawer');
    var drawerOverlay = document.getElementById('mobile-drawer-overlay');
    var menuOpenIcon = document.getElementById('menu-icon-open');
    var menuCloseIcon = document.getElementById('menu-icon-close');

    function onScroll() {
      if (!headerBar) return;
      if (window.scrollY > 20) {
        headerBar.classList.add('is-scrolled');
      } else {
        headerBar.classList.remove('is-scrolled');
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();

    function setDrawer(open) {
      if (!drawerOverlay) return;
      drawerOverlay.style.display = open ? 'block' : 'none';
      if (menuOpenIcon && menuCloseIcon) {
        menuOpenIcon.style.display = open ? 'none' : 'block';
        menuCloseIcon.style.display = open ? 'block' : 'none';
      }
    }

    if (menuBtn) {
      menuBtn.addEventListener('click', function () {
        var isOpen = drawerOverlay && drawerOverlay.style.display === 'block';
        setDrawer(!isOpen);
      });
    }
    if (drawerOverlay) {
      drawerOverlay.addEventListener('click', function (e) {
        if (e.target === drawerOverlay) setDrawer(false);
      });
    }
    if (drawer) {
      drawer.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    }

    // Highlight active nav link based on body[data-page]
    var activePage = document.body.getAttribute('data-page');
    if (activePage) {
      var links = document.querySelectorAll('[data-nav-link]');
      links.forEach(function (link) {
        if (link.getAttribute('data-nav-link') === activePage) {
          link.classList.add('nav-link-active');
        }
      });
    }
  });
})();
