import React from 'react';

const primaryColor = '#000000';
const accentBlue = '#1E90FF';
const neonGreen = '#39FF14'; 
const errorRed = '#FF5733';
const mainText = '#FFFFFF';

type AlertType = 'success' | 'error' | 'info';

interface AlertMessageProps {
    message: string;
    type: AlertType;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ message, type }) => {
  
  let backgroundColor = primaryColor;
  let textColor = mainText;
  let borderColor = accentBlue;
  let icon = 'ℹ️';

  switch (type) {
    case 'success':
      backgroundColor = neonGreen;
      textColor = primaryColor;
      borderColor = neonGreen;
      icon = '✅';
      break;
    case 'error':
      backgroundColor = '#440000';
      textColor = errorRed;
      borderColor = errorRed;
      icon = '❌';
      break;
    case 'info':
    default:
      backgroundColor = accentBlue;
      textColor = mainText;
      borderColor = accentBlue;
      icon = '💡';
      break;
  }

  const alertStyle: React.CSSProperties = {
    backgroundColor,
    color: textColor,
    border: `2px solid ${borderColor}`,
    padding: '15px',
    borderRadius: '8px',
    margin: '20px 0',
    fontFamily: 'Roboto, sans-serif'
  };

  return (
    <div style={alertStyle} role="alert" className="d-flex align-items-center">
      <span className="me-2" style={{ fontSize: '1.2em', lineHeight: '1' }}>{icon}</span>
      <span style={{ fontWeight: type === 'success' ? 'bold' : 'normal' }}>{message}</span>
    </div>
  );
};

export default AlertMessage;