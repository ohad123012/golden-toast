const backgroundColor = 'transparent';
export const iconColor = '#29353c';
export const iconStyles = {
  backgroundColor: backgroundColor,
  fill: iconColor,

  '&:hover': { cursor: 'pointer' },
  padding: '0 0.6rem',
};
export const buttonStyle = {
  width: '2rem',
  height: '2rem',
  margin: '0 0.2rem',
  marginBottom: '0.85rem',
  '&:hover': { transform: 'scale(1.2)' },
};

export const checkIconStyle = {
  backgroundColor: backgroundColor,
  fill: iconColor,

  '&:hover': { cursor: 'pointer', transform: 'scale(1.5)' },
};

export const checkButtonStyle = {
  width: 0,
  height: 0,

  marginLeft: '15rem',

  '&:hover': {
    backgroundColor: backgroundColor,
    fill: iconColor,
    cursor: 'pointer',
  },
};
