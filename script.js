document.addEventListener('DOMContentLoaded', () => {
    const tipForm = document.getElementById('tip-form');
    const billTotalInput = document.getElementById('bill-total');
    const tipSlider = document.getElementById('tip-slider');
    const sliderValDisplay = document.getElementById('slider-val');
    const taxExemptCheckbox = document.getElementById('tax-exempt');
    
    // Output fields
    const tipPercentageOut = document.getElementById('tip-percentage');
    const tipAmountOut = document.getElementById('tip-amount');
    const totalWithTaxOut = document.getElementById('total-with-tax');
    const totalWithTipOut = document.getElementById('total-with-tip');
    const totalWithTipTaxOut = document.getElementById('total-with-tip-tax');
    
    const errorMessage = document.getElementById('error-message');

    // Tax rate is 11%
    const TAX_RATE = 0.11;

    // Listen for any input changes on the form
    tipForm.addEventListener('input', calculateTip);

    function calculateTip() {
        // Get values
        const billValueStr = billTotalInput.value.trim();
        const tipPercentage = parseFloat(tipSlider.value);
        const isTaxExempt = taxExemptCheckbox.checked;

        // Update slider value display
        sliderValDisplay.textContent = tipPercentage;
        
        // Write tip percentage to the disabled tip percentage output field
        tipPercentageOut.value = tipPercentage + '%';

        // Check if bill value is empty
        if (billValueStr === '') {
            resetOutputs();
            clearError();
            return;
        }

        // Parse bill total
        const billTotal = parseFloat(billValueStr);

        // Validation for non-number or negative numbers
        if (isNaN(billTotal) || billTotal < 0) {
            showError();
            resetOutputs();
            return;
        }

        // Hide error if valid
        clearError();

        // If Bill Total is exactly 0, reset form per Part B of the requirements
        if (billTotal === 0) {
            resetOutputs();
            return;
        }

        // Perform Calculations
        // Tip amount = bill * tip %
        const tipAmount = billTotal * (tipPercentage / 100);
        
        // Total Bill with Tax (11% if bill > 0 per Part C, unless tax exempt)
        const taxAmount = isTaxExempt ? 0 : billTotal * TAX_RATE;
        const totalWithTax = billTotal + taxAmount;
        
        // Total Bill with Tip = bill + tip
        const totalWithTip = billTotal + tipAmount;

        // Total Bill with Tip and Tax = bill + tax + tip
        const totalWithTipTax = billTotal + taxAmount + tipAmount;

        // Write to output fields using toFixed(2) functionality
        tipAmountOut.value = '$' + tipAmount.toFixed(2);
        totalWithTaxOut.value = '$' + totalWithTax.toFixed(2);
        totalWithTipOut.value = '$' + totalWithTip.toFixed(2);
        totalWithTipTaxOut.value = '$' + totalWithTipTax.toFixed(2);
    }

    function resetOutputs() {
        tipAmountOut.value = '';
        totalWithTaxOut.value = '';
        totalWithTipOut.value = '';
        totalWithTipTaxOut.value = '';
    }

    function showError() {
        errorMessage.classList.remove('hidden');
        billTotalInput.classList.add('input-invalid');
    }

    function clearError() {
        errorMessage.classList.add('hidden');
        billTotalInput.classList.remove('input-invalid');
    }
});
