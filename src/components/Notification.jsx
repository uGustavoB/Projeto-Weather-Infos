import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Notification = ({ message, duration, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration || 3000);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="notification-box"
          initial={{ opacity: 0, x: 50 }}     // Entrada: invisível e fora da tela
          animate={{ opacity: 1, x: 0 }}      // Visível e na posição correta
          exit={{ opacity: 0, x: 50 }}        // Saída: desaparecendo e movendo-se para a direita
          transition={{ duration: 0.5 }}      // Definindo a duração da animação
        >
          <p>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
