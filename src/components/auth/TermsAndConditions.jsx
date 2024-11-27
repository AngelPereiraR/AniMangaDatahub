import React from "react";
import Checkbox from "../shared/Checkbox";

const TermsAndConditions = ({ name, onChange, onBlur, errorMessage }) => {
  return (
    <div className="termsAndConditions">
      <div className="termsAndConditions__checkbox">
        <Checkbox name={name} onChange={onChange} onBlur={onBlur} />
        <p>He leído y aceptado los términos y condiciones</p>
      </div>

      {errorMessage && (
        <p className="termsAndConditions__error-message">{errorMessage}</p>
      )}
    </div>
  );
};

export default TermsAndConditions;
