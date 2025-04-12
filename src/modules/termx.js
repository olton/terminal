import Colors from './colors.js'
import Styles from './style.js'
import { term } from './term.js'
import Themes from './themes.js'

export function createStyleBuilder(
  initialStyles = [], 
  initialColors = ['default', 'bgDefault'], 
  initialGradientColors = []
) {
  const styles = [...initialStyles];
  const colors = [...initialColors];
  const gradientColors = [...initialGradientColors];

  const styleBuilderBase = {
    _styles: styles,
    _colors: colors,
    _gradientColors: gradientColors,

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
        color: ['#000', '#ffae44']
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
  };

  return new Proxy(styleBuilderBase, {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }

      if (prop in Themes) {
        const newColors = Themes[prop].color;
        const newStyles = Themes[prop].style;
        const newGradient = Themes[prop].gradient;
        return createStyleBuilder(newStyles, newColors, newGradient);
      }
      
      if (prop in Styles) {
        const newStyles = [...styles];
        if (!newStyles.includes(prop)) {
          newStyles.push(prop);
        }
        return createStyleBuilder(newStyles, colors, gradientColors);
      }

      if (prop in Colors && !prop.startsWith('bg')) {
        const newColors = [...colors];
        newColors[0] = prop;
        return createStyleBuilder(styles, newColors, gradientColors);
      }

      if (prop.startsWith('bg')) {
        const bgProp = prop.substring(1, 1).toLowerCase() + prop.substring(2);
        const newColors = [...colors];
        newColors[1] = bgProp;
        return createStyleBuilder(styles, newColors, gradientColors);
      }

      if (prop === 'gradient') {
        return function(...args) {
          const newGradientColors = [...gradientColors];
          newGradientColors.push(...args);
          return createStyleBuilder(styles, colors, newGradientColors);
        };
      }
      
      if (prop === 'hex' || prop === 'ind') {
        return function(fg, bg) {
          const newColors = ['default', 'bgDefault'];
          if (typeof fg !== "undefined" && fg !== null) newColors[0] = fg
          if (typeof bg !== "undefined" && bg !== null) newColors[1] = bg
          return createStyleBuilder(styles, newColors, gradientColors);
        };
      }
      
      return function() {
        console.warn(`Unknown method or property: ${prop}`);
        return this;
      };
    }
  });
}

// Експортуємо основну точку входу
export const termx = createStyleBuilder();