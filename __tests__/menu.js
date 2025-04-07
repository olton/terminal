import { menu } from '../src/index.js';

// Просте меню
async function simpleMenu() {
  const options = ['Опція 1', 'Опція 2', 'Опція 3', 'Вихід'];

  const result = await menu(options)
    .setTitle('Оберіть варіант:')
    .prompt();

  console.log(`Ви обрали: ${result}`);
}

// Меню з об'єктами
async function advancedMenu() {
  const options = [
    { label: '👉 Новий проект', value: 'new', description: 'Створити новий проект' },
    { label: '🔍 Пошук', value: 'search', description: 'Пошук у проектах' },
    { label: '⚙️ Налаштування', value: 'settings', description: 'Змінити налаштування' },
    { label: '📊 Статистика', value: 'stats', description: 'Переглянути статистику' },
    { label: '❌ Вихід', value: 'exit', description: 'Закрити програму' }
  ];

  const customMenu = menu(options, {
    selectedStyle: { color: 'black, bgGreen', style: 'bold' },
    normalStyle: { color: 'white' },
    indicator: '>> ',
    indicatorEmpty: '   ',
    border: true,
    borderStyle: { color: 'green' },
    onHighlight: (item) => {
      if (item.description) {
        console.log(`\nОпис: ${item.description}`);
      }
    }
  });

  const result = await customMenu
    .setTitle('Головне меню')
    .prompt();

  console.log(`Вибрано: ${result.label} (${result.value})`);

  return result.value;
}

// Запуск прикладу
async function run() {
  // await simpleMenu();
  const action = await advancedMenu();

  // Обробка дій за результатом
  switch (action) {
    case 'new':
      console.log('Створення нового проекту...');
      break;
    case 'search':
      console.log('Пошук у проектах...');
      break;
    // ... інші дії
    default:
      console.log('Програма завершена.');
  }
}

run().catch(console.error);