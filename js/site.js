(function(){
  // Theme toggle
  var d=document.documentElement;
  var theme=localStorage.getItem('portfolio-theme')||'system';
  function apply(m){
    var eff=m==='system'?(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'):m;
    if(eff==='dark') d.classList.add('dark'); else d.classList.remove('dark');
  }
  apply(theme);
  window.matchMedia('(prefers-color-scheme:dark)').addEventListener('change',function(){
    if((localStorage.getItem('portfolio-theme')||'system')==='system') apply('system');
  });
  document.querySelectorAll('[data-theme-toggle]').forEach(function(btn){
    btn.addEventListener('click',function(){
      var order=['light','dark','system'];
      var cur=localStorage.getItem('portfolio-theme')||'system';
      var i=Math.max(0,order.indexOf(cur));
      var next=order[(i+1)%order.length];
      localStorage.setItem('portfolio-theme',next);
      apply(next);
    });
  });
  // Heatmap
  var rawDays=[{"day":"2026-01-03","commits":1,"pushes":1},{"day":"2026-01-04","commits":0,"pushes":0},{"day":"2026-01-05","commits":0,"pushes":0},{"day":"2026-01-06","commits":0,"pushes":0},{"day":"2026-01-07","commits":0,"pushes":0},{"day":"2026-01-08","commits":0,"pushes":0},{"day":"2026-01-09","commits":0,"pushes":0},{"day":"2026-01-10","commits":0,"pushes":0},{"day":"2026-01-11","commits":0,"pushes":0},{"day":"2026-01-12","commits":0,"pushes":0},{"day":"2026-01-13","commits":0,"pushes":0},{"day":"2026-01-14","commits":0,"pushes":0},{"day":"2026-01-15","commits":0,"pushes":0},{"day":"2026-01-16","commits":1,"pushes":1},{"day":"2026-01-17","commits":0,"pushes":0},{"day":"2026-01-18","commits":0,"pushes":0},{"day":"2026-01-19","commits":0,"pushes":0},{"day":"2026-01-20","commits":0,"pushes":0},{"day":"2026-01-21","commits":0,"pushes":0},{"day":"2026-01-22","commits":0,"pushes":0},{"day":"2026-01-23","commits":0,"pushes":0},{"day":"2026-01-24","commits":0,"pushes":0},{"day":"2026-01-25","commits":0,"pushes":0},{"day":"2026-01-26","commits":0,"pushes":0},{"day":"2026-01-27","commits":0,"pushes":0},{"day":"2026-01-28","commits":0,"pushes":0},{"day":"2026-01-29","commits":0,"pushes":0},{"day":"2026-01-30","commits":6,"pushes":1},{"day":"2026-01-31","commits":0,"pushes":0},{"day":"2026-02-01","commits":2,"pushes":1},{"day":"2026-02-02","commits":0,"pushes":0},{"day":"2026-02-03","commits":0,"pushes":0},{"day":"2026-02-04","commits":0,"pushes":0},{"day":"2026-02-05","commits":0,"pushes":0},{"day":"2026-02-06","commits":0,"pushes":0},{"day":"2026-02-07","commits":0,"pushes":0},{"day":"2026-02-08","commits":0,"pushes":0},{"day":"2026-02-09","commits":0,"pushes":0},{"day":"2026-02-10","commits":0,"pushes":0},{"day":"2026-02-11","commits":0,"pushes":0},{"day":"2026-02-12","commits":0,"pushes":0},{"day":"2026-02-13","commits":0,"pushes":0},{"day":"2026-02-14","commits":0,"pushes":0},{"day":"2026-02-15","commits":0,"pushes":0},{"day":"2026-02-16","commits":0,"pushes":0},{"day":"2026-02-17","commits":0,"pushes":0},{"day":"2026-02-18","commits":0,"pushes":0},{"day":"2026-02-19","commits":0,"pushes":0},{"day":"2026-02-20","commits":0,"pushes":0},{"day":"2026-02-21","commits":0,"pushes":0},{"day":"2026-02-22","commits":0,"pushes":0},{"day":"2026-02-23","commits":0,"pushes":0},{"day":"2026-02-24","commits":0,"pushes":0},{"day":"2026-02-25","commits":0,"pushes":0},{"day":"2026-02-26","commits":0,"pushes":0},{"day":"2026-02-27","commits":0,"pushes":0},{"day":"2026-02-28","commits":0,"pushes":0},{"day":"2026-03-01","commits":0,"pushes":0},{"day":"2026-03-02","commits":0,"pushes":0},{"day":"2026-03-03","commits":0,"pushes":0},{"day":"2026-03-04","commits":0,"pushes":0},{"day":"2026-03-05","commits":0,"pushes":0},{"day":"2026-03-06","commits":0,"pushes":0},{"day":"2026-03-07","commits":0,"pushes":0},{"day":"2026-03-08","commits":0,"pushes":0},{"day":"2026-03-09","commits":0,"pushes":0},{"day":"2026-03-10","commits":0,"pushes":0},{"day":"2026-03-11","commits":8,"pushes":1},{"day":"2026-03-12","commits":0,"pushes":0},{"day":"2026-03-13","commits":0,"pushes":0},{"day":"2026-03-14","commits":0,"pushes":0},{"day":"2026-03-15","commits":0,"pushes":0},{"day":"2026-03-16","commits":0,"pushes":0},{"day":"2026-03-17","commits":0,"pushes":0},{"day":"2026-03-18","commits":3,"pushes":1},{"day":"2026-03-19","commits":0,"pushes":0},{"day":"2026-03-20","commits":0,"pushes":0},{"day":"2026-03-21","commits":8,"pushes":1},{"day":"2026-03-22","commits":1,"pushes":1},{"day":"2026-03-23","commits":0,"pushes":0},{"day":"2026-03-24","commits":0,"pushes":0},{"day":"2026-03-25","commits":0,"pushes":0},{"day":"2026-03-26","commits":0,"pushes":0},{"day":"2026-03-27","commits":0,"pushes":0},{"day":"2026-03-28","commits":0,"pushes":0},{"day":"2026-03-29","commits":2,"pushes":1},{"day":"2026-03-30","commits":0,"pushes":0},{"day":"2026-03-31","commits":0,"pushes":0},{"day":"2026-04-01","commits":0,"pushes":0},{"day":"2026-04-02","commits":0,"pushes":0}];
  function initHeatmap(){
    var el=document.querySelector('[data-heatmap]');
    if(!el) return;
    var byDay={};
    rawDays.forEach(function(r){byDay[r.day]=r;});
    var days=[],start=new Date();
    start.setUTCDate(start.getUTCDate()-89);
    for(var i=0;i<90;i++){
      var day=start.toISOString().slice(0,10);
      var row=byDay[day];
      days.push({day:day,commits:row?row.commits:0});
      start.setUTCDate(start.getUTCDate()+1);
    }
    // Build simple heatmap cells
    var cells=el.querySelectorAll('[data-heatmap-cell]');
    days.forEach(function(d,idx){
      if(cells[idx]){
        var c=d.commits;
        var cls=c<=0?'bg-slate-200 dark:bg-slate-700':c<=1?'bg-emerald-200 dark:bg-emerald-900':c<=3?'bg-emerald-300 dark:bg-emerald-700':c<=6?'bg-emerald-400 dark:bg-emerald-600':'bg-emerald-600 dark:bg-emerald-500';
        cells[idx].className='heatmap-cell '+cls;
        cells[idx].title=d.day+': '+c+' contribution'+(c!==1?'s':'');
      }
    });
  }
  initHeatmap();
  // Dev score ring
  var scoreTarget=6;
  var ring=document.querySelector('[data-score-ring]');
  if(ring){
    var circ=2*Math.PI*34;
    var filled=(scoreTarget/100)*circ;
    ring.setAttribute('stroke-dasharray',filled+' '+circ);
  }
  var scoreNum=document.querySelector('[data-score-num]');
  if(scoreNum){
    var cur=0,step=Math.max(1,Math.ceil(scoreTarget/30));
    var iv=setInterval(function(){
      cur=Math.min(cur+step,scoreTarget);
      scoreNum.textContent=cur;
      if(cur>=scoreTarget) clearInterval(iv);
    },30);
  }
})();
