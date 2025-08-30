const btnMenu = document.getElementById('btnMenu');
    const sideMenu = document.getElementById('sideMenu');
    const backdrop = document.getElementById('backdrop');
    function toggleMenu() {
      btnMenu.classList.toggle('active');
      sideMenu.classList.toggle('active');
      backdrop.classList.toggle('active');
    }
    btnMenu.onclick = toggleMenu;
    backdrop.onclick = toggleMenu;