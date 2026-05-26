/* ==========================================
   Sklad тАФ ╨Ю╤Б╨╜╨╛╨▓╨╜╨░╤П ╨╗╨╛╨│╨╕╨║╨░
   ========================================== */

// --- ╨Ф╨░╨╜╨╜╤Л╨╡ ---
let parsedData = {};
let currentCategory = '╨б╨║╨╗╨░╨┤ ╨Т╨б╨Б';
let allItems = []; // ╨Я╨╗╨╛╤Б╨║╨╕╨╣ ╨╝╨░╤Б╤Б╨╕╨▓ ╨┤╨╗╤П ╨│╨╗╨╛╨▒╨░╨╗╤М╨╜╨╛╨│╨╛ ╨┐╨╛╨╕╤Б╨║╨░

// ╨Ш╨║╨╛╨╜╨║╨╕ ╨┤╨╗╤П ╨║╨░╤В╨╡╨│╨╛╤А╨╕╨╣
const categoryIcons = {
    '╨б╨║╨╗╨░╨┤ ╨Т╨б╨Б': 'package',
    '╨Ф╤Г╤И╨╡╨▓╤Л╨╡ ╨╕ ╨▒╨╡╨╖╤А╨░╨╝╨║╨░': 'droplets',
    '╨д╤Г╤А╨╜╨╕╤В╤Г╤А╨░ ╨Я╨Т╨е': 'wrench',
    '╨Я╨╛╨┤╨╛╨║╨╛╨╜╨╜╨╕╨║╨╕': 'panel-bottom',
    '╨Ю╤В╨╗╨╕╨▓╤Л': 'umbrella',
    '╨Ф╨╡╨║╨╛╤А ╨╢╨╡╤Б╤В╤М': 'scissors',
    '╨Ф╨╛╨▓╨╛╨┤╤З╨╕╨║╨╕': 'refresh-cw',
    '╨Ч╨╡╤А╨║╨░╨╗╨░': 'square',
    '╨Ь╨╡╨╢╨║╨╛╨╝╨╜╨░╤В╨╜╤Л╨╡': 'door-open',
    '╨Ь╨╛╨╜╤В╨░╨╢╨╜╤Л╨╡ ╨╝╨░╤В╨╡╤А╨╕╨░╨╗╤Л': 'hammer',
    '╨б╨╡╤В╨║╨╕': 'grid-3x3',
    '╨б╨╛╨╡╨┤╨╡╨╜╨╕╤В╨╡╨╗╤М ╨Я╨Т╨е': 'link-2',
    '╨д╨░╤Б╨░╨┤ ╨╜╨░╨▓╨╡╤Б╨╜╨╛╨╣': 'layout-grid',
    '╨д╨░╤Б╨░╨┤╨║╨░': 'building',
    '╨д╤Г╤А╨╜╨╕╤В╤Г╤А╨░ ╨░╨╗╤О╨╝╨╕╨╜╨╕╨╣': 'pen-tool',
    '╨Р╨╜╤В╨╕╨┐╨░╨╜╨╕╨║╨░': 'shield-alert',
    '╨Я╨╛╨╗╨╕╨║╨░╤А╨▒╨╛╨╜╨░╤В': 'layers',
    '╨а╨╛╨╗╨╗╨╡╤В╤Л': 'align-justify'
};

// --- ╨Ш╨╜╨╕╤Ж╨╕╨░╨╗╨╕╨╖╨░╤Ж╨╕╤П ---
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    updateDate();

    // ╨Я╤А╨╛╨▓╨╡╤А╨║╨░ ╨░╨▓╤В╨╛╤А╨╕╨╖╨░╤Ж╨╕╨╕
    checkAuthStatus();
});

// --- ╨Я╨░╤А╤Б╨╕╨╜╨│ ╨╗╨╛╨║╨░╨╗╤М╨╜╤Л╤Е ╨┤╨░╨╜╨╜╤Л╤Е ╨╕╨╖ data.js (CSV) ---
function parseLocalCSVData() {
    if (typeof RAW_DATA === 'undefined') {
        console.error('RAW_DATA ╨╜╨╡ ╨╜╨░╨╣╨┤╨╡╨╜. ╨г╨▒╨╡╨┤╨╕╤В╨╡╤Б╤М, ╤З╤В╨╛ data.js ╨┐╨╛╨┤╨║╨╗╤О╤З╨╡╨╜.');
        return;
    }

    parsedData = {};
    allItems = [];

    for (const categoryName in RAW_DATA) {
        const csvText = RAW_DATA[categoryName];
        const lines = csvText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

        if (lines.length < 2) continue;

        // ╨Я╨╡╤А╨▓╨░╤П ╤Б╤В╤А╨╛╨║╨░ тАФ ╨╖╨░╨│╨╛╨╗╨╛╨▓╨║╨╕
        const headers = lines[0].split(';').map(h => h.trim());

        const items = [];

        // ╨Э╨░╤Е╨╛╨┤╨╕╨╝ ╨╕╨╜╨┤╨╡╨║╤Б╤Л ╨║╨╗╤О╤З╨╡╨▓╤Л╤Е ╤Б╤В╨╛╨╗╨▒╤Ж╨╛╨▓ (╨╛╨┤╨╕╨╜ ╤А╨░╨╖ ╨╜╨░ ╨║╨░╤В╨╡╨│╨╛╤А╨╕╤О)
        const nameIdx = headers.findIndex(h => h.startsWith('╨Э╨░╨╕╨╝╨╡╨╜╨╛╨▓╨░╨╜╨╕╨╡'));
        const charsIdx = headers.findIndex(h => h.startsWith('╨е╨░╤А╨░╨║╤В╨╡╤А╨╕╤Б╤В╨╕╨║╨╕'));
        const widthIdx = headers.findIndex(h => h.startsWith('╨и╨╕╤А╨╕╨╜╨░'));
        const heightIdx = headers.findIndex(h => h.includes('╨Ф╨╗╨╕╨╜╨░') || h.includes('╨Т╤Л╤Б╨╛╤В╨░'));
        const qtyIdx = headers.findIndex(h => h.startsWith('╨Ъ╨╛╨╗-╨▓╨╛') || h === '╨Ъ╨╛╨╗-╨▓╨╛');
        const noteIdx = headers.findIndex(h => h.startsWith('╨Я╤А╨╕╨╝╨╡╤З╨░╨╜╨╕╨╡') || h.startsWith('╨Ч╨░╨╝╨╡╤В╨║╨╕'));
        const photoIdx = headers.findIndex(h => h.startsWith('╨д╨╛╤В╨╛'));
        const colorIdx = headers.findIndex(h => h.startsWith('╨ж╨▓╨╡╤В'));

        // ╨Ш╤Й╨╡╨╝ ╤Б╤В╨╛╨╗╨▒╨╡╤Ж ╨ж╨╡╨╜╨░ (╨┐╤А╨╕╨╛╤А╨╕╤В╨╡╤В: ╤В╨╛╤З╨╜╨╛╨╡ "╨ж╨╡╨╜╨░", ╨╖╨░╤В╨╡╨╝ "╨ж╨╡╨╜╨░ ╨╖╨░ ╤И╤В╤Г╨║╤Г", "╨ж╨╡╨╜╨░ ╨╕╨╖╨┤╨╡╨╗╨╕╤П", "╨ж╨╡╨╜╨░ ╨╖╨░ ╨╝╨╡╤В╤А")
        let priceIdx = headers.findIndex(h => h.match(/^╨ж╨╡╨╜╨░\s*$/));
        if (priceIdx === -1) priceIdx = headers.findIndex(h => h.startsWith('╨ж╨╡╨╜╨░ ╨╖╨░ ╤И╤В╤Г╨║╤Г'));
        if (priceIdx === -1) priceIdx = headers.findIndex(h => h.startsWith('╨ж╨╡╨╜╨░ ╨╕╨╖╨┤╨╡╨╗╨╕╤П'));
        if (priceIdx === -1) priceIdx = headers.findIndex(h => h.startsWith('╨ж╨╡╨╜╨░ ╨╖╨░ ╨╝╨╡╤В╤А'));
        if (priceIdx === -1) priceIdx = headers.findIndex(h => h.startsWith('╨ж╨╡╨╜╨░'));

        // ╨Ш╤Й╨╡╨╝ ╤Б╤В╨╛╨╗╨▒╨╡╤Ж ╨б╤В╨╛╨╕╨╝╨╛╤Б╤В╤М (╨▓╨║╨╗╤О╤З╨░╤П "╨б╤В╨╛╨╕╨╝╨╛╤Б╤В╤М ╨╛╨▒╤Й╨░╤П")
        let totalIdx = headers.findIndex(h => h.startsWith('╨б╤В╨╛╨╕╨╝╨╛╤Б╤В╤М'));

        const parseNum = (val) => {
            if (!val) return 0;
            const cleaned = String(val).replace(/[тВ╜\s]/g, '').replace(',', '.').trim();
            const num = parseFloat(cleaned);
            return isNaN(num) ? 0 : num;
        };
        const getVal = (values, idx) => (idx >= 0 && values[idx]) ? values[idx].trim().replace(/^"|"$/g, '') : '';

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (line.startsWith('╨Ш╤В╨╛╨│')) continue;

            const values = line.split(';');

            const name = (nameIdx >= 0 && values[nameIdx]) ? values[nameIdx].trim().replace(/^"|"$/g, '') : '';
            if (!name) continue;

            let chars = (charsIdx >= 0 && values[charsIdx]) ? values[charsIdx].trim().replace(/^"|"$/g, '') : '';
            if (colorIdx >= 0 && values[colorIdx]) {
                const color = values[colorIdx].trim().replace(/^"|"$/g, '');
                if (color) chars = color + (chars ? ', ' + chars : '');
            }

            const qty = parseNum(getVal(values, qtyIdx));
            const price = parseNum(getVal(values, priceIdx));
            const total = parseNum(getVal(values, totalIdx)) || (qty * price);

            const item = {
                'id': 'local_' + categoryName + '_' + i,
                '╨Э╨░╨╕╨╝╨╡╨╜╨╛╨▓╨░╨╜╨╕╨╡': name,
                '╨е╨░╤А╨░╨║╤В╨╡╤А╨╕╤Б╤В╨╕╨║╨╕': chars,
                '╨и╨╕╤А╨╕╨╜╨░': getVal(values, widthIdx),
                '╨Ф╨╗╨╕╨╜╨░/╨Т╤Л╤Б╨╛╤В╨░': getVal(values, heightIdx),
                '╨Ъ╨╛╨╗-╨▓╨╛': qty,
                '╨ж╨╡╨╜╨░': price,
                '╨б╤В╨╛╨╕╨╝╨╛╤Б╤В╤М': total,
                '╨Я╤А╨╕╨╝╨╡╤З╨░╨╜╨╕╨╡': getVal(values, noteIdx),
                '╨д╨╛╤В╨╛': getVal(values, photoIdx),
                '_qty': qty,
                '_price': price,
                '_total': total,
                '_category': categoryName
            };

            items.push(item);
            allItems.push(item);
        }

        if (items.length > 0) {
            parsedData[categoryName] = {
                headers: ['╨Э╨░╨╕╨╝╨╡╨╜╨╛╨▓╨░╨╜╨╕╨╡', '╨е╨░╤А╨░╨║╤В╨╡╤А╨╕╤Б╤В╨╕╨║╨╕', '╨и╨╕╤А╨╕╨╜╨░', '╨Ф╨╗╨╕╨╜╨░/╨Т╤Л╤Б╨╛╤В╨░', '╨Ъ╨╛╨╗-╨▓╨╛', '╨ж╨╡╨╜╨░', '╨б╤В╨╛╨╕╨╝╨╛╤Б╤В╤М', '╨Я╤А╨╕╨╝╨╡╤З╨░╨╜╨╕╨╡', '╨д╨╛╤В╨╛'],
                items: items
            };
        }
    }

    buildNavigation();
    updateDashboard();

    if (currentCategory !== '╨Ф╨░╤И╨▒╨╛╤А╨┤' && parsedData[currentCategory]) {
        tableData = [...parsedData[currentCategory].items];
        renderTable(currentCategory);
    }

    console.log('тЬЕ ╨Ф╨░╨╜╨╜╤Л╨╡ ╨╖╨░╨│╤А╤Г╨╢╨╡╨╜╤Л ╨╕╨╖ data.js. ╨Ъ╨░╤В╨╡╨│╨╛╤А╨╕╨╣: ' + Object.keys(parsedData).length + ', ╤В╨╛╨▓╨░╤А╨╛╨▓: ' + allItems.length);
}

// --- ╨Я╨░╤А╤Б╨╕╨╜╨│ ╨┤╨░╨╜╨╜╤Л╤Е ╤Б ╤Б╨╡╤А╨▓╨╡╤А╨░ (Firebase) ---
function loadServerData() {
    // ╨б╨╜╨░╤З╨░╨╗╨░ ╨╖╨░╨│╤А╤Г╨╢╨░╨╡╨╝ ╨╗╨╛╨║╨░╨╗╤М╨╜╤Л╨╡ ╨┤╨░╨╜╨╜╤Л╨╡ (╨╝╨╛╨╝╨╡╨╜╤В╨░╨╗╤М╨╜╨╛!)
    parseLocalCSVData();

    // ╨Я╨╛╤В╨╛╨╝ ╨┐╤А╨╛╨▒╤Г╨╡╨╝ ╨╖╨░╨│╤А╤Г╨╖╨╕╤В╤М ╨╕╨╖ Firebase (╨╡╤Б╨╗╨╕ ╤В╨░╨╝ ╨╡╤Б╤В╤М ╨┤╨░╨╜╨╜╤Л╨╡ тАФ ╨┐╨╡╤А╨╡╨╖╨░╨┐╨╕╤И╨╡╨╝)
    if (typeof db !== 'undefined') {
        db.collection('items').get()
            .then(snapshot => {
                const data = [];
                snapshot.forEach(doc => {
                    data.push({ id: doc.id, ...doc.data() });
                });
                if (data.length > 0) {
                    console.log('тШБя╕П Firebase: ╨╜╨░╨╣╨┤╨╡╨╜╨╛ ' + data.length + ' ╤В╨╛╨▓╨░╤А╨╛╨▓, ╨╛╨▒╨╜╨╛╨▓╨╗╤П╤О ╨┤╨░╨╜╨╜╤Л╨╡...');
                    parseServerData(data);
                } else {
                    console.log('тШБя╕П Firebase ╨┐╤Г╤Б╤В, ╨╕╤Б╨┐╨╛╨╗╤М╨╖╤Г╨╡╨╝ ╨╗╨╛╨║╨░╨╗╤М╨╜╤Л╨╡ ╨┤╨░╨╜╨╜╤Л╨╡ ╨╕╨╖ data.js');
                }
            })
            .catch(err => {
                console.warn('тЪая╕П ╨Ю╤И╨╕╨▒╨║╨░ ╨╖╨░╨│╤А╤Г╨╖╨║╨╕ ╨╕╨╖ Firebase, ╨╕╤Б╨┐╨╛╨╗╤М╨╖╤Г╨╡╨╝ ╨╗╨╛╨║╨░╨╗╤М╨╜╤Л╨╡ ╨┤╨░╨╜╨╜╤Л╨╡:', err);
            });
    }
}

function parseServerData(dataList) {
    parsedData = {};
    allItems = [];

    // ╨б╨┐╨╕╤Б╨╛╨║ ╤Б╤В╨░╨╜╨┤╨░╤А╤В╨╜╤Л╤Е ╨╖╨░╨│╨╛╨╗╨╛╨▓╨║╨╛╨▓ ╨┤╨╗╤П ╤В╨░╨▒╨╗╨╕╤Ж
    const defaultHeaders = [
        "╨Э╨░╨╕╨╝╨╡╨╜╨╛╨▓╨░╨╜╨╕╨╡", "╨е╨░╤А╨░╨║╤В╨╡╤А╨╕╤Б╤В╨╕╨║╨╕", "╨и╨╕╤А╨╕╨╜╨░", "╨Ф╨╗╨╕╨╜╨░/╨Т╤Л╤Б╨╛╤В╨░",
        "╨Ъ╨╛╨╗-╨▓╨╛", "╨ж╨╡╨╜╨░", "╨б╤В╨╛╨╕╨╝╨╛╤Б╤В╤М", "╨Я╤А╨╕╨╝╨╡╤З╨░╨╜╨╕╨╡", "╨д╨╛╤В╨╛"
    ];

    dataList.forEach(item => {
        const category = item.category;
        if (!parsedData[category]) {
            parsedData[category] = {
                headers: [...defaultHeaders],
                items: []
            };
        }

        const frontItem = {
            'id': item.id,
            '╨Э╨░╨╕╨╝╨╡╨╜╨╛╨▓╨░╨╜╨╕╨╡': item.name,
            '╨е╨░╤А╨░╨║╤В╨╡╤А╨╕╤Б╤В╨╕╨║╨╕': item.characteristics || '',
            '╨и╨╕╤А╨╕╨╜╨░': item.width || '',
            '╨Ф╨╗╨╕╨╜╨░/╨Т╤Л╤Б╨╛╤В╨░': item.height || '',
            '╨Ъ╨╛╨╗-╨▓╨╛': item.quantity || 0,
            '╨ж╨╡╨╜╨░': item.price || 0,
            '╨б╤В╨╛╨╕╨╝╨╛╤Б╤В╤М': item.total || 0,
            '╨Я╤А╨╕╨╝╨╡╤З╨░╨╜╨╕╨╡': item.note || '',
            '╨д╨╛╤В╨╛': item.image || '',
            '_qty': parseFloat(item.quantity || 0),
            '_price': parseFloat(item.price || 0),
            '_total': parseFloat(item.total || 0),
            '_category': category
        };

        parsedData[category].items.push(frontItem);
        allItems.push(frontItem);
    });

    buildNavigation();
    updateDashboard();

    // ╨Х╤Б╨╗╨╕ ╨╝╤Л ╤Г╨╢╨╡ ╨▓╤Л╨▒╤А╨░╨╗╨╕ ╨║╨░╤В╨╡╨│╨╛╤А╨╕╤О, ╤А╨╡╨╜╨┤╨╡╤А╨╕╨╝ ╤В╨░╨▒╨╗╨╕╤Ж╤Г
    if (currentCategory !== '╨Ф╨░╤И╨▒╨╛╤А╨┤') {
        tableData = [...parsedData[currentCategory].items];
        renderTable(currentCategory);
    }
}

// --- ╨Р╨▓╤В╨╛╤А╨╕╨╖╨░╤Ж╨╕╤П ---
let authMode = 'login'; // 'login' or 'register'
let currentUserRole = 'employee';

function switchAuthTab(mode) {
    authMode = mode;

    const btnLogin = document.getElementById('tab-login');
    const btnRegister = document.getElementById('tab-register');
    const subtitle = document.getElementById('auth-subtitle');
    const submitBtn = document.getElementById('auth-submit-btn');
    const errorMsg = document.getElementById('auth-error');

    errorMsg.classList.add('hidden');

    if (mode === 'login') {
        btnLogin.className = 'flex-1 py-2 text-sm font-semibold text-white bg-white/20 rounded-lg shadow-sm transition-all';
        btnRegister.className = 'flex-1 py-2 text-sm font-semibold text-white/50 hover:text-white transition-all rounded-lg';
        subtitle.textContent = '╨Т╨╛╨╣╨┤╨╕╤В╨╡ ╨▓ ╤Б╨╕╤Б╤В╨╡╨╝╤Г ╨┤╨╗╤П ╤Г╨┐╤А╨░╨▓╨╗╨╡╨╜╨╕╤П ╤Б╨║╨╗╨░╨┤╨╛╨╝';
        submitBtn.textContent = '╨Т╨╛╨╣╤В╨╕ ╨▓ ╤Б╨╕╤Б╤В╨╡╨╝╤Г';
    } else {
        btnRegister.className = 'flex-1 py-2 text-sm font-semibold text-white bg-white/20 rounded-lg shadow-sm transition-all';
        btnLogin.className = 'flex-1 py-2 text-sm font-semibold text-white/50 hover:text-white transition-all rounded-lg';
        subtitle.textContent = '╨Ю╨▒╤А╨░╤В╨╕╤В╨╡╤Б╤М ╨║ ╨Р╨┤╨╝╨╕╨╜╨╕╤Б╤В╤А╨░╤В╨╛╤А╤Г ╨┤╨╗╤П ╤А╨╡╨│╨╕╤Б╤В╤А╨░╤Ж╨╕╨╕';
        submitBtn.textContent = '╨в╨╛╨╗╤М╨║╨╛ ╨Т╤Е╨╛╨┤'; // ╨а╨╡╨│╨╕╤Б╤В╤А╨░╤Ж╨╕╤П ╤Б ╨║╨╗╨╕╨╡╨╜╤В╨░ ╨┐╨╛╨║╨░ ╨╛╤В╨║╨╗╤О╤З╨╡╨╜╨░ ╨┤╨╗╤П ╨▒╨╡╨╖╨╛╨┐╨░╤Б╨╜╨╛╤Б╤В╨╕
    }
}

function togglePasswordVisibility() {
    const pwdInput = document.getElementById('auth-password');
    const pwdIcon = document.getElementById('auth-pwd-icon');

    if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        pwdIcon.setAttribute('data-lucide', 'eye-off');
    } else {
        pwdInput.type = 'password';
        pwdIcon.setAttribute('data-lucide', 'eye');
    }
    lucide.createIcons();
}

function handleAuth(e) {
    e.preventDefault();
    const password = document.getElementById('auth-password').value;
    
    if (password === '47474') {
        localStorage.setItem('okoAuth', 'true');
        loginUser('╨Р╨┤╨╝╨╕╨╜', 'admin');
    } else {
        showAuthError('╨Э╨╡╨▓╨╡╤А╨╜╤Л╨╣ ╨┐╨░╤А╨╛╨╗╤М');
    }
}
function showAuthError(msg) {
    const errorDiv = document.getElementById('auth-error');
    const errorMsg = document.getElementById('auth-error-msg');
    errorMsg.textContent = msg;
    errorDiv.classList.remove('hidden');

    // ╨Р╨╜╨╕╨╝╨░╤Ж╨╕╤П ╤В╤А╤П╤Б╨║╨╕
    const form = document.querySelector('#auth-screen .bg-white\\/10');
    form.classList.add('animate-shake');
    setTimeout(() => {
        form.classList.remove('animate-shake');
    }, 500);
}

function loginUser(username, role) {
    currentUserRole = role;

    // ╨Ю╨▒╨╜╨╛╨▓╨╗╤П╨╡╨╝ UI
    document.getElementById('current-username').textContent = username + (role === 'admin' ? ' (╨Р╨┤╨╝╨╕╨╜)' : '');
    document.getElementById('user-initial').textContent = username.charAt(0).toUpperCase();

    // ╨Я╤А╤П╤З╨╡╨╝ ╤Н╨║╤А╨░╨╜ ╨░╨▓╤В╨╛╤А╨╕╨╖╨░╤Ж╨╕╨╕, ╨┐╨╛╨║╨░╨╖╤Л╨▓╨░╨╡╨╝ ╨┐╤А╨╕╨╗╨╛╨╢╨╡╨╜╨╕╨╡
    const authScreen = document.getElementById('auth-screen');
    authScreen.style.opacity = '0';
    setTimeout(() => {
        authScreen.classList.add('hidden');
        document.getElementById('app-screen').classList.remove('hidden');

        loadServerData();
    }, 300);
}

function checkAuthStatus() {
    const isAuth = localStorage.getItem('okoAuth');
    if (isAuth === 'true') {
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('app-screen').classList.remove('hidden');
        currentUserRole = 'admin';
        document.getElementById('current-username').textContent = '╨Р╨┤╨╝╨╕╨╜';
        document.getElementById('user-initial').textContent = '╨Р';
        loadServerData();
    } else {
        document.getElementById('auth-screen').style.opacity = '1';
        document.getElementById('auth-screen').classList.remove('hidden');
    }
}

function logout() {
    localStorage.removeItem('okoAuth');
    currentUserRole = 'employee';
    document.getElementById('auth-password').value = '';
    document.getElementById('auth-error').classList.add('hidden');
    document.getElementById('app-screen').classList.add('hidden');
    
    const authScreen = document.getElementById('auth-screen');
    authScreen.classList.remove('hidden');
    setTimeout(() => { authScreen.style.opacity = '1'; }, 10);
    switchAuthTab('login');
}

// --- UI ╨Ы╨╛╨│╨╕╨║╨░: ╨Э╨░╨▓╨╕╨│╨░╤Ж╨╕╤П ╨╕ ╨Ф╨░╤И╨▒╨╛╤А╨┤ ---

function buildNavigation() {
    const navContainer = document.getElementById('nav-categories');
    navContainer.innerHTML = '';

    // ╨а╨░╨╖╨┤╨╡╨╗╨╕╤В╨╡╨╗╤М
    const divider = document.createElement('div');
    divider.className = 'text-xs font-bold text-slate-400 uppercase tracking-wider mt-4 mb-2 px-3 py-1';
    divider.textContent = '╨Ъ╨░╤В╨╡╨│╨╛╤А╨╕╨╕ ╤В╨╛╨▓╨░╤А╨╛╨▓';
    navContainer.appendChild(divider);

    // ╨Ъ╨░╤В╨╡╨│╨╛╤А╨╕╨╕
    for (const category in parsedData) {
        const itemsCount = parsedData[category].items.length;
        const iconName = categoryIcons[category] || 'folder';

        const btn = document.createElement('button');
        btn.className = 'w-full flex items-center justify-between px-3 py-2 rounded-xl mb-1 text-sm sidebar-item group text-left';
        btn.onclick = () => showCategory(category, btn);

        btn.innerHTML =
            '<div class="flex items-center gap-3 overflow-hidden">' +
            '<i data-lucide="' + iconName + '" class="w-4.5 h-4.5 flex-shrink-0"></i>' +
            '<span class="truncate">' + category + '</span>' +
            '</div>' +
            '<span class="text-[10px] font-bold bg-slate-100 text-slate-500 py-0.5 px-2 rounded-full group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors">' + itemsCount + '</span>';

        navContainer.appendChild(btn);
    }

    lucide.createIcons();
}

function getCategorySum(category) {
    if (!parsedData[category]) return 0;
    return parsedData[category].items.reduce((sum, item) => sum + (item._total || 0), 0);
}

function getCategoryQty(category) {
    if (!parsedData[category]) return 0;
    return parsedData[category].items.reduce((sum, item) => sum + (item._qty || 0), 0);
}

function updateDashboard() {
    let totalValue = 0;
    let totalItems = 0;
    let totalQty = 0;
    let activeCategoriesCount = 0;

    const categoriesList = [];

    for (const category in parsedData) {
        const catItems = parsedData[category].items;
        if (catItems.length === 0) continue;

        activeCategoriesCount++;
        totalItems += catItems.length;

        const catSum = getCategorySum(category);
        const catQty = getCategoryQty(category);

        totalValue += catSum;
        totalQty += catQty;

        categoriesList.push({
            name: category,
            sum: catSum,
            count: catItems.length,
            qty: catQty,
            icon: categoryIcons[category] || 'folder'
        });
    }

    // ╨Ю╨▒╨╜╨╛╨▓╨╗╤П╨╡╨╝ ╨│╨╗╨░╨▓╨╜╤Л╨╡ ╤Ж╨╕╤Д╤А╤Л
    document.getElementById('dash-total-value').textContent = formatCurrency(totalValue);
    document.getElementById('dash-total-items').textContent = totalItems.toLocaleString('ru-RU');
    document.getElementById('dash-total-qty').textContent = parseFloat(totalQty.toFixed(2)).toLocaleString('ru-RU');
    document.getElementById('dash-total-categories').textContent = activeCategoriesCount;

    // ╨б╨╛╤А╤В╨╕╤А╤Г╨╡╨╝ ╨║╨░╤В╨╡╨│╨╛╤А╨╕╨╕ ╨┐╨╛ ╤Б╤В╨╛╨╕╨╝╨╛╤Б╤В╨╕ ╨╕ ╨▓╤Л╨▓╨╛╨┤╨╕╨╝ ╨║╨░╤А╤В╨╛╤З╨║╨╕
    categoriesList.sort((a, b) => b.sum - a.sum);

    const grid = document.getElementById('dash-category-grid');
    grid.innerHTML = '';

    categoriesList.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'border border-slate-100 rounded-xl p-4 bg-white hover:border-brand-primary/30 hover:shadow-md transition-all cursor-pointer group';
        card.onclick = () => {
            // ╨Ш╤Й╨╡╨╝ ╨╜╤Г╨╢╨╜╤Г╤О ╨║╨╜╨╛╨┐╨║╤Г ╨▓ ╤Б╨░╨╣╨┤╨▒╨░╤А╨╡ ╨╕ ╨║╨╗╨╕╨║╨░╨╡╨╝
            const buttons = document.querySelectorAll('#nav-categories button');
            for (let btn of buttons) {
                if (btn.textContent.includes(cat.name)) {
                    btn.click();
                    break;
                }
            }
        };

        card.innerHTML =
            '<div class="flex items-start justify-between mb-3">' +
            '<div class="p-2 bg-slate-50 text-slate-500 rounded-lg group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors">' +
            '<i data-lucide="' + cat.icon + '" class="w-5 h-5"></i>' +
            '</div>' +
            '<div class="text-right">' +
            '<span class="text-xs text-slate-400 font-medium bg-slate-50 px-2 py-0.5 rounded-md">' + cat.count + ' ╨┐╨╛╨╖.</span>' +
            '</div>' +
            '</div>' +
            '<h4 class="font-bold text-slate-800 mb-1 truncate" title="' + cat.name + '">' + cat.name + '</h4>' +
            '<div class="flex justify-between items-end">' +
            '<p class="text-[11px] text-slate-500">╨Ю╤Б╤В╨░╤В╨╛╨║: <span class="font-bold text-slate-700">' + parseFloat(cat.qty.toFixed(2)) + '</span></p>' +
            '<p class="font-bold text-brand-primary">' + formatCurrency(cat.sum) + '</p>' +
            '</div>';
        grid.appendChild(card);
    });

    lucide.createIcons();
}

function showDashboard() {
    // ╨б╨▒╤А╨╛╤Б ╨░╨║╤В╨╕╨▓╨╜╨╛╨│╨╛ ╨║╨╗╨░╤Б╤Б╨░ ╨▓ ╨╝╨╡╨╜╤О
    document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));
    document.getElementById('nav-dash').classList.add('active');

    // ╨Я╨╡╤А╨╡╨║╨╗╤О╤З╨╡╨╜╨╕╨╡ View
    document.getElementById('view-category').classList.add('hidden');
    document.getElementById('view-history').classList.add('hidden');

    const dashView = document.getElementById('view-dashboard');
    dashView.classList.remove('hidden');
    dashView.classList.add('fade-in');

    document.getElementById('current-view-title').textContent = '╨Ф╨░╤И╨▒╨╛╤А╨┤';

    // ╨б╨▒╤А╨╛╤Б ╨┐╨╛╨╕╤Б╨║╨░
    document.getElementById('global-search').value = '';

    // ╨Ч╨░╨║╤А╤Л╨▓╨░╨╡╨╝ ╨╝╨╛╨▒╨╕╨╗╤М╨╜╨╛╨╡ ╨╝╨╡╨╜╤О ╨╡╤Б╨╗╨╕ ╨╛╤В╨║╤А╤Л╤В╨╛
    if (window.innerWidth < 768) {
        document.getElementById('sidebar').classList.add('hidden');
    }
}

function showHistory() {
    // ╨б╨▒╤А╨╛╤Б ╨░╨║╤В╨╕╨▓╨╜╨╛╨│╨╛ ╨║╨╗╨░╤Б╤Б╨░ ╨▓ ╨╝╨╡╨╜╤О
    document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));
    document.getElementById('nav-history').classList.add('active');

    // ╨Я╨╡╤А╨╡╨║╨╗╤О╤З╨╡╨╜╨╕╨╡ View
    document.getElementById('view-dashboard').classList.add('hidden');
    document.getElementById('view-category').classList.add('hidden');

    const histView = document.getElementById('view-history');
    histView.classList.remove('hidden');
    
    document.getElementById('current-view-title').textContent = '╨Ц╤Г╤А╨╜╨░╨╗ ╨╛╨┐╨╡╤А╨░╤Ж╨╕╨╣';
    
    loadHistory();

    // ╨Ч╨░╨║╤А╤Л╨▓╨░╨╡╨╝ ╨╝╨╛╨▒╨╕╨╗╤М╨╜╨╛╨╡ ╨╝╨╡╨╜╤О
    if (window.innerWidth < 768) {
        document.getElementById('sidebar').classList.add('hidden');
    }
}

function loadHistory() {
    db.collection('transactions').orderBy('created_at', 'desc').limit(100).get()
        .then(snapshot => {
            const data = [];
            snapshot.forEach(doc => {
                data.push({ id: doc.id, ...doc.data() });
            });
            renderHistory(data);
        })
        .catch(err => console.error('╨Ю╤И╨╕╨▒╨║╨░ ╨╖╨░╨│╤А╤Г╨╖╨║╨╕ ╨╕╤Б╤В╨╛╤А╨╕╨╕:', err));
}
function logTransaction(item_name, category, action, qty_change, qty_after, note) {
    db.collection('transactions').add({
        item_name: item_name || '',
        category: category || '',
        action: action,
        qty_change: qty_change,
        qty_after: qty_after,
        username: '╨Р╨┤╨╝╨╕╨╜',
        note: note || '',
        created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
}


function renderHistory(data) {
    const container = document.getElementById('history-container');
    container.innerHTML = '';
    
    if (!data.length) {
        container.innerHTML = '<div class="text-center py-20 text-slate-400">╨Ш╤Б╤В╨╛╤А╨╕╤П ╨┐╤Г╤Б╤В╨░</div>';
        return;
    }

    data.forEach(item => {
        const date = new Date(item.created_at).toLocaleString('ru-RU');
        const div = document.createElement('div');
        div.className = `history-item ${item.action}`;
        
        let actionText = '';
        let icon = 'info';
        
        switch(item.action) {
            case 'add': actionText = '╨Ф╨╛╨▒╨░╨▓╨╗╨╡╨╜ ╤В╨╛╨▓╨░╤А'; icon = 'plus-circle'; break;
            case 'income': actionText = '╨Я╤А╨╕╤Е╨╛╨┤ ╤В╨╛╨▓╨░╤А╨░'; icon = 'trending-up'; break;
            case 'outcome': actionText = '╨а╨░╤Б╤Е╨╛╨┤ ╤В╨╛╨▓╨░╤А╨░'; icon = 'trending-down'; break;
            case 'delete': actionText = '╨г╨┤╨░╨╗╨╡╨╜╨╕╨╡'; icon = 'trash-2'; break;
        }

        div.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <div class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                        <i data-lucide="${icon}" class="w-3 h-3"></i> ${actionText}
                    </div>
                    <div class="font-bold text-slate-800">${item.item_name}</div>
                    <div class="text-xs text-slate-500">${item.category}</div>
                </div>
                <div class="text-right">
                    <div class="text-[10px] text-slate-400">${date}</div>
                    <div class="font-bold ${item.qty_change > 0 ? 'text-emerald-500' : 'text-slate-700'}">
                        ${item.qty_change > 0 ? '+' : ''}${item.qty_change}
                    </div>
                </div>
            </div>
            ${item.note ? `<div class="mt-2 p-2 bg-slate-50 rounded italic text-xs text-slate-600 border-l-2 border-slate-200">${item.note}</div>` : ''}
            <div class="mt-1 text-[10px] text-slate-400 font-medium">╨Я╨╛╨╗╤М╨╖╨╛╨▓╨░╤В╨╡╨╗╤М: ${item.username}</div>
        `;
        container.appendChild(div);
    });
    lucide.createIcons();
}

// --- ╨в╨░╨▒╨╗╨╕╤Ж╨░ ╨╕ ╨б╨╛╤А╤В╨╕╤А╨╛╨▓╨║╨░ ---

let tableData = [];
let sortCol = '';
let sortAsc = true;
let photoRemoved = false; // ╨д╨╗╨░╨│ ╤Г╨┤╨░╨╗╨╡╨╜╨╕╤П ╤Д╨╛╤В╨╛

function showCategory(category, btnElement) {
    currentCategory = category;

    // ╨Р╨║╤В╨╕╨▓╨░╤Ж╨╕╤П ╨║╨╜╨╛╨┐╨║╨╕
    document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');

    // ╨Я╨╡╤А╨╡╨║╨╗╤О╤З╨╡╨╜╨╕╨╡ View
    document.getElementById('view-dashboard').classList.add('hidden');
    document.getElementById('view-history').classList.add('hidden');

    const catView = document.getElementById('view-category');
    catView.classList.remove('hidden');
    catView.classList.remove('fade-in'); // ╨б╨▒╤А╨╛╤Б ╨░╨╜╨╕╨╝╨░╤Ж╨╕╨╕
    void catView.offsetWidth; // ╨в╤А╨╕╨│╨│╨╡╤А ╤А╨╡╤Д╨╗╨╛╤Г
    catView.classList.add('fade-in');

    document.getElementById('current-view-title').textContent = category;

    // ╨Я╨╛╨┤╨│╨╛╤В╨╛╨▓╨║╨░ ╨┤╨░╨╜╨╜╤Л╤Е
    tableData = [...parsedData[category].items];
    sortCol = '';

    renderTable(category);

    // ╨б╨▒╤А╨╛╤Б ╨┐╨╛╨╕╤Б╨║╨░
    document.getElementById('global-search').value = '';

    // ╨Ч╨░╨║╤А╤Л╨▓╨░╨╡╨╝ ╨╝╨╛╨▒╨╕╨╗╤М╨╜╨╛╨╡ ╨╝╨╡╨╜╤О
    if (window.innerWidth < 768) {
        document.getElementById('sidebar').classList.add('hidden');
    }
}

function handleSort(colName) {
    if (sortCol === colName) {
        sortAsc = !sortAsc;
    } else {
        sortCol = colName;
        sortAsc = true;
    }

    tableData.sort((a, b) => {
        let valA = a[colName] || '';
        let valB = b[colName] || '';

        // ╨Я╨╛╨┐╤Л╤В╨║╨░ ╤Б╨╛╤А╤В╨╕╤А╨╛╨▓╨░╤В╤М ╨║╨░╨║ ╤З╨╕╤Б╨╗╨░ ╨╡╤Б╨╗╨╕ ╨▓╨╛╨╖╨╝╨╛╨╢╨╜╨╛
        const numA = parseFloat(String(valA).replace(/\s/g, '').replace(',', '.'));
        const numB = parseFloat(String(valB).replace(/\s/g, '').replace(',', '.'));

        if (!isNaN(numA) && !isNaN(numB) && valA !== '' && valB !== '') {
            return sortAsc ? numA - numB : numB - numA;
        }

        // ╨б╤В╤А╨╛╨║╨╛╨▓╨░╤П ╤Б╨╛╤А╤В╨╕╤А╨╛╨▓╨║╨░
        valA = String(valA).toLowerCase();
        valB = String(valB).toLowerCase();

        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
    });

    renderTable(currentCategory);
}

function renderTable(categoryName) {
    const data = parsedData[categoryName];
    if (!data) return;

    // ╨Ш╤Б╨║╨╗╤О╤З╨░╨╡╨╝ ╨▓╨╜╤Г╤В╤А╨╡╨╜╨╜╨╕╨╡ ╨┐╨╛╨╗╤П ╨╕╨╖ ╨╛╤В╨╛╨▒╤А╨░╨╢╨╡╨╜╨╕╤П ╨╖╨░╨│╨╛╨╗╨╛╨▓╨║╨╛╨▓
    const visibleHeaders = data.headers.filter(h => !h.startsWith('_'));

    const thRow = document.getElementById('table-header-row');
    thRow.innerHTML = '';

    // ╨а╨╡╨╜╨┤╨╡╤А ╨╖╨░╨│╨╛╨╗╨╛╨▓╨║╨╛╨▓
    visibleHeaders.forEach(header => {
        const th = document.createElement('th');
        // ╨Ю╨▒╤А╨░╨▒╨╛╤В╨║╨░ ╨║╨╗╨╕╨║╨░ ╨┤╨╗╤П ╤Б╨╛╤А╤В╨╕╤А╨╛╨▓╨║╨╕
        th.onclick = () => handleSort(header);

        // ╨Ш╨║╨╛╨╜╨║╨░ ╤Б╨╛╤А╤В╨╕╤А╨╛╨▓╨║╨╕
        let sortIcon = '';
        if (sortCol === header) {
            sortIcon = '<i data-lucide="arrow-' + (sortAsc ? 'up' : 'down') + '" class="w-3 h-3 inline-block ml-1 text-brand-primary"></i>';
        }

        th.innerHTML = '<div class="flex items-center gap-1">' + header + ' ' + sortIcon + '</div>';
        thRow.appendChild(th);
    });

    // ╨Ф╨╛╨▒╨░╨▓╨╗╤П╨╡╨╝ ╨╖╨░╨│╨╛╨╗╨╛╨▓╨╛╨║ ╤Б╤В╨╛╨╗╨▒╤Ж╨░ ╨┤╨╡╨╣╤Б╤В╨▓╨╕╨╣, ╨╡╤Б╨╗╨╕ ╨░╨┤╨╝╨╕╨╜
    if (currentUserRole === 'admin') {
        const actionTh = document.createElement('th');
        actionTh.className = 'w-20 px-4 text-right';
        thRow.appendChild(actionTh);
    }

    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';

    if (tableData.length === 0) {
        document.getElementById('table-empty-state').classList.remove('hidden');
    } else {
        document.getElementById('table-empty-state').classList.add('hidden');

        let displaySum = 0;

        // ╨а╨╡╨╜╨┤╨╡╤А ╤Б╤В╤А╨╛╨║
        tableData.forEach((item, index) => {
            displaySum += item._total || 0;
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-slate-50 transition-colors group';

            visibleHeaders.forEach(header => {
                const td = document.createElement('td');
                let cellValue = item[header] || '';

                // ╨д╨╛╤А╨╝╨░╤В╨╕╤А╨╛╨▓╨░╨╜╨╕╨╡ ╤Б╨┐╨╡╤Ж ╨┐╨╛╨╗╨╡╨╣
                if (header.includes('╨д╨╛╤В╨╛')) {
                    if (cellValue) {
                        cellValue = `<img src="${cellValue}" class="img-preview" alt="╤Д╨╛╤В╨╛">`;
                    } else {
                        cellValue = `<div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-300"><i data-lucide="image" class="w-5 h-5"></i></div>`;
                    }
                }
                else if (header.includes('╨ж╨╡╨╜╨░') || header.includes('╨б╤В╨╛╨╕╨╝╨╛╤Б╤В╤М')) {
                    const num = parseFloat(String(cellValue).replace(/\s/g, '').replace(',', '.'));
                    if (!isNaN(num)) cellValue = formatCurrency(num);
                }
                else if (header.includes('╨Ъ╨╛╨╗-╨▓╨╛')) {
                    const num = parseFloat(String(cellValue).replace(/\s/g, '').replace(',', '.'));
                    if (!isNaN(num)) {
                        // ╨С╤Н╨╣╨┤╨╢╨╕╨║ ╨┤╨╗╤П ╤Б╤В╨░╤В╤Г╤Б╨░
                        let badgeClass = 'badge-instock';
                        if (num <= 0) badgeClass = 'badge-outstock';
                        else if (num < 5) badgeClass = 'badge-lowstock';
                        
                        cellValue = `<span class="badge ${badgeClass}">${num} ╤И╤В</span>`;
                    }
                }

                td.innerHTML = cellValue;
                tr.appendChild(td);
            });

            // ╨Ф╨╛╨▒╨░╨▓╨╗╤П╨╡╨╝ ╨║╨╜╨╛╨┐╨║╨╕ ╨┤╨╡╨╣╤Б╤В╨▓╨╕╨╣, ╨╡╤Б╨╗╨╕ ╨░╨┤╨╝╨╕╨╜
            if (currentUserRole === 'admin') {
                const actionTd = document.createElement('td');
                actionTd.className = 'text-right px-4';
                actionTd.innerHTML = `
                    <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onclick='editItem(${JSON.stringify(item).replace(/'/g, "&#39;")})' class="p-1.5 text-slate-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded-md transition-colors" title="╨а╨╡╨┤╨░╨║╤В╨╕╤А╨╛╨▓╨░╤В╤М">
                            <i data-lucide="pencil" class="w-4 h-4"></i>
                        </button>
                        <button onclick='confirmDelete(${item.id})' class="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors" title="╨г╨┤╨░╨╗╨╕╤В╤М">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                `;
                tr.appendChild(actionTd);
            }

            tbody.appendChild(tr);
        });

        // ╨Ю╨▒╨╜╨╛╨▓╨╗╨╡╨╜╨╕╨╡ ╤Б╤В╨░╤В ╨▒╨░╤А╨╛╨▓ ╤Б╨▓╨╡╤А╤Е╤Г
        document.getElementById('table-count').textContent = tableData.length;
        document.getElementById('table-sum').textContent = formatCurrency(displaySum);
    }

    lucide.createIcons();
}

// --- ╨Я╨╛╨╕╤Б╨║ ---
document.getElementById('global-search').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    const clearBtn = document.getElementById('clear-search');

    if (q.length > 0) {
        clearBtn.classList.remove('hidden');
    } else {
        clearBtn.classList.add('hidden');
    }

    if (q === '') {
        const dashActive = document.getElementById('nav-dash').classList.contains('active');
        const histActive = document.getElementById('nav-history').classList.contains('active');
        if (dashActive) {
            showDashboard();
        } else if (histActive) {
            showHistory();
        } else {
            tableData = [...parsedData[currentCategory].items];
            renderTable(currentCategory);
        }
        return;
    }

    // ╨У╨╗╨╛╨▒╨░╨╗╤М╨╜╤Л╨╣ ╨┐╨╛╨╕╤Б╨║
    document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));
    document.getElementById('view-dashboard').classList.add('hidden');
    document.getElementById('view-history').classList.add('hidden');
    document.getElementById('view-category').classList.remove('hidden');

    document.getElementById('current-view-title').textContent = '╨Я╨╛╨╕╤Б╨║: "' + q + '"';

    // ╨Я╤А╨╛╨▓╨╡╤А╨║╨░ ╨╜╨░ ╨┤╨╕╨░╨┐╨░╨╖╨╛╨╜ (╨╜╨░╨┐╤А╨╕╨╝╨╡╤А 10-50)
    let range = null;
    const rangeMatch = q.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
        range = { min: parseFloat(rangeMatch[1]), max: parseFloat(rangeMatch[2]) };
    }

    tableData = allItems.filter(item => {
        // ╨Х╤Б╨╗╨╕ ╤Н╤В╨╛ ╨┤╨╕╨░╨┐╨░╨╖╨╛╨╜ тАФ ╨╕╤Й╨╡╨╝ ╨┐╨╛ ╤З╨╕╤Б╨╗╨░╨╝ (╨Ъ╨╛╨╗-╨▓╨╛ ╨╕╨╗╨╕ ╨б╤В╨╛╨╕╨╝╨╛╤Б╤В╤М)
        if (range) {
            const qty = parseFloat(item._qty);
            const total = parseFloat(item._total);
            const price = parseFloat(item._price);
            if (!isNaN(qty) && qty >= range.min && qty <= range.max) return true;
            if (!isNaN(total) && total >= range.min && total <= range.max) return true;
            if (!isNaN(price) && price >= range.min && price <= range.max) return true;
            return false;
        }

        // ╨Ю╨▒╤Л╤З╨╜╤Л╨╣ ╨┐╨╛╨╕╤Б╨║ ╨┐╨╛ ╨▓╤Б╨╡╨╝ ╨┐╨╛╨╗╤П╨╝
        for (const key in item) {
            if (key.startsWith('_')) continue;
            const val = String(item[key]).toLowerCase();
            if (val.includes(q)) return true;
        }
        return false;
    });

    const searchHeaders = ['╨Ъ╨░╤В╨╡╨│╨╛╤А╨╕╤П', '╨Э╨░╨╕╨╝╨╡╨╜╨╛╨▓╨░╨╜╨╕╨╡ ', '╨Ю╨┐╨╕╤Б╨░╨╜╨╕╨╡', '╨Ъ╨╛╨╗-╨▓╨╛', '╨б╤В╨╛╨╕╨╝╨╛╤Б╤В╤М '];
    parsedData['search_results'] = {
        headers: searchHeaders,
        items: tableData
    };

    tableData.forEach(item => {
        item['╨Ъ╨░╤В╨╡╨│╨╛╤А╨╕╤П'] = item._category;
    });

    renderTable('search_results');
});

document.getElementById('clear-search').addEventListener('click', () => {
    const input = document.getElementById('global-search');
    input.value = '';
    input.dispatchEvent(new Event('input')); // ╤В╤А╨╕╨│╨│╨╡╤А ╤Б╨╛╨▒╤Л╤В╨╕╤П
});

// --- ╨г╤В╨╕╨╗╨╕╤В╤Л ---
function formatCurrency(number) {
    if (isNaN(number)) return '0 тВ╜';
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(number);
}

function updateDate() {
    const dateElement = document.getElementById('current-date');
    if (!dateElement) return;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = new Date().toLocaleDateString('ru-RU', options);
    // ╨Ф╨╡╨╗╨░╨╡╨╝ ╨┐╨╡╤А╨▓╤Г╤О ╨▒╤Г╨║╨▓╤Г ╨╖╨░╨│╨╗╨░╨▓╨╜╨╛╨╣
    dateElement.textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
}

// --- CRUD ╨╛╨┐╨╡╤А╨░╤Ж╨╕╨╕ ---

// ╨Я╨╡╤А╨╡╨╝╨╡╨╜╨╜╤Л╨╡ ╨┤╨╗╤П ╤Г╨┤╨░╨╗╨╡╨╜╨╕╤П
let itemToDeleteId = null;

function addGlobalActionButtons() {
    // ╨Т╤Б╤В╨░╨▓╨╗╤П╨╡╨╝ ╨║╨╜╨╛╨┐╨║╤Г ╨┤╨╛╨▒╨░╨▓╨╗╨╡╨╜╨╕╤П ╨▓ ╨╖╨░╨│╨╛╨╗╨╛╨▓╨╛╨║ ╨║╨░╤В╨╡╨│╨╛╤А╨╕╨╕, ╨╡╤Б╨╗╨╕ ╨░╨┤╨╝╨╕╨╜
    const actionContainer = document.querySelector('#view-category > div.px-5.py-3');

    // ╨г╨┤╨░╨╗╤П╨╡╨╝ ╤Б╤В╨░╤А╤Г╤О ╨║╨╜╨╛╨┐╨║╤Г ╨╡╤Б╨╗╨╕ ╨╡╤Б╤В╤М
    const oldBtn = document.getElementById('btn-add-item');
    if (oldBtn) oldBtn.remove();

    if (currentUserRole === 'admin' && actionContainer) {
        const btnContainer = document.createElement('div');
        btnContainer.id = 'btn-add-item';
        btnContainer.innerHTML = `
            <button onclick="openAddItemModal()" class="px-3 py-1.5 bg-brand-primary text-white text-sm font-bold rounded-lg shadow-sm hover:bg-[#48b2d6] transition-colors flex items-center gap-2">
                <i data-lucide="plus" class="w-4 h-4"></i>
                ╨Ф╨╛╨▒╨░╨▓╨╕╤В╤М ╤В╨╛╨▓╨░╤А
            </button>
        `;
        actionContainer.appendChild(btnContainer);
    }
}

// ╨Т╤Л╨╖╨╛╨▓╨╡╨╝ ╤Н╤В╨╛ ╨┐╨╛╤Б╨╗╨╡ ╤А╨╡╨╜╨┤╨╡╤А╨░ ╤Б╤В╤А╨░╨╜╨╕╤Ж╤Л
const originalShowCategory = showCategory;
showCategory = function (category, btnLoc) {
    originalShowCategory(category, btnLoc);
    addGlobalActionButtons();
}

const originalLoginUser = loginUser;
loginUser = function (username, role) {
    originalLoginUser(username, role);
    addGlobalActionButtons();
}


function openAddItemModal() {
    document.getElementById('modal-title').textContent = '╨Э╨╛╨▓╤Л╨╣ ╤В╨╛╨▓╨░╤А';
    document.getElementById('item-id').value = '';
    document.getElementById('item-category').value = currentCategory || '╨Ю╨▒╤Й╨░╤П';

    document.getElementById('item-name').value = '';
    document.getElementById('item-chars').value = '';
    document.getElementById('item-width').value = '';
    document.getElementById('item-height').value = '';
    document.getElementById('item-price').value = '';
    document.getElementById('item-note').value = '';
    
    // Reset image preview
    document.getElementById('item-img-preview').innerHTML = '<i data-lucide="image" class="w-6 h-6 text-slate-300"></i>';
    document.getElementById('item-file-input').value = '';
    document.getElementById('btn-remove-photo').classList.add('hidden');
    photoRemoved = false;

    const modal = document.getElementById('item-modal');
    modal.classList.remove('hidden');
    lucide.createIcons();
    // ╨Э╨╡╨▒╨╛╨╗╤М╤И╨░╤П ╨╖╨░╨┤╨╡╤А╨╢╨║╨░ ╨┤╨╗╤П ╨░╨╜╨╕╨╝╨░╤Ж╨╕╨╕
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        document.getElementById('item-modal-content').classList.remove('scale-95');
    }, 10);
}

function editItem(item) {
    document.getElementById('modal-title').textContent = '╨а╨╡╨┤╨░╨║╤В╨╕╤А╨╛╨▓╨░╤В╤М ╤В╨╛╨▓╨░╤А';
    document.getElementById('item-id').value = item.id;
    document.getElementById('item-category').value = item._category;

    // ╨Я╨╛╨┤╤Б╤В╨░╨▓╨╗╤П╨╡╨╝ ╨╖╨╜╨░╤З╨╡╨╜╨╕╤П ╨╕╨╖ ╤В╨░╨▒╨╗╨╕╤Ж╤Л ╨┐╨╛ ╨║╨╗╤О╤З╨░╨╝
    document.getElementById('item-name').value = item['╨Э╨░╨╕╨╝╨╡╨╜╨╛╨▓╨░╨╜╨╕╨╡ '] || item['╨Э╨░╨╕╨╝╨╡╨╜╨╛╨▓╨░╨╜╨╕╨╡'] || '';
    document.getElementById('item-chars').value = item['╨е╨░╤А╨░╨║╤В╨╡╤А╨╕╤Б╤В╨╕╨║╨╕'] || '';
    document.getElementById('item-width').value = item['╨и╨╕╤А╨╕╨╜╨░'] || '';
    document.getElementById('item-height').value = item['╨Т╤Л╤Б╨╛╤В╨░'] || item['╨Ф╨╗╨╕╨╜╨░'] || '';
    document.getElementById('item-qty').value = item['_qty'] || 0;

    let basePrice = item['╨ж╨╡╨╜╨░ ╨╖╨░ ╨╝.╨║╨▓'] || item['╨ж╨╡╨╜╨░ ╨╖╨░ ╨╝.╨┐.'] || item['╨ж╨╡╨╜╨░ ╨╖╨░ ╤И╤В╤Г╨║╤Г'] || item['╨ж╨╡╨╜╨░'] || 0;
    document.getElementById('item-price').value = parseFloat(String(basePrice).replace(/\s/g, '').replace(',', '.')) || 0;

    document.getElementById('item-note').value = item['╨Я╤А╨╕╨╝╨╡╤З╨░╨╜╨╕╨╡'] || item['╨Ч╨░╨╝╨╡╤В╨║╨╕'] || '';

    // Set image preview
    const preview = document.getElementById('item-img-preview');
    const removeBtn = document.getElementById('btn-remove-photo');
    photoRemoved = false;

    if (item['╨д╨╛╤В╨╛']) {
        preview.innerHTML = `<img src="${item['╨д╨╛╤В╨╛']}" class="w-full h-full object-cover">`;
        removeBtn.classList.remove('hidden');
    } else {
        preview.innerHTML = '<i data-lucide="image" class="w-6 h-6 text-slate-300"></i>';
        removeBtn.classList.add('hidden');
    }
    document.getElementById('item-file-input').value = '';

    const modal = document.getElementById('item-modal');
    modal.classList.remove('hidden');
    lucide.createIcons();
    // ╨Э╨╡╨▒╨╛╨╗╤М╤И╨░╤П ╨╖╨░╨┤╨╡╤А╨╢╨║╨░ ╨┤╨╗╤П ╨░╨╜╨╕╨╝╨░╤Ж╨╕╨╕
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        document.getElementById('item-modal-content').classList.remove('scale-95');
    }, 10);
}

function closeItemModal() {
    const modal = document.getElementById('item-modal');
    modal.classList.add('opacity-0');
    document.getElementById('item-modal-content').classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

function confirmDelete(id) {
    itemToDeleteId = id;
    const modal = document.getElementById('delete-modal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        document.getElementById('delete-modal-content').classList.remove('scale-95');
    }, 10);
}

function closeDeleteModal() {
    itemToDeleteId = null;
    const modal = document.getElementById('delete-modal');
    modal.classList.add('opacity-0');
    document.getElementById('delete-modal-content').classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

document.getElementById('confirm-delete-btn').addEventListener('click', () => {
    if (!itemToDeleteId) return;

    const item = allItems.find(i => i.id === itemToDeleteId);
    db.collection('items').doc(String(itemToDeleteId)).delete()
        .then(() => {
            if (item) {
                logTransaction(item['╨Э╨░╨╕╨╝╨╡╨╜╨╛╨▓╨░╨╜╨╕╨╡ '] || item['╨Э╨░╨╕╨╝╨╡╨╜╨╛╨▓╨░╨╜╨╕╨╡'], item._category, 'delete', -(item._qty || 0), 0, '╨г╨┤╨░╨╗╤С╨╜ ╤Б╨╛ ╤Б╨║╨╗╨░╨┤╨░');
            }
            closeDeleteModal();
            loadServerData();
        })
        .catch(err => {
            alert('╨Ю╤И╨╕╨▒╨║╨░ ╨┐╤А╨╕ ╤Г╨┤╨░╨╗╨╡╨╜╨╕╨╕: ' + err.message);
        });
});

function saveItem() {
    const id = document.getElementById('item-id').value;
    const fileInput = document.getElementById('item-file-input');

    const itemData = {
        category: document.getElementById('item-category').value || '╨Ю╨▒╤Й╨░╤П',
        name: document.getElementById('item-name').value,
        characteristics: document.getElementById('item-chars').value,
        width: document.getElementById('item-width').value,
        length: document.getElementById('item-height').value,
        height: document.getElementById('item-height').value,
        quantity: parseFloat(document.getElementById('item-qty').value) || 0,
        price: parseFloat(document.getElementById('item-price').value) || 0,
        note: document.getElementById('item-note').value,
        total: (parseFloat(document.getElementById('item-price').value) || 0) * (parseFloat(document.getElementById('item-qty').value) || 0)
    };

    if (!itemData.name || itemData.name.trim() === '') {
        alert('╨Т╨▓╨╡╨┤╨╕╤В╨╡ ╨╜╨░╨╕╨╝╨╡╨╜╨╛╨▓╨░╨╜╨╕╨╡ ╤В╨╛╨▓╨░╤А╨░!');
        return;
    }

    const isEditing = id !== '';
    const oldQty = isEditing ? (allItems.find(i => i.id === id)?._qty || 0) : 0;
    const qtyDiff = itemData.quantity - oldQty;

    const saveToDb = (imageUrl) => {
        if (imageUrl !== undefined) {
            if (imageUrl === null) itemData.image = firebase.firestore.FieldValue.delete();
            else itemData.image = imageUrl;
        }

        if (isEditing) {
            db.collection('items').doc(String(id)).update(itemData).then(() => {
                if (qtyDiff !== 0) {
                    const action = qtyDiff > 0 ? 'income' : 'outcome';
                    logTransaction(itemData.name, itemData.category, action, qtyDiff, itemData.quantity, itemData.note);
                }
                closeItemModal();
                loadServerData();
            });
        } else {
            db.collection('items').add(itemData).then((docRef) => {
                logTransaction(itemData.name, itemData.category, 'add', itemData.quantity, itemData.quantity, '╨Э╨╛╨▓╤Л╨╣ ╤В╨╛╨▓╨░╤А');
                closeItemModal();
                loadServerData();
            });
        }
    };

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const storageRef = storage.ref('uploads/' + Date.now() + '_' + file.name);
        storageRef.put(file).then((snapshot) => {
            snapshot.ref.getDownloadURL().then((url) => {
                saveToDb(url);
            });
        });
    } else {
        saveToDb(photoRemoved ? null : undefined);
    }
}

function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('item-img-preview').innerHTML = `<img src="${e.target.result}" class="w-full h-full object-cover">`;
            document.getElementById('btn-remove-photo').classList.remove('hidden');
            photoRemoved = false;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function removePhoto() {
    document.getElementById('item-file-input').value = '';
    document.getElementById('item-img-preview').innerHTML = '<i data-lucide="image" class="w-6 h-6 text-slate-300"></i>';
    document.getElementById('btn-remove-photo').classList.add('hidden');
    photoRemoved = true;
    lucide.createIcons();
}

function quickUpdateQty(id, delta) {
    const item = allItems.find(i => i.id === id);
    if (!item) return;

    const newQty = (parseFloat(item._qty) || 0) + delta;
    if (newQty < 0) return;

    const newTotal = newQty * (parseFloat(item._price) || 0);

    db.collection('items').doc(String(id)).update({
        quantity: newQty,
        total: newTotal
    }).then(() => {
        const action = delta > 0 ? 'income' : 'outcome';
        logTransaction(item['╨Э╨░╨╕╨╝╨╡╨╜╨╛╨▓╨░╨╜╨╕╨╡ '] || item['╨Э╨░╨╕╨╝╨╡╨╜╨╛╨▓╨░╨╜╨╕╨╡'], item._category, action, delta, newQty, "╨С╤Л╤Б╤В╤А╨░╤П ╨┐╤А╨░╨▓╨║╨░");
        loadServerData();
    });
}

// ╨Ф╨╛╨▒╨░╨▓╨╕╨╝ ╤Б╤В╨╕╨╗╨╕ ╨┤╨╗╤П ╨░╨╜╨╕╨╝╨░╤Ж╨╕╨╕ ╨╛╤И╨╕╨▒╨║╨╕
const style = document.createElement('style');
style.textContent =
    "@keyframes shake {\\n" +
    "    0%, 100% { transform: translateX(0); }\\n" +
    "    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }\\n" +
    "    20%, 40%, 60%, 80% { transform: translateX(5px); }\\n" +
    "}\\n" +
    ".animate-shake {\\n" +
    "    animation: shake 0.5s;\\n" +
    "}\\n";
document.head.appendChild(style);
