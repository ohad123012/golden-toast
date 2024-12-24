const buttonFirstShadowColor = ' #242a31';
const buttonSecondShadowColor = 'rgba(0, 0, 0, 0.19)';
export const settingsStyle = {
  backgroundColor: 'transparent',
  boxShadow: 'none',
  width: '3rem',
  height: '3rem',
  borderRadius: '100%',
  gap: '1rem',

  '&:hover': {
    backgroundColor: '#44576d',
    boxShadow: `0 0 1rem ${buttonFirstShadowColor}, 0 1rem 3rem 0 ${buttonSecondShadowColor}`,
  },
};

export const userStyle = {
  backgroundColor: 'transparent',
  boxShadow: 'none',
  height: '68%',
  borderRadius: '0.5rem',
  padding: '0 0.5rem',
  color: '#e6e6e6',
  gap: '1rem',
  '&:hover': {
    backgroundColor: '#44576d',
    boxShadow: `0 0 1rem ${buttonFirstShadowColor}, 0 1rem 3rem 0 ${buttonSecondShadowColor}`,
  },
};
