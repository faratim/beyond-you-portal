// PhoneInput.jsx
import React from "react";

function PhoneInput({ value, onChange }) {
    const formatPhoneNumber = (value) => {
        // Remove all non-digit characters
        const cleaned = value.replace(/\D/g, "");

        // Format the number as (XXX) XXX-XXXX
        let formatted = "";
        if (cleaned.length > 0) {
            formatted += `(${cleaned.slice(0, 3)}`;

            if (cleaned.length > 3) {
                formatted += `) ${cleaned.slice(3, 6)}`;
            }

            if (cleaned.length > 6) {
                formatted += `-${cleaned.slice(6, 10)}`;
            }
        }

        return formatted;
    };

    const handleChange = (e) => {
        const formatted = formatPhoneNumber(e.target.value);
        onChange(formatted);
    };

    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Phone Number"
            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            maxLength="14"
        />
    );
}

export default PhoneInput;
