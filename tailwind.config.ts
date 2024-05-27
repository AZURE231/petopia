import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './**/@material-tailwind/**/*.{html,js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        fade_in: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        fade_out: {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
        spin: {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(-360deg)'
          }
        },
        pulse: {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.6',
          }
        },
        'pulse-plus': {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '1',
            color: '#01FFFF'
          },
          '50%': {
            opacity: '0.6',
            color: 'red'
          }
        }
      },
      animation: {
        fade_in: 'fade_in 0.2s linear',
        fade_out: 'fade_out 0.2s linear',
        spin: 'spin 3s linear infinite',
        pulse: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-plus': 'pulse-plus 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;
