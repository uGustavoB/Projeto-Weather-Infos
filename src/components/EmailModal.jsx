import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EmailModal = ({ showModal, setShowModal, handleMail }) => {
  const [emailInput, setEmailInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleMail(emailInput); // Submete o email
  };

  if (!showModal) return null;

  return (
    <motion.div
    className="modal-mail"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{
      type: 'spring',
      bounce: 0.5,
      duration: 0.7,
      delayChildren: 0.5,
      staggerChildren: 0.50
    }}
    >
      <div className="modal-content">
        <h1>Digite seu e-mail</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
            />
            <button type="submit" className="btn-submit">
              <i className="bi bi-box-arrow-in-right"></i>
            </button>

          </div>
        </form>
        <button onClick={() => setShowModal(false)} className="btn-hide">
            <i className="bi bi-x-circle"></i>
          </button>
      </div>
    </motion.div>
  );
};

export default EmailModal;
