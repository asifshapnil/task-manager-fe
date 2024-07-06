import React, { FC } from "react";
import "./modal.scss";
import { Modal, Button } from "react-bootstrap";

interface ModalComponentProps {
  showModal: boolean;
  handleClose?: () => void;
  size?: "sm" | "lg" | "xl";
  centered?: boolean;
  headerTitle: string;
  actionConfig?: any;
  isConformationModal?: boolean;
  children: React.ReactNode;
  isIdleModal?: boolean;
  isViewMode?: boolean;
  backdropClassName?: string;
  isClosable?: boolean;
}
const ModalComponent: FC<ModalComponentProps> = ({
  showModal,
  handleClose,
  size = "lg",
  centered = true,
  headerTitle,
  actionConfig,
  isConformationModal = false,
  children,
  isIdleModal = false,
  isViewMode,
  backdropClassName = null,
  isClosable = true,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={
        handleClose
          ? handleClose
          : () => {
            }
      }
      size={size}
      centered={centered}
      backdropClassName={backdropClassName ? backdropClassName : ""}
    >
      {isClosable ? (
        <Modal.Header closeButton>
          <Modal.Title>
            <div>{headerTitle}</div>
          </Modal.Title>
        </Modal.Header>
      ) : (
        <Modal.Header>
          <Modal.Title>
            <div >{headerTitle}</div>
          </Modal.Title>
        </Modal.Header>
      )}

      <Modal.Body>
        <div style={{ padding: "0 1rem" }}>{children}</div>
      </Modal.Body>
      <Modal.Footer>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "8px"
          }}
        >
          {isConformationModal ? (
            !isIdleModal && (
              <Button
                variant="secondary"
                onClick={handleClose}
              >
                No
              </Button>
            )
          ) : !isViewMode ? (
            <Button
              variant="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
          ) : null}

          {actionConfig &&
            actionConfig.map((action: any, index: number) => (
              <Button
                key={index}
                // style={{
                //   marginRight: "1rem",
                // }}
                onClick={action.event}
                variant="primary" // action.variant
                disabled={
                  action.hasOwnProperty("disabled") ? action.disabled : false
                }
              >
                {action.label}
              </Button>
            ))}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
