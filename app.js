/* Hungry Rabbit — menu, bowling throw, lane calculator, booking form */
(() => {
  'use strict';
  const M = window.Motion || { $: (s, r = document) => r.querySelector(s), $$: (s, r = document) => Array.from(r.querySelectorAll(s)), ready: (f) => f(), refresh() {}, toast() {}, wa: (n, t) => window.open('https://wa.me/' + n + '?text=' + encodeURIComponent(t), '_blank', 'noopener') };
  const { $, $$ } = M;
  const nf = (n) => n.toLocaleString('ru-RU');

  /* Menu (prices from the restaurant's published menu, checked 08.10.2026) */
  const MENU = [
    { id: 'beer', t: 'К пиву', items: [
      ['Пивной сет: крылья BBQ, чесночные гренки, креветки, чипсы из лаваша, соусы', '450 г', 8000],
      ['Сет: эсколар темпура, картофель фри и дольки, копчёные колбаски', '500 г', 8600],
      ['Сет: куриные палочки, сырный спринг-ролл, чебуреки, чечил, гриссини', '450 г', 7400],
      ['Креветки жареные или отварные', '180 г', 7400],
      ['Крылья в соусе «Свит чили»', '340/40 г', 3900],
      ['Бастурма', '50 г', 2800],
      ['Жареные пельмени с соусом спайси', '120/40 г', 2500],
      ['Луковые кольца со сметаной и зеленью', '150/30 г', 2000],
    ] },
    { id: 'salads', t: 'Салаты', items: [
      ['Салат с угрём, овощами и соусом унаги', '260 г', 5200],
      ['С копчёным лососем, виноградом и моцареллой', '180 г', 4000],
      ['«Цезарь» с куриной грудкой', '270 г', 3300],
      ['Тёплый острый салат с говядиной и пекинской капустой', '240 г', 3100],
      ['Хрустящие баклажаны в соусе свит чили', '290 г', 2900],
      ['«Греческий»', '270 г', 2600],
      ['Со свёклой, грушей и брынзой', '275 г', 2500],
      ['«Ачик-чучук»', '290 г', 1950],
    ] },
    { id: 'burgers', t: 'Бургеры и донеры', items: [
      ['Донер с говядиной и халапеньо', '360/40 г', 4100],
      ['Бургер с говяжьими котлетами, сыром и томатами', '310 г', 3900],
      ['Домашняя «Фахитас» с говядиной', '220/40 г', 3900],
      ['Донер с курицей и халапеньо', '360/40 г', 3400],
      ['Классический «Клаб сэндвич» с курицей', '500 г', 3200],
      ['Бургер с куриной котлетой и маринованным огурцом', '380 г', 3100],
    ] },
    { id: 'pizza', t: 'Пицца и паста', items: [
      ['Пицца с лососем', '430 г', 4500],
      ['Паста «Гамберони» с тигровыми креветками', '440 г', 4300],
      ['Пицца «Полло»', '470 г', 4100],
      ['Пицца «Четыре сыра»', '450 г', 4100],
      ['Пицца «Салями»', '460 г', 4100],
      ['Пицца «Мексиканская»', '550 г', 4100],
      ['Папарделле «Альфредо» с курицей и шампиньонами', '410 г', 3500],
      ['Хачапури по-мегрельски', '440 г', 2900],
    ] },
    { id: 'east', t: 'Восток и роллы', items: [
      ['Большое ассорти роллов', '1300 г', 21000],
      ['Ролл «Филадельфия»', '230 г', 5400],
      ['Бешбармак с кониной и сорпой', '500/200 г', 4500],
      ['Шурпа с бараниной и кониной', '500 г', 4200],
      ['Плов «Ташкентский праздничный» с говядиной и кониной', '380 г', 3700],
      ['Плов «Ферганский» с бараниной', '350 г', 3200],
      ['Лагман узбекский', '450 г', 2950],
      ['Рамен с говядиной', '450 г', 2900],
    ] },
    { id: 'grill', t: 'Мангал', items: [
      ['Сет шашлыков на 4 персоны', '880 г', 17000],
      ['Стейк «Ковбой»', '270 г', 12000],
      ['«Плескавица» из говядины', '220 г', 6400],
      ['Шашлык «Антрекот» из баранины', '190 г', 5800],
      ['Шашлык из мякоти баранины', '190 г', 5600],
      ['Люля-кебаб из баранины', '290 г', 3700],
      ['Шашлык из утки', '190 г', 3300],
      ['Шашлык из филе цыплёнка', '210/40 г', 2800],
    ] },
    { id: 'main', t: 'Горячее', items: [
      ['Лосось с тимьяном, шпинатно-грибным соусом и рисом', '420 г', 9500],
      ['Мраморная говядина Black Angus на сковороде', '190/200 г', 9200],
      ['Жареные ломтики говядины с гороховым пюре', '380 г', 6100],
      ['Карбонат из говядины с запечённым картофелем и пармезаном', '370 г', 5700],
      ['Форель на гриле с соусом тартар', '220/40 г', 5100],
      ['Судак с брокколи и томатами под сливочным соусом', '410 г', 4800],
      ['Бифштекс с яйцом, картофельным пюре и сальсой', '340 г', 4500],
      ['Куриная ножка на гриле с картофелем фри', '340 г', 3600],
    ] },
    { id: 'company', t: 'На компанию', items: [
      ['Бешбармак с кониной на астау, 12–14 человек (предзаказ за 2 суток)', '5200 г', 80000],
      ['Телятина в пряном соусе с рисом и овощами, на 6 персон', '1600 г', 45000],
      ['Рыбный микс-гриль на 4 персоны', '1550 г', 42000],
      ['Запечённая лопатка ягнёнка на 4 персоны', '1650 г', 39000],
      ['Мясной микс-гриль: Ти-бон, антрекот, курица, крылышки, колбаски', '1300 г', 27000],
    ] },
    { id: 'desserts', t: 'Десерты', items: [
      ['Испанский запечённый чизкейк', '160 г', 2900],
      ['«Сникерс» с орехами', '160 г', 2600],
      ['«Наполеон»', '200 г', 2500],
      ['«Красный бархат»', '160 г', 2500],
      ['Яблочный штрудель с мороженым', '140/50 г', 2500],
      ['Торт «Оболоньский» с фисташковым бисквитом', '150/50 г', 2300],
      ['«Молочная девочка»', '160 г', 2100],
      ['Домашнее мороженое', '50 г', 850],
    ] },
    { id: 'drinks', t: 'Пиво и чай', items: [
      ['Пиво «White Rabbit» нефильтрованное', '0,5 л · 0,3 л — 1 100 ₸', 1500],
      ['Пиво «White Rabbit», башня', '3 л', 8500],
      ['Пиво «Barley» ячменное', '0,5 л · 0,3 л — 1 100 ₸', 1500],
      ['Пиво «Barley», башня', '3 л', 8500],
      ['Чай «Ташкентский»: чёрный и зелёный, цитрусы, мята', 'авторский чай', 2900],
      ['Чай облепиховый с апельсином и мёдом', 'авторский чай', 2900],
      ['Чай «Казахский» с молоком', '0,7 л', 2900],
      ['Эспрессо', '25 мл', 950],
    ] },
  ];

  const tabsEl = $('#menu-tabs');
  const panelsEl = $('#menu-panels');
  const showTab = (id, focus) => {
    const go = () => {
      $$('.mt', tabsEl).forEach((b) => { const on = b.dataset.id === id; b.classList.toggle('is-active', on); b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
      $$('.mpanel', panelsEl).forEach((p) => { p.hidden = p.dataset.id !== id; });
      M.refresh();
    };
    if (document.startViewTransition && M.motion) document.startViewTransition(go); else go();
  };
  if (tabsEl && panelsEl) {
    MENU.forEach((cat, ci) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'mt';
      b.id = 'mt-' + cat.id;
      b.dataset.id = cat.id;
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-controls', 'mp-' + cat.id);
      b.textContent = cat.t;
      b.addEventListener('click', () => showTab(cat.id));
      b.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        const n = MENU[(ci + (e.key === 'ArrowRight' ? 1 : -1) + MENU.length) % MENU.length];
        showTab(n.id, true);
      });
      tabsEl.append(b);
      const p = document.createElement('div');
      p.className = 'mpanel';
      p.id = 'mp-' + cat.id;
      p.dataset.id = cat.id;
      p.setAttribute('role', 'tabpanel');
      p.setAttribute('aria-labelledby', b.id);
      p.hidden = ci !== 0;
      cat.items.forEach(([name, w, price], k) => {
        const row = document.createElement('div');
        row.className = 'mi';
        row.style.setProperty('--k', k);
        row.innerHTML = '<span class="mi-name"></span><span class="mi-w"></span><span class="mi-p"></span>';
        row.children[0].textContent = name;
        row.children[1].textContent = w;
        row.children[2].textContent = nf(price) + ' ₸';
        p.append(row);
      });
      panelsEl.append(p);
    });
    const first = $('.mt', tabsEl);
    first.classList.add('is-active');
    first.setAttribute('aria-selected', 'true');
    $$('.mt', tabsEl).forEach((t, i) => { if (i) { t.tabIndex = -1; t.setAttribute('aria-selected', 'false'); } });
  }
  $$('[data-open-tab]').forEach((a) => a.addEventListener('click', () => setTimeout(() => showTab(a.dataset.openTab), 300)));

  /* Hero throw: the ball rolls in when the lane is on screen, pins fly */
  const hero = $('.hero');
  const lane = $('.lane');
  const throwBall = () => {
    if (!hero || !lane || !M.motion) return;
    lane.style.setProperty('--dist', Math.max(120, lane.clientWidth - 150) + 'px');
    clearTimeout(throwBall.t);
    clearTimeout(throwBall.r);
    hero.classList.remove('go', 'hit', 'reset');
    void hero.offsetWidth;
    hero.classList.add('go');
    throwBall.t = setTimeout(() => {
      hero.classList.add('hit', 'thrown');
      throwBall.r = setTimeout(() => { hero.classList.remove('go', 'hit'); hero.classList.add('reset'); }, 1900);
    }, 1060);
  };
  M.ready(() => {
    if (!lane) return;
    if (!('IntersectionObserver' in window)) { setTimeout(throwBall, 700); return; }
    const io = new IntersectionObserver((en) => {
      if (!en[0].isIntersecting) return;
      setTimeout(throwBall, 700);
      io.disconnect();
    }, { threshold: 0.6 });
    io.observe(lane);
  });
  const replay = $('.replay');
  if (replay) replay.addEventListener('click', throwBall);

  /* Lane calculator */
  const st = { lanes: 1, hours: 1 };
  const sumEl = $('#calc-sum');
  const price = () => +(($('input[name="calc-day"]:checked') || {}).value || 6000);
  let shown = 6000;
  const paint = () => {
    $('#calc-lanes').textContent = st.lanes;
    $('#calc-hours').textContent = st.hours;
    const target = price() * st.lanes * st.hours;
    const from = shown;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / 500);
      shown = Math.round(from + (target - from) * (1 - Math.pow(1 - p, 3)));
      sumEl.textContent = nf(shown);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  $$('[data-step]').forEach((b) => b.addEventListener('click', () => {
    const k = b.dataset.step;
    st[k] = Math.max(1, Math.min(k === 'lanes' ? 10 : 6, st[k] + +b.dataset.d));
    paint();
  }));
  $$('input[name="calc-day"]').forEach((r) => r.addEventListener('change', paint));
  const calcBook = $('#calc-book');
  if (calcBook) calcBook.addEventListener('click', () => {
    const when = ($('input[name="calc-day"]:checked') || {}).value === '6000' ? 'пн–чт до 18:00' : 'вечер / пт–вс';
    M.wa('77019713777', 'Здравствуйте! Хочу забронировать боулинг в Hungry Rabbit.\nДорожек: ' + st.lanes + '\nЧасов: ' + st.hours + '\nКогда: ' + when + '\nПодскажите, пожалуйста, свободное время.');
    M.toast('Открываем WhatsApp — сообщение уже набрано');
  });

  /* Booking form: karaoke goes straight to Jimmy */
  const form = $('#book-form');
  if (form) {
    const setNum = () => {
      const v = ($('input[name="what"]:checked', form) || {}).value || '';
      form.dataset.wa = v.indexOf('Jimmy') >= 0 ? '77015222238' : '77019713777';
    };
    $$('input[name="what"]', form).forEach((r) => r.addEventListener('change', setNum));
    setNum();
  }
})();
