module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        tiny: [
          '12px',
          {
            lineHeight: '16px',
          },
        ],
        small: [
          '14px',
          {
            lineHeight: '20px',
          },
        ],
        body: [
          '16px',
          {
            lineHeight: '20px',
          },
        ],
        medium: [
          '18px',
          {
            lineHeight: '28px',
          },
        ],
        large: [
          '20px',
          {
            lineHeight: '28px',
          },
        ],
        h1: [
          '30px',
          {
            lineHeight: '24px',
          },
        ],
        h3: [
          '24px',
          {
            lineHeight: '32px',
          },
        ],
      },
      spacing: {
        0: '0',
        0.5: '4px',
        1: '8px',
        '10px': '10px',
        1.5: '12px',
        2: '16px',
        2.5: '20px',
        3: '24px',
        3.5: '28px',
        4: '32px',
        4.5: '36px',
        5: '40px',
        6: '48px',
        7: '56px',
        8: '64px',
        9: '72px',
        10: '80px',
        11: '88px',
        11.5: '92px',
        12: '96px',
        13: '104px',
        14: '112px',
        15: '120px',
      },
    },
  },
  plugins: [],
};
