const COLS = 15;
const ROWS = 10;
let TILE_SIZE = 35;

// Audio
const bgm = document.getElementById('bgm');
const sfxCorrect = document.getElementById('sfx-correct');
const sfxWrong = document.getElementById('sfx-wrong');
const sfxWin = document.getElementById('sfx-win');
const sfxBuy = document.getElementById('sfx-buy');
let isMuted = false;

// Game Data
// 0:Floor, 1:Wall, 2:Door, 3:Start, 4:End
const mapLayoutFinal = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 2, 0, 1, 0, 2, 0, 0, 1, 0, 2, 4, 1], 
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 1], 
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 1], 
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 2, 1], 
    [1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 1], 
    [1, 0, 1, 0, 2, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], 
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// --- 30 QUESTIONS POOL ---
const questions = [
    { q: "Which of the following is a general safety rule before patient transfer?", options: ["Lean over the patient to gain balance", "Use only arm strength to lift the patient", "Place feet shoulder-width apart to form a wide base"], a: 2 },
    { q: "Why should body weight and momentum be used during patient transfer", options: ["To reduce strain and risk of injury", "To reduce patient discomfort", "To avoid using mechanical aids"], a: 0 },
    { q: "During a one-person wheelchair transfer, the bed should be:", options: ["Higher than the wheelchair", "At the same level as the wheelchair seat", "lower than the wheelchair"], a: 1 },
    { q: "The recommended angle for positioning the wheelchair relative to the exam table is:", options: ["45°", "60°", "90°"], a: 0 },
    { q: "Before transferring a patient from a wheelchair, which action is MOST important?", options: ["Remove the wheelchair cushion", "Unlock the wheelchair wheels", "Lock the wheelchair wheels"], a: 2 },
    { q: "Which posture is CORRECT for the healthcare worker during transfer?", options: ["Bent back and straight knees", "Straight back and bent knees", "Straight back and straight knees"], a: 1 },
    { q: "In a standby assist transfer, the patient:", options: ["Is fully dependent on the healthcare worker", "Must be lifted by two people", "Transfer independantly with supervision"], a: 2 },
    { q: "What is the best definition of body mechanics?", options: ["The ability to move patients quickly", "The use of muscles only to lift heavy objects", "The use of one's body to produce motion that is safe, energy-conserving, and efficient"], a: 2 },
    { q: "Which of the following is NOT a purpose of good body mechanics?", options: ["Increase speed of movement", "Avoid muscles strain or tears", "Promote safety of patient and healthcare worker"], a: 0 },
    { q: "Body mechanics involves the coordination of which system?", options: ["Muscles, bones, and nervous system", "Bones, joints, and respiratory system", "Muscles,bones and circulatory system"], a: 0 },
    { q: "The base of support (BOS) is defined as", options: ["The body's center of weight", "The portion of the body in contact with the floor or surface", "The vertical line through the body"], a: 1 },
    { q: "Where is the centre of gravity (COG) usually located in the human body?", options: ["Chest", "Knees", "Mid pelvis or lower abdomen"], a: 2 },
    { q: "What happens when the line of gravity falls outside the base of support?", options: ["The person becomes more stable", "The center of gravity lowers","The person is unstable"], a: 2 },
    { q: "Before transfer, the FIRST action should be to:", options: ["Plan activity", "Lift the patient", "Adjust bed"], a: 0 },
    { q: "Which action reduces back strain before transfer", options: ["Leaning forward","Straight Knees", "Neutral spine"], a: 2 },
    { q: "Which should be checked BEFORE transfer?", options: ["Room temperature", "Equipment safety", "Imaging results"], a: 1 },
    { q: "Which change increases stability when lifting?", options: ["Raising heels", "Widening stance", "straight knees"], a: 1 },
    { q: "Why should be patient be informed before transfer?", options: ["Gain cooperation", "Maintain posture", "Straight knees"], a: 0 },
    { q: "A stretcher should be used to transport patient who:", options: ["Prefer to lie down", "Are unable to stand safely", "Can walk independently"], a: 1 },
    { q: "What should be checked before transferring a patient to avoid pulling?", options: ["Oxygen lines and IV tubing", "Bed sheets", "pillow"], a: 0 },
    { q: "What is the purpose of a draw sheet during transfer?:", options: ["To keep the patient warm", "To create a handfold for lifting", "To support the head"], a: 1 },
    { q: "Which wheelchair transfer is used when the patient can transfer independently?", options: ["Full assist", "Standby assist", "Mechanical lift"], a: 1 },
    { q: "Log rolling is used for patients with:", options: ["Leg fractures", "Spinal injuries", "Arm injuries"], a: 1 },
    { q: "Which transfer method is used for patients who are to heavy to lift manually?", options: ["Slide board", "Draw sheet", "Hydraulic lift"], a: 2 },
    { q: "A two-person wheelchair transfer is MOST appropriate when:", options: ["Minimal assistance is required", "Maximum assistance of two people is needed", "The patient is transferring to a chair of equal height"], a: 1 },
    { q: "What is recommended before lifting before lifting a patient?", options: ["Hold breath", "Brace abdominals", "Lock knees"], a: 1 },
    { q: "A sliding board is used to bridge:", options: ["Bed to Floor", "Bed to stretcher", "Stretcher to Floor"], a: 1 },
    { q: "Friction-reducing sheets help to:", options: ["Stop patient sliding", "Reduce shearing forces", "Keep patient warm"], a: 1 },
    { q: "Checking patient identification is part of transfer preparation", options: ["False", "True", "I don't know"], a: 1 },
    { q: "When using a mechanical lift, always:", options: ["Widen the base legs", "Lift as high as possible", "Move very fast"], a: 0 }
];

// --- SHOP & THEME DATA ---
let wallet = 100; 
let ownedThemes = ['default'];
let currentTheme = 'default';
let upgradeShards = 0; 
let upgradeStreak = false; 

const themes = {
    'default': {
        name: "Lofi Night",
        price: 0,
        desc: "The classic vibe.",
        css: {
            '--bg-deep': '#0f0c29', '--bg-mid': '#302b63', '--bg-light': '#24243e',
            '--wall-color': '#6c5ce7', '--door-color': '#00cec9', '--player-color': '#fd79a8', '--text-color': '#dfe6e9'
        }
    },
    'pink': {
        name: "Pastel Fantasy",
        price: 500,
        desc: "Soft and dreamy.",
        css: {
            '--bg-deep': '#f8c291', '--bg-mid': '#fad390', '--bg-light': '#ffeaa7',
            '--wall-color': '#ff7675', '--door-color': '#55efc4', '--player-color': '#a29bfe', '--text-color': '#636e72'
        }
    },
    'spooky': {
        name: "Dark Spooky",
        price: 1500,
        desc: "Trick or treat?",
        css: {
            '--bg-deep': '#000000', '--bg-mid': '#2d3436', '--bg-light': '#636e72',
            '--wall-color': '#e17055', '--door-color': '#d63031', '--player-color': '#ffeaa7', '--text-color': '#fab1a0'
        }
    },
    'green': {
        name: "Greeny World",
        price: 1000,
        desc: "Nature's maze.",
        css: {
            '--bg-deep': '#1e3799', '--bg-mid': '#0c2461', '--bg-light': '#38ada9',
            '--wall-color': '#b8e994', '--door-color': '#f6b93b', '--player-color': '#fff200', '--text-color': '#f8f8f8'
        }
    },
    'rain': {
        name: "Raining Gloom",
        price: 2500,
        desc: "A sad stormy day.",
        class: "theme-raining", 
        css: {
            '--bg-deep': '#2c3e50', '--bg-mid': '#34495e', '--bg-light': '#7f8c8d',
            '--wall-color': '#bdc3c7', '--door-color': '#3498db', '--player-color': '#ecf0f1', '--text-color': '#ecf0f1'
        }
    },
    'zootopia': {
        name: "Metropolis",
        price: 5000,
        desc: "Neon wild city.",
        css: {
            '--bg-deep': '#2d00f7', '--bg-mid': '#8900f2', '--bg-light': '#bc00dd',
            '--wall-color': '#ff006e', '--door-color': '#ffbe0b', '--player-color': '#00f5d4', '--text-color': '#fff'
        }
    }
};

// Game State
let playerPos = { x: 1, y: 1 };
let isGameActive = false;
let currentDoor = null;
let lives = 5;
let score = 0;
let doorQueue = [];
let streakCount = 0; 
let gameQuestionPool = []; 

function init() {
    checkScreenSize();
    loadGameData(); // LOAD SAVE
    drawMap();
    resetPlayer();
    updateWalletUI();
}

function checkScreenSize() {
    const computedStyle = getComputedStyle(document.documentElement);
    TILE_SIZE = parseInt(computedStyle.getPropertyValue('--cell-size'));
}

function updateWalletUI() {
    document.getElementById('menu-wallet').textContent = wallet;
    document.getElementById('shop-wallet').textContent = wallet;
}

// --- LOCAL STORAGE FUNCTIONS ---
function saveGameData() {
    const data = {
        wallet: wallet,
        ownedThemes: ownedThemes,
        currentTheme: currentTheme,
        upgradeShards: upgradeShards,
        upgradeStreak: upgradeStreak
    };
    localStorage.setItem('ergoMazeSave', JSON.stringify(data));
}

function loadGameData() {
    const saved = localStorage.getItem('ergoMazeSave');
    if (saved) {
        const data = JSON.parse(saved);
        wallet = data.wallet !== undefined ? data.wallet : 100;
        ownedThemes = data.ownedThemes || ['default'];
        currentTheme = data.currentTheme || 'default';
        upgradeShards = data.upgradeShards || 0;
        upgradeStreak = data.upgradeStreak || false;
        
        // Apply saved theme immediately
        equipTheme(currentTheme, false); // false = don't save again recursively
    }
}

function resetGameData() {
    if(confirm("Are you sure you want to reset all progress? You will lose wallet balance and items.")) {
        localStorage.removeItem('ergoMazeSave');
        location.reload();
    }
}

// --- SHOP FUNCTIONS ---
function openShop() {
    document.getElementById('message-box').classList.add('hidden');
    document.getElementById('shop-modal').classList.remove('hidden');
    renderShop();
}

function closeShop() {
    document.getElementById('shop-modal').classList.add('hidden');
    document.getElementById('message-box').classList.remove('hidden');
}

function renderShop() {
    const themeGrid = document.getElementById('theme-grid');
    const upgradeGrid = document.getElementById('upgrade-grid');
    themeGrid.innerHTML = '';
    upgradeGrid.innerHTML = '';

    // Render Themes
    for (let key in themes) {
        const t = themes[key];
        const isOwned = ownedThemes.includes(key);
        const isEquipped = currentTheme === key;

        let btnHtml = '';
        if (isEquipped) {
            btnHtml = `<button class="buy-btn equipped" disabled>EQUIPPED</button>`;
        } else if (isOwned) {
            btnHtml = `<button class="buy-btn" style="background:#0984e3" onclick="equipTheme('${key}')">EQUIP</button>`;
        } else {
            const canAfford = wallet >= t.price;
            btnHtml = `<button class="buy-btn ${canAfford ? '' : 'disabled'}" onclick="buyTheme('${key}')" ${canAfford ? '' : 'disabled'}>BUY $${t.price}</button>`;
        }

        const item = document.createElement('div');
        item.className = 'shop-item';
        item.innerHTML = `<div><h4>${t.name}</h4><p>${t.desc}</p></div>${btnHtml}`;
        themeGrid.appendChild(item);
    }

    // Render Shards
    const shardCost = 500 + (upgradeShards * 250);
    const shardAfford = wallet >= shardCost;
    const shardDiv = document.createElement('div');
    shardDiv.className = 'shop-item';
    shardDiv.innerHTML = `
        <div><h4>Power Shard</h4><p>+10 Score per correct answer.<br>Lvl: ${upgradeShards}</p></div>
        <button class="buy-btn ${shardAfford ? '' : 'disabled'}" onclick="buyShard(${shardCost})" ${shardAfford?'':'disabled'}>UPGRADE $${shardCost}</button>
    `;
    upgradeGrid.appendChild(shardDiv);

    // Render Streak
    const streakCost = 3000;
    const streakAfford = wallet >= streakCost;
    const streakDiv = document.createElement('div');
    streakDiv.className = 'shop-item';
    streakDiv.innerHTML = `
        <div><h4>Streak Master</h4><p>Double points every 3 correct answers in a row.</p></div>
        ${upgradeStreak 
            ? `<button class="buy-btn equipped" disabled>OWNED</button>` 
            : `<button class="buy-btn ${streakAfford ? '' : 'disabled'}" onclick="buyStreak(${streakCost})" ${streakAfford?'':'disabled'}>BUY $${streakCost}</button>`
        }
    `;
    upgradeGrid.appendChild(streakDiv);
}

function buyTheme(key) {
    const t = themes[key];
    if (wallet >= t.price) {
        wallet -= t.price;
        ownedThemes.push(key);
        sfxBuy.play();
        updateWalletUI();
        saveGameData();
        renderShop();
    }
}

function equipTheme(key, doSave = true) {
    currentTheme = key;
    const t = themes[key];
    const root = document.documentElement;
    
    // Apply CSS Vars
    for (let varName in t.css) {
        root.style.setProperty(varName, t.css[varName]);
    }

    // Apply Special Classes (for Rain)
    document.body.className = t.class || '';

    if(doSave) {
        saveGameData();
        renderShop();
    }
}

function buyShard(cost) {
    if (wallet >= cost) {
        wallet -= cost;
        upgradeShards++;
        sfxBuy.play();
        updateWalletUI();
        saveGameData();
        renderShop();
    }
}

function buyStreak(cost) {
    if (wallet >= cost && !upgradeStreak) {
        wallet -= cost;
        upgradeStreak = true;
        sfxBuy.play();
        updateWalletUI();
        saveGameData();
        renderShop();
    }
}

// --- GAME LOGIC ---

// Helper to shuffle questions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startGame() {
    lives = 5;
    score = 0;
    streakCount = 0;
    
    // Shuffle and clone questions for this run
    gameQuestionPool = shuffleArray(questions.slice(0)); 
    
    renderHearts();
    document.getElementById('score-count').textContent = score;
    isGameActive = true;
    document.getElementById('message-box').classList.add('hidden');
    
    resetMapLogic(); 
    resetPlayer();
    bgm.play();
}

function renderHearts() {
    const row = document.getElementById('hearts-row');
    row.innerHTML = '';
    for(let i=0; i<lives; i++) {
        const heart = document.createElement('span');
        heart.classList.add('heart');
        heart.textContent = '❤';
        row.appendChild(heart);
    }
}

function resetPlayer() {
    for(let y=0; y<ROWS; y++) {
        for(let x=0; x<COLS; x++) {
            if(mapLayoutFinal[y][x] === 3) {
                playerPos = {x, y};
                updatePlayerPosition();
                return;
            }
        }
    }
}

function drawMap() {
    const board = document.getElementById('maze-board');
    const playerEl = document.getElementById('player');
    board.innerHTML = '';
    board.appendChild(playerEl);
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x = x; cell.dataset.y = y;
            const type = mapLayoutFinal[y][x];
            if (type === 1) cell.classList.add('wall');
            if (type === 2) cell.classList.add('door');
            if (type === 4) cell.classList.add('end');
            board.appendChild(cell);
        }
    }
}

function updatePlayerPosition() {
    const playerEl = document.getElementById('player');
    const offset = (TILE_SIZE - (TILE_SIZE - 10)) / 2;
    playerEl.style.left = (playerPos.x * TILE_SIZE + offset) + 'px';
    playerEl.style.top = (playerPos.y * TILE_SIZE + offset) + 'px';
}

function move(dx, dy) {
    if (!isGameActive) return;
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;
    if (newX < 0 || newX >= COLS || newY < 0 || newY >= ROWS) return;
    const type = mapLayoutFinal[newY][newX];
    if (type === 1) return;
    if (type === 2) { triggerDoorSequence(newX, newY); return; }
    if (type === 4) { gameWin(); return; }
    playerPos.x = newX; playerPos.y = newY;
    updatePlayerPosition();
}

function triggerDoorSequence(x, y) {
    if (gameQuestionPool.length === 0) {
        currentDoor = { x, y };
        unlockDoor();
        return;
    }

    isGameActive = false;
    currentDoor = { x, y };

    let numQ = Math.floor(Math.random() * 3) + 1; 
    
    if (numQ > gameQuestionPool.length) {
        numQ = gameQuestionPool.length;
    }

    // Cut questions from pool (No Repeats)
    doorQueue = gameQuestionPool.splice(0, numQ); 
    
    showNextQuestion();
    document.getElementById('question-modal').classList.remove('hidden');
}

function showNextQuestion() {
    if (doorQueue.length === 0) { unlockDoor(); return; }
    const q = doorQueue[0];
    const dots = document.getElementById('progress-dots');
    dots.innerHTML = '';
    doorQueue.forEach((_, i) => {
        const d = document.createElement('div');
        d.classList.add('dot');
        if(i===0) d.classList.add('active');
        dots.appendChild(d);
    });
    document.getElementById('question-text').textContent = q.q;
    document.getElementById('streak-msg').textContent = "";
    
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.textContent = opt;
        btn.onclick = () => handleAnswer(idx, q.a);
        container.appendChild(btn);
    });
}

function handleAnswer(selectedIndex, correctIndex) {
    if (selectedIndex === correctIndex) {
        sfxCorrect.play();
        
        let points = 50; 
        points += (upgradeShards * 10); 

        streakCount++;
        let streakText = "";
        
        if (upgradeStreak && streakCount >= 3) {
            points *= 2;
            streakCount = 0; 
            streakText = "STREAK BONUS! x2 PTS";
            document.getElementById('streak-msg').textContent = streakText;
        }

        score += points;
        document.getElementById('score-count').textContent = score;
        doorQueue.shift();
        setTimeout(showNextQuestion, 800);
    } else {
        sfxWrong.play();
        lives--;
        streakCount = 0; 
        renderHearts();
        if(lives <= 0) gameOver();
    }
}

function unlockDoor() {
    document.querySelector(`.cell[data-x='${currentDoor.x}'][data-y='${currentDoor.y}']`).classList.remove('door');
    mapLayoutFinal[currentDoor.y][currentDoor.x] = 0; 
    
    document.getElementById('question-modal').classList.add('hidden');
    isGameActive = true;
    playerPos = { x: currentDoor.x, y: currentDoor.y };
    updatePlayerPosition();
}

function gameWin() {
    endGame("YOU ESCAPED!");
}

function gameOver() {
    endGame("GAME OVER");
}

function endGame(title) {
    isGameActive = false; 
    if(title.includes("ESCAPED")) sfxWin.play();
    bgm.pause();
    
    // Update Wallet and SAVE
    wallet += score;
    updateWalletUI();
    saveGameData();

    document.getElementById('question-modal').classList.add('hidden');
    const box = document.getElementById('message-box');
    box.classList.remove('hidden');
    document.getElementById('title-text').textContent = title;
    document.getElementById('message-text').innerHTML = `Final Score: ${score}<br>Added to Wallet: $${score}`;
    document.getElementById('start-btn').textContent = "PLAY AGAIN";
}

function resetMapLogic() {
    const doors = [
        {x:3,y:1}, {x:7,y:1}, {x:12,y:1}, 
        {x:2,y:3}, {x:5,y:3}, {x:8,y:3}, {x:12,y:3},
        {x:2,y:5}, {x:6,y:5}, {x:10,y:5},
        {x:13,y:6},
        {x:2,y:7}, {x:6,y:7}, {x:10,y:7},
        {x:4,y:8}
    ];
    doors.forEach(d => {
        mapLayoutFinal[d.y][d.x] = 2;
    });
    drawMap();
}

window.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowUp') move(0, -1);
    if(e.key === 'ArrowDown') move(0, 1);
    if(e.key === 'ArrowLeft') move(-1, 0);
    if(e.key === 'ArrowRight') move(1, 0);
});

document.getElementById('btn-up').onclick = () => move(0, -1);
document.getElementById('btn-down').onclick = () => move(0, 1);
document.getElementById('btn-left').onclick = () => move(-1, 0);
document.getElementById('btn-right').onclick = () => move(1, 0);

function toggleMute() {
    isMuted = !isMuted;
    [bgm, sfxCorrect, sfxWrong, sfxWin, sfxBuy].forEach(a => a.muted = isMuted);
    document.getElementById('mute-btn').textContent = isMuted ? '🔇' : '🔊';
}

init();