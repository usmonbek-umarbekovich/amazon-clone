import { useState, useEffect, useRef, useContext, createContext } from 'react';
import classNames from 'classnames';

import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import { FaChevronDown } from 'react-icons/fa';

const PopupContext = createContext();

function Popup({ timeout = 500, children }) {
  const [show, setShow] = useState(false);
  const timeoutRef = useRef();

  const handleShow = () => {
    clearTimeout(timeoutRef.current);
    setShow(true);
  };

  const handleHide = () => {
    timeoutRef.current = setTimeout(() => {
      setShow(false);
    }, timeout);
  };

  const handleHideImmediately = () => {
    setShow(false);
  };

  const popupContext = {
    show,
    onShow: handleShow,
    onHide: handleHide,
    onHideImmediately: handleHideImmediately,
  };

  return (
    <PopupContext.Provider value={popupContext}>
      <div className="popup position-relative">{children}</div>
    </PopupContext.Provider>
  );
}

function PopupToggle({
  className = '',
  iconClassName = '',
  children = '',
  showOnClick,
  showOnMouseEnter,
  hideOnMouseLeave,
  ...props
}) {
  const { onShow, onHide } = useContext(PopupContext);

  return (
    <Button
      variant="link"
      className={classNames(
        'popup-toggle text-nowrap text-decoration-none p-0 pb-2 mb-0',
        className
      )}
      onClick={showOnClick && onShow}
      onMouseEnter={showOnMouseEnter && onShow}
      onMouseLeave={hideOnMouseLeave && onHide}
      {...props}>
      {children}{' '}
      <FaChevronDown
        className={classNames(
          'popup-toggle-icon link-secondary mb-2',
          iconClassName
        )}
      />
    </Button>
  );
}

function PopupBody({
  className = '',
  showOnMouseEnter,
  hideOnMouseLeave,
  closeButton,
  children,
  ...props
}) {
  const { show, onShow, onHide, onHideImmediately } = useContext(PopupContext);
  const closeBtnRef = useRef();

  useEffect(() => {
    if (closeBtnRef.current && show) {
      closeBtnRef.current.focus();
    }
  }, [show]);

  return (
    <div
      hidden={!show}
      className={classNames(
        'popup-body position-absolute top-100 bg-white border rounded-3 p-3',
        className
      )}
      onMouseEnter={showOnMouseEnter && onShow}
      onMouseLeave={hideOnMouseLeave && onHide}
      {...props}>
      {closeButton && (
        <div className="btn-close-container d-flex w-100">
          <CloseButton
            ref={closeBtnRef}
            aria-label="Hide"
            className="ms-auto"
            onClick={onHideImmediately}
          />
        </div>
      )}
      {children}
    </div>
  );
}

Popup.displayName = 'Popup';

export default Object.assign(Popup, {
  Toggle: PopupToggle,
  Body: PopupBody,
});
