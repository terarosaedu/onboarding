// ── 비밀번호 설정 ──
const ACCESS_CODE = '0601'; // ← 원하는 코드로 변경

function checkPassword() {
  const input = document.getElementById('pwInput').value.trim();
  if (input === ACCESS_CODE) {
    document.getElementById('passwordGate').style.display = 'none';
    sessionStorage.setItem('tr_access', '1'); // 새로고침해도 유지
  } else {
    document.getElementById('pwError').style.display = 'block';
    document.getElementById('pwInput').value = '';
    document.getElementById('pwInput').focus();
  }
}

// 이미 인증했으면 게이트 스킵
if (sessionStorage.getItem('tr_access') === '1') {
  document.addEventListener('DOMContentLoaded', () => {
    const gate = document.getElementById('passwordGate');
    if (gate) gate.style.display = 'none';
  });
}


// ══════════════════════════════════════════════════
// ★ 여기에 Supabase 정보를 입력하세요 ★
// ══════════════════════════════════════════════════
const SUPABASE_URL = 'https://iauhcswapjyyylnehmcp.supabase.co';
const SUPABASE_KEY = 'YOUR_PUBLISHABLE_KEY_HERE'; // ← Publishable key로 교체
// ══════════════════════════════════════════════════

async function dbInsert(table, data) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    });
    return res.ok;
  } catch (e) {
    console.error('DB 오류:', e);
    return false;
  }
}

// ── 교육 데이터 ──
const COURSES = [
  {
    id: 'company_intro', name: '회사소개', day: 'Day 1', time: '09:30–10:30', instructor: '채선주',
    desc: '테라로사의 브랜드 철학, 역사, 조직 문화를 소개합니다.',
    quiz: [{
      q: "'테라로사(TERAROSA)' 브랜드 명의 뜻은 무엇인가요?",
      options: ['붉은 장미를 의미하는 이탈리아어', '커피가 잘 자라는 붉은 토양을 의미하는 포르투갈어', '커피의 고향을 의미하는 스페인어', '아침의 빛을 의미하는 라틴어'],
      answer: 1,
      explanation: '테라로사(TERAROSA)는 포르투갈어로 "붉은 땅"을 의미합니다. 커피가 잘 자라는 화산성 붉은 토양에서 이름을 따왔습니다.'
    }]
  },
  {
    id: 'hr', name: '인사노무', day: 'Day 1', time: '10:30–12:00', instructor: '유지은',
    desc: '근태 관리, 급여 체계, 복리후생 등 인사 및 노무 규정을 안내합니다.',
    quiz: [{
      q: '테라로사의 인사 관련 사항 중 올바른 것은?',
      options: ['연장근무는 별도 신청 없이 자동으로 급여에 포함된다', '건강진단결과서(구 보건증)는 위생 법적 관리 사항에 해당한다', '급여는 매월 말일에 지급된다', '수습 기간은 6개월이다'],
      answer: 1,
      explanation: '건강진단결과서(구 보건증)는 식품위생법에 따른 법적 의무 사항입니다. 식품 관련 업종 종사자는 반드시 보유해야 합니다.'
    }]
  },
  {
    id: 'specialty_coffee', name: '스페셜티 커피란', day: 'Day 1', time: '13:00–14:00', instructor: '박세미',
    desc: '스페셜티 커피의 정의와 기준, 테라로사가 커피를 선별하는 방식에 대해 배웁니다.',
    quiz: [{
      q: '스페셜티 커피로 인정받기 위한 SCA 기준 점수는?',
      options: ['70점 이상', '75점 이상', '80점 이상', '85점 이상'],
      answer: 2,
      explanation: 'SCA(스페셜티 커피 협회) 기준으로 100점 만점 중 80점 이상을 받은 커피를 스페셜티 커피로 분류합니다.'
    }]
  },
  {
    id: 'menu', name: '메뉴 교육', day: 'Day 1', time: '14:00–15:30', instructor: '박세미',
    desc: '커피 음료, 논커피 음료, 베이커리 메뉴 전반에 대한 이해와 설명 방법을 배웁니다.',
    quiz: [{
      q: '메뉴 교육에서 다루는 카테고리가 아닌 것은?',
      options: ['커피 음료', '논커피 음료', '베이커리', '주류'],
      answer: 3,
      explanation: '테라로사 메뉴 교육은 커피 음료, 논커피 음료(티·에이드 등), 베이커리를 다룹니다. 주류는 테라로사 메뉴에 포함되지 않습니다.'
    }]
  },
  {
    id: 'hygiene', name: '위생 교육 I + II', day: 'Day 1', time: '15:30–18:00', instructor: '이은혜',
    desc: '식품위생법 기반 위생 관리 기준, 보관 온도, 소비기한 관리, 법적 의무 사항을 배웁니다.',
    quiz: [{
      q: '테라로사 위생 중대 법적 사항이 아닌 것은?',
      options: ['소비기한 관리', '한글표시사항 관리', '건강진단결과서 (구 보건증)', '매장 청소 일지 작성'],
      answer: 3,
      explanation: '중대 법적 사항은 소비기한 관리, 한글표시사항 관리, 건강진단결과서, 이물 혼입 방지 관리 등입니다. 청소 일지는 내부 운영 기준입니다.'
    }]
  },
  {
    id: 'service_basic', name: '서비스 교육 Basic', day: 'Day 2', time: '09:30–12:00', instructor: '이지은',
    desc: '테라로사 서비스의 기본 원칙과 고객 응대 매너를 배웁니다.',
    quiz: [{
      q: '고객 안내 시 "실례지만", "번거롭겠지만"과 같이 완충하는 표현 방법을 무엇이라 하나요?',
      options: ['경청 화법', '쿠션 화법', '공감 화법', '미러링 화법'],
      answer: 1,
      explanation: '쿠션 화법은 직접적인 거절이나 요청 대신 완충 표현을 앞에 덧붙여 상대방의 부담을 줄이는 서비스 커뮤니케이션 기술입니다.'
    }]
  },
  {
    id: 'mot', name: '고객 접점 MOT', day: 'Day 2', time: '13:00–14:00', instructor: '이지은',
    desc: '고객과의 모든 접점(Moment of Truth)을 5단계로 정리하고 각 단계별 응대 방법을 배웁니다.',
    quiz: [{
      q: '테라로사 서비스 MOT 5단계 중 세 번째 단계는?',
      options: ['환영인사', '주문받기', '결제하기', '상품전달'],
      answer: 2,
      explanation: 'MOT 5단계는 ① 환영인사 → ② 주문받기 → ③ 결제하기 → ④ 상품전달 → ⑤ 배웅인사 순서입니다.'
    }]
  },
  {
    id: 'farm', name: '농장 소개 및 시음', day: 'Day 2', time: '15:00–16:00', instructor: '박세미',
    desc: '테라로사가 소싱하는 주요 농장과 원산지에 대한 이해를 높이고, 실제 커피 시음을 합니다.',
    quiz: [{
      q: '에티오피아 커피의 대표적인 특징으로 맞는 것은?',
      options: ['견과류와 초콜릿 향이 강하다', '꽃향기와 과일 향이 특징적이다', '스모키하고 무거운 바디감이 있다', '단맛이 없고 드라이한 편이다'],
      answer: 1,
      explanation: '에티오피아는 커피의 발원지로, 특히 워시드 가공에서 재스민·베르가못 같은 꽃향기와 복숭아·레몬 같은 과일 향이 특징적으로 나타납니다.'
    }]
  },
  {
    id: 'coffee_products', name: '커피 상품 교육', day: 'Day 2', time: '16:00–18:00', instructor: '이지은',
    desc: '원두, 드립백 등 테라로사 커피 상품의 종류, 특징, 기한 및 세일즈 포인트를 배웁니다.',
    quiz: [{
      q: '테라로사 원두의 판매기한은?',
      options: ['5일', '7일', '10일', '14일'],
      answer: 2,
      explanation: '테라로사 원두의 판매기한은 10일입니다. 소비기한은 별도로 더 길게 설정되어 있으며, 정확한 수치는 교육 자료를 참고해주세요.'
    }]
  },
  {
    id: 'food_goods', name: '푸드/굿즈 상품 교육', day: 'Day 3', time: '09:30–12:00', instructor: '이지은',
    desc: '베이커리, 푸드 상품, 굿즈 라인업 전반을 이해하고 고객에게 소개하는 방법을 배웁니다.',
    quiz: [{
      q: "'킹콩'의 이름은 어떤 의미인가요?",
      options: ['거대한 크기를 강조하는 이름', '왕(King)이라는 영어와 콩이라는 한글의 합성어', '콩고 지역의 원두를 사용한 것에서 유래', '강력한 맛이라는 의미의 조어'],
      answer: 1,
      explanation: "'킹콩'은 왕(King)을 의미하는 영어와 콩이라는 한글의 합성어입니다. 테라로사의 시그니처 베이커리 상품입니다."
    }]
  },
  {
    id: 'pos_kiosk', name: 'POS & KIOSK', day: 'Day 3', time: '13:00–15:30', instructor: '이지은',
    desc: '매장 운영에 필수적인 POS 시스템과 키오스크 사용 방법, 주요 기능을 배웁니다.',
    quiz: [{
      q: 'POS 시스템 관련 올바른 설명은?',
      options: ['POS는 Point of Sale의 약자이다', 'POS는 Point of Service의 약자이다', 'POS는 Process of Sales의 약자이다', 'POS는 Payment on Screen의 약자이다'],
      answer: 0,
      explanation: 'POS는 Point of Sale(판매 시점 관리)의 약자입니다. 주문 접수, 결제, 재고 관리 등 매장 판매의 모든 접점을 관리하는 시스템입니다.'
    }]
  }
];

// ── 상태 ──
let userName = '';
let completions = {};
let currentQuizIdx = null;
let quizSubmitted = false;

// ── 초기화 ──
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('tr_onboarding');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      userName = data.name || '';
      completions = data.completions || {};
      if (userName) activateUser();
    } catch(e) {}
  }
  renderCourses();
  updateProgressUI();
});

function saveLocal() {
  localStorage.setItem('tr_onboarding', JSON.stringify({ name: userName, completions }));
}

// ── 섹션 전환 ──
function showSection(id, el) {
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  document.getElementById('sec-' + id).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (id === 'courses') {
    if (!userName) {
      document.getElementById('coursesNameGate').style.display = 'block';
      document.getElementById('coursesList').style.display = 'none';
    } else {
      document.getElementById('coursesNameGate').style.display = 'none';
      document.getElementById('coursesList').style.display = 'block';
    }
  }
}

// ── 필기TEST / 설문 탭 클릭 시 잠금 체크 ──
function tryOpenFinal(id, el) {
  const done = Object.keys(completions).length;
  const total = COURSES.length;
  if (done < total) {
    const pct = Math.round(done / total * 100);
    // 잠금 페이지 보여주기
    showSection(id, el);
    const lockView = document.getElementById(id + 'LockedView');
    const content = document.getElementById(id + 'Content');
    const completePage = document.getElementById(id + 'CompletePage');
    if (lockView) lockView.style.display = 'block';
    if (content) content.style.display = 'none';
    if (completePage) completePage.style.display = 'none';
    const pctEl = document.getElementById(id + 'LockPct');
    if (pctEl) pctEl.textContent = pct + '%';
  } else {
    showSection(id, el);
    openFinalSection(id);
  }
}

function openFinalSection(id) {
  const lockView = document.getElementById(id + 'LockedView');
  const content = document.getElementById(id + 'Content');
  if (lockView) lockView.style.display = 'none';
  if (content) content.style.display = 'block';
}

// ── 시작 ──
function startOnboarding() {
  const input = document.getElementById('nameInput').value.trim();
  if (!input) { alert('이름을 입력해주세요.'); return; }
  userName = input;
  saveLocal();
  activateUser();
}

function activateUser() {
  document.getElementById('nameGate').style.display = 'none';
  document.getElementById('welcomeContent').style.display = 'block';
  document.getElementById('welcomeName').textContent = userName;
  updateProgressUI();
}

// ── 진행률 ──
function updateProgressUI() {
  const done = Object.keys(completions).length;
  const total = COURSES.length;
  const pct = Math.round(done / total * 100);
  document.getElementById('pfFill').style.width = pct + '%';
  document.getElementById('pfPct').textContent = pct + '%';
}

// ── 교육 목록 렌더 ──
function renderCourses() {
  const list = document.getElementById('coursesList');
  if (!list) return;
  list.innerHTML = COURSES.map((c, i) => {
    const done = !!completions[c.id];
    const doneTime = completions[c.id]?.time || '';
    return `
      <div class="course-card ${done ? 'done' : ''} fade-up" style="animation-delay:${i * 0.04}s">
        <div class="course-top">
          <div class="course-num-badge">${done ? '✓' : String(i+1).padStart(2,'0')}</div>
          <div class="course-info">
            <div class="course-name">${c.name}</div>
            <div class="course-meta">${c.day} · ${c.time} · ${c.instructor}</div>
          </div>
          <span class="course-status ${done ? 'done' : 'pending'}">${done ? '이수완료' : '미이수'}</span>
        </div>
        <div class="course-body">
          <div class="course-desc">${c.desc}</div>
          ${done
            ? `<div class="course-done-time">✓ ${doneTime} 이수 완료</div>`
            : `<button class="btn-quiz" onclick="openQuiz(${i})">퀴즈 풀기 →</button>`
          }
        </div>
      </div>
    `;
  }).join('');
}

// ── 퀴즈 열기 ──
function openQuiz(idx) {
  if (!userName) { alert('먼저 이름을 입력해주세요.'); return; }
  currentQuizIdx = idx;
  quizSubmitted = false;
  const course = COURSES[idx];
  document.getElementById('quizTitle').textContent = course.name;

  const body = document.getElementById('quizBody');
  body.innerHTML = course.quiz.map((q, qi) => `
    <div class="quiz-q" id="quizQ${qi}">
      <div class="quiz-q-text">Q${qi+1}. ${q.q}</div>
      <div class="quiz-options">
        ${q.options.map((opt, oi) => `
          <label class="quiz-opt" id="opt_${qi}_${oi}">
            <input type="radio" name="quiz_${qi}" value="${oi}"/> ${['①','②','③','④'][oi]} ${opt}
          </label>
        `).join('')}
      </div>
      <div class="quiz-result-box" id="quizResult${qi}" style="display:none;"></div>
    </div>
  `).join('');

  const footer = document.getElementById('quizFooter');
  footer.innerHTML = `
    <button class="btn-primary btn-lg" id="quizSubmitBtn" onclick="submitQuiz()">제출하기</button>
    <button class="btn-ghost" onclick="closeQuiz()">취소</button>
  `;
  document.getElementById('quizModal').style.display = 'flex';
}

function handleOverlayClick(e) {
  if (!quizSubmitted) closeQuiz();
}

function closeQuiz() {
  document.getElementById('quizModal').style.display = 'none';
  currentQuizIdx = null;
  quizSubmitted = false;
}

// ── 퀴즈 제출 ──
async function submitQuiz() {
  const course = COURSES[currentQuizIdx];

  // 정답 체크 및 UI 표시
  let allAnswered = true;
  course.quiz.forEach((q, qi) => {
    const sel = document.querySelector(`input[name="quiz_${qi}"]:checked`);
    if (!sel) { allAnswered = false; return; }
    const chosen = parseInt(sel.value);
    const isCorrect = chosen === q.answer;

    // 선택지 색상
    q.options.forEach((_, oi) => {
      const optEl = document.getElementById(`opt_${qi}_${oi}`);
      if (oi === q.answer) optEl.classList.add('show-correct');
      else if (oi === chosen && !isCorrect) optEl.classList.add('wrong');
      optEl.querySelector('input').disabled = true;
    });

    // 결과 박스
    const resultEl = document.getElementById(`quizResult${qi}`);
    resultEl.style.display = 'block';
    resultEl.className = `quiz-result-box ${isCorrect ? 'correct' : 'wrong'}`;
    resultEl.innerHTML = `
      <span class="quiz-result-icon">${isCorrect ? '✅' : '❌'}</span>
      <strong>${isCorrect ? '정답이에요!' : '오답이에요.'}</strong>
      <div class="quiz-result-explanation">${q.explanation}</div>
    `;
  });

  if (!allAnswered) { alert('답을 선택해주세요.'); return; }

  quizSubmitted = true;

  // 이수 처리
  const now = new Date();
  const timeStr = now.toLocaleDateString('ko-KR') + ' ' + now.toLocaleTimeString('ko-KR', {hour:'2-digit', minute:'2-digit'});
  completions[course.id] = { time: timeStr };
  saveLocal();
  await dbInsert('completions', { name: userName, course_name: course.name });
  renderCourses();
  updateProgressUI();

  // 버튼을 "이수 완료 확인" 으로 교체
  const footer = document.getElementById('quizFooter');
  footer.innerHTML = `<button class="btn-primary btn-lg" onclick="closeDoneFromQuiz()">이수 완료 확인 ✓</button>`;
}

function closeDoneFromQuiz() {
  closeQuiz();
  // 완료 모달
  document.getElementById('doneTitle').textContent = '이수 완료! 🎉';
  document.getElementById('doneMsg').textContent = `${COURSES[currentQuizIdx !== null ? currentQuizIdx : 0]?.name || '교육'}을 이수했습니다.\n수고하셨어요, ${userName}님!`;
  document.getElementById('doneModal').style.display = 'flex';
}

function closeDone() {
  document.getElementById('doneModal').style.display = 'none';
}

// ── 필기TEST 제출 ──
async function submitFinalTest() {
  if (!userName) { alert('먼저 이름을 입력해주세요.'); return; }
  const answers = {};
  document.querySelectorAll('#testForm .ans-input, #testForm .ans-textarea').forEach(el => {
    const q = el.dataset.q, a = el.dataset.a;
    if (!answers[q]) answers[q] = {};
    answers[q][a] = el.value.trim();
  });
  ['q9','q10'].forEach(name => {
    const sel = document.querySelector(`input[name="${name}"]:checked`);
    answers[name] = sel ? sel.value : '';
  });

  const btn = document.getElementById('testSubmitBtn');
  btn.disabled = true; btn.textContent = '제출 중...';

  const ok = await dbInsert('test_submissions', { name: userName, answers });

  if (ok) {
    document.getElementById('testContent').style.display = 'none';
    document.getElementById('testCompletePage').style.display = 'block';
  } else {
    const msg = document.getElementById('testSubmitMsg');
    msg.style.display = 'block';
    msg.className = 'submit-msg error';
    msg.textContent = '제출에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해주세요.';
    btn.disabled = false; btn.textContent = '필기 TEST 제출하기';
  }
}

// ── 만족도 조사 제출 ──
async function submitSurvey() {
  if (!userName) { alert('먼저 이름을 입력해주세요.'); return; }
  const answers = {};
  ['s1','s2','s3'].forEach(name => {
    const sel = document.querySelector(`input[name="${name}"]:checked`);
    answers[name] = sel ? sel.value : '';
  });
  document.querySelectorAll('#surveyForm .ans-input, #surveyForm .ans-textarea').forEach(el => {
    answers[el.dataset.q] = el.value.trim();
  });

  const btn = document.getElementById('surveySubmitBtn');
  btn.disabled = true; btn.textContent = '제출 중...';

  const ok = await dbInsert('survey_submissions', { name: userName, answers });

  if (ok) {
    document.getElementById('finalWelcomeName').textContent = userName;
    document.getElementById('surveyContent').style.display = 'none';
    document.getElementById('surveyCompletePage').style.display = 'block';
  } else {
    const msg = document.getElementById('surveySubmitMsg');
    msg.style.display = 'block';
    msg.className = 'submit-msg error';
    msg.textContent = '제출에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해주세요.';
    btn.disabled = false; btn.textContent = '만족도 조사 제출하기';
  }
}
