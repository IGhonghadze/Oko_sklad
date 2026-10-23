
// ==========================================
// УМНЫЙ АВТОПОМОЩНИК И ШАБЛОНЫ ИЗДЕЛИЙ
// ==========================================
const PRODUCT_TEMPLATES = [
    // Отливы и козырьки
    { name: 'Отлив оцинкованный', category: 'Отливы', dimMode: 'sill', color: 'Оцинковка' },
    { name: 'Отлив белый полиэстер', category: 'Отливы', dimMode: 'sill', color: 'Белый' },
    { name: 'Отлив коричневый', category: 'Отливы', dimMode: 'sill', color: 'Коричневый' },
    { name: 'Отлив антрацит', category: 'Отливы', dimMode: 'sill', color: 'Антрацит' },
    { name: 'Козырек оцинкованный', category: 'Отливы', dimMode: 'sill', color: 'Оцинковка' },
    { name: 'Козырек белый', category: 'Отливы', dimMode: 'sill', color: 'Белый' },
    { name: 'Заглушка отлива белая', category: 'Отливы', dimMode: 'none', color: 'Белый' },
    { name: 'Заглушка отлива коричневая', category: 'Отливы', dimMode: 'none', color: 'Коричневый' },

    // Подоконники
    { name: 'Подоконник ПВХ обычный белый', category: 'Подоконники', dimMode: 'sill', color: 'Белый' },
    { name: 'Подоконник Кристалит антрацит', category: 'Подоконники', dimMode: 'sill', color: 'Антрацит' },
    { name: 'Подоконник Кристалит белый глянец', category: 'Подоконники', dimMode: 'sill', color: 'Белый' },
    { name: 'Подоконник Данке золотой дуб', category: 'Подоконники', dimMode: 'sill', color: 'Золотой дуб' },
    { name: 'Подоконник Меллер', category: 'Подоконники', dimMode: 'sill', color: 'Белый' },
    { name: 'Заглушка подоконника белая', category: 'Подоконники', dimMode: 'none', color: 'Белый' },
    { name: 'Соединитель подоконника', category: 'Подоконники', dimMode: 'none', color: 'Белый' },

    // Уголки и декор жесть
    { name: 'Уголок декоративный 20×40', category: 'Декор жесть', dimMode: 'angle', defaultAngleW: '20', defaultAngleH: '40', defaultAngleLen: '2000' },
    { name: 'Уголок декоративный 40×40', category: 'Декор жесть', dimMode: 'angle', defaultAngleW: '40', defaultAngleH: '40', defaultAngleLen: '2000' },
    { name: 'Уголок декоративный 50×50', category: 'Декор жесть', dimMode: 'angle', defaultAngleW: '50', defaultAngleH: '50', defaultAngleLen: '2000' },
    { name: 'Уголок декоративный 30×30', category: 'Декор жесть', dimMode: 'angle', defaultAngleW: '30', defaultAngleH: '30', defaultAngleLen: '2000' },
    { name: 'Уголок ПВХ белый', category: 'Декор жесть', dimMode: 'angle', color: 'Белый' },
    { name: 'Пластина Декор', category: 'Декор жесть', dimMode: 'sill', color: 'Белый' },
    { name: 'Нащельник самоклеящийся', category: 'Монтажные материалы', dimMode: 'sill', color: 'Белый' },

    // Окна и двери
    { name: 'Окно ПВХ 1-створчатое', category: 'Изделия ПВХ и Алюминий', dimMode: 'window', color: 'Белый' },
    { name: 'Окно ПВХ 2-створчатое', category: 'Изделия ПВХ и Алюминий', dimMode: 'window', color: 'Белый' },
    { name: 'Окно ПВХ 3-створчатое', category: 'Изделия ПВХ и Алюминий', dimMode: 'window', color: 'Белый' },
    { name: 'Окно ПВХ глухое', category: 'Изделия ПВХ и Алюминий', dimMode: 'window', color: 'Белый' },
    { name: 'Балконная дверь ПВХ', category: 'Изделия ПВХ и Алюминий', dimMode: 'window', color: 'Белый' },
    { name: 'Дверь входная ПВХ', category: 'Изделия ПВХ и Алюминий', dimMode: 'window', color: 'Белый' },
    { name: 'Дверь алюминий холодный', category: 'Изделия ПВХ и Алюминий', dimMode: 'window' },
    { name: 'Дверь алюминий теплый', category: 'Изделия ПВХ и Алюминий', dimMode: 'window' },

    // Фурнитура
    { name: 'Ручка оконная белая', category: 'Фурнитура ПВХ', dimMode: 'none', color: 'Белый' },
    { name: 'Ручка оконная антрацит', category: 'Фурнитура ПВХ', dimMode: 'none', color: 'Антрацит' },
    { name: 'Ручка оконная с ключом', category: 'Фурнитура ПВХ', dimMode: 'none', color: 'Белый' },
    { name: 'Ручка дверная нажимная', category: 'Фурнитура ПВХ', dimMode: 'none', color: 'Белый' },
    { name: 'Ручка дверная скоба', category: 'Фурнитура ПВХ', dimMode: 'none', color: 'Коричневый' },
    { name: 'Доводчик дверной', category: 'Доводчики', dimMode: 'none' },
    { name: 'Замок дверной ПВХ', category: 'Фурнитура ПВХ', dimMode: 'none' },
    { name: 'Цилиндр замка', category: 'Фурнитура ПВХ', dimMode: 'none' },
    { name: 'Петля дверная ПВХ', category: 'Фурнитура ПВХ', dimMode: 'none' },

    // Сетки и материалы
    { name: 'Сетка москитная рамочная', category: 'Сетки', dimMode: 'window', color: 'Белый' },
    { name: 'Сетка москитная вставная VSN', category: 'Сетки', dimMode: 'window', color: 'Белый' },
    { name: 'Пена монтажная всесезонная', category: 'Монтажные материалы', dimMode: 'none' },
    { name: 'Герметик силиконовый', category: 'Монтажные материалы', dimMode: 'none' },
    { name: 'Сэндвич-панель 10 мм', category: 'Монтажные материалы', dimMode: 'window', color: 'Белый' },
    { name: 'Сэндвич-панель 24 мм', category: 'Монтажные материалы', dimMode: 'window', color: 'Белый' },
    { name: 'Соединитель ПВХ', category: 'Соеденитель ПВХ', dimMode: 'none' }
];

let currentDimMode = 'window';

function setDimMode(mode) {
    currentDimMode = mode;
    const modeInput = document.getElementById('item-dim-mode');
    if (modeInput) modeInput.value = mode;

    const modes = ['window', 'sill', 'angle', 'none'];
    modes.forEach(m => {
        const btn = document.getElementById(`btn-dim-${m}`);
        const container = document.getElementById(`dim-fields-${m}`);
        if (btn) {
            if (m === mode) btn.classList.add('active');
            else btn.classList.remove('active');
        }
        if (container) {
            if (m === mode) container.classList.remove('hidden');
            else container.classList.add('hidden');
        }
    });

    syncDimensions();
}

function syncDimensions() {
    const wHidden = document.getElementById('item-width');
    const hHidden = document.getElementById('item-height');
    const lHidden = document.getElementById('item-length');
    if (!wHidden || !hHidden) return;

    if (currentDimMode === 'window') {
        const w = document.getElementById('item-width-win')?.value.trim() || '';
        const h = document.getElementById('item-height-win')?.value.trim() || '';
        wHidden.value = w;
        hHidden.value = h;
        if (lHidden) lHidden.value = '';
    } else if (currentDimMode === 'sill') {
        const depth = document.getElementById('item-depth-sill')?.value.trim() || '';
        const len = document.getElementById('item-length-sill')?.value.trim() || '';
        wHidden.value = depth;
        hHidden.value = len;
        if (lHidden) lHidden.value = len;
    } else if (currentDimMode === 'angle') {
        const w = document.getElementById('item-angle-w')?.value.trim() || '';
        const h = document.getElementById('item-angle-h')?.value.trim() || '';
        const len = document.getElementById('item-angle-len')?.value.trim() || '';
        const sec = (w && h) ? `${w}×${h}` : (w || h || '');
        wHidden.value = sec;
        hHidden.value = len;
        if (lHidden) lHidden.value = len;

        const prev = document.getElementById('angle-preview-text');
        if (prev) {
            if (sec || len) {
                prev.textContent = `сечение ${sec || '—'} мм, длина ${len || '—'}`;
            } else {
                prev.textContent = 'укажите полки (например 20 и 40) и длину (например 2 м)';
            }
        }
    } else if (currentDimMode === 'none') {
        wHidden.value = '';
        hHidden.value = '';
        if (lHidden) lHidden.value = '';
    }
}

function handleCategoryChange(catName) {
    if (!catName) return;
    if (catName === 'Отливы' || catName === 'Подоконники') {
        setDimMode('sill');
    } else if (catName === 'Декор жесть') {
        setDimMode('angle');
    } else if (catName === 'Изделия ПВХ и Алюминий' || catName === 'Душевые и безрамка' || catName === 'Зеркала' || catName === 'Сетки') {
        setDimMode('window');
    } else if (catName.includes('Фурнитура') || catName === 'Доводчики' || catName === 'Антипаника') {
        setDimMode('none');
    }
}

function applyQuickType(typeName, categoryName, dimMode) {
    const nameInput = document.getElementById('item-name');
    const catSelect = document.getElementById('item-category');
    if (nameInput) {
        nameInput.value = typeName + ' ';
        nameInput.focus();
        nameInput.setSelectionRange(nameInput.value.length, nameInput.value.length);
    }
    if (catSelect && categoryName) {
        catSelect.value = categoryName;
    }
    if (dimMode) {
        setDimMode(dimMode);
    }
    handleNameInput(typeName);
}

function handleNameFocus(query) {
    handleNameInput(query || '');
}

function handleNameInput(query) {
    const dropdown = document.getElementById('name-suggestions-dropdown');
    if (!dropdown) return;

    const q = (query || '').toLowerCase().trim();
    
    const candidates = [];
    const seenNames = new Set();

    PRODUCT_TEMPLATES.forEach(tmpl => {
        candidates.push({
            name: tmpl.name,
            category: tmpl.category,
            dimMode: tmpl.dimMode,
            color: tmpl.color || '',
            defaultAngleW: tmpl.defaultAngleW,
            defaultAngleH: tmpl.defaultAngleH,
            defaultAngleLen: tmpl.defaultAngleLen,
            isTemplate: true
        });
        seenNames.add(tmpl.name.toLowerCase());
    });

    if (Array.isArray(allItems)) {
        allItems.forEach(item => {
            const n = item['Наименование'] || '';
            const nLower = n.toLowerCase();
            if (n && !seenNames.has(nLower)) {
                seenNames.add(nLower);
                let dm = 'window';
                if ((item._category === 'Отливы' || item._category === 'Подоконники' || nLower.includes('отлив') || nLower.includes('подоконник'))) {
                    dm = 'sill';
                } else if (nLower.includes('уголок') || item._category === 'Декор жесть') {
                    dm = 'angle';
                } else if (!item['Ширина'] && !item['Высота']) {
                    dm = 'none';
                }
                candidates.push({
                    name: n,
                    category: item._category || 'Изделия ПВХ и Алюминий',
                    dimMode: dm,
                    color: item['Цвет'] || '',
                    chars: item['Характеристики'] || '',
                    width: item['Ширина'] || '',
                    height: item['Высота'] || item['Длина/Высота'] || '',
                    isWarehouse: true
                });
            }
        });
    }

    let matches = [];
    if (!q) {
        matches = candidates.slice(0, 8);
    } else {
        const startsWith = [];
        const contains = [];
        candidates.forEach(c => {
            const cLower = c.name.toLowerCase();
            if (cLower.startsWith(q)) {
                startsWith.push(c);
            } else if (cLower.includes(q)) {
                contains.push(c);
            }
        });
        matches = [...startsWith, ...contains].slice(0, 8);
    }

    if (matches.length === 0) {
        dropdown.classList.add('hidden');
        dropdown.innerHTML = '';
        return;
    }

    dropdown.innerHTML = '';
    matches.forEach(item => {
        const row = document.createElement('div');
        row.className = 'suggestion-item';

        let displayName = item.name;
        if (q) {
            const idx = item.name.toLowerCase().indexOf(q);
            if (idx >= 0) {
                displayName = item.name.substring(0, idx) + 
                    '<span class="suggestion-match">' + item.name.substring(idx, idx + q.length) + '</span>' + 
                    item.name.substring(idx + q.length);
            }
        }

        const iconMap = {
            'sill': 'ruler',
            'angle': 'corner-down-right',
            'window': 'layout-grid',
            'none': 'box'
        };
        const iconName = iconMap[item.dimMode] || 'tag';

        row.innerHTML = `
            <div class="flex items-center gap-2.5 min-w-0">
                <i data-lucide="${iconName}" class="w-4 h-4 text-slate-400 flex-shrink-0"></i>
                <span class="text-sm font-semibold text-slate-800 truncate">${displayName}</span>
            </div>
            <div class="flex items-center gap-1.5 flex-shrink-0">
                ${item.color ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">${item.color}</span>` : ''}
                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-100">${item.category}</span>
            </div>
        `;

        row.onmousedown = (e) => {
            e.preventDefault();
            selectSuggestion(item);
        };

        dropdown.appendChild(row);
    });

    dropdown.classList.remove('hidden');
    try { lucide.createIcons({ root: dropdown }); } catch(e) {}
}

function selectSuggestion(item) {
    const nameInput = document.getElementById('item-name');
    const catSelect = document.getElementById('item-category');
    const colorInput = document.getElementById('item-color');
    const charsInput = document.getElementById('item-chars');

    if (nameInput) nameInput.value = item.name;
    if (catSelect && item.category) catSelect.value = item.category;
    if (colorInput && item.color && !colorInput.value) colorInput.value = item.color;
    if (charsInput && item.chars && !charsInput.value) charsInput.value = item.chars;

    if (item.dimMode) {
        setDimMode(item.dimMode);
        if (item.dimMode === 'angle') {
            if (item.defaultAngleW) document.getElementById('item-angle-w').value = item.defaultAngleW;
            if (item.defaultAngleH) document.getElementById('item-angle-h').value = item.defaultAngleH;
            if (item.defaultAngleLen) document.getElementById('item-angle-len').value = item.defaultAngleLen;
            syncDimensions();
        } else if (item.dimMode === 'window' && item.width && item.height) {
            document.getElementById('item-width-win').value = item.width;
            document.getElementById('item-height-win').value = item.height;
            syncDimensions();
        } else if (item.dimMode === 'sill' && item.width) {
            document.getElementById('item-depth-sill').value = item.width;
            if (item.height) document.getElementById('item-length-sill').value = item.height;
            syncDimensions();
        }
    }

    const dropdown = document.getElementById('name-suggestions-dropdown');
    if (dropdown) dropdown.classList.add('hidden');
    currentDetectedDuplicate = null;
    hideDuplicateBanner();
    checkDuplicateOnInput();
}

function detectDimMode(item) {
    const cat = item._category || '';
    const nm = (item['Наименование'] || item['Наименование '] || '').toLowerCase();
    const w = String(item['Ширина'] || '');
    const h = String(item['Высота'] || item['Длина/Высота'] || item['Длина'] || '');
    const len = String(item['Длина'] || item._length || '');

    if (w.includes('×') || w.includes('*') || cat === 'Декор жесть' || nm.includes('уголок') || nm.includes('профиль')) {
        setDimMode('angle');
        let parts = w.split(/[×*xX]/);
        if (parts.length >= 2) {
            if (document.getElementById('item-angle-w')) document.getElementById('item-angle-w').value = parts[0].trim();
            if (document.getElementById('item-angle-h')) document.getElementById('item-angle-h').value = parts[1].trim();
        } else {
            if (document.getElementById('item-angle-w')) document.getElementById('item-angle-w').value = w;
            if (document.getElementById('item-angle-h')) document.getElementById('item-angle-h').value = '';
        }
        if (document.getElementById('item-angle-len')) document.getElementById('item-angle-len').value = len || h;
    } else if (cat === 'Отливы' || cat === 'Подоконники' || nm.includes('отлив') || nm.includes('подоконник') || nm.includes('козырек')) {
        setDimMode('sill');
        if (document.getElementById('item-depth-sill')) document.getElementById('item-depth-sill').value = w;
        if (document.getElementById('item-length-sill')) document.getElementById('item-length-sill').value = len || h;
    } else if (w || h) {
        setDimMode('window');
        if (document.getElementById('item-width-win')) document.getElementById('item-width-win').value = w;
        if (document.getElementById('item-height-win')) document.getElementById('item-height-win').value = h;
    } else {
        setDimMode('none');
    }

    syncDimensions();
}

// Закрытие подсказок при клике вне поля
document.addEventListener('click', (e) => {
    if (!e.target.closest('#item-name') && !e.target.closest('#name-suggestions-dropdown')) {
        const dropdown = document.getElementById('name-suggestions-dropdown');
        if (dropdown) dropdown.classList.add('hidden');
    }
});


function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function openPhotoModal(src, title = '') {
    if (!src) return;
    const modal = document.getElementById('photo-lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const titleEl = document.getElementById('lightbox-title');
    if (!modal || !img) return;
    
    img.src = src;
    if (titleEl) titleEl.textContent = title;
    
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
    }, 10);
    try { lucide.createIcons(); } catch(e) {}
}

function closePhotoModal() {
    const modal = document.getElementById('photo-lightbox-modal');
    if (!modal) return;
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
        const img = document.getElementById('lightbox-img');
        if (img) img.src = '';
    }, 200);
}


// === Умное обнаружение дубликатов и объединение позиций ===
let currentDetectedDuplicate = null;
let pendingForceSave = false;

function normalizeDim(val) {
    if (val === null || val === undefined) return '';
    let s = String(val).trim().toLowerCase();
    if (!s) return '';
    // Если длина указана в метрах (например "2 м" или "2.5 м", но не "мм")
    if (s.includes('м') && !s.includes('мм')) {
        const num = parseFloat(s.replace(',', '.').replace(/[^\d.]/g, ''));
        if (!isNaN(num)) return String(Math.round(num * 1000));
    }
    const num = parseFloat(s.replace(',', '.').replace(/[^\d.]/g, ''));
    return isNaN(num) ? s : String(num);
}

function isNameSimilar(cand, existing) {
    if (!cand || !existing) return false;
    if (cand === existing) return true;
    const keywords = ['подоконник', 'отлив', 'уголок', 'нащельник', 'доводчик', 'ручка', 'сетка'];
    for (let i = 0; i < keywords.length; i++) {
        const kw = keywords[i];
        if (cand.includes(kw) && existing.includes(kw)) {
            return true;
        }
    }
    return false;
}

function findDuplicateItem(candidate, excludeId = null) {
    if (!candidate || !candidate.name || !Array.isArray(allItems) || allItems.length === 0) return null;

    const normStr = s => (s || '').toLowerCase().trim().replace(/\s+/g, ' ');
    const candName = normStr(candidate.name);
    if (!candName || candName.length < 2) return null;

    const candColor = normStr(candidate.color);
    const candW = normalizeDim(candidate.width);
    const candH = normalizeDim(candidate.height);
    const candL = normalizeDim(candidate.length);

    return allItems.find(item => {
        if (excludeId && String(item.id) === String(excludeId)) return false;

        const iName = normStr(item['Наименование'] || item.name || '');
        if (!iName) return false;

        // Проверка совпадения названия
        if (!isNameSimilar(candName, iName)) return false;

        // Проверка цвета (если указан хотя бы у одного)
        const iColor = normStr(item['Цвет'] || item.color || '');
        if (candColor || iColor) {
            if (candColor !== iColor) return false;
        }

        // Проверка размеров
        const iW = normalizeDim(item['Ширина'] || item.width);
        const iH = normalizeDim(item['Высота'] || item['Длина/Высота'] || item.height);
        const iL = normalizeDim(item['Длина'] || item._length || item.length);

        // Если у кандидата или у позиции есть ширина/глубина, они должны совпадать
        if (candW || iW) {
            if (candW !== iW) return false;
        }

        // Сравнение длины / высоты:
        const candLengthVal = candL || candH;
        const iLengthVal = iL || iH;

        if (candLengthVal || iLengthVal) {
            if (candLengthVal !== iLengthVal) return false;
        }

        return true;
    });
}

function checkDuplicateOnInput() {
    const itemId = document.getElementById('item-id')?.value;
    if (itemId) {
        hideDuplicateBanner();
        currentDetectedDuplicate = null;
        return;
    }

    const name = document.getElementById('item-name')?.value.trim();
    if (!name || name.length < 2) {
        hideDuplicateBanner();
        currentDetectedDuplicate = null;
        return;
    }

    const category = document.getElementById('item-category')?.value;
    const color = document.getElementById('item-color')?.value.trim();
    const width = document.getElementById('item-width')?.value.trim();
    const height = document.getElementById('item-height')?.value.trim();
    const length = document.getElementById('item-length')?.value.trim();

    const candidate = {
        name,
        category,
        color,
        width,
        height,
        length
    };

    const duplicate = findDuplicateItem(candidate);
    if (duplicate) {
        currentDetectedDuplicate = duplicate;
        showDuplicateBanner(duplicate);
    } else {
        currentDetectedDuplicate = null;
        hideDuplicateBanner();
    }
}

function showDuplicateBanner(duplicate) {
    const banner = document.getElementById('item-duplicate-banner');
    if (!banner) return;

    const badgeQty = document.getElementById('duplicate-badge-qty');
    const desc = document.getElementById('duplicate-item-desc');
    const btnText = document.getElementById('duplicate-btn-text');

    const curQty = parseFloat(duplicate._qty || duplicate['Кол-во'] || 0);
    const addQty = parseFloat(document.getElementById('item-qty')?.value) || 1;
    const newQty = curQty + addQty;

    if (badgeQty) badgeQty.textContent = `На складе: ${curQty} шт`;

    const parts = [duplicate['Наименование'] || duplicate.name];
    if (duplicate['Цвет']) parts.push(duplicate['Цвет']);
    const w = duplicate['Ширина'];
    const h = duplicate['Высота'] || duplicate['Длина/Высота'];
    const l = duplicate['Длина'] || duplicate._length;
    if (w && (l || h)) {
        parts.push(`${w}×${l || h} мм`);
    } else if (w) {
        parts.push(`${w} мм`);
    }
    if (desc) desc.textContent = parts.join(' • ');

    if (btnText) {
        btnText.textContent = `Прибавить к существующему (+${addQty} шт → станет ${newQty} шт)`;
    }

    banner.classList.remove('hidden');
    try { lucide.createIcons({ root: banner }); } catch(e) {}
}

function hideDuplicateBanner() {
    const banner = document.getElementById('item-duplicate-banner');
    if (banner) banner.classList.add('hidden');
}

function updateDuplicateBannerQty() {
    if (currentDetectedDuplicate) {
        showDuplicateBanner(currentDetectedDuplicate);
    }
}

function mergeWithDuplicateFromBanner() {
    if (!currentDetectedDuplicate) return;
    const addQty = parseFloat(document.getElementById('item-qty')?.value) || 1;
    const userPrice = parseFloat(document.getElementById('item-price')?.value) || 0;
    executeMerge(currentDetectedDuplicate, addQty, userPrice);
}

function viewExistingDuplicate() {
    if (!currentDetectedDuplicate) return;
    const targetItem = currentDetectedDuplicate;
    closeItemModal();
    setTimeout(() => {
        openItemDrawer(targetItem);
    }, 250);
}

function openDuplicateModal(duplicate, addQty, price) {
    const modal = document.getElementById('duplicate-modal');
    if (!modal) return;

    const curQty = parseFloat(duplicate._qty || duplicate['Кол-во'] || 0);
    const toAdd = parseFloat(addQty) || 1;
    const total = curQty + toAdd;

    document.getElementById('dup-modal-name').textContent = duplicate['Наименование'] || duplicate.name;

    const paramsDiv = document.getElementById('dup-modal-params');
    if (paramsDiv) {
        paramsDiv.innerHTML = '';
        if (duplicate['Категория'] || duplicate._category) {
            paramsDiv.innerHTML += `<span class="px-2 py-0.5 bg-slate-200/80 text-slate-700 rounded-md font-bold">${duplicate['Категория'] || duplicate._category}</span>`;
        }
        if (duplicate['Цвет']) {
            paramsDiv.innerHTML += `<span class="px-2 py-0.5 bg-slate-200/80 text-slate-700 rounded-md font-bold">${duplicate['Цвет']}</span>`;
        }
        const w = duplicate['Ширина'];
        const h = duplicate['Высота'] || duplicate['Длина/Высота'];
        const l = duplicate['Длина'] || duplicate._length;
        if (w && (l || h)) {
            paramsDiv.innerHTML += `<span class="px-2 py-0.5 bg-sky-100 text-sky-800 rounded-md font-bold">${w}×${l || h} мм</span>`;
        }
    }

    document.getElementById('dup-modal-current-qty').textContent = `${curQty} шт`;
    document.getElementById('dup-modal-adding-qty').textContent = `+${toAdd} шт`;
    document.getElementById('dup-modal-total-qty').textContent = `${total} шт`;

    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    try { lucide.createIcons({ root: modal }); } catch(e) {}
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        document.getElementById('duplicate-modal-content')?.classList.remove('scale-95');
    }, 10);
}

function closeDuplicateModal() {
    const modal = document.getElementById('duplicate-modal');
    if (!modal) return;
    modal.classList.add('opacity-0');
    document.getElementById('duplicate-modal-content')?.classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 200);
}

function confirmMergeDuplicate() {
    if (!currentDetectedDuplicate) return;
    const addQty = parseFloat(document.getElementById('item-qty')?.value) || 1;
    const userPrice = parseFloat(document.getElementById('item-price')?.value) || 0;
    closeDuplicateModal();
    executeMerge(currentDetectedDuplicate, addQty, userPrice);
}

function confirmSaveAsNewItem() {
    closeDuplicateModal();
    pendingForceSave = true;
    saveItem();
    pendingForceSave = false;
}

function executeMerge(existingItem, addQty, userPrice) {
    const curQty = parseFloat(existingItem._qty || existingItem['Кол-во'] || 0);
    const added = parseFloat(addQty) || 1;
    const newQty = curQty + added;
    const price = (userPrice > 0) ? userPrice : parseFloat(existingItem._price || existingItem['Цена'] || 0);
    const total = newQty * price;

    // Оптимистичное обновление
    existingItem._qty = newQty;
    existingItem['Кол-во'] = newQty;
    existingItem._price = price;
    existingItem['Цена'] = price;
    existingItem._total = total;
    existingItem['Стоимость'] = total;

    closeItemModal();
    hideDuplicateBanner();
    const savedName = existingItem['Наименование'] || existingItem.name;
    const savedCat = existingItem._category || existingItem['Категория'] || 'Общая';
    currentDetectedDuplicate = null;

    if (currentCategory === savedCat || currentCategory === 'Дашборд') {
        renderTable(currentCategory);
    }
    updateDashboard();

    showToast(`✅ Добавлено +${added} шт к позиции «${savedName}». Всего: ${newQty} шт`, 'success');

    // Отправка в API
    const formData = new FormData();
    formData.append('id', existingItem.id);
    formData.append('category', savedCat);
    formData.append('name', savedName);
    formData.append('color', existingItem['Цвет'] || existingItem.color || '');
    formData.append('characteristics', existingItem['Характеристики'] || existingItem.characteristics || '');
    formData.append('width', existingItem['Ширина'] || existingItem.width || '');
    formData.append('height', existingItem['Высота'] || existingItem['Длина/Высота'] || existingItem.height || '');
    formData.append('length', existingItem['Длина'] || existingItem._length || existingItem.length || '');
    formData.append('quantity', newQty);
    formData.append('price', price);
    formData.append('total', total);
    formData.append('note', existingItem['Примечание'] || existingItem.note || '');

    fetch('api.php?action=updateItem', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(result => {
        if (result.error) throw new Error(result.error);
        logTransaction(savedName, savedCat, 'income', added, newQty, 'Пополнение со склада (объединение позиций)');
    })
    .catch(err => {
        console.error('Ошибка сохранения объединения:', err);
        showToast('Ошибка при синхронизации с сервером', 'error');
    });
}

function selectColorQuick(color) {
    const input = document.getElementById('item-color');
    if (input) {
        input.value = color;
    }
    checkDuplicateOnInput();
}

function updateItemFormCalc() {
    const qty = parseFloat(document.getElementById('item-qty')?.value) || 0;
    const price = parseFloat(document.getElementById('item-price')?.value) || 0;
    const totalEl = document.getElementById('item-calc-total');
    if (totalEl) {
        totalEl.textContent = 'Итого: ' + formatCurrency(qty * price);
    }
    updateDuplicateBannerQty();
}

/* ==========================================
   Sklad — Основная логика
   ========================================== */

// --- Данные ---
let parsedData = {};
let currentCategory = 'Изделия ПВХ и Алюминий';
let allItems = []; // Плоский массив для глобального поиска

// Иконки для категорий
// Базовые категории склада (никогда не исчезают, даже если удалены все товары)
const DEFAULT_CATEGORIES = [
    'Изделия ПВХ и Алюминий',
    'Душевые и безрамка',
    'Фурнитура ПВХ',
    'Подоконники',
    'Отливы',
    'Декор жесть',
    'Доводчики',
    'Зеркала',
    'Межкомнатные',
    'Монтажные материалы',
    'Сетки',
    'Соеденитель ПВХ',
    'Фасад навесной',
    'Фасадка',
    'Фурнитура алюминий',
    'Антипаника',
    'Поликарбонат',
    'Роллеты',
    'Склад ВСЁ'
];

// Цветовые стили и оформление для категорий склада
const categoryStyles = {
    'Изделия ПВХ и Алюминий': { color: '#0284c7', border: 'border-l-sky-500', iconBg: 'bg-sky-50 text-sky-600', pillBg: 'bg-sky-50 text-sky-700' },
    'Душевые и безрамка': { color: '#0d9488', border: 'border-l-teal-500', iconBg: 'bg-teal-50 text-teal-600', pillBg: 'bg-teal-50 text-teal-700' },
    'Фурнитура ПВХ': { color: '#d97706', border: 'border-l-amber-500', iconBg: 'bg-amber-50 text-amber-600', pillBg: 'bg-amber-50 text-amber-700' },
    'Подоконники': { color: '#059669', border: 'border-l-emerald-500', iconBg: 'bg-emerald-50 text-emerald-600', pillBg: 'bg-emerald-50 text-emerald-700' },
    'Отливы': { color: '#2563eb', border: 'border-l-blue-500', iconBg: 'bg-blue-50 text-blue-600', pillBg: 'bg-blue-50 text-blue-700' },
    'Декор жесть': { color: '#9333ea', border: 'border-l-purple-500', iconBg: 'bg-purple-50 text-purple-600', pillBg: 'bg-purple-50 text-purple-700' },
    'Доводчики': { color: '#4f46e5', border: 'border-l-indigo-500', iconBg: 'bg-indigo-50 text-indigo-600', pillBg: 'bg-indigo-50 text-indigo-700' },
    'Зеркала': { color: '#0891b2', border: 'border-l-cyan-500', iconBg: 'bg-cyan-50 text-cyan-600', pillBg: 'bg-cyan-50 text-cyan-700' },
    'Межкомнатные': { color: '#c2410c', border: 'border-l-orange-500', iconBg: 'bg-orange-50 text-orange-600', pillBg: 'bg-orange-50 text-orange-700' },
    'Монтажные материалы': { color: '#e11d48', border: 'border-l-rose-500', iconBg: 'bg-rose-50 text-rose-600', pillBg: 'bg-rose-50 text-rose-700' },
    'Сетки': { color: '#16a34a', border: 'border-l-green-500', iconBg: 'bg-green-50 text-green-600', pillBg: 'bg-green-50 text-green-700' },
    'Соеденитель ПВХ': { color: '#0284c7', border: 'border-l-sky-600', iconBg: 'bg-sky-50 text-sky-700', pillBg: 'bg-sky-50 text-sky-700' },
    'Фасад навесной': { color: '#6366f1', border: 'border-l-indigo-600', iconBg: 'bg-indigo-50 text-indigo-700', pillBg: 'bg-indigo-50 text-indigo-700' },
    'Фасадка': { color: '#7c3aed', border: 'border-l-violet-600', iconBg: 'bg-violet-50 text-violet-700', pillBg: 'bg-violet-50 text-violet-700' },
    'Фурнитура алюминий': { color: '#ea580c', border: 'border-l-orange-600', iconBg: 'bg-orange-50 text-orange-700', pillBg: 'bg-orange-50 text-orange-700' },
    'Антипаника': { color: '#dc2626', border: 'border-l-red-500', iconBg: 'bg-red-50 text-red-600', pillBg: 'bg-red-50 text-red-700' },
    'Поликарбонат': { color: '#0369a1', border: 'border-l-blue-400', iconBg: 'bg-blue-50 text-blue-600', pillBg: 'bg-blue-50 text-blue-700' },
    'Роллеты': { color: '#475569', border: 'border-l-slate-500', iconBg: 'bg-slate-50 text-slate-700', pillBg: 'bg-slate-50 text-slate-700' },
    'Склад ВСЁ': { color: '#059669', border: 'border-l-emerald-600', iconBg: 'bg-emerald-50 text-emerald-700', pillBg: 'bg-emerald-50 text-emerald-700' }
};

function getCategoryStyle(name) {
    if (categoryStyles[name]) return categoryStyles[name];
    let hash = 0;
    for (let i = 0; i < (name || '').length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    const colors = [
        { color: '#0284c7', border: 'border-l-sky-500', iconBg: 'bg-sky-50 text-sky-600', pillBg: 'bg-sky-50 text-sky-700' },
        { color: '#0d9488', border: 'border-l-teal-500', iconBg: 'bg-teal-50 text-teal-600', pillBg: 'bg-teal-50 text-teal-700' },
        { color: '#d97706', border: 'border-l-amber-500', iconBg: 'bg-amber-50 text-amber-600', pillBg: 'bg-amber-50 text-amber-700' },
        { color: '#7c3aed', border: 'border-l-purple-500', iconBg: 'bg-purple-50 text-purple-600', pillBg: 'bg-purple-50 text-purple-700' },
        { color: '#e11d48', border: 'border-l-rose-500', iconBg: 'bg-rose-50 text-rose-600', pillBg: 'bg-rose-50 text-rose-700' }
    ];
    return colors[Math.abs(hash) % colors.length];
}

const categoryIcons = {
    'Изделия ПВХ и Алюминий': 'package',
    'Душевые и безрамка': 'droplets',
    'Фурнитура ПВХ': 'wrench',
    'Подоконники': 'panel-bottom',
    'Отливы': 'umbrella',
    'Декор жесть': 'scissors',
    'Доводчики': 'refresh-cw',
    'Зеркала': 'square',
    'Межкомнатные': 'door-open',
    'Монтажные материалы': 'hammer',
    'Сетки': 'grid-3x3',
    'Соеденитель ПВХ': 'link-2',
    'Фасад навесной': 'layout-grid',
    'Фасадка': 'building',
    'Фурнитура алюминий': 'pen-tool',
    'Антипаника': 'shield-alert',
    'Поликарбонат': 'layers',
    'Роллеты': 'align-justify'
};

// --- Инициализация ---
document.addEventListener('DOMContentLoaded', () => {
    try { try { lucide.createIcons(); } catch(e) {} } catch(e) { console.warn('Lucide icons failed', e); }
    try { updateDate(); } catch(e) {}

    // Проверка авторизации
    checkAuthStatus();

    // --- UI Listeners ---
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('global-search').focus();
        }
    });

    const toggleSidebar = document.getElementById('toggle-sidebar');
    if (toggleSidebar) {
        toggleSidebar.addEventListener('click', () => {
            const sb = document.getElementById('sidebar');
            const isCollapsed = sb.classList.toggle('collapsed');
            const icon = document.getElementById('sidebar-toggle-icon');
            if (icon) {
                icon.setAttribute('data-lucide', isCollapsed ? 'panel-left-open' : 'panel-left-close');
                try { lucide.createIcons(); } catch(e) {}
            }
            toggleSidebar.title = isCollapsed ? 'Развернуть меню' : 'Свернуть меню';
            try { localStorage.setItem('oko_sidebar_collapsed', isCollapsed ? '1' : '0'); } catch(e) {}
        });

        // Восстановление состояния при загрузке
        try {
            if (localStorage.getItem('oko_sidebar_collapsed') === '1' && window.innerWidth >= 768) {
                document.getElementById('sidebar').classList.add('collapsed');
                const icon = document.getElementById('sidebar-toggle-icon');
                if (icon) icon.setAttribute('data-lucide', 'panel-left-open');
            }
        } catch(e) {}
    }

    const dataTable = document.getElementById('data-table');
    if (dataTable) {
        dataTable.classList.add('table-compact');
    }

});

// --- Парсинг локальных данных из data.js (CSV) ---
function parseLocalCSVData() {
    if (typeof RAW_DATA === 'undefined') {
        console.error('RAW_DATA не найден. Убедитесь, что data.js подключен.');
        return;
    }

    parsedData = {};
    allItems = [];

    for (const categoryName in RAW_DATA) {
        const csvText = RAW_DATA[categoryName];
        const lines = csvText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

        if (lines.length < 2) continue;

        // Первая строка — заголовки
        const headers = lines[0].split(';').map(h => h.trim());

        const items = [];

        // Находим индексы ключевых столбцов (один раз на категорию)
        const nameIdx = headers.findIndex(h => h.startsWith('Наименование'));
        const charsIdx = headers.findIndex(h => h.startsWith('Характеристики'));
        const widthIdx = headers.findIndex(h => h.startsWith('Ширина'));
        const heightIdx = headers.findIndex(h => h.includes('Длина') || h.includes('Высота'));
        const qtyIdx = headers.findIndex(h => h.startsWith('Кол-во') || h === 'Кол-во');
        const noteIdx = headers.findIndex(h => h.startsWith('Примечание') || h.startsWith('Заметки'));
        const photoIdx = headers.findIndex(h => h.startsWith('Фото'));
        const colorIdx = headers.findIndex(h => h.startsWith('Цвет'));

        // Ищем столбец Цена (приоритет: точное "Цена", затем "Цена за штуку", "Цена изделия", "Цена за метр")
        let priceIdx = headers.findIndex(h => h.match(/^Цена\s*$/));
        if (priceIdx === -1) priceIdx = headers.findIndex(h => h.startsWith('Цена за штуку'));
        if (priceIdx === -1) priceIdx = headers.findIndex(h => h.startsWith('Цена изделия'));
        if (priceIdx === -1) priceIdx = headers.findIndex(h => h.startsWith('Цена за метр'));
        if (priceIdx === -1) priceIdx = headers.findIndex(h => h.startsWith('Цена'));

        // Ищем столбец Стоимость (включая "Стоимость общая")
        let totalIdx = headers.findIndex(h => h.startsWith('Стоимость'));

        const parseNum = (val) => {
            if (!val) return 0;
            const cleaned = String(val).replace(/[₽\s]/g, '').replace(',', '.').trim();
            const num = parseFloat(cleaned);
            return isNaN(num) ? 0 : num;
        };
        const getVal = (values, idx) => (idx >= 0 && values[idx]) ? values[idx].trim().replace(/^"|"$/g, '') : '';

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (line.startsWith('Итог')) continue;

            const values = line.split(';');

            const name = (nameIdx >= 0 && values[nameIdx]) ? values[nameIdx].trim().replace(/^"|"$/g, '') : '';
            if (!name) continue;

            let chars = (charsIdx >= 0 && values[charsIdx]) ? values[charsIdx].trim().replace(/^"|"$/g, '') : '';
            let itemColor = '';
            if (colorIdx >= 0 && values[colorIdx]) {
                itemColor = values[colorIdx].trim().replace(/^"|"$/g, '');
            }

            const qty = parseNum(getVal(values, qtyIdx));
            const price = parseNum(getVal(values, priceIdx));
            const total = parseNum(getVal(values, totalIdx)) || (qty * price);

            const item = {
                'id': 'local_' + categoryName + '_' + i,
                'Наименование': name,
                'Цвет': itemColor,
                'Характеристики': chars,
                'Ширина': getVal(values, widthIdx),
                'Длина/Высота': getVal(values, heightIdx),
                'Кол-во': qty,
                'Цена': price,
                'Стоимость': total,
                'Примечание': getVal(values, noteIdx),
                'Фото': getVal(values, photoIdx),
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
                headers: ['Наименование', 'Характеристики', 'Ширина', 'Длина/Высота', 'Кол-во', 'Цена', 'Стоимость', 'Примечание', 'Фото'],
                items: items
            };
        }
    }


    buildNavigation();
    updateDashboard();

    if (currentCategory !== 'Дашборд' && parsedData[currentCategory]) {
        tableData = [...parsedData[currentCategory].items];
        renderTable(currentCategory);
    }

    console.log('✅ Данные загружены из data.js + localStorage. Категорий: ' + Object.keys(parsedData).length + ', товаров: ' + allItems.length);
}

// --- Парсинг данных с сервера (PHP API) ---
function loadServerData() {
    // Сначала парсим локальные данные для моментального отображения
    parseLocalCSVData();

    Promise.all([
        fetch('api.php?action=getItems').then(r => r.json()).catch(() => []),
        fetch('api.php?action=getCategories').then(r => r.json()).catch(() => [])
    ])
    .then(([items, categories]) => {
        const itemsArr = Array.isArray(items) ? items : [];
        const catsArr = Array.isArray(categories) ? categories : [];
        console.log(`☁️ API: ${itemsArr.length} товаров, ${catsArr.length} категорий`);
        parseServerData(itemsArr, catsArr);
    })
    .catch(err => {
        console.warn('⚠️ Ошибка загрузки из API, используем локальные данные:', err);
    });
}

function parseServerData(dataList, serverCategories = []) {
    parsedData = {};
    allItems = [];

    // Список стандартных заголовков для таблиц
    const defaultHeaders = [
        "Наименование", "Цвет", "Характеристики", "Ширина", "Длина/Высота",
        "Кол-во", "Цена", "Стоимость", "Примечание", "Фото"
    ];

    // Объединяем ВСЕ известные категории: базовые + сохраненные на сервере + из существующих товаров
    const allCatNames = new Set([...DEFAULT_CATEGORIES, ...serverCategories]);
    if (Array.isArray(dataList)) {
        dataList.forEach(item => {
            if (item && item.category) allCatNames.add(item.category);
        });
    }

    // Инициализируем КАЖДУЮ категорию, чтобы пустые разделы никогда не пропадали
    allCatNames.forEach(category => {
        if (!category || category === 'Дашборд' || category === 'История') return;
        parsedData[category] = {
            headers: [...defaultHeaders],
            items: []
        };
    });

    // Наполняем данными
    if (Array.isArray(dataList)) {
        dataList.forEach(item => {
            const category = item.category || 'Общая';
            if (!parsedData[category]) {
                parsedData[category] = {
                    headers: [...defaultHeaders],
                    items: []
                };
            }

            const frontItem = {
                'id': String(item.id),
                'Наименование': item.name,
                'Цвет': item.color || '',
                'Характеристики': item.characteristics || '',
                'Ширина': item.width || '',
                'Высота': item.height || '',
                'Длина/Высота': item.height || '',
                'Длина': item.length || '',
                '_length': item.length || '',
                'Кол-во': item.quantity || 0,
                'Цена': item.price || 0,
                'Стоимость': item.total || 0,
                'Примечание': item.note || '',
                'Фото': item.image || '',
                '_qty': parseFloat(item.quantity || 0),
                '_price': parseFloat(item.price || 0),
                '_total': parseFloat(item.total || 0),
                '_category': category
            };

            parsedData[category].items.push(frontItem);
            allItems.push(frontItem);
        });
    }

    buildNavigation();
    updateDashboard();

    // Если мы уже выбрали категорию, рендерим таблицу
    if (currentCategory && currentCategory !== 'Дашборд' && currentCategory !== 'История') {
        if (parsedData[currentCategory]) {
            tableData = [...parsedData[currentCategory].items];
            renderTable(currentCategory);
        } else {
            showDashboard();
        }
    }
}

function promptAddCategory() {
    const name = prompt('Введите название новой категории склада:');
    if (!name || !name.trim()) return;
    const catName = name.trim();
    if (parsedData[catName]) {
        showToast('Такая категория уже есть на складе', 'info');
        showCategory(catName);
        return;
    }
    fetch('api.php?action=addCategory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: catName })
    })
    .then(r => r.json())
    .then(res => {
        if (res.error) throw new Error(res.error);
        showToast(`Категория "${catName}" добавлена!`, 'success');
        loadServerData();
    })
    .catch(err => {
        showToast('Ошибка: ' + err.message, 'error');
    });
}

// --- Авторизация ---
let currentUserRole = 'employee';
let currentUserName = 'Администратор';

function togglePasswordVisibility() {
    const pwdInput = document.getElementById('auth-password');
    const pwdIcon = document.getElementById('auth-pwd-icon');

    if (!pwdInput) return;
    if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        if (pwdIcon) pwdIcon.setAttribute('data-lucide', 'eye-off');
    } else {
        pwdInput.type = 'password';
        if (pwdIcon) pwdIcon.setAttribute('data-lucide', 'eye');
    }
    try { lucide.createIcons(); } catch(e) {}
}

async function handleAuth(e) {
    e.preventDefault();
    const loginInput = document.getElementById('auth-username');
    const pwdInput = document.getElementById('auth-password');
    const submitBtn = document.getElementById('auth-submit-btn');
    const submitText = document.getElementById('auth-submit-text');
    const submitIcon = document.getElementById('auth-submit-icon');
    const errorDiv = document.getElementById('auth-error');

    const login = (loginInput ? loginInput.value : '').trim();
    const password = pwdInput ? pwdInput.value : '';

    if (errorDiv) errorDiv.classList.add('hidden');

    if (submitBtn) submitBtn.disabled = true;
    if (submitText) submitText.textContent = 'Вход...';
    if (submitIcon) submitIcon.classList.add('hidden');

    try {
        const res = await fetch('api.php?action=login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password })
        });

        if (res.ok) {
            const data = await res.json();
            if (data.success && data.user) {
                const appRole = (data.user.role === 'director' || data.user.role === 'admin') ? 'admin' : 'employee';
                const displayName = data.user.name || login;
                localStorage.setItem('okoAuth', 'true');
                localStorage.setItem('okoUser', JSON.stringify({
                    id: data.user.id,
                    name: displayName,
                    role: appRole
                }));
                loginUser(displayName, appRole);
                return;
            } else if (data.error) {
                showAuthError(data.error);
                return;
            }
        }
    } catch (err) {
        console.warn('Серверная авторизация недоступна, проверка локального доступа:', err);
    } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (submitText) submitText.textContent = 'Войти';
        if (submitIcon) submitIcon.classList.remove('hidden');
        try { lucide.createIcons(); } catch(e) {}
    }

    // Резервная проверка (офлайн / пин-код 47474 / admin / master):
    if ((login === 'admin' && (password === '474747' || password === '47474' || password === 'admin')) || (password === '474747' || password === '47474')) {
        localStorage.setItem('okoAuth', 'true');
        localStorage.setItem('okoUser', JSON.stringify({ name: 'Администратор', role: 'admin' }));
        loginUser('Администратор', 'admin');
        return;
    }
    if (login === 'master' && password === 'master') {
        localStorage.setItem('okoAuth', 'true');
        localStorage.setItem('okoUser', JSON.stringify({ name: 'Монтажник', role: 'employee' }));
        loginUser('Монтажник', 'employee');
        return;
    }

    showAuthError('Неверный логин или пароль');
}

function showAuthError(msg) {
    const errorDiv = document.getElementById('auth-error');
    const errorMsg = document.getElementById('auth-error-msg');
    if (errorMsg) errorMsg.textContent = msg || 'Неверный логин или пароль';
    if (errorDiv) errorDiv.classList.remove('hidden');

    // Анимация тряски карточки
    const card = document.getElementById('auth-card') || document.querySelector('#auth-screen .bg-white');
    if (card) {
        card.classList.add('animate-shake');
        setTimeout(() => {
            card.classList.remove('animate-shake');
        }, 500);
    }
}

function loginUser(username, role) {
    currentUserRole = role;
    currentUserName = username;

    // Сохраняем логин для удобства следующего входа
    const loginInput = document.getElementById('auth-username');
    if (loginInput && loginInput.value.trim()) {
        localStorage.setItem('okoLastLogin', loginInput.value.trim());
    }

    // Обновляем UI
    const usernameEl = document.getElementById('current-username');
    const userInitialEl = document.getElementById('user-initial');
    if (usernameEl) usernameEl.textContent = username + (role === 'admin' ? ' (Админ)' : '');
    if (userInitialEl) userInitialEl.textContent = (username || 'А').charAt(0).toUpperCase();

    // Прячем экран авторизации, показываем приложение и загружаем склад
    const authScreen = document.getElementById('auth-screen');
    const appScreen = document.getElementById('app-screen');
    if (authScreen) {
        authScreen.style.opacity = '0';
        setTimeout(() => {
            authScreen.classList.add('hidden');
            if (appScreen) appScreen.classList.remove('hidden');

            loadServerData();
            try { lucide.createIcons(); } catch(e) {}
        }, 300);
    }
}

function checkAuthStatus() {
    // Удаляем старые ключи авто-входа: склад НИКОГДА не открывается без ввода пароля!
    localStorage.removeItem('okoAuth');
    localStorage.removeItem('okoUser');

    // Экран склада ВСЕГДА строго скрыт
    const appScreen = document.getElementById('app-screen');
    if (appScreen) {
        appScreen.classList.add('hidden');
    }

    // Экран авторизации ВСЕГДА показан
    const authScreen = document.getElementById('auth-screen');
    if (authScreen) {
        authScreen.style.opacity = '1';
        authScreen.classList.remove('hidden');
    }

    // Подставляем ранее сохраненный логин (по умолчанию admin)
    const savedLogin = localStorage.getItem('okoLastLogin') || 'admin';
    const loginInput = document.getElementById('auth-username');
    const pwdInput = document.getElementById('auth-password');
    if (loginInput) {
        loginInput.value = savedLogin;
    }
    if (pwdInput) {
        pwdInput.value = '';
        setTimeout(() => pwdInput.focus(), 150);
    }

    try { lucide.createIcons(); } catch(e) {}
}

function logout() {
    localStorage.removeItem('okoAuth');
    localStorage.removeItem('okoUser');
    currentUserRole = 'employee';
    currentUserName = 'Сотрудник';

    const pwdInput = document.getElementById('auth-password');
    const errorDiv = document.getElementById('auth-error');
    if (pwdInput) pwdInput.value = '';
    if (errorDiv) errorDiv.classList.add('hidden');

    const appScreen = document.getElementById('app-screen');
    if (appScreen) appScreen.classList.add('hidden');
    
    const authScreen = document.getElementById('auth-screen');
    if (authScreen) {
        authScreen.classList.remove('hidden');
        setTimeout(() => { 
            authScreen.style.opacity = '1'; 
            if (pwdInput) pwdInput.focus();
            try { lucide.createIcons(); } catch(e) {}
        }, 10);
    }
}

// --- UI Логика: Навигация и Дашборд ---

function buildNavigation() {
    const navContainer = document.getElementById('nav-categories');
    if (!navContainer) return;
    navContainer.innerHTML = '';

    // Разделитель с кнопкой добавления категории
    const divider = document.createElement('div');
    divider.className = 'sidebar-section-header text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-4 mb-2 px-3 py-1 flex items-center justify-between';
    divider.innerHTML = `
        <span>Категории товаров</span>
        <button onclick="promptAddCategory()" class="p-1 text-slate-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded transition-colors" title="Добавить новую категорию">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
        </button>
    `;
    navContainer.appendChild(divider);

    // Линия-разделитель (видна только когда меню свернуто)
    const collapsedDivider = document.createElement('div');
    collapsedDivider.className = 'sidebar-divider-rule hidden border-t border-slate-200 my-2';
    navContainer.appendChild(collapsedDivider);

    // Категории
    for (const category in parsedData) {
        if (category === 'Дашборд' || category === 'История') continue;
        const itemsCount = parsedData[category].items.length;
        const iconName = categoryIcons[category] || 'folder';

        const btn = document.createElement('button');
        btn.className = 'w-full flex items-center justify-between px-3 py-2 rounded-xl mb-1 text-sm sidebar-item group text-left transition-all';
        btn.title = category;
        btn.onclick = () => showCategory(category, btn);

        const badgeHtml = itemsCount > 0
            ? `<span class="text-[10px] font-bold bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors">${itemsCount}</span>`
            : `<span class="text-[10px] font-semibold bg-slate-100/70 text-slate-400 py-0.5 px-1.5 rounded-full" title="Пока нет товаров">0</span>`;

        btn.innerHTML = `
            <div class="flex items-center gap-3 overflow-hidden">
                <i data-lucide="${iconName}" class="w-4.5 h-4.5 flex-shrink-0"></i>
                <span class="truncate">${category}</span>
            </div>
            ${badgeHtml}
        `;

        navContainer.appendChild(btn);
    }

    try { lucide.createIcons(); } catch(e) {}
}

function getCategorySum(category) {
    if (!parsedData[category]) return 0;
    return parsedData[category].items.reduce((sum, item) => sum + (item._total || 0), 0);
}

function getCategoryQty(category) {
    if (!parsedData[category]) return 0;
    return parsedData[category].items.reduce((sum, item) => sum + (item._qty || 0), 0);
}

let currentDashSort = 'sum';

function sortDashCategories(sortBy, btnEl) {
    currentDashSort = sortBy;
    if (btnEl) {
        document.querySelectorAll('#dash-sort-pills button').forEach(b => {
            b.classList.remove('active', 'bg-white', 'text-slate-800', 'shadow-sm', 'font-semibold');
            b.classList.add('text-slate-500', 'font-medium');
        });
        btnEl.classList.add('active', 'bg-white', 'text-slate-800', 'shadow-sm', 'font-semibold');
        btnEl.classList.remove('text-slate-500', 'font-medium');
    }
    updateDashboard();
}

function updateDashboard() {
    let totalValue = 0;
    let totalItems = 0;
    let totalQty = 0;
    let activeCategoriesCount = 0;

    let lowStockCount = 0;
    let outOfStockCount = 0;

    const categoriesList = [];

    for (const category in parsedData) {
        if (category === 'Дашборд' || category === 'История') continue;
        const catItems = parsedData[category].items || [];

        const catSum = getCategorySum(category);
        const catQty = getCategoryQty(category);

        if (catItems.length > 0) {
            activeCategoriesCount++;
            totalItems += catItems.length;
            totalValue += catSum;
            totalQty += catQty;

            catItems.forEach(item => {
                const q = parseFloat(item._qty !== undefined ? item._qty : (item['Кол-во'] || 0));
                if (q <= 0) outOfStockCount++;
                else if (q < 5) lowStockCount++;
            });
        }

        categoriesList.push({
            name: category,
            sum: catSum,
            count: catItems.length,
            qty: catQty,
            icon: categoryIcons[category] || 'folder'
        });
    }

    // Обновляем главные KPI
    const totalValEl = document.getElementById('dash-total-value');
    if (totalValEl) totalValEl.textContent = formatCurrency(totalValue);

    const totalItemsEl = document.getElementById('dash-total-items');
    if (totalItemsEl) totalItemsEl.textContent = totalItems.toLocaleString('ru-RU');

    const totalQtyEl = document.getElementById('dash-total-qty');
    if (totalQtyEl) totalQtyEl.textContent = parseFloat(totalQty.toFixed(2)).toLocaleString('ru-RU');

    const totalCatsEl = document.getElementById('dash-total-categories');
    if (totalCatsEl) totalCatsEl.textContent = categoriesList.length;

    // Время обновления
    const liveDateEl = document.getElementById('dash-live-date');
    if (liveDateEl) {
        const now = new Date();
        liveDateEl.textContent = 'Синхронизировано в ' + now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    }

    // Предупреждения об остатках
    const lowEl = document.getElementById('dash-alert-lowstock');
    const lowCountEl = document.getElementById('dash-lowstock-count');
    if (lowEl && lowCountEl) {
        lowCountEl.textContent = lowStockCount;
        if (lowStockCount > 0) lowEl.classList.remove('hidden');
        else lowEl.classList.add('hidden');
    }

    const outEl = document.getElementById('dash-alert-outstock');
    const outCountEl = document.getElementById('dash-outstock-count');
    if (outEl && outCountEl) {
        outCountEl.textContent = outOfStockCount;
        if (outOfStockCount > 0) outEl.classList.remove('hidden');
        else outEl.classList.add('hidden');
    }

    const summaryTextEl = document.getElementById('dash-cat-summary');
    if (summaryTextEl) {
        summaryTextEl.textContent = `(${categoriesList.length} разд. · ${formatCurrency(totalValue)})`;
    }

    // Сортировка категорий
    if (currentDashSort === 'qty') {
        categoriesList.sort((a, b) => b.qty - a.qty);
    } else if (currentDashSort === 'count') {
        categoriesList.sort((a, b) => b.count - a.count);
    } else {
        categoriesList.sort((a, b) => b.sum - a.sum);
    }

    // Рендер контрастных, визуально различимых карточек категорий
    const grid = document.getElementById('dash-category-grid');
    if (grid) {
        grid.innerHTML = '';

        categoriesList.forEach((cat, index) => {
            const card = document.createElement('div');
            const style = getCategoryStyle(cat.name);
            const isEmpty = cat.count === 0;
            const isTop3 = index < 3 && cat.sum > 0 && currentDashSort === 'sum';
            const catPercent = totalValue > 0 ? Math.round((cat.sum / totalValue) * 100) : 0;

            card.className = `border ${isEmpty ? 'border-dashed border-slate-300 bg-slate-50/50 opacity-80 hover:opacity-100' : 'border-slate-200/90 bg-white'} border-l-4 ${style.border} rounded-xl p-3.5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group flex flex-col justify-between`;
            card.onclick = () => {
                showCategory(cat.name);
            };

            const topBadge = isTop3 ? `<span class="text-[9px] font-black text-amber-700 bg-amber-100/90 px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-xs"><i data-lucide="award" class="w-2.5 h-2.5"></i> ТОП ${index + 1}</span>` : '';
            const countBadge = isEmpty 
                ? `<span class="text-[10px] font-bold text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded-full">Пусто</span>` 
                : `<span class="text-[10px] font-bold ${style.pillBg} px-2 py-0.5 rounded-full border border-slate-200/50">${cat.count} поз.</span>`;

            const progressBar = isEmpty
                ? `<div class="w-full bg-slate-200/60 h-1.5 rounded-full mb-2.5"></div>`
                : `<div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-2.5" title="${catPercent}% от стоимости склада">
                       <div class="h-full rounded-full transition-all duration-500" style="background-color: ${style.color}; width: ${Math.max(5, catPercent)}%"></div>
                   </div>`;

            const footerContent = isEmpty
                ? `<span class="text-[11px] text-slate-400 italic">Нет товаров на складе</span>
                   <span class="text-xs text-brand-primary font-bold group-hover:underline flex items-center gap-1">+ Добавить</span>`
                : `<span class="text-[11px] text-slate-500">Остаток: <b class="${cat.qty < 5 ? 'text-amber-600 font-bold' : 'text-slate-700'}">${parseFloat(cat.qty.toFixed(2))} шт</b></span>
                   <span class="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-brand-secondary transition-colors">${formatCurrency(cat.sum)}</span>`;

            card.innerHTML = `
                <div>
                    <div class="flex items-center justify-between gap-1.5 mb-2">
                        <div class="flex items-center gap-2 min-w-0">
                            <div class="w-7 h-7 rounded-lg ${style.iconBg} flex items-center justify-center flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                                <i data-lucide="${cat.icon}" class="w-3.5 h-3.5"></i>
                            </div>
                            <h4 class="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-brand-primary transition-colors truncate" title="${cat.name}">${cat.name}</h4>
                        </div>
                        <div class="flex items-center gap-1 flex-shrink-0">
                            ${topBadge}
                            ${countBadge}
                        </div>
                    </div>
                    ${progressBar}
                </div>

                <div class="flex items-center justify-between text-xs pt-1.5 border-t border-slate-100">
                    ${footerContent}
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Рендер свежих операций
    updateDashRecentHistory();

    try { lucide.createIcons(); } catch(e) {}
}

function updateDashRecentHistory() {
    const container = document.getElementById('dash-recent-history');
    if (!container) return;

    if (historyDataRaw && historyDataRaw.length > 0) {
        renderDashRecentHistoryCards(historyDataRaw.slice(0, 3));
    } else {
        fetch('api.php?action=getTransactions')
            .then(r => r.json())
            .then(data => {
                historyDataRaw = Array.isArray(data) ? data : [];
                renderDashRecentHistoryCards(historyDataRaw.slice(0, 3));
            })
            .catch(() => {
                container.innerHTML = '<div class="col-span-3 text-center py-2 text-xs text-slate-400">История не загружена</div>';
            });
    }
}

function renderDashRecentHistoryCards(items) {
    const container = document.getElementById('dash-recent-history');
    if (!container) return;
    if (!items || items.length === 0) {
        container.innerHTML = '<div class="col-span-3 text-center py-3 text-xs text-slate-400">Нет недавних операций</div>';
        return;
    }

    container.innerHTML = items.map(tx => {
        let badgeColor = 'bg-slate-100 text-slate-600';
        let icon = 'activity';
        let sign = '';
        let changeColor = 'text-slate-700';

        if (tx.action === 'income' || tx.action === 'add') {
            badgeColor = 'bg-emerald-50 text-emerald-600';
            icon = 'arrow-down-left';
            sign = '+';
            changeColor = 'text-emerald-600 font-bold';
        } else if (tx.action === 'writeoff' || tx.action === 'outcome') {
            badgeColor = 'bg-amber-50 text-amber-700';
            icon = 'package-minus';
            changeColor = 'text-amber-600 font-bold';
        } else if (tx.action === 'delete') {
            badgeColor = 'bg-rose-50 text-rose-600';
            icon = 'trash-2';
            changeColor = 'text-rose-600 font-bold';
        }

        const d = new Date(tx.created_at);
        const timeStr = d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }) + ' ' + d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

        return `
            <div class="bg-slate-50/70 hover:bg-slate-50 border border-slate-100 rounded-lg p-2.5 flex items-center justify-between gap-2.5 transition-colors">
                <div class="flex items-center gap-2 min-w-0">
                    <div class="w-7 h-7 rounded-md ${badgeColor} flex items-center justify-center flex-shrink-0">
                        <i data-lucide="${icon}" class="w-3.5 h-3.5"></i>
                    </div>
                    <div class="min-w-0">
                        <p class="text-xs font-bold text-slate-800 truncate" title="${tx.item_name || ''}">${tx.item_name || 'Без названия'}</p>
                        <p class="text-[10px] text-slate-400 truncate">${timeStr} · ${tx.username || 'Админ'}</p>
                    </div>
                </div>
                <div class="text-right flex-shrink-0">
                    <span class="text-xs ${changeColor}">${sign}${tx.qty_change} шт</span>
                </div>
            </div>
        `;
    }).join('');

    try { lucide.createIcons(); } catch(e) {}
}


// --- Выбор позиций и массовые действия ---
let selectedItemIds = new Set();

function getColorHex(colorName) {
    if (!colorName) return '#94a3b8';
    const c = colorName.toLowerCase().trim();
    if (c.includes('бел')) return '#ffffff';
    if (c.includes('черн') || c.includes('чёрн')) return '#1e293b';
    if (c.includes('коричн') || c.includes('дуб') || c.includes('орех') || c.includes('венге')) return '#78350f';
    if (c.includes('сер') || c.includes('антрацит') || c.includes('графит')) return '#64748b';
    if (c.includes('золот')) return '#d97706';
    if (c.includes('красн') || c.includes('махагон')) return '#dc2626';
    if (c.includes('син')) return '#2563eb';
    if (c.includes('зелен') || c.includes('зелён')) return '#16a34a';
    if (c.includes('желт') || c.includes('жёлт')) return '#eab308';
    if (c.includes('беж') || c.includes('крем')) return '#fde68a';
    if (c.includes('серебр') || c.includes('алюм')) return '#cbd5e1';
    return '#94a3b8';
}

function showDashboard() {
    clearBulkSelection();
    // Сброс активного класса в меню
    document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));
    document.getElementById('nav-dash').classList.add('active');

    // Переключение View
    document.getElementById('view-category').classList.add('hidden');
    document.getElementById('view-history').classList.add('hidden');

    const dashView = document.getElementById('view-dashboard');
    dashView.classList.remove('hidden');
    dashView.classList.add('fade-in');

    document.getElementById('current-view-title').textContent = 'Дашборд';

    // Сброс поиска
    document.getElementById('global-search').value = '';

    // Закрываем мобильное меню если открыто
    if (window.innerWidth < 768) {
        document.getElementById('sidebar').classList.add('hidden');
        document.getElementById('sidebar').classList.remove('flex');
        const overlay = document.getElementById('mobile-overlay');
        if(overlay) overlay.classList.add('hidden');
    }
}

let historyDataRaw = [];
let currentHistoryFilter = 'all';
let currentHistorySearch = '';

function showHistory() {
    currentCategory = 'История';
    clearBulkSelection();

    // Сброс активного класса в меню
    document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));
    document.getElementById('nav-history').classList.add('active');

    // Переключение View
    document.getElementById('view-dashboard').classList.add('hidden');
    document.getElementById('view-category').classList.add('hidden');
    
    // Сброс глобального поиска
    document.getElementById('global-search').value = '';

    const histView = document.getElementById('view-history');
    histView.classList.remove('hidden');
    
    document.getElementById('current-view-title').textContent = 'Журнал операций';
    
    loadHistory();

    // Закрываем мобильное меню
    if (window.innerWidth < 768) {
        document.getElementById('sidebar').classList.add('hidden');
        document.getElementById('sidebar').classList.remove('flex');
        const overlay = document.getElementById('mobile-overlay');
        if(overlay) overlay.classList.add('hidden');
    }
}

function loadHistory(isManual = false) {
    const icon = document.getElementById('history-refresh-icon');
    if (icon && isManual) icon.classList.add('animate-spin');

    fetch('api.php?action=getTransactions')
        .then(response => response.json())
        .then(data => {
            renderHistory(data);
        })
        .catch(err => console.error('Ошибка загрузки истории:', err))
        .finally(() => {
            if (icon && isManual) {
                setTimeout(() => icon.classList.remove('animate-spin'), 400);
            }
        });
}

function filterHistory(filterType, btnEl) {
    currentHistoryFilter = filterType;
    if (btnEl) {
        document.querySelectorAll('#history-filter-chips button').forEach(b => {
            b.classList.remove('active', 'bg-brand-primary', 'text-white', 'shadow-sm');
            b.classList.add('bg-slate-100', 'text-slate-600');
        });
        btnEl.classList.add('active', 'bg-brand-primary', 'text-white', 'shadow-sm');
        btnEl.classList.remove('bg-slate-100', 'text-slate-600');
    }
    applyHistoryFilters();
}

function searchHistory(query) {
    currentHistorySearch = (query || '').trim().toLowerCase();
    applyHistoryFilters();
}

function renderHistory(data) {
    historyDataRaw = Array.isArray(data) ? data : [];
    applyHistoryFilters();
}

function applyHistoryFilters() {
    const container = document.getElementById('history-container');
    if (!container) return;
    container.innerHTML = '';

    const countEl = document.getElementById('history-total-count');
    if (countEl) countEl.textContent = historyDataRaw.length;

    let filtered = [...historyDataRaw];
    if (currentHistoryFilter !== 'all') {
        if (currentHistoryFilter === 'outcome') {
            filtered = filtered.filter(item => item.action === 'outcome' || item.action === 'writeoff');
        } else {
            filtered = filtered.filter(item => item.action === currentHistoryFilter);
        }
    }

    if (currentHistorySearch) {
        const q = currentHistorySearch;
        filtered = filtered.filter(item => 
            (item.item_name && item.item_name.toLowerCase().includes(q)) ||
            (item.category && item.category.toLowerCase().includes(q)) ||
            (item.username && item.username.toLowerCase().includes(q)) ||
            (item.note && item.note.toLowerCase().includes(q))
        );
    }

    if (!filtered.length) {
        container.innerHTML = `
            <div class="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400 shadow-sm">
                <i data-lucide="clipboard-x" class="w-12 h-12 mx-auto mb-3 text-slate-300"></i>
                <p class="font-bold text-slate-700 text-base">Записей не найдено</p>
                <p class="text-xs text-slate-400 mt-1">Попробуйте выбрать другой фильтр или очистить строку поиска</p>
            </div>
        `;
        try { lucide.createIcons(); } catch(e) {}
        return;
    }

    filtered.forEach(item => {
        const dateObj = new Date(item.created_at);
        const formattedDate = dateObj.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }) + ', ' + 
                              dateObj.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

        let badgeBg = 'bg-slate-100 text-slate-600';
        let iconName = 'activity';
        let actionLabel = 'Операция';
        let qtyClass = 'text-slate-700';
        let qtyPrefix = '';

        if (item.action === 'income' || item.action === 'add') {
            if (item.action === 'add') {
                badgeBg = 'bg-sky-50 text-sky-600 border border-sky-200/60';
                iconName = 'plus-circle';
                actionLabel = 'Создан товар';
            } else {
                badgeBg = 'bg-emerald-50 text-emerald-600 border border-emerald-200/60';
                iconName = 'arrow-down-left';
                actionLabel = 'Приход на склад';
                qtyClass = 'text-emerald-600 font-black';
                qtyPrefix = '+';
            }
        } else if (item.action === 'writeoff' || item.action === 'outcome') {
            badgeBg = 'bg-amber-50 text-amber-700 border border-amber-200/60';
            iconName = 'package-minus';
            actionLabel = item.action === 'writeoff' ? 'Списание' : 'Расход';
            qtyClass = 'text-amber-600 font-black';
            qtyPrefix = '';
        } else if (item.action === 'delete') {
            badgeBg = 'bg-rose-50 text-rose-600 border border-rose-200/60';
            iconName = 'trash-2';
            actionLabel = 'Удаление';
            qtyClass = 'text-rose-600 font-black';
        }

        const qtyVal = parseFloat(item.qty_change || 0);
        const showQty = qtyVal !== 0;

        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-sm hover:shadow transition-all hover:border-slate-300';
        card.innerHTML = `
            <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-xl ${badgeBg} flex items-center justify-center flex-shrink-0 shadow-xs">
                    <i data-lucide="${iconName}" class="w-5 h-5"></i>
                </div>
                
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-2 mb-1">
                        <div class="flex items-center gap-2 flex-wrap">
                            <span class="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${badgeBg}">${actionLabel}</span>
                            ${item.category ? `<span class="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">${item.category}</span>` : ''}
                        </div>
                        <span class="text-[11px] font-medium text-slate-400 whitespace-nowrap flex items-center gap-1">
                            <i data-lucide="clock" class="w-3 h-3"></i>
                            ${formattedDate}
                        </span>
                    </div>

                    <div class="flex items-center justify-between gap-4 mt-1">
                        <h4 class="text-sm sm:text-base font-bold text-slate-800 truncate" title="${item.item_name || ''}">${item.item_name || 'Без названия'}</h4>
                        ${showQty ? `<div class="text-sm sm:text-base font-extrabold ${qtyClass} whitespace-nowrap">${qtyPrefix}${qtyVal} шт</div>` : ''}
                    </div>

                    ${item.note ? `
                        <div class="mt-2 text-xs text-slate-600 bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
                            <i data-lucide="message-square" class="w-3.5 h-3.5 text-slate-400 flex-shrink-0"></i>
                            <span class="truncate">${item.note}</span>
                        </div>
                    ` : ''}

                    <div class="mt-2 flex items-center justify-between text-[11px] text-slate-400 pt-1.5 border-t border-slate-50">
                        <span class="inline-flex items-center gap-1">
                            <i data-lucide="user" class="w-3 h-3 text-slate-400"></i>
                            <span>${item.username || 'Администратор'}</span>
                        </span>
                        ${item.qty_after !== undefined && item.qty_after !== null ? `<span class="font-medium text-slate-500">Остаток после: <b class="text-slate-700">${item.qty_after} шт</b></span>` : ''}
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    try { lucide.createIcons(); } catch(e) {}
}

function logTransaction(item_name, category, action, qty_change, qty_after, note) {
    const payload = {
        item_name: item_name || '',
        category: category || '',
        action: action,
        qty_change: qty_change,
        qty_after: qty_after,
        username: currentUserName || 'Администратор',
        note: note || ''
    };

    fetch('api.php?action=addTransaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }).catch(err => console.error('Ошибка сохранения транзакции:', err));
}

// --- Таблица и Сортировка ---

let tableData = [];
let sortCol = '';
let sortAsc = true;
let photoRemoved = false; // Флаг удаления фото

function showCategory(category, btnElement) {
    currentCategory = category;
    clearBulkSelection();

    // Активация кнопки в меню
    document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));
    if (btnElement && btnElement.classList) {
        btnElement.classList.add('active');
    } else {
        const buttons = document.querySelectorAll('#nav-categories button');
        for (let btn of buttons) {
            if (btn.title === category || btn.textContent.includes(category)) {
                btn.classList.add('active');
                break;
            }
        }
    }

    // Переключение View
    document.getElementById('view-dashboard').classList.add('hidden');
    document.getElementById('view-history').classList.add('hidden');

    const catView = document.getElementById('view-category');
    catView.classList.remove('hidden');
    catView.classList.remove('fade-in');
    void catView.offsetWidth;
    catView.classList.add('fade-in');

    document.getElementById('current-view-title').textContent = category;

    // Подготовка данных (защита от undefined для пустых категорий)
    if (!parsedData[category]) {
        parsedData[category] = {
            headers: ["Наименование", "Цвет", "Характеристики", "Ширина", "Длина/Высота", "Кол-во", "Цена", "Стоимость", "Примечание", "Фото"],
            items: []
        };
    }
    tableData = parsedData[category].items ? [...parsedData[category].items] : [];
    sortCol = '';

    renderTable(category);

    // Сброс поиска
    document.getElementById('global-search').value = '';

    // Закрываем мобильное меню
    if (window.innerWidth < 768) {
        document.getElementById('sidebar').classList.add('hidden');
        document.getElementById('sidebar').classList.remove('flex');
        const overlay = document.getElementById('mobile-overlay');
        if(overlay) overlay.classList.add('hidden');
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

        // Попытка сортировать как числа если возможно
        const numA = parseFloat(String(valA).replace(/\s/g, '').replace(',', '.'));
        const numB = parseFloat(String(valB).replace(/\s/g, '').replace(',', '.'));

        if (!isNaN(numA) && !isNaN(numB) && valA !== '' && valB !== '') {
            return sortAsc ? numA - numB : numB - numA;
        }

        // Строковая сортировка
        valA = String(valA).toLowerCase();
        valB = String(valB).toLowerCase();

        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
    });

    renderTable(currentCategory);
}


function highlightText(text, query) {
    if (!query || !text) return text;
    const strText = String(text);
    const tokens = query.trim().split(/\s+/).filter(t => t.length > 1);
    if (tokens.length === 0) return strText;
    
    let highlighted = strText;
    tokens.forEach(tok => {
        const safeTok = tok.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        // regex match russian and english layout? For simplicity just exact match here, search logic does fuzzy.
        const re = new RegExp(`(${safeTok})`, 'gi');
        highlighted = highlighted.replace(re, '<mark class="search-highlight">$1</mark>');
    });
    return highlighted;
}

let currentSearchQuery = '';
function renderTable(categoryName, searchQuery = '') {
    currentSearchQuery = searchQuery;
    const data = parsedData[categoryName];
    if (!data) return;

    // Исключаем внутренние поля из отображения заголовков
    const visibleHeaders = data.headers.filter(h => !h.startsWith('_'));

    const thRow = document.getElementById('table-header-row');
    thRow.innerHTML = '';

    // Массовые действия: чекбокс выбора всех (для админа)
    if (currentUserRole === 'admin') {
        const checkTh = document.createElement('th');
        checkTh.className = 'w-10 px-3 text-center';
        checkTh.innerHTML = '<input type="checkbox" id="bulk-select-all" class="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary border-slate-300 cursor-pointer" onchange="toggleSelectAllBulk(this)">';
        thRow.appendChild(checkTh);
    }

    // Рендер заголовков
    visibleHeaders.forEach(header => {
        const th = document.createElement('th');
        // Обработка клика для сортировки
        th.onclick = () => handleSort(header);

        // Иконка сортировки
        let sortIcon = '';
        if (sortCol === header) {
            sortIcon = '<i data-lucide="arrow-' + (sortAsc ? 'up' : 'down') + '" class="w-3 h-3 inline-block ml-1 text-brand-primary"></i>';
        }

        let displayHeader = header;
        if (header === 'Ширина') {
            if (categoryName === 'Отливы' || categoryName === 'Подоконники') {
                displayHeader = 'Глубина, мм';
            } else if (categoryName === 'Декор жесть') {
                displayHeader = 'Сечение';
            } else {
                displayHeader = 'Ширина';
            }
        } else if (header === 'Длина/Высота' || header === 'Высота/Длина' || header === 'Высота') {
            if (categoryName === 'Отливы' || categoryName === 'Подоконники' || categoryName === 'Декор жесть') {
                displayHeader = 'Длина';
            } else {
                displayHeader = 'Высота';
            }
        }
        th.innerHTML = '<div class="flex items-center gap-1">' + displayHeader + ' ' + sortIcon + '</div>';
        thRow.appendChild(th);
    });

    // Добавляем заголовок столбца действий, если админ
    if (currentUserRole === 'admin') {
        const actionTh = document.createElement('th');
        actionTh.className = 'w-20 px-4 text-right';
        thRow.appendChild(actionTh);
    }

    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';

    if (tableData.length === 0) {
        const emptyState = document.getElementById('table-empty-state');
        if (emptyState) {
            emptyState.classList.remove('hidden');
            const title = emptyState.querySelector('h3');
            const desc = emptyState.querySelector('p');
            if (searchQuery) {
                if (title) title.textContent = 'Ничего не найдено';
                if (desc) desc.textContent = 'Попробуйте изменить параметры поиска';
            } else {
                if (title) title.textContent = 'В этом разделе пока нет товаров';
                if (desc) desc.innerHTML = 'Раздел пуст. Нажмите кнопку ниже, чтобы создать товар:<br><button onclick="openAddItemModal()" class="mt-3 px-3 py-1.5 bg-brand-primary text-white text-xs font-bold rounded-lg shadow-sm hover:bg-brand-secondary transition-colors inline-flex items-center gap-1.5 cursor-pointer"><i data-lucide="plus" class="w-4 h-4"></i> Добавить товар в раздел</button>';
            }
        }
    } else {
        document.getElementById('table-empty-state').classList.add('hidden');

        let displaySum = 0;

        // Рендер строк
        tableData.forEach((item, index) => {
            displaySum += item._total || 0;
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-slate-50 transition-colors group cursor-pointer';
            tr.onclick = (e) => {
                if(e.target.closest('button') || e.target.closest('.badge') || e.target.closest('img') || e.target.closest('input[type="checkbox"]')) return;
                openItemDrawer(item);
            };

            // Чекбокс строки (для админа)
            if (currentUserRole === 'admin') {
                const checkTd = document.createElement('td');
                checkTd.className = 'w-10 px-3 text-center';
                checkTd.onclick = (e) => e.stopPropagation();
                const isChecked = selectedItemIds.has(String(item.id));
                checkTd.innerHTML = `<input type="checkbox" class="bulk-item-check w-4 h-4 rounded text-brand-primary focus:ring-brand-primary border-slate-300 cursor-pointer" data-id="${item.id}" ${isChecked ? 'checked' : ''} onchange="toggleItemSelect('${item.id}', this.checked)">`;
                tr.appendChild(checkTd);
                if (isChecked) tr.classList.add('bg-blue-50/60');
            }

            visibleHeaders.forEach(header => {
                const td = document.createElement('td');
                let cellValue = item[header] || '';

                // Отображение Цвета
                if (header === 'Цвет') {
                    if (cellValue) {
                        const hex = getColorHex(cellValue);
                        cellValue = `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/80">
                            <span class="w-2.5 h-2.5 rounded-full border border-slate-300 flex-shrink-0" style="background-color: ${hex}"></span>
                            <span>${cellValue}</span>
                        </span>`;
                    } else {
                        cellValue = `<span class="text-slate-300 text-xs">—</span>`;
                    }
                }
                // Форматирование спец полей
                else if (header.includes('Фото')) {
                    if (cellValue) {
                        cellValue = `<img src="${cellValue}" class="img-preview" alt="фото" title="Нажмите, чтобы увеличить" onclick="event.stopPropagation(); openPhotoModal('${cellValue}', '${escapeHtml(item['Наименование'] || '')}')">`;
                    } else {
                        cellValue = `<div class="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-300 border border-slate-200/60 flex-shrink-0"><i data-lucide="image" class="w-5 h-5"></i></div>`;
                    }
                }
                else if (header.includes('Цена') || header.includes('Стоимость')) {
                    const num = parseFloat(String(cellValue).replace(/\s/g, '').replace(',', '.'));
                    if (!isNaN(num)) cellValue = formatCurrency(num);
                }
                else if (header.includes('Кол-во')) {
                    const num = parseFloat(String(cellValue).replace(/\s/g, '').replace(',', '.'));
                    if (!isNaN(num)) {
                        // Бэйджик для статуса
                        let badgeClass = 'badge-instock';
                        if (num <= 0) badgeClass = 'badge-outstock';
                        else if (num < 5) badgeClass = 'badge-lowstock';
                        
                        cellValue = `<div class="flex items-center justify-between gap-2">
                            <span class="badge ${badgeClass}">${num} шт</span>
                            <div class="flex items-center bg-slate-100 rounded-lg overflow-hidden border border-slate-200" onclick="event.stopPropagation()">
                                <button onclick="quickUpdateQty('${item.id}', -1)" class="w-7 h-7 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors" title="Уменьшить на 1">
                                    <i data-lucide="minus" class="w-3 h-3"></i>
                                </button>
                                <button onclick="quickUpdateQty('${item.id}', 1)" class="w-7 h-7 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors border-l border-slate-200" title="Увеличить на 1">
                                    <i data-lucide="plus" class="w-3 h-3"></i>
                                </button>
                            </div>
                        </div>`;
                    }
                }

                if (searchQuery && ['Наименование', 'Цвет', 'Характеристики', 'Примечание', 'Категория'].includes(header)) {
                    cellValue = highlightText(cellValue, searchQuery);
                }
                td.innerHTML = cellValue;

                tr.appendChild(td);
            });

            // Добавляем кнопки действий, если админ
            if (currentUserRole === 'admin') {
                const actionTd = document.createElement('td');
                actionTd.className = 'text-right px-4';
                actionTd.innerHTML = `
                    <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onclick="openWriteOffModal('${item.id}')" class="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-md transition-colors" title="Списать">
                            <i data-lucide="package-minus" class="w-4 h-4"></i>
                        </button>
                        <button onclick='editItem(${JSON.stringify(item).replace(/'/g, "&#39;")})' class="p-1.5 text-slate-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded-md transition-colors" title="Редактировать">
                            <i data-lucide="pencil" class="w-4 h-4"></i>
                        </button>
                        <button onclick="confirmDelete('${item.id}')" class="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors" title="Удалить">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                `;
                tr.appendChild(actionTd);
            }

            tbody.appendChild(tr);
        });

        // Обновление стат баров сверху
        document.getElementById('table-count').textContent = tableData.length;
        document.getElementById('table-sum').textContent = formatCurrency(displaySum);

        // Синхронизация мастер-чекбокса
        const allChecks = document.querySelectorAll('.bulk-item-check');
        const master = document.getElementById('bulk-select-all');
        if (master && allChecks.length > 0) {
            master.checked = Array.from(allChecks).every(c => c.checked);
        }
        updateBulkToolbar();
    }

    try { lucide.createIcons(); } catch(e) {}
}

// --- Обработчики массовых действий ---

function toggleItemSelect(id, checked) {
    id = String(id);
    if (checked) {
        selectedItemIds.add(id);
    } else {
        selectedItemIds.delete(id);
    }
    updateBulkToolbar();
    
    // Подсветка строки
    const checkbox = document.querySelector(`.bulk-item-check[data-id="${id}"]`);
    if (checkbox) {
        const tr = checkbox.closest('tr');
        if (tr) {
            if (checked) tr.classList.add('bg-blue-50/60');
            else tr.classList.remove('bg-blue-50/60');
        }
    }

    // Состояние мастер-чекбокса
    const allChecks = document.querySelectorAll('.bulk-item-check');
    const master = document.getElementById('bulk-select-all');
    if (master && allChecks.length > 0) {
        master.checked = Array.from(allChecks).every(c => c.checked);
    }
}

function toggleSelectAllBulk(masterCheckbox) {
    const isChecked = masterCheckbox.checked;
    const allChecks = document.querySelectorAll('.bulk-item-check');
    allChecks.forEach(cb => {
        cb.checked = isChecked;
        const id = String(cb.dataset.id);
        const tr = cb.closest('tr');
        if (isChecked) {
            selectedItemIds.add(id);
            if (tr) tr.classList.add('bg-blue-50/60');
        } else {
            selectedItemIds.delete(id);
            if (tr) tr.classList.remove('bg-blue-50/60');
        }
    });
    updateBulkToolbar();
}

function updateBulkToolbar() {
    const toolbar = document.getElementById('bulk-toolbar');
    const countEl = document.getElementById('bulk-count');
    if (!toolbar) return;
    
    const count = selectedItemIds.size;
    if (countEl) countEl.textContent = count;
    
    if (count > 0 && currentUserRole === 'admin') {
        toolbar.classList.remove('hidden');
        try { lucide.createIcons(); } catch(e) {}
    } else {
        toolbar.classList.add('hidden');
    }
}

function clearBulkSelection() {
    selectedItemIds.clear();
    const master = document.getElementById('bulk-select-all');
    if (master) master.checked = false;
    document.querySelectorAll('.bulk-item-check').forEach(cb => {
        cb.checked = false;
        const tr = cb.closest('tr');
        if (tr) tr.classList.remove('bg-blue-50/60');
    });
    updateBulkToolbar();
}

// Модалка массового списания
function openBulkWriteOffModal() {
    if (selectedItemIds.size === 0) return;
    const countEl = document.getElementById('bulk-writeoff-items-count');
    if (countEl) countEl.textContent = selectedItemIds.size;
    const qtyInput = document.getElementById('bulk-writeoff-qty');
    if (qtyInput) qtyInput.value = '';
    const noteInput = document.getElementById('bulk-writeoff-note');
    if (noteInput) noteInput.value = '';
    
    const modal = document.getElementById('bulk-writeoff-modal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        document.getElementById('bulk-writeoff-modal-content').classList.remove('scale-95');
    }, 10);
}

function closeBulkWriteOffModal() {
    const modal = document.getElementById('bulk-writeoff-modal');
    modal.classList.add('opacity-0');
    document.getElementById('bulk-writeoff-modal-content').classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 200);
}

function submitBulkWriteOff() {
    const qtyInput = document.getElementById('bulk-writeoff-qty');
    const qty = parseFloat(qtyInput ? qtyInput.value : 0);
    if (!qty || qty <= 0) {
        showToast('Укажите количество для списания', 'error');
        return;
    }
    const note = document.getElementById('bulk-writeoff-note') ? document.getElementById('bulk-writeoff-note').value.trim() : '';
    const ids = Array.from(selectedItemIds);
    
    fetch('api.php?action=bulkWriteOff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ids: ids,
            qty: qty,
            note: note,
            username: currentUserName || 'Администратор'
        })
    })
    .then(r => r.json())
    .then(res => {
        if (res.error) throw new Error(res.error);
        showToast(`Списано по ${qty} шт. с ${res.count || ids.length} позиций`, 'success');
        closeBulkWriteOffModal();
        clearBulkSelection();
        loadServerData();
    })
    .catch(err => {
        console.error('Ошибка массового списания:', err);
        showToast('Ошибка при массовом списании: ' + err.message, 'error');
    });
}

// Модалка массового перемещения
function openBulkMoveModal() {
    if (selectedItemIds.size === 0) return;
    const countEl = document.getElementById('bulk-move-items-count');
    if (countEl) countEl.textContent = selectedItemIds.size;
    
    const select = document.getElementById('bulk-move-category-select');
    if (select) {
        select.innerHTML = '';
        Object.keys(parsedData).forEach(cat => {
            if (cat === 'Дашборд' || cat === 'История') return;
            const opt = document.createElement('option');
            opt.value = cat;
            opt.textContent = cat;
            select.appendChild(opt);
        });
    }

    const modal = document.getElementById('bulk-move-modal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        document.getElementById('bulk-move-modal-content').classList.remove('scale-95');
    }, 10);
}

function closeBulkMoveModal() {
    const modal = document.getElementById('bulk-move-modal');
    modal.classList.add('opacity-0');
    document.getElementById('bulk-move-modal-content').classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 200);
}

function submitBulkMove() {
    const select = document.getElementById('bulk-move-category-select');
    const targetCategory = select ? select.value : '';
    if (!targetCategory) {
        showToast('Выберите категорию', 'error');
        return;
    }
    const ids = Array.from(selectedItemIds);
    fetch('api.php?action=bulkMoveCategory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ids: ids,
            category: targetCategory,
            username: currentUserName || 'Администратор'
        })
    })
    .then(r => r.json())
    .then(res => {
        if (res.error) throw new Error(res.error);
        showToast(`Перемещено ${res.count || ids.length} позиций в "${targetCategory}"`, 'success');
        closeBulkMoveModal();
        clearBulkSelection();
        loadServerData();
    })
    .catch(err => {
        console.error('Ошибка перемещения:', err);
        showToast('Ошибка при перемещении: ' + err.message, 'error');
    });
}

// Модалка массового удаления
function openBulkDeleteModal() {
    if (selectedItemIds.size === 0) return;
    const countEl = document.getElementById('bulk-delete-count');
    if (countEl) countEl.textContent = selectedItemIds.size;

    const modal = document.getElementById('bulk-delete-modal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        document.getElementById('bulk-delete-modal-content').classList.remove('scale-95');
    }, 10);
}

function closeBulkDeleteModal() {
    const modal = document.getElementById('bulk-delete-modal');
    modal.classList.add('opacity-0');
    document.getElementById('bulk-delete-modal-content').classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 200);
}

function submitBulkDelete() {
    const ids = Array.from(selectedItemIds);
    fetch('api.php?action=deleteItem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ids: ids,
            username: currentUserName || 'Администратор'
        })
    })
    .then(r => r.json())
    .then(res => {
        if (res.error) throw new Error(res.error);
        showToast(`Удалено ${res.count || ids.length} позиций`, 'success');
        closeBulkDeleteModal();
        clearBulkSelection();
        loadServerData();
    })
    .catch(err => {
        console.error('Ошибка удаления:', err);
        showToast('Ошибка при удалении: ' + err.message, 'error');
    });
}

// --- Поиск ---
const layoutMap = {
    'q': 'й', 'w': 'ц', 'e': 'у', 'r': 'к', 't': 'е', 'y': 'н', 'u': 'г', 'i': 'ш', 'o': 'щ', 'p': 'з', '[': 'х', ']': 'ъ',
    'a': 'ф', 's': 'ы', 'd': 'в', 'f': 'а', 'g': 'п', 'h': 'р', 'j': 'о', 'k': 'л', 'l': 'д', ';': 'ж', "'": 'э',
    'z': 'я', 'x': 'ч', 'c': 'с', 'v': 'м', 'b': 'и', 'n': 'т', 'm': 'ь', ',': 'б', '.': 'ю', '/': '.'
};
function fixLayout(str) {
    return str.split('').map(c => layoutMap[c.toLowerCase()] || c).join('');
}
function normalizeDims(str) {
    return str.replace(/[xх*XХ]/g, 'x').replace(/\s+/g, '');
}

document.getElementById('global-search').addEventListener('input', (e) => {
    let q = e.target.value.toLowerCase().trim();
    const clearBtn = document.getElementById('clear-search');
    const filtersContainer = document.getElementById('search-filters');
    
    if (q.length > 0) {
        clearBtn.classList.remove('hidden');
        if(filtersContainer) filtersContainer.classList.remove('hidden');
    } else {
        clearBtn.classList.add('hidden');
        if(filtersContainer) filtersContainer.classList.add('hidden');
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

    document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));
    document.getElementById('view-dashboard').classList.add('hidden');
    document.getElementById('view-history').classList.add('hidden');
    document.getElementById('view-category').classList.remove('hidden');

    document.getElementById('current-view-title').textContent = 'Поиск';

    const tokens = q.split(/\s+/);
    const qFixedTokens = tokens.map(t => fixLayout(t));
    const qDimTokens = tokens.map(t => normalizeDims(t));

    let range = null;
    const rangeMatch = q.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
        range = { min: parseFloat(rangeMatch[1]), max: parseFloat(rangeMatch[2]) };
    }

    let searchResults = allItems.filter(item => {
        if (range) {
            const qty = parseFloat(item._qty);
            const total = parseFloat(item._total);
            const price = parseFloat(item._price);
            if (!isNaN(qty) && qty >= range.min && qty <= range.max) return true;
            if (!isNaN(total) && total >= range.min && total <= range.max) return true;
            if (!isNaN(price) && price >= range.min && price <= range.max) return true;
            return false;
        }

        const itemText = Object.keys(item)
            .filter(k => !k.startsWith('_') && k !== 'Фото' && k !== 'id')
            .map(k => String(item[k]).toLowerCase())
            .join(' | ') + ' | ' + String(item._category).toLowerCase();
        
        const itemTextFixed = itemText.replace(/ё/g, 'е');
        const itemTextDim = normalizeDims(itemText);

        return tokens.every((token, idx) => {
            const tokenE = token.replace(/ё/g, 'е');
            return itemTextFixed.includes(tokenE) || 
                   itemText.includes(qFixedTokens[idx]) || 
                   itemTextDim.includes(qDimTokens[idx]);
        });
    });

    // Generate chips
    if (filtersContainer) {
        filtersContainer.innerHTML = '';
        
        const allBtn = document.createElement('button');
        allBtn.className = 'filter-chip active';
        allBtn.innerHTML = `Все (${searchResults.length})`;
        allBtn.onclick = () => filterSearchResults(searchResults, null, allBtn, q);
        filtersContainer.appendChild(allBtn);
        
        const instock = searchResults.filter(i => parseFloat(i._qty) > 0);
        if (instock.length > 0) {
            const inBtn = document.createElement('button');
            inBtn.className = 'filter-chip';
            inBtn.innerHTML = `В наличии (${instock.length})`;
            inBtn.onclick = () => filterSearchResults(searchResults, (i) => parseFloat(i._qty) > 0, inBtn, q);
            filtersContainer.appendChild(inBtn);
        }

        const catCounts = {};
        searchResults.forEach(i => {
            catCounts[i._category] = (catCounts[i._category] || 0) + 1;
        });
        
        Object.keys(catCounts).forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'filter-chip';
            btn.innerHTML = `${cat} (${catCounts[cat]})`;
            btn.onclick = () => filterSearchResults(searchResults, (i) => i._category === cat, btn, q);
            filtersContainer.appendChild(btn);
        });
    }

    applySearchResults(searchResults, q);
});

function filterSearchResults(fullResults, filterFn, activeBtn, q) {
    document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
    activeBtn.classList.add('active');
    
    if (filterFn) {
        applySearchResults(fullResults.filter(filterFn), q);
    } else {
        applySearchResults(fullResults, q);
    }
}

function applySearchResults(results, q) {
    tableData = results;
    
    // Correct headers based on generic fields needed
    const searchHeaders = ['Фото', 'Категория', 'Наименование', 'Характеристики', 'Кол-во', 'Цена', 'Стоимость'];
    parsedData['search_results'] = {
        headers: searchHeaders,
        items: tableData
    };
    
    tableData.forEach(item => {
        item['Категория'] = item._category;
    });

    renderTable('search_results', q);
}

document.getElementById('clear-search').addEventListener('click', () => {
    const input = document.getElementById('global-search');
    input.value = '';
    input.dispatchEvent(new Event('input'));
    input.focus();
});

// --- Утилиты ---
function formatCurrency(number) {
    if (isNaN(number)) return '0 ₽';
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
    // Делаем первую букву заглавной
    dateElement.textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
}

// --- CRUD операции ---

// Переменные для удаления
let itemToDeleteId = null;

function addGlobalActionButtons() {
    try { lucide.createIcons(); } catch(e) {}
}

// Вызовем это после рендера страницы
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


function populateCategorySelect() {
    const select = document.getElementById('item-category');
    select.innerHTML = '';
    const categories = Object.keys(parsedData).filter(c => c !== 'Дашборд');
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });
}

function openAddItemModal() {
    document.getElementById('modal-title').textContent = 'Новый товар на склад';
    updateItemFormCalc();
    document.getElementById('item-id').value = '';
    populateCategorySelect();
    const defaultCat = currentCategory && currentCategory !== 'Дашборд' ? currentCategory : 'Изделия ПВХ и Алюминий';
    document.getElementById('item-category').value = defaultCat;

    document.getElementById('item-name').value = '';
    if (document.getElementById('item-color')) document.getElementById('item-color').value = '';
    document.getElementById('item-chars').value = '';
    document.getElementById('item-qty').value = '';
    document.getElementById('item-price').value = '';
    document.getElementById('item-note').value = '';

    // Сброс полей всех режимов габаритов
    if (document.getElementById('item-width-win')) document.getElementById('item-width-win').value = '';
    if (document.getElementById('item-height-win')) document.getElementById('item-height-win').value = '';
    if (document.getElementById('item-depth-sill')) document.getElementById('item-depth-sill').value = '';
    if (document.getElementById('item-length-sill')) document.getElementById('item-length-sill').value = '';
    if (document.getElementById('item-angle-w')) document.getElementById('item-angle-w').value = '';
    if (document.getElementById('item-angle-h')) document.getElementById('item-angle-h').value = '';
    if (document.getElementById('item-angle-len')) document.getElementById('item-angle-len').value = '';
    
    handleCategoryChange(defaultCat);
    syncDimensions();

    const dropdown = document.getElementById('name-suggestions-dropdown');
    if (dropdown) dropdown.classList.add('hidden');
    currentDetectedDuplicate = null;
    hideDuplicateBanner();
    
    // Reset image preview
    document.getElementById('item-img-preview').innerHTML = `<div class="flex flex-col items-center justify-center text-slate-400 p-4">
        <i data-lucide="image-plus" class="w-8 h-8 text-slate-300 group-hover:text-brand-primary mb-1.5 transition-colors"></i>
        <p class="text-xs font-semibold text-slate-600">Нажмите для выбора фото</p>
        <p class="text-[11px] text-slate-400">JPG, PNG, WEBP</p>
    </div>`;
    document.getElementById('item-file-input').value = '';
    document.getElementById('btn-remove-photo').classList.add('hidden');
    photoRemoved = false;

    const modal = document.getElementById('item-modal');
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    try { lucide.createIcons(); } catch(e) {}
    // Небольшая задержка для анимации
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        document.getElementById('item-modal-content').classList.remove('scale-95');
    }, 10);
}

function editItem(item) {
    currentDetectedDuplicate = null;
    hideDuplicateBanner();
    document.getElementById('modal-title').textContent = 'Редактировать товар';
    document.getElementById('item-id').value = item.id;
    populateCategorySelect();
    document.getElementById('item-category').value = item._category;

    // Подставляем значения из таблицы по ключам
    document.getElementById('item-name').value = item['Наименование '] || item['Наименование'] || '';
    if (document.getElementById('item-color')) document.getElementById('item-color').value = item['Цвет'] || '';
    document.getElementById('item-chars').value = item['Характеристики'] || '';
    document.getElementById('item-qty').value = item['_qty'] || 0;

    let basePrice = item['Цена за м.кв'] || item['Цена за м.п.'] || item['Цена за штуку'] || item['Цена'] || 0;
    document.getElementById('item-price').value = parseFloat(String(basePrice).replace(/\s/g, '').replace(',', '.')) || 0;

    document.getElementById('item-note').value = item['Примечание'] || item['Заметки'] || '';
    updateItemFormCalc();

    const dropdown = document.getElementById('name-suggestions-dropdown');
    if (dropdown) dropdown.classList.add('hidden');
    currentDetectedDuplicate = null;
    hideDuplicateBanner();

    detectDimMode(item);

    // Set image preview
    const preview = document.getElementById('item-img-preview');
    const removeBtn = document.getElementById('btn-remove-photo');
    photoRemoved = false;

    if (item['Фото']) {
        preview.innerHTML = `<img src="${item['Фото']}" class="w-full max-h-48 object-contain rounded-xl shadow-xs">`;
        removeBtn.classList.remove('hidden');
    } else {
        preview.innerHTML = '<i data-lucide="image" class="w-6 h-6 text-slate-300"></i>';
        removeBtn.classList.add('hidden');
    }
    document.getElementById('item-file-input').value = '';

    const modal = document.getElementById('item-modal');
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    try { lucide.createIcons(); } catch(e) {}
    // Небольшая задержка для анимации
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
        document.body.classList.remove('modal-open');
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

    const item = allItems.find(i => String(i.id) === String(itemToDeleteId));
    
    fetch('api.php?action=deleteItem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: itemToDeleteId })
    })
        .then(res => res.json())
        .then((data) => {
            if (data.error) throw new Error(data.error);
            if (item) {
                logTransaction(item['Наименование '] || item['Наименование'], item._category, 'delete', -(item._qty || 0), 0, 'Удалён со склада');
            }
            closeDeleteModal();
            loadServerData();
        })
        .catch(err => {
            alert('Ошибка при удалении: ' + err.message);
        });
});

function saveItem() {
    console.log("=== saveItem() ВЫЗВАН ===");
    
    try {
        const saveBtn = document.getElementById('btn-save-item');
        


        const id = document.getElementById('item-id') ? document.getElementById('item-id').value : '';
        const isEditing = id !== '';
        
        const nameEl = document.getElementById('item-name');
        const catEl = document.getElementById('item-category');
        const qtyEl = document.getElementById('item-qty');
        const priceEl = document.getElementById('item-price');
        
        const nameField = nameEl.value;
        const catField = catEl.value || 'Общая';
        
        // Надежный парсинг чисел (с запятыми)
        const parseNumber = (val) => {
            if (!val) return 0;
            const parsed = parseFloat(String(val).replace(',', '.').replace(/\s/g, ''));
            return isNaN(parsed) ? 0 : parsed;
        };
        
        const qtyField = parseNumber(qtyEl.value);
        const priceField = parseNumber(priceEl.value);

        // Валидация
        [nameEl, qtyEl, priceEl].forEach(el => {
            el.style.borderColor = '';
            el.style.boxShadow = '';
        });

        if (!nameField || nameField.trim() === '') {
            nameEl.style.borderColor = '#ef4444';
            nameEl.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
            nameEl.focus();
            showToast('Введите наименование товара!', 'error');
            return;
        }

        syncDimensions();

        // Проверка на дубликат при добавлении нового товара
        if (!isEditing && !pendingForceSave) {
            const candidate = {
                name: nameField,
                category: catField,
                color: document.getElementById('item-color') ? document.getElementById('item-color').value.trim() : '',
                width: document.getElementById('item-width')?.value || '',
                height: document.getElementById('item-height')?.value || '',
                length: document.getElementById('item-length') ? document.getElementById('item-length').value.trim() : ''
            };
            const duplicate = findDuplicateItem(candidate);
            if (duplicate) {
                currentDetectedDuplicate = duplicate;
                openDuplicateModal(duplicate, qtyField, priceField);
                return;
            }
        }

        // Показываем загрузку
        if (saveBtn) {
            saveBtn.disabled = true;
            saveBtn.innerHTML = '<svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.25"></circle><path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor"></path></svg> Сохранение...';
            saveBtn.style.opacity = '0.7';
        }

        syncDimensions();
        const itemData = {
            category: catField,
            name: nameField,
            color: document.getElementById('item-color') ? document.getElementById('item-color').value.trim() : '',
            characteristics: document.getElementById('item-chars').value || '',
            width: document.getElementById('item-width').value || '',
            height: document.getElementById('item-height').value || '',
            length: document.getElementById('item-length') ? document.getElementById('item-length').value.trim() : '',
            quantity: qtyField,
            price: priceField,
            note: document.getElementById('item-note').value || '',
            total: priceField * qtyField,
            username: 'Админ'
        };

        console.log("itemData:", JSON.stringify(itemData));

        const oldQty = isEditing ? (allItems.find(i => String(i.id) === String(id))?._qty || 0) : 0;
        const qtyDiff = itemData.quantity - oldQty;

        const resetBtn = () => {
            if (saveBtn) {
                saveBtn.disabled = false;
                saveBtn.innerHTML = '<i data-lucide="save" class="w-4 h-4"></i> Сохранить';
                saveBtn.style.opacity = '1';
                try { lucide.createIcons(); } catch(e) {}
            }
        };

        // --- Оптимистичное обновление UI (СРАЗУ, не дожидаясь Firebase) ---
        const optimisticUpdate = () => {
            try {
                const ni = {
                    'Наименование ': itemData.name,
                    'Наименование': itemData.name,
                    'Цвет': itemData.color,
                    'Характеристики': itemData.characteristics,
                    'Ширина': itemData.width,
                    'Длина/Высота': itemData.height,
                    'Высота': itemData.height,
                    'Длина': itemData.length,
                    '_length': itemData.length,
                    'Кол-во': itemData.quantity,
                    'Цена': itemData.price,
                    'Стоимость': itemData.total,
                    'Примечание': itemData.note,
                    'Фото': itemData.image || '',
                    '_qty': itemData.quantity,
                    '_price': itemData.price,
                    '_total': itemData.total,
                    '_category': itemData.category
                };

                if (!parsedData[itemData.category]) {
                    parsedData[itemData.category] = { headers: ["Наименование", "Характеристики", "Ширина", "Длина/Высота", "Кол-во", "Цена", "Стоимость", "Примечание", "Фото"], items: [] };
                }

                if (isEditing) {
                    ni.id = id;
                    const allIdx = allItems.findIndex(i => String(i.id) === String(id));
                    if (allIdx !== -1) {
                        const oldItem = allItems[allIdx];
                        if (oldItem._category !== itemData.category) {
                            if (parsedData[oldItem._category]) {
                                parsedData[oldItem._category].items = parsedData[oldItem._category].items.filter(i => String(i.id) !== String(id));
                            }
                            parsedData[itemData.category].items.unshift(ni);
                        } else {
                            const catItems = parsedData[itemData.category].items;
                            const catIdx = catItems.findIndex(i => String(i.id) === String(id));
                            if (catIdx !== -1) catItems[catIdx] = ni;
                        }
                        allItems[allIdx] = ni;
                    }
                } else {
                    ni.id = 'tmp_' + Date.now();
                    parsedData[itemData.category].items.unshift(ni);
                    allItems.unshift(ni);
                }

                if (currentCategory === itemData.category || currentCategory === 'Дашборд') {
                    if (currentCategory !== 'Дашборд') {
                        tableData = [...parsedData[currentCategory].items];
                        renderTable(currentCategory);
                    }
                }
                
                buildNavigation();
                updateDashboard();
                console.log("Оптимистичное обновление UI завершено");
            } catch(e) { console.warn("optimistic update error", e); }
        };

        // СНАЧАЛА закрываем модалку и обновляем UI локально
        try { closeItemModal(); } catch(e) {}
        optimisticUpdate();
        resetBtn();
        
        const formData = new FormData();
        if (isEditing && !id.startsWith('tmp_')) formData.append('id', id);
        formData.append('category', itemData.category);
        formData.append('name', itemData.name);
        formData.append('color', itemData.color);
        formData.append('characteristics', itemData.characteristics);
        formData.append('width', itemData.width);
        formData.append('height', itemData.height);
        formData.append('length', itemData.length);
        formData.append('quantity', itemData.quantity);
        formData.append('price', itemData.price);
        formData.append('total', itemData.total);
        formData.append('note', itemData.note);
        
        if (typeof photoRemoved !== 'undefined' && photoRemoved && isEditing) {
            formData.append('image', '');
        }

        const fileInput = document.getElementById('item-file-input');
        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            formData.append('image_file', fileInput.files[0]);
        }

        const actionName = isEditing && !id.startsWith('tmp_') ? 'updateItem' : 'addItem';
        
        fetch(`api.php?action=${actionName}`, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(result => {
            if (result.error) throw new Error(result.error);
            console.log("✅ API: сохранено успешно!");
            try {
                if (isEditing && qtyDiff !== 0) {
                    logTransaction(itemData.name, itemData.category, qtyDiff > 0 ? 'income' : 'outcome', qtyDiff, itemData.quantity, itemData.note);
                } else if (!isEditing) {
                    logTransaction(itemData.name, itemData.category, 'add', itemData.quantity, itemData.quantity, 'Новый товар');
                }
            } catch(e) { console.warn("logTransaction error:", e); }

            showToast(isEditing ? '✅ Товар обновлён!' : '✅ Товар добавлен!', 'success');
            
            // Перезагрузить данные с сервера только если всё ок
            try { loadServerData(); } catch(e) { console.warn(e); }
        })
        .catch(err => {
            console.error("❌ API ошибка:", err);
            showToast('❌ Ошибка сохранения: ' + err.message, 'error');
        });
    } catch (e) {
        showToast('Критическая ошибка: ' + (e.message || e), 'error');
        console.error('saveItem error:', e);
        const saveBtn = document.getElementById('btn-save-item');
        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = '<i data-lucide="save" class="w-4 h-4"></i> Сохранить';
            saveBtn.style.opacity = '1';
            try { lucide.createIcons(); } catch(e2) {}
        }
    }
}

// === Toast-уведомления ===
function showToast(message, type) {
    // type: 'success', 'error', 'info'
    const existing = document.getElementById('oko-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'oko-toast';
    toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);z-index:99999;padding:12px 24px;border-radius:12px;font-size:14px;font-weight:600;color:white;box-shadow:0 8px 32px rgba(0,0,0,0.2);transition:opacity 0.3s,transform 0.3s;opacity:0;transform:translateX(-50%) translateY(-10px);max-width:90vw;text-align:center;';
    
    if (type === 'success') {
        toast.style.background = 'linear-gradient(135deg, #059669, #10b981)';
    } else if (type === 'error') {
        toast.style.background = 'linear-gradient(135deg, #dc2626, #ef4444)';
    } else {
        toast.style.background = 'linear-gradient(135deg, #2563eb, #3b82f6)';
    }
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Показываем
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    
    // Скрываем через 3 секунды
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(-10px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('item-img-preview').innerHTML = `<img src="${e.target.result}" class="w-full max-h-48 object-contain rounded-xl shadow-xs">`;
            document.getElementById('btn-remove-photo').classList.remove('hidden');
            photoRemoved = false;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function removePhoto() {
    document.getElementById('item-file-input').value = '';
    document.getElementById('item-img-preview').innerHTML = `<div class="flex flex-col items-center justify-center text-slate-400 p-4">
        <i data-lucide="image-plus" class="w-8 h-8 text-slate-300 group-hover:text-brand-primary mb-1.5 transition-colors"></i>
        <p class="text-xs font-semibold text-slate-600">Нажмите для выбора фото</p>
        <p class="text-[11px] text-slate-400">JPG, PNG, WEBP</p>
    </div>`;
    document.getElementById('btn-remove-photo').classList.add('hidden');
    photoRemoved = true;
    try { lucide.createIcons(); } catch(e) {}
}

function quickUpdateQty(id, delta) {
    const item = allItems.find(i => i.id == id);
    if (!item) return;

    const newQty = (parseFloat(item._qty) || 0) + delta;
    if (newQty < 0) return;

    const newTotal = newQty * (parseFloat(item._price) || 0);

    // Оптимистичное обновление UI
    item._qty = newQty;
    item['Кол-во'] = newQty;
    item._total = newTotal;
    item['Стоимость'] = newTotal;

    if (currentCategory === item._category || currentCategory === 'Дашборд') {
        if (currentCategory !== 'Дашборд') {
            tableData = [...parsedData[currentCategory].items];
            renderTable(currentCategory);
        }
        updateDashboard();
    }

    const formData = new FormData();
    formData.append('id', id);
    formData.append('category', item._category);
    formData.append('name', item['Наименование '] || item['Наименование']);
    formData.append('characteristics', item['Характеристики'] || '');
    formData.append('width', item['Ширина'] || '');
    formData.append('height', item['Длина/Высота'] || '');
    formData.append('quantity', newQty);
    formData.append('price', item._price || 0);
    formData.append('total', newTotal);
    formData.append('note', item['Примечание'] || '');

    fetch('api.php?action=updateItem', {
        method: 'POST',
        body: formData
    }).then(res => res.json()).then(result => {
        if (result.error) throw new Error(result.error);
        const action = delta > 0 ? 'income' : 'outcome';
        logTransaction(item['Наименование '] || item['Наименование'], item._category, action, delta, newQty, "Быстрая правка");
    }).catch(err => {
        console.error("quickUpdateQty error:", err);
    });
}

function openWriteOffModal(id) {
    const item = allItems.find(i => i.id == id);
    if (!item) return;
    
    document.getElementById('writeoff-item-id').value = id;
    document.getElementById('writeoff-qty').value = '';
    document.getElementById('writeoff-note').value = '';
    
    const modal = document.getElementById('writeoff-modal');
    const content = document.getElementById('writeoff-modal-content');
    
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        content.classList.remove('scale-95');
    }, 10);
}

function closeWriteOffModal() {
    const modal = document.getElementById('writeoff-modal');
    const content = document.getElementById('writeoff-modal-content');
    
    modal.classList.add('opacity-0');
    content.classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

function submitWriteOff() {
    const id = document.getElementById('writeoff-item-id').value;
    const qtyInput = document.getElementById('writeoff-qty').value;
    const note = document.getElementById('writeoff-note').value || 'Списание';
    
    const delta = parseFloat(qtyInput);
    if (isNaN(delta) || delta <= 0) {
        showToast("Введите корректное количество", "error");
        return;
    }
    
    const item = allItems.find(i => i.id == id);
    if (!item) return;

    const newQty = (parseFloat(item._qty) || 0) - delta;
    if (newQty < 0) {
        showToast("Количество к списанию превышает остаток", "error");
        return;
    }

    const newTotal = newQty * (parseFloat(item._price) || 0);

    // Оптимистичное обновление UI
    item._qty = newQty;
    item['Кол-во'] = newQty;
    item._total = newTotal;
    item['Стоимость'] = newTotal;

    if (currentCategory === item._category || currentCategory === 'Дашборд') {
        if (currentCategory !== 'Дашборд') {
            tableData = [...parsedData[currentCategory].items];
            renderTable(currentCategory);
        }
        updateDashboard();
    }

    const formData = new FormData();
    formData.append('id', id);
    formData.append('category', item._category);
    formData.append('name', item['Наименование '] || item['Наименование']);
    formData.append('characteristics', item['Характеристики'] || '');
    formData.append('width', item['Ширина'] || '');
    formData.append('height', item['Длина/Высота'] || '');
    formData.append('quantity', newQty);
    formData.append('price', item._price || 0);
    formData.append('total', newTotal);
    formData.append('note', item['Примечание'] || '');

    fetch('api.php?action=updateItem', {
        method: 'POST',
        body: formData
    }).then(res => res.json()).then(result => {
        if (result.error) throw new Error(result.error);
        logTransaction(item['Наименование '] || item['Наименование'], item._category, 'writeoff', -delta, newQty, note);
        closeWriteOffModal();
        showToast("Товар успешно списан", "success");
    }).catch(err => {
        console.error("writeoff error:", err);
        showToast("Ошибка при списании", "error");
    });
}

// Добавим стили для анимации ошибки
const style = document.createElement('style');
style.textContent =
    "@keyframes shake {\n" +
    "    0%, 100% { transform: translateX(0); }\n" +
    "    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }\n" +
    "    20%, 40%, 60%, 80% { transform: translateX(5px); }\n" +
    "}\n" +
    ".animate-shake {\n" +
    "    animation: shake 0.5s;\n" +
    "}\n" +
    "@keyframes spin {\n" +
    "    to { transform: rotate(360deg); }\n" +
    "}\n" +
    ".animate-spin {\n" +
    "    animation: spin 1s linear infinite;\n" +
    "}\n";
document.head.appendChild(style);



// --- Slide-over Drawer ---
function openItemDrawer(item) {
    const drawer = document.getElementById('item-drawer');
    const overlay = document.getElementById('drawer-overlay');
    const content = document.getElementById('drawer-content');
    const footer = document.getElementById('drawer-footer');
    
    if (!drawer || !overlay) return;

    let photoHtml = '';
    if (item['Фото']) {
        photoHtml = `<div class="relative group cursor-zoom-in mb-4 rounded-xl overflow-hidden border border-slate-200 bg-slate-50" onclick="openPhotoModal('${item['Фото']}', '${escapeHtml(item['Наименование'] || '')}')">
            <img src="${item['Фото']}" class="w-full max-h-64 object-contain rounded-xl transition-transform group-hover:scale-102">
            <div class="absolute bottom-2 right-2 px-2.5 py-1 bg-slate-900/70 backdrop-blur-xs text-white rounded-lg text-xs font-medium flex items-center gap-1 shadow-sm opacity-90 group-hover:opacity-100 transition-opacity">
                <i data-lucide="zoom-in" class="w-3.5 h-3.5"></i> Увеличить
            </div>
        </div>`;
    } else {
        photoHtml = `<div class="w-full h-32 bg-slate-100 rounded-xl mb-4 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200"><i data-lucide="image" class="w-8 h-8 mb-2"></i><span class="text-sm font-medium">Нет фото</span></div>`;
    }

    let qtyStr = parseFloat(item._qty || 0);
    let badgeClass = 'badge-instock';
    if (qtyStr <= 0) badgeClass = 'badge-outstock';
    else if (qtyStr < 5) badgeClass = 'badge-lowstock';

    content.innerHTML = `
        ${photoHtml}
        <div class="mb-4">
            <span class="text-xs font-bold text-brand-primary uppercase tracking-widest">${item._category}</span>
            <h2 class="text-xl font-bold text-slate-800 leading-tight mt-1 mb-2">${item['Наименование'] || 'Без названия'}</h2>
            <div class="flex flex-wrap gap-2 mb-2">
                <span class="badge ${badgeClass} text-sm px-3 py-1">${qtyStr} шт</span>
                <span class="badge bg-slate-100 text-slate-600 border border-slate-200 text-sm px-3 py-1">${formatCurrency(parseFloat(item._price || 0))} / шт</span>
            </div>
            ${item['Характеристики'] ? `<p class="text-sm text-slate-600 mt-2 bg-white p-3 rounded-lg border border-slate-100"><span class="font-semibold text-slate-800">Описание:</span><br>${item['Характеристики']}</p>` : ''}
        </div>
        
        <div class="grid grid-cols-3 gap-2.5 mb-4">
            <div class="bg-white p-2.5 rounded-lg border border-slate-100">
                <p class="text-[10px] uppercase font-bold text-slate-400 mb-1">Цвет</p>
                <p class="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5 truncate">
                    ${item['Цвет'] ? `<span class="w-3 h-3 rounded-full border border-slate-300 inline-block flex-shrink-0" style="background-color: ${getColorHex(item['Цвет'])};"></span><span title="${item['Цвет']}">${item['Цвет']}</span>` : '—'}
                </p>
            </div>
            ${(() => {
                const cat = item._category || '';
                const nm = (item['Наименование'] || '').toLowerCase();
                const w = item['Ширина'] || '';
                const h = item['Высота'] || item['Длина/Высота'] || '';
                const len = item['Длина'] || item._length || '';

                let lbl1 = 'Ширина', val1 = w;
                let lbl2 = 'Высота', val2 = h;

                if (cat === 'Отливы' || cat === 'Подоконники' || nm.includes('отлив') || nm.includes('подоконник') || nm.includes('козырек')) {
                    lbl1 = 'Глубина/Полка';
                    lbl2 = 'Длина';
                    val2 = len || h;
                } else if (cat === 'Декор жесть' || nm.includes('уголок') || nm.includes('профиль') || (w && (w.includes('×') || w.includes('*')))) {
                    lbl1 = 'Сечение';
                    lbl2 = 'Длина';
                    val2 = len || h;
                }

                if (!val1 && !val2) {
                    return `<div class="bg-white p-2.5 rounded-lg border border-slate-100 col-span-2">
                        <p class="text-[10px] uppercase font-bold text-slate-400 mb-1">Размеры</p>
                        <p class="text-xs sm:text-sm font-semibold text-slate-500">Штучный / Без размеров</p>
                    </div>`;
                }

                return `
                <div class="bg-white p-2.5 rounded-lg border border-slate-100">
                    <p class="text-[10px] uppercase font-bold text-slate-400 mb-1">${lbl1}</p>
                    <p class="text-xs sm:text-sm font-semibold text-slate-800">${val1 || '—'}${val1 && !isNaN(val1) ? ' мм' : ''}</p>
                </div>
                <div class="bg-white p-2.5 rounded-lg border border-slate-100">
                    <p class="text-[10px] uppercase font-bold text-slate-400 mb-1">${lbl2}</p>
                    <p class="text-xs sm:text-sm font-semibold text-slate-800">${val2 || '—'}${val2 && !isNaN(val2) ? ' мм' : ''}</p>
                </div>`;
            })()}
        </div>

        ${item['Примечание'] ? `<div class="bg-amber-50 p-3 rounded-lg border border-amber-100 mb-4 text-amber-800 text-sm"><i data-lucide="info" class="w-4 h-4 inline-block mr-1 -mt-0.5"></i>${item['Примечание']}</div>` : ''}
        
        <div class="mt-2 bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
                <p class="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Общая стоимость</p>
                <p class="text-lg font-bold text-brand-secondary">${formatCurrency(parseFloat(item._total || 0))}</p>
            </div>
            <div class="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center text-brand-secondary">
                <i data-lucide="calculator" class="w-5 h-5"></i>
            </div>
        </div>
    `;

    footer.innerHTML = '';
    if (currentUserRole === 'admin') {
        footer.innerHTML = `
            <button onclick="closeDrawer(); openWriteOffModal('${item.id}')" class="flex-1 py-3 bg-amber-50 text-amber-600 font-bold rounded-xl hover:bg-amber-100 transition-colors flex items-center justify-center gap-2">
                <i data-lucide="package-minus" class="w-4 h-4"></i> Списать
            </button>
            <button onclick='closeDrawer(); editItem(${JSON.stringify(item).replace(/'/g, "&#39;")})' class="flex-1 py-3 bg-brand-primary text-white font-bold rounded-xl hover:bg-[#48b2d6] transition-colors flex items-center justify-center gap-2 shadow-sm">
                <i data-lucide="pencil" class="w-4 h-4"></i> Изменить
            </button>
        `;
    }

    drawer.classList.add('open');
    overlay.classList.add('open');
    try { lucide.createIcons(); } catch(e) {}
}

function closeDrawer() {
    const drawer = document.getElementById('item-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if(drawer) drawer.classList.remove('open');
    if(overlay) overlay.classList.remove('open');
}
