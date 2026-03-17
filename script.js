
 
/* ══════════════════════════════════
   CAR DATA — Real Unsplash Images
══════════════════════════════════ */
const FLEET = [
  {
    id:1, name:'Toyota Corolla', cat:'economy', type:'Economy Sedan',
    img:'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80&fit=crop&auto=format',
    price:29, seats:5, trans:'Automatic', fuel:'Petrol',
    badge:'best', avail:12, saving:0, year:2024
  },
  {
    id:2, name:'Mercedes-Benz E-Class', cat:'luxury', type:'Luxury Sedan',
    img:'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80&fit=crop&auto=format',
    price:189, seats:5, trans:'Automatic', fuel:'Petrol',
    badge:'best', avail:2, saving:40, year:2024
  },
  {
    id:3, name:'BMW X5', cat:'suv', type:'Premium SUV',
    img:'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80&fit=crop&auto=format',
    price:195, seats:7, trans:'Automatic', fuel:'Diesel',
    badge:'', avail:4, saving:35, year:2024
  },
  {
    id:4, name:'Lamborghini Urus', cat:'sports', type:'Super SUV',
    img:'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=600&q=80&fit=crop&auto=format',
    price:899, seats:4, trans:'Automatic', fuel:'Petrol',
    badge:'hot', avail:1, saving:200, year:2024
  },
  {
    id:5, name:'Tesla Model S', cat:'electric', type:'Electric Luxury',
    img:'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80&fit=crop&auto=format',
    price:249, seats:5, trans:'Automatic', fuel:'Electric',
    badge:'ev', avail:3, saving:50, year:2024
  },
  {
    id:6, name:'Porsche 911 Carrera', cat:'sports', type:'Sports Car',
    img:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80&fit=crop&auto=format',
    price:550, seats:4, trans:'Automatic', fuel:'Petrol',
    badge:'hot', avail:1, saving:100, year:2024
  },
  {
    id:7, name:'Range Rover Sport', cat:'suv', type:'Luxury SUV',
    img:'https://images.unsplash.com/photo-1519245160770-1adfe74a01ec?w=600&q=80&fit=crop&auto=format',
    price:320, seats:5, trans:'Automatic', fuel:'Diesel',
    badge:'', avail:3, saving:60, year:2024
  },
  {
    id:8, name:'Audi A6', cat:'luxury', type:'Executive Sedan',
    img:'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80&fit=crop&auto=format',
    price:149, seats:5, trans:'Automatic', fuel:'Petrol',
    badge:'', avail:6, saving:20, year:2024
  },
  {
    id:9, name:'Honda Civic', cat:'economy', type:'Economy Hatchback',
    img:'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=600&q=80&fit=crop&auto=format',
    price:39, seats:5, trans:'Automatic', fuel:'Petrol',
    badge:'', avail:9, saving:0, year:2024
  },
  {
    id:10, name:'Toyota RAV4 Hybrid', cat:'electric', type:'Hybrid SUV',
    img:'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80&fit=crop&auto=format',
    price:89, seats:5, trans:'Automatic', fuel:'Hybrid',
    badge:'ev', avail:7, saving:0, year:2024
  },
  {
    id:11, name:'Nissan Urvan', cat:'van', type:'Premium Van',
    img:'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=600&q=80&fit=crop&auto=format',
    price:69, seats:12, trans:'Automatic', fuel:'Diesel',
    badge:'', avail:5, saving:0, year:2023
  },
  {
    id:12, name:'Ferrari Roma', cat:'sports', type:'Grand Tourer',
    img:'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=600&q=80&fit=crop&auto=format',
    price:1299, seats:2, trans:'Automatic', fuel:'Petrol',
    badge:'hot', avail:1, saving:300, year:2024
  },
];

const BADGE_MAP = {best:'⭐ Best Value', hot:'🔥 Hot', new:'✨ New', ev:'⚡ Electric'};
const BADGE_CLASS = {best:'badge-best', hot:'badge-hot', new:'badge-new', ev:'badge-ev'};

let activeCar = null, currentStep = 1, selectedAddons = {}, rentalDays = 3;
let currentFleet = [...FLEET];

/* ── INIT ── */
window.addEventListener('DOMContentLoaded', () => {
  setDefaultDates();
  animateCounters();
  startTimer();
  renderFleet(FLEET);
  setTimeout(() => showExitIntent(), 45000);
});
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
});

/* ── DATES ── */
function setDefaultDates(){
  const n = new Date(), r = new Date(n.getTime() + 3*864e5);
  const fmt = d => d.toISOString().slice(0,16);
  document.getElementById('f-pick').value = fmt(n);
  document.getElementById('f-ret').value = fmt(r);
}

/* ── COUNTER ANIMATION ── */
function animateCounters(){
  const targets = [500, 80, 12483, 4900];
  const ids = ['st1','st2','st3','st4'];
  const sfx = ['+','+',' customers',' ★'];
  ids.forEach((id, i) => {
    const el = document.getElementById(id);
    let v = 0, target = targets[i];
    const step = target / (1800/16);
    const t = setInterval(() => {
      v = Math.min(v + step, target);
      if(i===2) el.textContent = Math.floor(v).toLocaleString() + sfx[i];
      else if(i===3) el.textContent = (v/1000).toFixed(1) + 'K' + sfx[i];
      else el.textContent = Math.floor(v) + sfx[i];
      if(v >= target) clearInterval(t);
    }, 16);
  });
}

/* ── TIMER ── */
function startTimer(){
  let t = 14*60+59;
  setInterval(() => {
    t--; if(t<0) t=14*60+59;
    const m = Math.floor(t/60), s = t%60;
    document.getElementById('tm-m').textContent = String(m).padStart(2,'0');
    document.getElementById('tm-s').textContent = String(s).padStart(2,'0');
  }, 1000);
}

/* ── TAB ── */
function setTab(el){
  el.closest('.booking-tabs').querySelectorAll('.tab').forEach(t=>t.classList.remove('on'));
  el.classList.add('on');
}

/* ── SEARCH ── */
function doSearch(){
  const loc = document.getElementById('f-loc').value;
  if(!loc){ toast('⚠️','Please select a pick-up location first'); return; }
  const pick = new Date(document.getElementById('f-pick').value);
  const ret  = new Date(document.getElementById('f-ret').value);
  if(ret <= pick){ toast('⚠️','Return date must be after pick-up'); return; }
  rentalDays = Math.max(1, Math.ceil((ret-pick)/864e5));
  const cat = document.getElementById('f-cat').value;
  const filtered = cat ? FLEET.filter(c=>c.cat===cat) : FLEET;
  currentFleet = filtered;
  renderFleet(filtered);
  document.getElementById('results-info').style.display='block';
  document.getElementById('res-count').textContent = filtered.length;
  document.querySelector('#fleet').scrollIntoView({behavior:'smooth',block:'start'});
  toast('🔍',`Found <b>${filtered.length} cars</b> available in ${loc.split(',')[0]}`);
}

/* ── RENDER FLEET ── */
function renderFleet(list){
  const grid = document.getElementById('cars-grid');
  grid.innerHTML = '';
  if(!list.length){
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:80px 20px;color:var(--muted);">
      <div style="font-size:40px;margin-bottom:12px;">🔍</div>
      <div>No vehicles found for this selection.</div>
    </div>`;
    return;
  }
  list.forEach(car => {
    const total = car.price * rentalDays;
    const save = car.saving > 0 ? `<div class="price-save">🎉 Saving $${car.saving * rentalDays}</div>` : '';
    const badge = car.badge ? `<div class="card-badge ${BADGE_CLASS[car.badge]}">${BADGE_MAP[car.badge]}</div>` : '';
    const avail = car.avail <= 2 ? `<div class="card-avail">🔴 Only ${car.avail} left — Book now!</div>` : '';
    grid.innerHTML += `
    <div class="car-card" onclick="openModal(FLEET.find(c=>c.id==${car.id}))">
      <div class="card-img">
        <img
          src="${car.img}"
          alt="${car.name}"
          loading="lazy"
          onerror="this.style.opacity='.1'"
        >
        ${badge}
        <button class="card-fav" onclick="event.stopPropagation();favToggle(this)" title="Save">♡</button>
        ${avail}
      </div>
      <div class="card-body">
        <div class="card-type">${car.type} · ${car.year}</div>
        <div class="card-name">${car.name}</div>
        <div class="card-specs">
          <span class="spec"><span class="ico">👥</span>${car.seats} Seats</span>
          <span class="spec"><span class="ico">⚙️</span>${car.trans}</span>
          <span class="spec"><span class="ico">⛽</span>${car.fuel}</span>
        </div>
        <div class="card-foot">
          <div class="price-group">
            <div class="price-lbl">Per Day</div>
            <div class="price-amt">$${car.price}</div>
            <div class="price-total">Total: $${total} / ${rentalDays} days</div>
            ${save}
          </div>
          <button class="btn-book">Book Now</button>
        </div>
      </div>
    </div>`;
  });
}

/* ── FILTER / SORT ── */
function filterFleet(cat, btn){
  document.querySelectorAll('.cat-pill').forEach(p=>p.classList.remove('on'));
  btn.classList.add('on');
  currentFleet = cat==='all' ? [...FLEET] : FLEET.filter(c=>c.cat===cat);
  renderFleet(currentFleet);
}
function sortFleet(by, btn){
  let s = [...currentFleet];
  if(by==='price') s.sort((a,b)=>a.price-b.price);
  if(by==='price-d') s.sort((a,b)=>b.price-a.price);
  if(by==='pop') s.sort((a,b)=>b.avail-a.avail);
  renderFleet(s);
}

/* ── FAVORITE ── */
function favToggle(btn){
  const on = btn.classList.toggle('on');
  btn.textContent = on ? '♥' : '♡';
  toast(on?'❤️':'💔', on?'<b>Saved</b> to your favorites':'Removed from favorites');
  btn.style.color = on ? '#FFC300' : '';
}

/* ── MODAL ── */
function openModal(car){
  activeCar = car;
  currentStep = 1; selectedAddons = {};
  // fill step 1
  document.getElementById('m-img').src = car.img;
  document.getElementById('m-cat').textContent = car.type;
  document.getElementById('m-name').textContent = car.name;
  document.getElementById('m-price').textContent = '$'+car.price+'/day';
  document.getElementById('m-specs').innerHTML =
    `<span class="spec"><span class="ico">👥</span>${car.seats}S</span>
     <span class="spec"><span class="ico">⚙️</span>${car.trans}</span>
     <span class="spec"><span class="ico">⛽</span>${car.fuel}</span>`;
  const loc = document.getElementById('f-loc').value || 'Dubai, UAE';
  document.getElementById('m-loc').textContent = loc;
  document.getElementById('m-retloc').textContent = loc;
  document.getElementById('m-pickdate').textContent = fmtDate(document.getElementById('f-pick').value);
  document.getElementById('m-retdate').textContent = fmtDate(document.getElementById('f-ret').value);
  // sticky
  document.getElementById('sb-img').src = car.img;
  document.getElementById('sb-name').textContent = car.name;
  document.getElementById('sb-days').textContent = rentalDays + ' day rental';
  document.getElementById('sb-total').textContent = '$' + car.price*rentalDays;
  document.getElementById('sticky').classList.add('up');
  renderStep();
  document.getElementById('overlay').classList.add('open');
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(){
  document.getElementById('overlay').classList.remove('open');
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow='';
  document.getElementById('success-pane').style.display='none';
  document.getElementById('mbody').style.display='block';
  document.getElementById('mftr').style.display='flex';
}
function renderStep(){
  for(let i=1;i<=4;i++){
    const ps=document.getElementById('ps'+i), pl=document.getElementById('pl'+i), p=document.getElementById('p'+i);
    ps.className='prog-step'+(i===currentStep?' cur':i<currentStep?' done':'');
    if(pl) pl.className='prog-line'+(i<currentStep?' done':'');
    p.className='panel'+(i===currentStep?' cur':'');
  }
  document.getElementById('step-hint').textContent=`Step ${currentStep} of 4`;
  document.getElementById('btn-back').style.visibility=currentStep>1?'visible':'hidden';
  document.getElementById('btn-next').textContent=currentStep===4?'✓ Confirm & Pay':'Continue →';
}
function stepNext(){
  if(currentStep===3){
    if(!document.getElementById('d-fn').value||!document.getElementById('d-em').value){
      toast('⚠️','Please fill in your first name and email'); return;
    }
  }
  if(currentStep===4){ confirmBooking(); return; }
  currentStep++; renderStep(); calcOrder();
}
function stepBack(){ if(currentStep>1){currentStep--;renderStep();} }

/* ADDONS */
function toggleAddon(el,key,price){
  el.classList.toggle('on');
  if(el.classList.contains('on')) selectedAddons[key]=price;
  else delete selectedAddons[key];
  calcOrder();
}
function calcOrder(){
  if(!activeCar) return;
  const base=activeCar.price*rentalDays;
  const addTotal=Object.values(selectedAddons).reduce((a,b)=>a+b*rentalDays,0);
  const tax=Math.round((base+addTotal)*.08);
  const disc=activeCar.saving*rentalDays;
  const total=base+addTotal+tax-disc;
  document.getElementById('o-base').textContent=`$${base} ($${activeCar.price}×${rentalDays}d)`;
  document.getElementById('o-add').textContent=`$${addTotal}`;
  document.getElementById('o-tax').textContent=`$${tax}`;
  document.getElementById('o-disc').textContent=`-$${disc}`;
  document.getElementById('o-total').textContent=`$${total}`;
  if(disc>0){
    document.getElementById('o-saved').style.display='block';
    document.getElementById('o-savedamt').textContent='$'+disc;
  }
}

function confirmBooking(){
  const ref='VLX-'+Math.random().toString(36).substr(2,6).toUpperCase();
  document.getElementById('ref-code').textContent=ref;
  document.getElementById('mbody').style.display='none';
  document.getElementById('mftr').style.display='none';
  document.getElementById('success-pane').style.display='block';
  document.getElementById('sticky').classList.remove('up');
  toast('✅','Booking confirmed! <b>Check your email.</b>');
}
function setPay(el){
  document.querySelectorAll('.pay-tab').forEach(t=>t.classList.remove('on'));
  el.classList.add('on');
}
function fmtCard(inp){
  let v=inp.value.replace(/\D/g,'').substr(0,16);
  inp.value=v.replace(/(\d{4})/g,'$1 ').trim();
}
function fmtDate(val){
  if(!val) return 'Not selected';
  return new Date(val).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
}

/* ── TOAST ── */
function toast(ico, msg){
  const el=document.getElementById('toast');
  document.getElementById('t-ico').textContent=ico;
  document.getElementById('t-msg').innerHTML=msg;
  el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'),3800);
}

/* ── EXIT INTENT ── */
let exitShown=false;
function showExitIntent(){
  document.addEventListener('mouseleave',e=>{
    if(e.clientY<10&&!exitShown){
      exitShown=true;
      document.getElementById('exit-bg').classList.add('show');
      document.getElementById('exit-box').classList.add('show');
    }
  });
}
function closeExit(){
  document.getElementById('exit-bg').classList.remove('show');
  document.getElementById('exit-box').classList.remove('show');
}

/* WHATSAPP TOAST */
setTimeout(()=>toast('💬','Need help? Chat us on <b>WhatsApp 24/7</b>'), 8000);
 