(function(){
  const themeBtn = document.getElementById('themeBtn');
  const printBtn = document.getElementById('printBtn');
  // initialize theme
  if(localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
  if (themeBtn) {
    themeBtn.addEventListener('click', ()=>{
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
  }
  if (printBtn) {
    printBtn.addEventListener('click', ()=>window.print());
  }
})();