(function(){
const FILTER_MAP = {
  modular:    [1,2,3,4,5,6,7,8,9,10,11,12],
  full:       [1,2,3,4,5,6,7,8,9,10,11,12],
  bare:       [1,2,3,4,5,6,7,8,9,10,11,12],
  renovation: [1,2,3,4,5,6,7,8,9,10,11,12]
};


  const DURATION_MAP = {
    full: "⏳ Estimated Timeline: ~60 days after Design Phase",
    bare: "⏳ Estimated Timeline: ~130 days total",
    modular: "⏳ Estimated Timeline: ~45 days after Design Phase",
    renovation: "⏳ Estimated Timeline: ~90 days total"
  };

  const buttons  = document.querySelectorAll('.process-filter');
  const cols     = document.querySelectorAll('.process-col');
  const duration = document.getElementById('process-duration');

  function applyFilter(name){
    const allow = new Set(FILTER_MAP[name] || []);
    cols.forEach(c=>{
      const step = +c.getAttribute('data-step');
      c.classList.toggle('d-none', !allow.has(step));
    });

    buttons.forEach(b=> 
      b.setAttribute('aria-pressed', String(b.dataset.filter===name))
    );

    duration.textContent = DURATION_MAP[name] || "";
  }

  buttons.forEach(btn => 
    btn.addEventListener('click', ()=> applyFilter(btn.dataset.filter))
  );

  applyFilter('full'); // default
})();
