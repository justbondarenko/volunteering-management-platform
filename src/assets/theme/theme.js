import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const preset = definePreset(Aura, {
  options: {
    cssLayer: {
      name: 'primevue',
      order: 'tailwind-base, primevue, tailwind-utilities'
    }
  },
  semantic: {
    primary: {
      50: '{amber.50}',
      100: '{amber.100}',
      200: '{amber.200}',
      300: '{amber.300}',
      400: '{amber.400}',
      500: '{amber.500}',
      600: '{amber.600}',
      700: '{amber.700}',
      800: '{amber.800}',
      900: '{amber.900}',
      950: '{amber.950}'
    },
    colorScheme: {
      light: {
        primary: {
          color: '{primary.500}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.800}',
          activeColor: '{primary.700}'
        },
        highlight: {
          background: '{primary.950}',
          focusBackground: '{primary.700}',
          color: '#ffffff',
          focusColor: '#ffffff'
        }
      },
      dark: {
        primary: {
          color: '{primary.50}',
          contrastColor: '{primary.950}',
          hoverColor: '{primary.200}',
          activeColor: '{primary.300}'
        },
        highlight: {
          background: '{primary.50}',
          focusBackground: '{primary.300}',
          color: '{primary.950}',
          focusColor: '{primary.950}'
        }
      }
    }
  }
});

export default {
  preset,
  options: {
    darkModeSelector: '.p-dark'
  }
};