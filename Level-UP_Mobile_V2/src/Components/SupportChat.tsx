import React from 'react';

const accentBlue = '#1E90FF';
const neonGreen = '#39FF14';

const floatingButtonStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '30px',
  right: '30px',
  width: '60px',
  height: '60px',
  borderRadius: '50%',

  backgroundColor: neonGreen,
  color: 'black',
  textAlign: 'center',
  fontSize: '30px',
  lineHeight: '60px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
  cursor: 'pointer',
  zIndex: 1000,

  border: `3px solid ${accentBlue}`, 
};

const SupportChat: React.FC = () => {
  const numero = '56974635012'
  const whatsappNumber = '56929592300';
  const message = encodeURIComponent('Hola Level-Up Gamer, necesito soporte técnico. Mi consulta es sobre...');

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
  const whatsappLink2 = `https://wa.me/${numero}?text=${message}`;


  const handleClick = () => {
    window.open(whatsappLink, '_blank');
    window.open(whatsappLink2, '_blank');
  };

  return (
    <div 
      style={floatingButtonStyle}
      title="Contactar Servicio Técnico por WhatsApp"
      onClick={handleClick}
    >
      💬
    </div>
  );
};

export default SupportChat;