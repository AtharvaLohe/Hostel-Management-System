import React from 'react';

const ConfirmationModal = ({ show, onConfirm, onCancel, message }) => {
  if (!show) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>{message}</h3>
        <div style={styles.actions}>
          <button onClick={onConfirm} style={styles.button}>Yes</button>
          <button onClick={onCancel} style={styles.button}>No</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',
    width: '300px',
  },
  actions: {
    marginTop: '20px',
  },
  button: {
    margin: '0 10px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  }
};

export default ConfirmationModal;
