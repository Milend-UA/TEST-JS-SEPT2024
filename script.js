const inputPair = document.getElementById('inputPair');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('list');
const sortByName = document.getElementById('sortByName');
const sortByValue = document.getElementById('sortByValue');
const deleteSelected = document.getElementById('deleteSelected');

let pairs = [];

// Проверка валидности пары
function isValidPair(pair) {
    const regex = /^\s*([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)\s*$/;
    return regex.test(pair);
}

// Разбор строки на имя и значение
function parsePair(pair) {
    const regex = /^\s*([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)\s*$/;
    const match = pair.match(regex);
    return match ? { name: match[1], value: match[2] } : null;
}

// Обновление списка в textarea
function renderList() {
    list.value = pairs.map(pair => `${pair.name}=${pair.value}`).join('\n');
}

// Добавление пары
addBtn.addEventListener('click', () => {
    const pairText = inputPair.value.trim();
    if (isValidPair(pairText)) {
        const pair = parsePair(pairText);
        pairs.push(pair);
        renderList();
        inputPair.value = '';
    } else {
        alert('Invalid Name/Value pair. Use format: Name=Value');
    }
});

// Сортировка по имени
sortByName.addEventListener('click', () => {
    pairs.sort((a, b) => a.name.localeCompare(b.name));
    renderList();
});

// Сортировка по значению
sortByValue.addEventListener('click', () => {
    pairs.sort((a, b) => a.value.localeCompare(b.value));
    renderList();
});

// Удаление выбранных строк
deleteSelected.addEventListener('click', () => {
    const selectedText = list.value.substring(list.selectionStart, list.selectionEnd).trim();
    if (selectedText) {
        const selectedLines = selectedText.split('\n').map(line => line.trim());

        // Проверяем, выделены ли строки полностью
        const allLines = list.value.split('\n').map(line => line.trim());
        const invalidSelection = selectedLines.some(line => !allLines.includes(line));

        if (invalidSelection) {
            alert('Please select full lines to delete.');
            return;
        }

        // Удаляем только полностью совпадающие строки
        pairs = pairs.filter(pair => !selectedLines.includes(`${pair.name}=${pair.value}`));
        renderList();
    } else {
        alert('No text selected. Please select items to delete.');
    }
});
