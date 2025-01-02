const backgroundColor = 'transparent';
export const iconColor = '#29353c';
export const iconStyles = {
  backgroundColor: backgroundColor,
  fill: iconColor,

  '&:hover': { cursor: 'pointer' },
  padding: '0 0.6rem',
};
export const buttonStyle = {
  width: 0,
  height: 0,
  margin: '0 0.8rem',
  marginBottom: '0.85rem',
  '&:hover': {
    backgroundColor: backgroundColor,
    fill: iconColor,
    cursor: 'pointer',
  },
};

export const checkIconStyle = {
  backgroundColor: backgroundColor,
  fill: iconColor,

  '&:hover': { cursor: 'pointer' },
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
