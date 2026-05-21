/* ==========================================
   Sklad — Основная логика
   ========================================== */

// --- Данные ---
let parsedData = {};
let currentCategory = 'Склад ВСЁ';
let allItems = []; // Плоский массив для глобального поиска

// Иконки для категорий
const categoryIcons = {
    'Склад ВСЁ': 'package',
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
    lucide.createIcons();
    updateDate();

    // Проверка авторизации
    checkAuthStatus();
});

// --- Парсинг данных с сервера ---
function loadServerData() {
    fetch('/api/items')
        .then(response => {
            if (!response.ok) {
                console.log('Пользователь не авторизован или ошибка сервера');
                return [];
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                parseServerData(data);
            }
        })
        .catch(err => console.error('Ошибка загрузки данных:', err));
}

function parseServerData(dataList) {
    parsedData = {};
    allItems = [];

    // Список стандартных заголовков для таблиц
    const defaultHeaders = [
        "Наименование", "Характеристики", "Ширина", "Длина/Высота",
        "Кол-во", "Цена", "Стоимость", "Примечание", "Фото"
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
            'Наименование': item.name,
            'Характеристики': item.characteristics || '',
            'Ширина': item.width || '',
            'Длина/Высота': item.height || '',
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

    buildNavigation();
    updateDashboard();

    // Если мы уже выбрали категорию, рендерим таблицу
    if (currentCategory !== 'Дашборд') {
        tableData = [...parsedData[currentCategory].items];
        renderTable(currentCategory);
    }
}

// --- Авторизация ---
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
        subtitle.textContent = 'Войдите в систему для управления складом';
        submitBtn.textContent = 'Войти в систему';
    } else {
        btnRegister.className = 'flex-1 py-2 text-sm font-semibold text-white bg-white/20 rounded-lg shadow-sm transition-all';
        btnLogin.className = 'flex-1 py-2 text-sm font-semibold text-white/50 hover:text-white transition-all rounded-lg';
        subtitle.textContent = 'Обратитесь к Администратору для регистрации';
        submitBtn.textContent = 'Только Вход'; // Регистрация с клиента пока отключена для безопасности
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

    const username = document.getElementById('auth-username').value.trim();
    const password = document.getElementById('auth-password').value;

    if (!username || !password) return;

    if (authMode === 'register') {
        showAuthError('Регистрация новых сотрудников временно закрыта. Обратитесь к админу.');
        return;
    }

    // Запрос к серверу
    fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                loginUser(data.username, data.role);
            } else {
                showAuthError(data.message || 'Ошибка авторизации');
            }
        })
        .catch(err => {
            showAuthError('Сервер недоступен. Проверьте подключение.');
        });
}

function showAuthError(msg) {
    const errorDiv = document.getElementById('auth-error');
    const errorMsg = document.getElementById('auth-error-msg');
    errorMsg.textContent = msg;
    errorDiv.classList.remove('hidden');

    // Анимация тряски
    const form = document.querySelector('#auth-screen .bg-white\\/10');
    form.classList.add('animate-shake');
    setTimeout(() => {
        form.classList.remove('animate-shake');
    }, 500);
}

function loginUser(username, role) {
    currentUserRole = role;

    // Обновляем UI
    document.getElementById('current-username').textContent = username + (role === 'admin' ? ' (Админ)' : '');
    document.getElementById('user-initial').textContent = username.charAt(0).toUpperCase();

    // Прячем экран авторизации, показываем приложение
    const authScreen = document.getElementById('auth-screen');
    authScreen.style.opacity = '0';
    setTimeout(() => {
        authScreen.classList.add('hidden');
        document.getElementById('app-screen').classList.remove('hidden');

        loadServerData();
    }, 300);
}

function checkAuthStatus() {
    fetch('/api/auth/me')
        .then(res => res.json())
        .then(data => {
            if (data.authenticated) {
                // Прячем экран авторизации, показываем приложение
                document.getElementById('auth-screen').classList.add('hidden');
                document.getElementById('app-screen').classList.remove('hidden');

                currentUserRole = data.role;
                document.getElementById('current-username').textContent = data.username + (data.role === 'admin' ? ' (Админ)' : '');
                document.getElementById('user-initial').textContent = data.username.charAt(0).toUpperCase();

                loadServerData();
            } else {
                document.getElementById('auth-screen').style.opacity = '1';
                document.getElementById('auth-screen').classList.remove('hidden');
            }
        })
        .catch(err => {
            console.log('Нет связи с сервером', err);
        });
}

function logout() {
    fetch('/api/auth/logout', { method: 'POST' }).then(() => {
        currentUserRole = 'employee';

        document.getElementById('auth-username').value = '';
        document.getElementById('auth-password').value = '';
        document.getElementById('auth-error').classList.add('hidden');

        document.getElementById('app-screen').classList.add('hidden');
        const authScreen = document.getElementById('auth-screen');
        authScreen.classList.remove('hidden');

        // Небольшая задержка для плавного появления
        setTimeout(() => {
            authScreen.style.opacity = '1';
        }, 10);

        switchAuthTab('login');
    });
}

// --- UI Логика: Навигация и Дашборд ---

function buildNavigation() {
    const navContainer = document.getElementById('nav-categories');
    navContainer.innerHTML = '';

    // Разделитель
    const divider = document.createElement('div');
    divider.className = 'text-xs font-bold text-slate-400 uppercase tracking-wider mt-4 mb-2 px-3 py-1';
    divider.textContent = 'Категории товаров';
    navContainer.appendChild(divider);

    // Категории
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

    // Обновляем главные цифры
    document.getElementById('dash-total-value').textContent = formatCurrency(totalValue);
    document.getElementById('dash-total-items').textContent = totalItems.toLocaleString('ru-RU');
    document.getElementById('dash-total-qty').textContent = parseFloat(totalQty.toFixed(2)).toLocaleString('ru-RU');
    document.getElementById('dash-total-categories').textContent = activeCategoriesCount;

    // Сортируем категории по стоимости и выводим карточки
    categoriesList.sort((a, b) => b.sum - a.sum);

    const grid = document.getElementById('dash-category-grid');
    grid.innerHTML = '';

    categoriesList.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'border border-slate-100 rounded-xl p-4 bg-white hover:border-brand-primary/30 hover:shadow-md transition-all cursor-pointer group';
        card.onclick = () => {
            // Ищем нужную кнопку в сайдбаре и кликаем
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
            '<span class="text-xs text-slate-400 font-medium bg-slate-50 px-2 py-0.5 rounded-md">' + cat.count + ' поз.</span>' +
            '</div>' +
            '</div>' +
            '<h4 class="font-bold text-slate-800 mb-1 truncate" title="' + cat.name + '">' + cat.name + '</h4>' +
            '<div class="flex justify-between items-end">' +
            '<p class="text-[11px] text-slate-500">Остаток: <span class="font-bold text-slate-700">' + parseFloat(cat.qty.toFixed(2)) + '</span></p>' +
            '<p class="font-bold text-brand-primary">' + formatCurrency(cat.sum) + '</p>' +
            '</div>';
        grid.appendChild(card);
    });

    lucide.createIcons();
}

function showDashboard() {
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
    }
}

function showHistory() {
    // Сброс активного класса в меню
    document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));
    document.getElementById('nav-history').classList.add('active');

    // Переключение View
    document.getElementById('view-dashboard').classList.add('hidden');
    document.getElementById('view-category').classList.add('hidden');

    const histView = document.getElementById('view-history');
    histView.classList.remove('hidden');
    
    document.getElementById('current-view-title').textContent = 'Журнал операций';
    
    loadHistory();

    // Закрываем мобильное меню
    if (window.innerWidth < 768) {
        document.getElementById('sidebar').classList.add('hidden');
    }
}

function loadHistory() {
    fetch('/api/history')
        .then(res => res.json())
        .then(data => renderHistory(data))
        .catch(err => console.error('Ошибка загрузки истории:', err));
}

function renderHistory(data) {
    const container = document.getElementById('history-container');
    container.innerHTML = '';
    
    if (!data.length) {
        container.innerHTML = '<div class="text-center py-20 text-slate-400">История пуста</div>';
        return;
    }

    data.forEach(item => {
        const date = new Date(item.created_at).toLocaleString('ru-RU');
        const div = document.createElement('div');
        div.className = `history-item ${item.action}`;
        
        let actionText = '';
        let icon = 'info';
        
        switch(item.action) {
            case 'add': actionText = 'Добавлен товар'; icon = 'plus-circle'; break;
            case 'income': actionText = 'Приход товара'; icon = 'trending-up'; break;
            case 'outcome': actionText = 'Расход товара'; icon = 'trending-down'; break;
            case 'delete': actionText = 'Удаление'; icon = 'trash-2'; break;
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
            <div class="mt-1 text-[10px] text-slate-400 font-medium">Пользователь: ${item.username}</div>
        `;
        container.appendChild(div);
    });
    lucide.createIcons();
}

// --- Таблица и Сортировка ---

let tableData = [];
let sortCol = '';
let sortAsc = true;
let photoRemoved = false; // Флаг удаления фото

function showCategory(category, btnElement) {
    currentCategory = category;

    // Активация кнопки
    document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');

    // Переключение View
    document.getElementById('view-dashboard').classList.add('hidden');
    document.getElementById('view-history').classList.add('hidden');

    const catView = document.getElementById('view-category');
    catView.classList.remove('hidden');
    catView.classList.remove('fade-in'); // Сброс анимации
    void catView.offsetWidth; // Триггер рефлоу
    catView.classList.add('fade-in');

    document.getElementById('current-view-title').textContent = category;

    // Подготовка данных
    tableData = [...parsedData[category].items];
    sortCol = '';

    renderTable(category);

    // Сброс поиска
    document.getElementById('global-search').value = '';

    // Закрываем мобильное меню
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

function renderTable(categoryName) {
    const data = parsedData[categoryName];
    if (!data) return;

    // Исключаем внутренние поля из отображения заголовков
    const visibleHeaders = data.headers.filter(h => !h.startsWith('_'));

    const thRow = document.getElementById('table-header-row');
    thRow.innerHTML = '';

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

        th.innerHTML = '<div class="flex items-center gap-1">' + header + ' ' + sortIcon + '</div>';
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
        document.getElementById('table-empty-state').classList.remove('hidden');
    } else {
        document.getElementById('table-empty-state').classList.add('hidden');

        let displaySum = 0;

        // Рендер строк
        tableData.forEach((item, index) => {
            displaySum += item._total || 0;
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-slate-50 transition-colors group';

            visibleHeaders.forEach(header => {
                const td = document.createElement('td');
                let cellValue = item[header] || '';

                // Форматирование спец полей
                if (header.includes('Фото')) {
                    if (cellValue) {
                        cellValue = `<img src="${cellValue}" class="img-preview" alt="фото">`;
                    } else {
                        cellValue = `<div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-300"><i data-lucide="image" class="w-5 h-5"></i></div>`;
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
                        
                        cellValue = `<span class="badge ${badgeClass}">${num} шт</span>`;
                    }
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
                        <button onclick='editItem(${JSON.stringify(item).replace(/'/g, "&#39;")})' class="p-1.5 text-slate-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded-md transition-colors" title="Редактировать">
                            <i data-lucide="pencil" class="w-4 h-4"></i>
                        </button>
                        <button onclick='confirmDelete(${item.id})' class="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors" title="Удалить">
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
    }

    lucide.createIcons();
}

// --- Поиск ---
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

    // Глобальный поиск
    document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));
    document.getElementById('view-dashboard').classList.add('hidden');
    document.getElementById('view-history').classList.add('hidden');
    document.getElementById('view-category').classList.remove('hidden');

    document.getElementById('current-view-title').textContent = 'Поиск: "' + q + '"';

    // Проверка на диапазон (например 10-50)
    let range = null;
    const rangeMatch = q.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
        range = { min: parseFloat(rangeMatch[1]), max: parseFloat(rangeMatch[2]) };
    }

    tableData = allItems.filter(item => {
        // Если это диапазон — ищем по числам (Кол-во или Стоимость)
        if (range) {
            const qty = parseFloat(item._qty);
            const total = parseFloat(item._total);
            const price = parseFloat(item._price);
            if (!isNaN(qty) && qty >= range.min && qty <= range.max) return true;
            if (!isNaN(total) && total >= range.min && total <= range.max) return true;
            if (!isNaN(price) && price >= range.min && price <= range.max) return true;
            return false;
        }

        // Обычный поиск по всем полям
        for (const key in item) {
            if (key.startsWith('_')) continue;
            const val = String(item[key]).toLowerCase();
            if (val.includes(q)) return true;
        }
        return false;
    });

    const searchHeaders = ['Категория', 'Наименование ', 'Описание', 'Кол-во', 'Стоимость '];
    parsedData['search_results'] = {
        headers: searchHeaders,
        items: tableData
    };

    tableData.forEach(item => {
        item['Категория'] = item._category;
    });

    renderTable('search_results');
});

document.getElementById('clear-search').addEventListener('click', () => {
    const input = document.getElementById('global-search');
    input.value = '';
    input.dispatchEvent(new Event('input')); // триггер события
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
    // Вставляем кнопку добавления в заголовок категории, если админ
    const actionContainer = document.querySelector('#view-category > div.px-5.py-3');

    // Удаляем старую кнопку если есть
    const oldBtn = document.getElementById('btn-add-item');
    if (oldBtn) oldBtn.remove();

    if (currentUserRole === 'admin' && actionContainer) {
        const btnContainer = document.createElement('div');
        btnContainer.id = 'btn-add-item';
        btnContainer.innerHTML = `
            <button onclick="openAddItemModal()" class="px-3 py-1.5 bg-brand-primary text-white text-sm font-bold rounded-lg shadow-sm hover:bg-[#48b2d6] transition-colors flex items-center gap-2">
                <i data-lucide="plus" class="w-4 h-4"></i>
                Добавить товар
            </button>
        `;
        actionContainer.appendChild(btnContainer);
    }
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


function openAddItemModal() {
    document.getElementById('modal-title').textContent = 'Новый товар';
    document.getElementById('item-id').value = '';
    document.getElementById('item-category').value = currentCategory || 'Общая';

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
    // Небольшая задержка для анимации
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        document.getElementById('item-modal-content').classList.remove('scale-95');
    }, 10);
}

function editItem(item) {
    document.getElementById('modal-title').textContent = 'Редактировать товар';
    document.getElementById('item-id').value = item.id;
    document.getElementById('item-category').value = item._category;

    // Подставляем значения из таблицы по ключам
    document.getElementById('item-name').value = item['Наименование '] || item['Наименование'] || '';
    document.getElementById('item-chars').value = item['Характеристики'] || '';
    document.getElementById('item-width').value = item['Ширина'] || '';
    document.getElementById('item-height').value = item['Высота'] || item['Длина'] || '';
    document.getElementById('item-qty').value = item['_qty'] || 0;

    let basePrice = item['Цена за м.кв'] || item['Цена за м.п.'] || item['Цена за штуку'] || item['Цена'] || 0;
    document.getElementById('item-price').value = parseFloat(String(basePrice).replace(/\s/g, '').replace(',', '.')) || 0;

    document.getElementById('item-note').value = item['Примечание'] || item['Заметки'] || '';

    // Set image preview
    const preview = document.getElementById('item-img-preview');
    const removeBtn = document.getElementById('btn-remove-photo');
    photoRemoved = false;

    if (item['Фото']) {
        preview.innerHTML = `<img src="${item['Фото']}" class="w-full h-full object-cover">`;
        removeBtn.classList.remove('hidden');
    } else {
        preview.innerHTML = '<i data-lucide="image" class="w-6 h-6 text-slate-300"></i>';
        removeBtn.classList.add('hidden');
    }
    document.getElementById('item-file-input').value = '';

    const modal = document.getElementById('item-modal');
    modal.classList.remove('hidden');
    lucide.createIcons();
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

    fetch('/api/items/' + itemToDeleteId, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                closeDeleteModal();
                loadServerData(); // Перезагружаем данные с сервера
            } else {
                alert('Ошибка при удалении: ' + data.message);
            }
        })
        .catch(err => {
            alert('Ошибка связи с сервером');
        });
});

function saveItem() {
    // Собираем данные
    const id = document.getElementById('item-id').value;
    const category = document.getElementById('item-category').value;
    const fileInput = document.getElementById('item-file-input');

    // Формируем JSON объект для отправки
    const itemData = {
        category: category,
        name: document.getElementById('item-name').value,
        characteristics: document.getElementById('item-chars').value,
        width: document.getElementById('item-width').value,
        length: document.getElementById('item-height').value,
        quantity: parseFloat(document.getElementById('item-qty').value) || 0,
        price: parseFloat(document.getElementById('item-price').value) || 0,
        notes: document.getElementById('item-note').value,
        image: photoRemoved ? "" : undefined // Если удалено — затираем в БД
    };

    if (!itemData.name || itemData.name.trim() === '') {
        alert('Введите наименование товара!');
        return;
    }

    const isEditing = id !== '';
    const url = isEditing ? '/api/items/' + id : '/api/items';
    const method = isEditing ? 'PUT' : 'POST';

    // 1. Сначала сохраняем данные товара
    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData)
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const finalId = isEditing ? id : data.id;
                
                // 2. Если выбран файл — загружаем его
                if (fileInput.files.length > 0) {
                    const formData = new FormData();
                    formData.append('file', fileInput.files[0]);
                    formData.append('item_id', finalId);

                    fetch('/api/upload', {
                        method: 'POST',
                        body: formData
                    }).then(() => {
                        closeItemModal();
                        loadServerData();
                    });
                } else {
                    closeItemModal();
                    loadServerData();
                }
            } else {
                alert('Ошибка сервера: ' + data.message);
            }
        })
        .catch(err => {
            alert('Ошибка связи с сервером');
        });
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

    // Подготавливаем данные как для обычного обновления, но только с новым кол-вом
    const updateData = {
        category: item._category,
        name: item['Наименование'] || item['Наименование '],
        characteristics: item['Характеристики'],
        width: item['Ширина'],
        length: item['Длина/Высота'],
        quantity: newQty,
        price: item['_price'],
        notes: `Быстрая правка: ${delta > 0 ? '+'+delta : delta}`
    };

    fetch('/api/items/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            loadServerData(); // Обновляем
        }
    });
}

// Добавим стили для анимации ошибки
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
