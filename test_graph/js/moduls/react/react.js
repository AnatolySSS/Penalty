import React from 'react';
import { createRoot } from 'react-dom/client';
import { Car_contract_casco_insurance_premium } from "./car_contract_casco_insurance_premium";
import { Car_contract_casco_insurance_summ } from "./car_contract_casco_insurance_summ";

const App = () => {
    return (
        <div>
            <Car_contract_casco_insurance_summ />
            <Car_contract_casco_insurance_premium />
        </div>
    )
}

export const renderDOM = () => {
    let container = document.querySelector('#like_button_container');
    const root = createRoot(container); // createRoot(container!) if you use TypeScript
    root.render(<App />);
}