(()=>{
const root=document.querySelector('.hero-carousel');if(!root)return;
const slides=[...root.querySelectorAll('.hero-slide')],dots=[...root.querySelectorAll('.hero-dot')],pause=root.querySelector('.hero-pause'),motion=matchMedia('(prefers-reduced-motion: reduce)');
let current=0,timer,paused=motion.matches;
function show(index){current=index;slides.forEach((slide,i)=>{slide.classList.toggle('is-active',i===index);slide.setAttribute('aria-hidden',String(i!==index));dots[i].setAttribute('aria-pressed',String(i===index))})}
function schedule(){clearInterval(timer);if(!paused&&!document.hidden&&!root.matches(':hover')&&!root.contains(document.activeElement))timer=setInterval(()=>show((current+1)%slides.length),6000)}
function updatePause(){pause.textContent=paused?'▶':'Ⅱ';pause.setAttribute('aria-label',paused?'자동 전환 재생':'자동 전환 일시정지')}
dots.forEach((dot,i)=>dot.addEventListener('click',()=>{show(i);schedule()}));pause.addEventListener('click',()=>{paused=!paused;updatePause();schedule()});
root.addEventListener('mouseenter',()=>clearInterval(timer));root.addEventListener('mouseleave',schedule);root.addEventListener('focusin',()=>clearInterval(timer));root.addEventListener('focusout',()=>setTimeout(schedule,0));document.addEventListener('visibilitychange',schedule);motion.addEventListener('change',()=>{paused=motion.matches;updatePause();schedule()});updatePause();schedule();
})();
