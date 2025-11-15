// ====== Game Engine (modular, easy to maintain) ======
const Game = (() => {
  // State
  const state = {
    score:0, wrong:0, timeLeft:60, qnum:0, currentAnswer:null, streak:0, combo:1,
    difficulty:'easy', mode:'mixed', running:false, learningMode:false,
    highScores:{}, unlockedThemes: new Set(['space']), achievements: new Set(), audio:null,
    // Game statistics
    correctAnswers: 0, wrongAnswers: 0, totalQuestions: 0, bestStreak: 0,
    gameStartTime: null, totalAnswerTime: 0, answersGiven: 0
  };

  // DOM refs
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  const refs = {
    question: $('#question'), answers: $('#answers'), feedback: $('#feedback'),
    score: $('#score'), wrong: $('#wrong'), time: $('#time'), qnum: $('#qnum'),
    startBtn: $('#startBtn'), learningToggle: $('#learningToggle'), musicToggle: $('#musicToggle'),
    mascot: $('#mascotSvg'), rewardPopup: $('#rewardPopup'), questionCard: document.querySelector('.question-card'),
    // Score screen refs
    scoreScreen: $('#scoreScreen'), scoreEmoji: $('#scoreEmoji'), scoreTitle: $('#scoreTitle'),
    scoreSubtitle: $('#scoreSubtitle'), finalScore: $('#finalScore'), highScoreBadge: $('#highScoreBadge'),
    correctAnswersEl: $('#correctAnswers'), wrongAnswersEl: $('#wrongAnswers'),
    accuracyEl: $('#accuracy'), avgSpeedEl: $('#avgSpeed'), bestStreakEl: $('#bestStreak'),
    totalQuestionsEl: $('#totalQuestions'), playAgainBtn: $('#playAgainBtn'),
    changeSettingsBtn: $('#changeSettingsBtn')
  };

  // Utils
  const rand = (min,max) => Math.floor(Math.random()*(max-min+1))+min;
  const pick = arr => arr[Math.floor(Math.random()*arr.length)];

  // Audio system - single AudioContext reused (avoids creating many contexts)
  class AudioSystem {
    constructor(){
      this.ctx = null; 
      this.bgGain = null; 
      this.bgOscillators = []; 
      this.bgPlaying = false;
      this.musicEnabled = false;
    }
    
    init(){ 
      if(this.ctx) return; 
      this.ctx = new (window.AudioContext||window.webkitAudioContext)(); 
    }
    
    playSfx(type){
      try{
        this.init();
        const o = this.ctx.createOscillator(); 
        const g = this.ctx.createGain();
        o.type = type==='correct' ? 'triangle' : 'square';
        o.frequency.value = type==='correct' ? 880 : 220;
        g.gain.value = 0.001; 
        g.connect(this.ctx.destination);
        o.connect(g);
        const now = this.ctx.currentTime;
        g.gain.exponentialRampToValueAtTime(0.15, now+0.01);
        g.gain.exponentialRampToValueAtTime(0.001, now+0.4);
        o.start(now); 
        o.stop(now+0.45);
      }catch(e){/* audio blocked */}
    }
    
    startMusic(){
      if(this.bgPlaying || !this.musicEnabled) return;
      
      try{
        this.init();
        
        // Create gain node for background music
        this.bgGain = this.ctx.createGain();
        this.bgGain.gain.value = 0.08; // Low volume for background
        this.bgGain.connect(this.ctx.destination);
        
        // Simple pleasant chord progression: C major, G major, A minor, F major
        const progression = [
          [261.63, 329.63, 392.00], // C major (C-E-G)
          [392.00, 493.88, 587.33], // G major (G-B-D)
          [440.00, 523.25, 659.25], // A minor (A-C-E)
          [349.23, 440.00, 523.25]  // F major (F-A-C)
        ];
        
        let chordIndex = 0;
        const playChord = () => {
          if(!this.bgPlaying) return;
          
          // Stop previous oscillators
          this.bgOscillators.forEach(osc => {
            try{ osc.stop(); }catch(e){}
          });
          this.bgOscillators = [];
          
          // Play current chord
          const chord = progression[chordIndex];
          chord.forEach(freq => {
            const osc = this.ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = freq;
            osc.connect(this.bgGain);
            osc.start();
            this.bgOscillators.push(osc);
          });
          
          // Move to next chord
          chordIndex = (chordIndex + 1) % progression.length;
          
          // Schedule next chord change (every 2 seconds for slow, calming pace)
          setTimeout(playChord, 2000);
        };
        
        this.bgPlaying = true;
        playChord();
      }catch(e){
        console.log('Music not available:', e);
      }
    }
    
    stopMusic(){
      if(!this.bgPlaying) return;
      
      this.bgPlaying = false;
      this.bgOscillators.forEach(osc => {
        try{ 
          osc.stop(); 
        }catch(e){}
      });
      this.bgOscillators = [];
      
      if(this.bgGain){
        this.bgGain.disconnect();
        this.bgGain = null;
      }
    }
    
    toggleMusic(){
      this.musicEnabled = !this.musicEnabled;
      
      if(this.musicEnabled){
        this.startMusic();
      } else {
        this.stopMusic();
      }
      
      return this.musicEnabled;
    }
  }

  const audio = new AudioSystem(); state.audio = audio;

  // Persistence
  const save = ()=>{
    try{
      localStorage.setItem('mf_state', JSON.stringify({highScores:state.highScores,unlocks:[...state.unlockedThemes],ach:[...state.achievements]}));
    }catch(e){}
  }
  const load = ()=>{
    try{
      const raw = JSON.parse(localStorage.getItem('mf_state')||'{}');
      if(raw.highScores) state.highScores = raw.highScores;
      if(raw.unlocks) raw.unlocks.forEach(t=>state.unlockedThemes.add(t));
      if(raw.ach) raw.ach.forEach(a=>state.achievements.add(a));
    }catch(e){}
  }

  // UI helpers
  function updateUI(){
    refs.score.textContent = state.score;
    refs.wrong.textContent = state.wrong;
    refs.time.textContent = state.timeLeft;
    refs.qnum.textContent = state.qnum;
  }

  function capitalize(s){return s.charAt(0).toUpperCase()+s.slice(1)}
  
  // Helper to enable/disable answer buttons
  function setButtonsEnabled(enabled){
    $$('.answer').forEach(b => b.disabled = !enabled);
  }
  
  // Helper to get time settings based on difficulty
  function getTimeSettings(){
    const settings = {
      easy: { initial: 30, bonus: 5 },
      medium: { initial: 60, bonus: 10 },
      hard: { initial: 120, bonus: 30 }
    };
    return settings[state.difficulty] || settings.medium;
  }
  
  // Helper to reset mascot and enable buttons after delay
  function resetToNeutralState(delay = 600){
    setTimeout(() => {
      setMascotMood('neutral');
      setButtonsEnabled(true);
    }, delay);
  }
  
  // Helper to set active option in a group
  function setActiveOption(selector, clickedElement){
    document.querySelectorAll(selector).forEach(x => x.classList.remove('active'));
    clickedElement.classList.add('active');
  }

  // Mascot reactions (change SVG mouth/eyes)
  function setMascotMood(mood='neutral'){
    try{
      const mascot = document.querySelector('.mascot');
      const face = document.querySelector('#face');
      const eyes = document.querySelector('#eyes');
      const mouth = document.querySelector('#mouth');
      if(!face) return;
      
      // Remove all mood classes
      mascot.classList.remove('mood-happy', 'mood-sad', 'mood-excited');
      
      // clear
      eyes.innerHTML=''; mouth.innerHTML='';
      if(mood==='happy'){
        mascot.classList.add('mood-happy');
        eyes.innerHTML = '<circle cx="36" cy="28" r="5" fill="#111" /><circle cx="64" cy="28" r="5" fill="#111" />';
        mouth.innerHTML = '<path d="M36,44 Q50,60 64,44" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round" />';
      }else if(mood==='sad'){
        mascot.classList.add('mood-sad');
        eyes.innerHTML = '<path d="M33,25 q6,8 12,0" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round" /> <path d="M61,25 q6,8 12,0" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round" />';
        mouth.innerHTML = '<path d="M36,54 Q50,44 64,54" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round" />';
      }else if(mood==='surprised'){
        eyes.innerHTML = '<circle cx="36" cy="28" r="6" fill="#111" /><circle cx="64" cy="28" r="6" fill="#111" />';
        mouth.innerHTML = '<circle cx="50" cy="46" r="8" fill="#111" />';
      }else if(mood==='excited'){
        mascot.classList.add('mood-excited');
        eyes.innerHTML = '<circle cx="36" cy="28" r="5" fill="#111" /><circle cx="64" cy="28" r="5" fill="#111" /><circle cx="33" cy="26" r="2" fill="#fff" /><circle cx="61" cy="26" r="2" fill="#fff" />';
        mouth.innerHTML = '<path d="M36,42 Q50,62 64,42" stroke="#111" stroke-width="4" fill="none" stroke-linecap="round" />';
      }else if(mood==='thinking'){
        eyes.innerHTML = '<circle cx="36" cy="28" r="4" fill="#111" /><circle cx="64" cy="28" r="4" fill="#111" />';
        mouth.innerHTML = '<path d="M36,48 Q44,52 52,48" stroke="#222" stroke-width="3" fill="none" stroke-linecap="round" />';
      }else{
        // neutral
        eyes.innerHTML = '<circle cx="36" cy="28" r="4" fill="#111" /><circle cx="64" cy="28" r="4" fill="#111" />';
        mouth.innerHTML = '<path d="M36,46 Q50,52 64,46" stroke="#222" stroke-width="3" fill="none" stroke-linecap="round" />';
      }
    }catch(e){}
  }

  // Question generation
  function genNumbers(){
    const ops = {
      mixed: ['+', '-'],
      addition: ['+'],
      subtraction: ['-']
    };
    const op = pick(ops[state.mode]);
    
    let num1, num2;
    
    if(state.difficulty === 'easy'){
      num1 = rand(0, 10);
      num2 = rand(0, 10);
    } else if(state.difficulty === 'medium'){
      // Mix of 1-digit and 2-digit numbers
      if(Math.random() > 0.5){
        num1 = rand(0, 9);
        num2 = rand(10, 99);
      } else {
        num1 = rand(10, 99);
        num2 = rand(0, 9);
      }
    } else {
      // Hard: both 2-digit
      num1 = rand(10, 99);
      num2 = rand(10, 99);
    }
    
    // Ensure no negative results for subtraction
    if(op === '-' && num1 < num2){
      [num1, num2] = [num2, num1];
    }
    
    const ans = op === '+' ? num1 + num2 : num1 - num2;
    return { num1, num2, op, ans };
  }

  function shuffle(arr){return arr.sort(()=>Math.random()-0.5)}

  // Store button handlers
  const buttonHandlers = new Map();

  // Generate answer options (4 options now)
  function generateQuestion(){
    const q = genNumbers(); state.currentAnswer = q.ans; state.qnum++;
    document.getElementById('q-top').textContent = q.num1;
    document.getElementById('q-bottom-number').textContent = q.num2;
    document.getElementById('q-op').textContent = q.op;
    
    // Show thinking mood when new question appears
    if(state.qnum > 1) setMascotMood('thinking');

    // create options
    const answers = new Set([q.ans]);
    const correctLastDigit = q.ans % 10;
    
    // Helper function to get digit count
    const getDigitCount = (num) => {
      if(num === 0) return 1;
      return Math.floor(Math.log10(Math.abs(num))) + 1;
    };
    
    // Helper function to check if number has same digit count as answer
    const correctDigitCount = getDigitCount(q.ans);
    const hasSameDigitCount = (num) => getDigitCount(num) === correctDigitCount;
    
    // Generate at least 2 wrong answers with the same last digit as correct answer
    let sameDigitCount = 0;
    const maxAttempts = 50; // Prevent infinite loops
    let attempts = 0;
    
    // First, generate 2 wrong answers with matching last digit AND same digit count
    while(sameDigitCount < 2 && attempts < maxAttempts){
      attempts++;
      // Add/subtract multiples of 10 to keep same last digit
      const multiplier = rand(1, 10); // 1-10 means ±10, ±20, ... ±100
      const offset = multiplier * 10;
      const candidate = Math.random() > 0.5 ? q.ans + offset : q.ans - offset;
      
      // Make sure it's valid, different from correct answer, and has same digit count
      if(candidate >= 0 && candidate <= 200 && candidate !== q.ans && 
         !answers.has(candidate) && hasSameDigitCount(candidate)){
        answers.add(candidate);
        sameDigitCount++;
      }
    }
    
    // Generate remaining wrong answers (can have any last digit, but must have same digit count)
    attempts = 0;
    const maxOffset = state.difficulty === 'easy' ? 5 : 20;
    while(answers.size < 4 && attempts < maxAttempts){
      attempts++;
      const offset = rand(1, maxOffset);
      const candidate = Math.random() > 0.5 ? q.ans + offset : Math.max(0, q.ans - offset);
      if(candidate >= 0 && candidate <= 200 && !answers.has(candidate) && hasSameDigitCount(candidate)){
        answers.add(candidate);
      }
    }
    
    const arr = shuffle(Array.from(answers));
    
    // Reuse existing buttons - just update text and handler
    const buttons = $$('.answer');
    buttons.forEach((btn, index) => {
      const value = arr[index];
      
      // Remove old listener if exists
      if(buttonHandlers.has(btn)) {
        btn.removeEventListener('click', buttonHandlers.get(btn));
      }
      
      // Update button
      btn.textContent = value;
      btn.className = 'answer';
      btn.disabled = false;
      
      // Add new listener
      const handler = ()=> handleAnswer(value, btn);
      buttonHandlers.set(btn, handler);
      btn.addEventListener('click', handler);
    });

    updateUI();
  }

  // Handle answer
  function handleAnswer(ans, btn){
    if(!state.running && !state.learningMode) return;
    
    setButtonsEnabled(false);
    
    if(ans === state.currentAnswer){
      handleCorrectAnswer(btn);
    }else{
      handleWrongAnswer(btn);
    }
    updateUI();
  }
  
  // Handle correct answer logic
  function handleCorrectAnswer(btn){
    btn.classList.add('correct');
    showFeedback(true);
    audio.playSfx('correct');
    
    // Show excited mood on streak milestones
    const mood = (state.streak > 0 && state.streak % 3 === 2) ? 'excited' : 'happy';
    setMascotMood(mood);
    
    state.score += 1 * state.combo;
    state.streak++; 
    if(state.streak % 3 === 0) state.combo = Math.min(5, state.combo + 1);
    
    // Track statistics
    state.correctAnswers++;
    state.totalQuestions++;
    if(state.streak > state.bestStreak) state.bestStreak = state.streak;
    
    // Add bonus time for correct answer
    if(!state.learningMode){
      state.timeLeft += getTimeSettings().bonus;
    }
    
    maybeAwardStreak();
    
    // Visual effects
    spawnConfetti();
    const rect = btn.getBoundingClientRect();
    spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    
    setTimeout(() => {
      setMascotMood('neutral');
      generateQuestion();
      setButtonsEnabled(true);
    }, 600);
  }
  
  // Handle wrong answer logic
  function handleWrongAnswer(btn){
    btn.classList.add('wrong');
    setMascotMood('sad');
    audio.playSfx('wrong');
    state.wrong++; 
    state.streak = 0; 
    state.combo = 1;
    
    // Track statistics
    state.wrongAnswers++;
    state.totalQuestions++;
    
    showFeedback(false);
    
    if(state.learningMode){
      setTimeout(() => {
        btn.classList.remove('wrong');
        setMascotMood('neutral');
        setButtonsEnabled(true);
        refs.feedback.textContent = 'Try again — you got this!';
      }, 700);
    } else {
      setTimeout(() => {
        if(state.wrong >= 5){
          endGame('wrong');
        } else {
          btn.classList.remove('wrong');
          setMascotMood('neutral');
          setButtonsEnabled(true);
        }
      }, 800);
    }
  }

  function showFeedback(correct){
    refs.feedback.className = 'feedback ' + (correct ? 'good' : 'bad');
    const messages = correct 
      ? ['🎉 Correct!', '🌟 Nice!', '💡 Great!']
      : ['❌ Oops!', '🙈 Try again!', '😅 Not quite'];
    refs.feedback.textContent = pick(messages);
  }

  // End game
  function endGame(reason = 'time'){
    state.running = false;
    clearInterval(state._timer);
    
    // Hide question card
    if(refs.questionCard) refs.questionCard.classList.remove('show');
    
    // Persist high score by mode/difficulty
    const key = `${state.difficulty}_${state.mode}`;
    const prev = state.highScores[key] || 0;
    const isNewHighScore = state.score > prev;
    if(isNewHighScore){
      state.highScores[key] = state.score;
    }
    
    save();
    updateUI();
    
    // Show score screen with statistics
    showScoreScreen(reason, isNewHighScore);
  }
  
  // Show score screen with breakdown
  function showScoreScreen(reason, isNewHighScore){
    // Calculate statistics
    const accuracy = state.totalQuestions > 0 
      ? Math.round((state.correctAnswers / state.totalQuestions) * 100) 
      : 0;
    
    const gameTime = state.gameStartTime 
      ? Math.round((Date.now() - state.gameStartTime) / 1000)
      : 0;
    
    const avgSpeed = state.correctAnswers > 0
      ? (gameTime / state.correctAnswers).toFixed(1)
      : 0;
    
    // Set header based on reason and performance
    if(reason === 'time'){
      refs.scoreEmoji.textContent = state.score >= 10 ? '🎉' : '⏱️';
      refs.scoreTitle.textContent = state.score >= 10 ? 'Great Job!' : 'Time\'s Up!';
      refs.scoreSubtitle.textContent = 'You ran out of time';
    } else {
      refs.scoreEmoji.textContent = '💔';
      refs.scoreTitle.textContent = 'Keep Practicing!';
      refs.scoreSubtitle.textContent = 'Too many wrong answers';
    }
    
    // Set final score
    refs.finalScore.textContent = state.score;
    
    // Show/hide high score badge
    if(isNewHighScore && state.score > 0){
      refs.highScoreBadge.style.display = 'inline-block';
    } else {
      refs.highScoreBadge.style.display = 'none';
    }
    
    // Set breakdown values
    refs.correctAnswersEl.textContent = state.correctAnswers;
    refs.wrongAnswersEl.textContent = state.wrongAnswers;
    refs.accuracyEl.textContent = accuracy + '%';
    refs.avgSpeedEl.textContent = avgSpeed + 's';
    refs.bestStreakEl.textContent = state.bestStreak;
    refs.totalQuestionsEl.textContent = state.totalQuestions;
    
    // Show score screen
    refs.scoreScreen.classList.add('show');
    
    // Mascot mood based on performance
    if(accuracy >= 80){
      setMascotMood('excited');
    } else if(accuracy >= 50){
      setMascotMood('happy');
    } else {
      setMascotMood('thinking');
    }
  }
  
  // Hide score screen
  function hideScoreScreen(){
    refs.scoreScreen.classList.remove('show');
    // Stop music when going back to settings
    if(audio.bgPlaying){
      audio.stopMusic();
      audio.musicEnabled = false;
      refs.musicToggle.setAttribute('aria-pressed', 'false');
      refs.musicToggle.textContent = '🎵 Music';
    }
  }

  function startGame(){
    // Hide score screen if showing
    hideScoreScreen();
    
    // Pickup settings from UI
    const diff = document.querySelector('.option[data-difficulty].active');
    const modeEl = document.querySelector('.option[data-mode].active');
    state.difficulty = diff ? diff.dataset.difficulty : state.difficulty;
    state.mode = modeEl ? modeEl.dataset.mode : state.mode;
    
    // Reset game state
    const initialTime = state.learningMode ? 9999 : getTimeSettings().initial;
    Object.assign(state, {
      running: true,
      timeLeft: initialTime,
      wrong: 0,
      score: 0,
      qnum: 0,
      streak: 0,
      combo: 1,
      // Reset statistics
      correctAnswers: 0,
      wrongAnswers: 0,
      totalQuestions: 0,
      bestStreak: 0,
      gameStartTime: Date.now()
    });
    
    // Show question card
    if(refs.questionCard) refs.questionCard.classList.add('show');
    
    updateUI();
    generateQuestion();
    
    // Start timer
    startTimer();
  }
  
  function startTimer(){
    clearInterval(state._timer);
    state._timer = setInterval(() => {
      if(!state.running) return;
      if(!state.learningMode){
        state.timeLeft--;
        if(state.timeLeft <= 0){
          clearInterval(state._timer);
          endGame('time');
        }
      }
      refs.time.textContent = state.timeLeft;
    }, 1000);
  }

  function pauseGame(){ 
    state.running = !state.running; 
  }

  function resetGame(){ 
    clearInterval(state._timer);
    
    Object.assign(state, {
      running: false,
      score: 0,
      wrong: 0,
      timeLeft: 60,
      qnum: 0,
      streak: 0,
      combo: 1
    });
    
    // Hide question card
    if(refs.questionCard) refs.questionCard.classList.remove('show');
    
    updateUI();
    refs.feedback.textContent = 'Game reset. Press Start';
  }

  function showReward(text){
    refs.rewardPopup.style.display = 'block';
    refs.rewardPopup.textContent = text;
    refs.rewardPopup.classList.add('pop');
    setTimeout(() => {
      refs.rewardPopup.style.display = 'none';
      refs.rewardPopup.classList.remove('pop');
    }, 1500);
  }

  // Streak rewards
  function maybeAwardStreak(){
    if(state.streak === 3){
      showReward('🔥 Combo x3! +1 point');
      state.score += 1;
    }
    if(state.streak === 5){
      showReward('🏆 Streak 5! Bonus +2');
      state.score += 2;
    }
    updateUI();
    save();
  }

  // confetti
  function spawnConfetti(){
    const colors = ['#ffd700','#ff6b6b','#4ecdc4','#45b7d1','#f9ca24','#6c5ce7'];
    for(let i=0;i<20;i++){
      const el = document.createElement('div'); el.className='confetti-piece';
      el.style.left = (window.innerWidth* Math.random())+'px'; el.style.top = '-20px';
      el.style.background = pick(colors); el.style.transform = `rotate(${rand(0,360)}deg)`;
      document.body.appendChild(el);
      const fall = rand(1800,3200);
      el.animate([{transform:'translateY(0)'},{transform:`translateY(${window.innerHeight + 50}px)`}],{duration:fall, easing:'cubic-bezier(.2,.8,.2,1)'});
      setTimeout(()=>el.remove(),fall+50);
    }
  }

  // Particle effects (stars, sparkles)
  function spawnParticles(x, y){
    const particles = ['⭐', '✨', '💫', '🌟', '⚡'];
    // Spawn star particles
    for(let i=0;i<8;i++){
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.textContent = pick(particles);
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      const angle = (i / 8) * Math.PI * 2;
      const distance = rand(30, 80);
      const endX = x + Math.cos(angle) * distance;
      const endY = y + Math.sin(angle) * distance - 60;
      document.body.appendChild(particle);
      particle.animate([
        {transform: 'translate(0, 0) scale(0.5) rotate(0deg)', opacity: 1},
        {transform: `translate(${endX - x}px, ${endY - y}px) scale(1.2) rotate(${rand(-180, 180)}deg)`, opacity: 0}
      ], {duration: rand(800, 1200), easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'});
      setTimeout(() => particle.remove(), 1200);
    }
    
    // Spawn sparkles
    for(let i=0;i<12;i++){
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = (x + rand(-40, 40)) + 'px';
      sparkle.style.top = (y + rand(-40, 40)) + 'px';
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    }
  }

  // Event wiring for UI controls
  function setupUI(){
    // Difficulty options
    document.querySelectorAll('.option[data-difficulty]').forEach(o => {
      o.addEventListener('click', () => setActiveOption('.option[data-difficulty]', o));
    });
    
    // Mode options
    document.querySelectorAll('.option[data-mode]').forEach(o => {
      o.addEventListener('click', () => setActiveOption('.option[data-mode]', o));
    });

    // Theme picker
    document.querySelectorAll('.theme').forEach(t => {
      t.addEventListener('click', () => {
        document.body.setAttribute('data-theme', t.dataset.theme);
        setActiveOption('.theme', t);
      });
    });

    // Start button
    refs.startBtn.addEventListener('click', startGame);

    // Music toggle
    refs.musicToggle.addEventListener('click', () => {
      const isEnabled = audio.toggleMusic();
      refs.musicToggle.setAttribute('aria-pressed', isEnabled);
      refs.musicToggle.textContent = isEnabled ? '🎵 Music: On' : '🎵 Music';
    });
    
    // Learning mode toggle
    refs.learningToggle.addEventListener('click', () => {
      state.learningMode = !state.learningMode;
      refs.learningToggle.setAttribute('aria-pressed', state.learningMode);
      refs.learningToggle.textContent = state.learningMode ? '📖 Learning: On' : '📖 Learning Mode';
    });

    // Keyboard support (numbers 1-4)
    document.addEventListener('keydown', (e) => {
      if(['1', '2', '3', '4'].includes(e.key)){
        const idx = parseInt(e.key) - 1;
        const btn = document.querySelectorAll('.answer')[idx];
        if(btn) btn.click();
      }
    });
    
    // Score screen buttons
    refs.playAgainBtn.addEventListener('click', startGame);
    refs.changeSettingsBtn.addEventListener('click', hideScoreScreen);
  }

  // Initialize game
  function init(){
    load();
    setupUI();
    updateUI();
    setMascotMood('neutral');
    
    // Set active theme based on current body data-theme
    const currentTheme = document.body.getAttribute('data-theme') || 'space';
    const activeThemeBtn = document.querySelector(`.theme[data-theme="${currentTheme}"]`);
    if(activeThemeBtn) activeThemeBtn.classList.add('active');
  }

  return { init, startGame, resetGame, state };
})();

// Start
document.addEventListener('DOMContentLoaded', ()=>{ Game.init(); });
