import React from "react";
import AOS from "aos";
import { useEffect } from "react";

export default function ModalContainer({
  visible,
  ignoreContainer,
  children,
  onClose,
}) {
  const handleClick = (e) => {
    if (e.target.id === "modal-container") onClose && onClose();
  };

  const renderChildren = () => {
    if (ignoreContainer) return children;

    return (
      <div className="bg-white rounded" style={{ width: '50rem', height: '40rem', overflowY: 'auto', padding: '2rem', zIndex: "3050", marginTop: "70px"}}>
      {children}
    </div>
    
    );
  };

  if (!visible) return null;

 
  return (
    
<div
  onClick={handleClick}
  id="modal-container"
  className="modal fade show d-flex align-items-center justify-content-center "
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Equivalent to backdrop
    backdropFilter: 'blur(8px)', // Equivalent to backdrop-blur-sm
    zIndex: 3050, // Equivalent to z-50
    marginTop: "70px"
  }}
  data-aos="slide-down"
>
  {renderChildren()}
</div>

  );
}
