module.exports = {
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        text: 'var(--text)',
        pink: { DEFAULT: 'var(--pink)', 600: 'var(--pink-600)' },
        black: 'var(--black)',
        gray: { 900: 'var(--gray-900)', 600: 'var(--gray-600)', 300: 'var(--gray-300)' },
        celeste: { DEFAULT: 'var(--celeste)', 600: 'var(--celeste-600)', 100: 'var(--celeste-100)' }
      },
      borderRadius: { xl: 'var(--radius)' },
      boxShadow: { card: '0 8px 24px rgba(0,0,0,.06)' }
    }
  },
  plugins: [],
};
