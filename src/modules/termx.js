import Colors from './colors.js'
import Styles from './style.js'
import { term } from './terminal.js'

// Допоміжна функція для створення styleBuilder з наявними стилями та кольорами
function createStyleBuilder(
  initialStyles = [], 
  initialColors = ['default', 'bgDefault'], 
  initialGradientColors = []
) {
  const styles = [...initialStyles];
  const colors = [...initialColors];
  const gradientColors = [...initialGradientColors];

  // Створюємо об'єкт, який буде обгорнутий проксі
  const styleBuilderBase = {
    _styles: styles,
    _colors: colors,
    _gradientColors: gradientColors,

    // Метод для виведення стилізованого тексту
    write: function(text) {
      const options = {};

      if (styles.length > 0) {
        options.style = styles;
      }

      if (Array.isArray(colors)) {
        options.color = [];
        if (colors[0] !== 'default') options.color.push(colors[0]);
        if (colors[1] !== 'bgDefault') options.color.push(colors[1]);
      } else if (typeof colors === 'string') {
        options.color = [colors];
      }

      if (gradientColors.length > 0) {
        options.gradient = gradientColors;
      }

      return term(text, options);
    },
    
    error: function(text) {
      const options = {
        style: [...styles,  'bold'],
        color: ['#fff', '#FF5555']
      };

      return term(text, options);
    },
    
    warning: function(text) {
      const options = {
        style: [...styles,  'bold'],
        color: ['#000', '#FFCC44']
      };

      return term(text, options);
    },
    
    info: function(text) {
      const options = {
        style: [...styles,  'bold'],
        color: ['#fff', '#55AAFF']
      };

      return term(text, options);
    },
    
    success: function(text) {
      const options = {
        style: [...styles,  'bold'],
        color: ['#fff', '#16a63c']
      };

      return term(text, options);
    },
    
    sunset: function(text) {
      const options = {
        style: [...styles],
        color: ['#FFDDCC', '#331122']
      };

      return term(text, options);
    },
    
    ocean: function(text) {
      const options = {
        style: [...styles],
        color: ['#E0F0FF', '#001030']
      };

      return term(text, options);
    },
    
    matrix: function(text) {
      const options = {
        style: [...styles],
        color: ['#00FF00', '#001100']
      };

      return term(text, options);
    },
    
    dark: function(text) {
      const options = {
        style: [...styles],
        color: ['#ccc', '#111']
      };

      return term(text, options);
    },
    
    light: function(text) {
      const options = {
        style: [...styles],
        color: ['#fff', '#000']
      };

      return term(text, options);
    }
  };

  // Проксі, який перехоплює всі звернення до властивостей
  return new Proxy(styleBuilderBase, {
    get(target, prop) {
      // Якщо запитується власна властивість об'єкта - повертаємо її
      if (prop in target) {
        return target[prop];
      }

      // Обробка стилів
      if (prop in Styles) {
        // Створюємо новий styleBuilder з доданим стилем
        const newStyles = [...styles];
        if (!newStyles.includes(prop)) {
          newStyles.push(prop);
        }
        return createStyleBuilder(newStyles, colors, gradientColors);
      }

      // Обробка кольорів тексту
      if (prop in Colors && !prop.startsWith('bg')) {
        const newColors = [...colors];
        newColors[0] = prop;
        return createStyleBuilder(styles, newColors, gradientColors);
      }

      // Обробка фонових кольорів
      if (prop.startsWith('bg')) {
        const bgProp = prop.substring(1, 1).toLowerCase() + prop.substring(2);
        const newColors = [...colors];
        newColors[1] = bgProp;
        return createStyleBuilder(styles, newColors, gradientColors);
      }

      if (prop === 'gradient') {
        // Якщо запитується градієнт, повертаємо новий styleBuilder з градієнтом
        return function(...args) {
          const newGradientColors = [...gradientColors];
          newGradientColors.push(...args);
          return createStyleBuilder(styles, colors, newGradientColors);
        };
      }
      
      if (prop === 'hex' || prop === 'ind') {
        // Якщо запитується hex, повертаємо новий styleBuilder з hex
        return function(fg, bg) {
          const newColors = ['default', 'bgDefault'];
          if (typeof fg !== "undefined" && fg !== null) newColors[0] = fg
          if (typeof bg !== "undefined" && bg !== null) newColors[1] = bg
          return createStyleBuilder(styles, newColors, gradientColors);
        };
      }
      
      // Для невідомих властивостей повертаємо функцію-заглушку
      return function() {
        console.warn(`Unknown method or property: ${prop}`);
        return this;
      };
    }
  });
}

// Експортуємо основну точку входу
export const termx = createStyleBuilder();