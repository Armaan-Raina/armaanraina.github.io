// Shared mobile nav toggle — every page's nav has a .nav-toggle button and
// a .nav-mobile dropdown panel; this wires up open/close for all of them
// in one place instead of repeating the same listener on every page.
(function(){
  document.querySelectorAll('.nav-toggle').forEach(function(btn){
    var nav = btn.closest('nav');
    var panel = nav ? nav.querySelector('.nav-mobile') : null;
    if(!panel) return;

    function close(){
      panel.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
    function toggle(){
      var open = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    btn.addEventListener('click', function(e){
      e.stopPropagation();
      toggle();
    });
    panel.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', close);
    });
    document.addEventListener('click', function(e){
      if(panel.classList.contains('open') && !panel.contains(e.target) && e.target !== btn){
        close();
      }
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') close();
    });
  });
})();
