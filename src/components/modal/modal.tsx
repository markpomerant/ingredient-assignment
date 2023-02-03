import React, { PropsWithChildren, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { Button } from "../button";
import "./modal.css";
interface Props {
  onClose: () => void;
  onSubmit: () => void;
  show: boolean;
}
export const Modal: React.FunctionComponent<PropsWithChildren<Props>> = ({
  onClose,
  onSubmit,
  children,
  show,
}) => {
  const closeOnEscapeKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.charCode || e.keyCode) === 27) {
        onClose();
      }
    },
    [onClose]
  );
  const nodeRef = React.useRef(null);
  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, [closeOnEscapeKeyDown]);

  return ReactDOM.createPortal(
    <CSSTransition
      nodeRef={nodeRef}
      in={show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div
        ref={nodeRef}
        className={`modal ${show ? "show" : ""}`}
        onClick={onClose}
      >
        <div className={"modal-content"} onClick={(e) => e.stopPropagation()}>
          <div className={"modal-header"}>
            <h4 className={"modal-title"}>Modal Title</h4>
          </div>
          <div className={"modal-body"}>{children}</div>
          <div className={"modal-footer"}>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSubmit}>Submit</Button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")!
  );
};
