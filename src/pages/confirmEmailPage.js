// src/pages/ConfirmEmailPage.js
import React from 'react';
import ConfirmEmailForm from '../components/confirmEmailForm';

const ConfirmEmailPage = () => {
  return (
    <div className="container">
      <h1>Confirmar Correo Electrónico</h1>
      <p>Por favor, introduce el código de confirmación que te enviamos a tu correo electrónico.</p>
      <ConfirmEmailForm />
    </div>
  );
};

export default ConfirmEmailPage;