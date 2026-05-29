// ══════════════════════════════════════════════════
// ★ 여기에 Supabase 정보를 입력하세요 ★
// ══════════════════════════════════════════════════
const SUPABASE_URL = 'https://iauhcswapjyyylnehmcp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_GHm8hWXwdpI6MttTruxyrw_w5f22l5H'; // ← 복사한 Publishable key로 교체
// ══════════════════════════════════════════════════

// ── DB 저장 함수 ──
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
    console.error('DB 저장 오류:', e);
    return false;
  }
}

// ── 교육 과목 데이터 ──
const COURSES = [
  {
    id: 'company_intro',
    name: '회사소개',
    day: 'Day 1',
    time: '09:30 – 10:30',
    instructor: '채선주',
    desc: '테라로사의 브랜드 철학, 역사, 조직 문화를 소개합니다. 우리가 왜 커피를 하는지, 어떤 가치를 추구하는지 이해하는 시간입니다.',
    quiz: [
      {
        q: "'테라로사(TERAROSA)' 브랜드 명의 뜻은 무엇인가요?",
        options: ['붉은 장미를 의미하는 이탈리아어', '커피가 잘 자라는 붉은 토양을 의미하는 포르투갈어', '커피의 고향을 의미하는 스페인어', '아침의 빛을 의미하는 라틴어'],
        answer: 1
      }
    ]
  },
  {
    id: 'hr',
    name: '인사노무',
    day: 'Day 1',
    time: '10:30 – 12:00',
    instructor: '유지은',
    desc: '근태 관리, 급여 체계, 복리후생 등 입사와 관련된 인사 및 노무 규정을 안내합니다.',
    quiz: [
      {
        q: '테라로사의 인사 관련 사항 중 올바른 것은?',
        options: ['연장근무는 별도 신청 없이 자동으로 급여에 포함된다', '건강진단결과서(구 보건증)는 위생 법적 관리 사항에 해당한다', '급여는 매월 말일에 지급된다', '수습 기간은 6개월이다'],
        answer: 1
      }
    ]
  },
  {
    id: 'specialty_coffee',
    name: '스페셜티 커피란',
    day: 'Day 1',
    time: '13:00 – 14:00',
    instructor: '박세미',
    desc: '스페셜티 커피의 정의와 기준, 테라로사가 커피를 선별하고 다루는 방식에 대해 배웁니다.',
    quiz: [
      {
        q: '스페셜티 커피로 인정받기 위한 SCA 기준 점수는?',
        options: ['70점 이상', '75점 이상', '80점 이상', '85점 이상'],
        answer: 2
      }
    ]
  },
  {
    id: 'menu',
    name: '메뉴 교육',
    day: 'Day 1',
    time: '14:00 – 15:30',
    instructor: '박세미',
    desc: '테라로사의 커피 음료, 논커피 음료, 베이커리 메뉴 전반에 대한 이해와 설명 방법을 배웁니다.',
    quiz: [
      {
        q: '메뉴 교육에서 다루는 카테고리가 아닌 것은?',
        options: ['커피 음료', '논커피 음료', '베이커리', '주류'],
        answer: 3
      }
    ]
  },
  {
    id: 'hygiene',
    name: '위생 교육 I + II',
    day: 'Day 1',
    time: '15:30 – 18:00',
    instructor: '이은혜',
    desc: '식품위생법에 기반한 매장 위생 관리 기준, 보관 온도, 소비기한 관리, 법적 의무 사항을 배웁니다.',
    quiz: [
      {
        q: '테라로사 위생 중대 법적 사항이 아닌 것은?',
        options: ['소비기한 관리', '한글표시사항 관리', '건강진단결과서 (구 보건증)', '매장 청소 일지 작성'],
        answer: 3
      }
    ]
  },
  {
    id: 'service_basic',
    name: '서비스 교육 Basic',
    day: 'Day 2',
    time: '09:30 – 12:00',
    instructor: '이지은',
    desc: '테라로사 서비스의 기본 원칙과 고객 응대 매너를 배웁니다. 표정, 말투, 자세까지 세밀하게 다룹니다.',
    quiz: [
      {
        q: '고객 안내 시 "실례지만", "번거롭겠지만"과 같이 완충하는 표현 방법을 무엇이라 하나요?',
        options: ['경청 화법', '쿠션 화법', '공감 화법', '미러링 화법'],
        answer: 1
      }
    ]
  },
  {
    id: 'mot',
    name: '고객 접점 MOT',
    day: 'Day 2',
    time: '13:00 – 14:00',
    instructor: '이지은',
    desc: '고객과의 모든 접점(Moment of Truth)을 5단계로 정리하고, 각 단계에서의 역할과 응대 방법을 배웁니다.',
    quiz: [
      {
        q: '테라로사 서비스 MOT 5단계 중 세 번째 단계는?',
        options: ['환영인사', '주문받기', '결제하기', '상품전달'],
        answer: 2
      }
    ]
  },
  {
    id: 'farm',
    name: '농장 소개 및 시음',
    day: 'Day 2',
    time: '15:00 – 16:00',
    instructor: '박세미',
    desc: '테라로사가 소싱하는 주요 농장과 원산지에 대한 이해를 높이고, 실제 커피 시음을 통해 풍미를 경험합니다.',
    quiz: [
      {
        q: '에티오피아 커피의 대표적인 특징으로 맞는 것은?',
        options: ['견과류와 초콜릿 향이 강하다', '꽃향기와 과일 향이 특징적이다', '스모키하고 무거운 바디감이 있다', '단맛이 없고 드라이한 편이다'],
        answer: 1
      }
    ]
  },
  {
    id: 'coffee_products',
    name: '커피 상품 교육',
    day: 'Day 2',
    time: '16:00 – 18:00',
    instructor: '이지은',
    desc: '원두, 드립백 등 테라로사 커피 상품의 종류, 특징, 판매기한, 소비기한 및 세일즈 포인트를 배웁니다.',
    quiz: [
      {
        q: '테라로사 원두의 판매기한은?',
        options: ['5일', '7일', '10일', '14일'],
        answer: 2
      }
    ]
  },
  {
    id: 'food_goods',
    name: '푸드/굿즈 상품 교육',
    day: 'Day 3',
    time: '09:30 – 12:00',
    instructor: '이지은',
    desc: '베이커리, 푸드 상품, 굿즈 라인업 전반을 이해하고, 고객에게 효과적으로 소개하는 방법을 배웁니다.',
    quiz: [
      {
        q: "'킹콩'의 이름은 어떤 의미인가요?",
        options: ['거대한 크기를 강조하는 이름', '왕(King)이라는 영어와 콩이라는 한글의 합성어', '콩고 지역의 원두를 사용한 것에서 유래', '강력한 맛이라는 의미의 조어'],
        answer: 1
      }
    ]
  },
  {
    id: 'pos_kiosk',
    name: 'POS & KIOSK',
    day: 'Day 3',
    time: '13:00 – 15:30',
    instructor: '이지은',
    desc: '매장 운영에 필수적인 POS 시스템과 키오스크 사용 방법, 주요 기능과 주의사항을 배웁니다.',
    quiz: [
      {
        q: 'POS 시스템 관련 올바른 설명은?',
        options: ['POS는 Point of Sale의 약자이다', 'POS는 Point of Service의 약자이다', 'POS는 Process of Sales의 약자이다', 'POS는 Payment on Screen의 약자이다'],
        answer: 0
      }
    ]
  }
];

// ── 상태 ──
let userName = '';
let completions = {};
let currentQuizIdx = null;

// ── 초기화 ──
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('tr_onboarding');
  if (saved) {
    const data = JSON.parse(saved);
    userName = data.name || '';
    completions = data.completions || {};
    if (userName) {
      activateUser();
    }
  }
  renderCourses();
  window.addEventListener('scroll', () => {
    document.getElementById('topBtn').classList.toggle('visible', window.scrollY > 300);
  });
});

function saveLocal() {
  localStorage.setItem('tr_onboarding', JSON.stringify({ name: userName, completions }));
}

// ── 섹션 전환 ──
function showSection(id, el) {
  document.querySelectorAll('.page-section').forEach(s => s.style.display = 'none');
  document.getElementById('sec-' + id).style.display = 'block';
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (id === 'courses' && !userName) {
    document.getElementById('coursesNameGate').style.display = 'block';
    document.getElementById('coursesList').style.display = 'none';
  } else if (id === 'courses') {
    document.getElementById('coursesNameGate').style.display = 'none';
    document.getElementById('coursesList').style.display = 'block';
  }

  if (id === 'final' && !userName) {
    document.getElementById('finalNameGate').style.display = 'block';
    document.getElementById('finalContent').style.display = 'none';
  } else if (id === 'final') {
    document.getElementById('finalNameGate').style.display = 'none';
    document.getElementById('finalContent').style.display = 'block';
  }
}

// ── 온보딩 시작 ──
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
  updateProgress();
}

// ── 진행률 ──
function updateProgress() {
  const done = Object.keys(completions).length;
  const total = COURSES.length;
  const pct = Math.round(done / total * 100);
  document.getElementById('progressPct').textContent = pct + '%';
  document.getElementById('progressBar').style.width = pct + '%';
  document.getElementById('progressDetail').textContent = `${done} / ${total}개 교육 완료`;
}

// ── 교육 목록 렌더 ──
function renderCourses() {
  const list = document.getElementById('coursesList');
  if (!list) return;
  list.innerHTML = '<div class="course-list">' + COURSES.map((c, i) => {
    const done = !!completions[c.id];
    const doneTime = completions[c.id] ? completions[c.id].time : '';
    return `
      <div class="course-card ${done ? 'done' : ''}" id="card-${c.id}">
        <div class="course-inner">
          <div class="course-left">
            <div class="course-num">${c.day} · ${String(i+1).padStart(2,'0')}</div>
            <div class="course-name">${c.name}</div>
            <div class="course-meta">${c.time} · 담당: ${c.instructor}</div>
            <div class="course-desc">${c.desc}</div>
          </div>
          <div class="course-right">
            <span class="course-status-${done ? 'done' : 'pending'}">${done ? '✓ 이수완료' : '미이수'}</span>
            ${done ? `<div class="course-done-time">${doneTime}</div>` : `<button class="btn-primary" onclick="openQuiz(${i})">퀴즈 풀기</button>`}
          </div>
        </div>
      </div>
    `;
  }).join('') + '</div>';
}

// ── 퀴즈 열기 ──
function openQuiz(idx) {
  if (!userName) { alert('먼저 이름을 입력해주세요.'); return; }
  currentQuizIdx = idx;
  const course = COURSES[idx];
  document.getElementById('quizTitle').textContent = course.name + ' 수료 퀴즈';
  const body = document.getElementById('quizBody');
  body.innerHTML = course.quiz.map((q, qi) => `
    <div class="quiz-q">
      <div class="quiz-q-text">Q${qi+1}. ${q.q}</div>
      <div class="quiz-options">
        ${q.options.map((opt, oi) => `
          <label class="quiz-opt">
            <input type="radio" name="quiz_${qi}" value="${oi}"/> ${['①','②','③','④'][oi]} ${opt}
          </label>
        `).join('')}
      </div>
    </div>
  `).join('');
  document.getElementById('quizModal').style.display = 'flex';
}

function closeQuiz() {
  document.getElementById('quizModal').style.display = 'none';
  currentQuizIdx = null;
}

// ── 퀴즈 제출 (정답 여부 관계없이 이수) ──
async function submitQuiz() {
  const course = COURSES[currentQuizIdx];
  const now = new Date();
  const timeStr = now.toLocaleDateString('ko-KR') + ' ' + now.toLocaleTimeString('ko-KR', {hour:'2-digit', minute:'2-digit'});

  completions[course.id] = { time: timeStr };
  saveLocal();

  // DB 저장
  await dbInsert('completions', {
    name: userName,
    course_name: course.name,
  });

  closeQuiz();
  renderCourses();
  updateProgress();

  // 완료 모달
  document.getElementById('doneTitle').textContent = '수료 완료! 🎉';
  document.getElementById('doneMsg').textContent = `${course.name} 교육을 성공적으로 이수했습니다!\n수고하셨어요, ${userName}님 :)`;
  document.getElementById('doneModal').style.display = 'flex';
}

function closeDone() {
  document.getElementById('doneModal').style.display = 'none';
}

// ── 최종 탭 전환 ──
function switchFinalTab(tab, el) {
  document.querySelectorAll('.final-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('finalTest').style.display = tab === 'test' ? 'block' : 'none';
  document.getElementById('finalSurvey').style.display = tab === 'survey' ? 'block' : 'none';
}

// ── 필기 TEST 제출 ──
async function submitFinalTest() {
  if (!userName) { alert('먼저 이름을 입력해주세요.'); return; }

  // 답변 수집
  const answers = {};
  document.querySelectorAll('#testForm .ans-input, #testForm .ans-textarea').forEach(el => {
    const q = el.dataset.q;
    const a = el.dataset.a;
    if (!answers[q]) answers[q] = {};
    answers[q][a] = el.value.trim();
  });
  ['q9','q10'].forEach(name => {
    const sel = document.querySelector(`input[name="${name}"]:checked`);
    answers[name] = sel ? sel.value : '';
  });

  const msg = document.getElementById('testSubmitMsg');
  msg.style.display = 'block';
  msg.className = 'submit-msg';
  msg.textContent = '제출 중...';

  const ok = await dbInsert('test_submissions', {
    name: userName,
    answers: answers
  });

  if (ok) {
    msg.className = 'submit-msg success';
    msg.textContent = '✓ 필기 TEST가 성공적으로 제출되었습니다. 수고하셨습니다!';
    document.querySelector('#finalTest .btn-primary').disabled = true;
    document.querySelector('#finalTest .btn-primary').textContent = '제출 완료';
  } else {
    msg.className = 'submit-msg error';
    msg.textContent = '제출에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해주세요.';
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

  const msg = document.getElementById('surveySubmitMsg');
  msg.style.display = 'block';
  msg.className = 'submit-msg';
  msg.textContent = '제출 중...';

  const ok = await dbInsert('survey_submissions', {
    name: userName,
    answers: answers
  });

  if (ok) {
    msg.className = 'submit-msg success';
    msg.textContent = '✓ 만족도 조사가 제출되었습니다. 소중한 의견 감사합니다!';
    document.querySelector('#finalSurvey .btn-primary').disabled = true;
    document.querySelector('#finalSurvey .btn-primary').textContent = '제출 완료';
  } else {
    msg.className = 'submit-msg error';
    msg.textContent = '제출에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해주세요.';
  }
}
