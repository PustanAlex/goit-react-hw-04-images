const { useEffect } = require('react');

const Modal = ({ imageURL, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = e => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);


  return (
    <>
      {isOpen && (
        <div className="Overlay">
          <div className="Modal">
            <img src={imageURL} alt="" />
          </div>
        </div>
      )}
    </>
  );
};



  export default Modal;