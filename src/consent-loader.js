window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

window.consent = window.consent || {};
window.consent.countryCookieName = window.consent.countryCookieName ?? 'cc';
window.consent.countries = window.consent.countries || [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU',
  'IS', 'IE', 'IT', 'LV', 'LI', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO',
  'SK', 'SI', 'ES', 'SE', 'UK', 'GB', 'CH'
];
window.consent.consentMissing = true
window.consent.state = {
  analytics_storage: null,
  ad_storage: null,
  ad_user_data: null,
  ad_personalization: null
};

Object.keys(window.consent.state).forEach(k => {
  try {
    const v = localStorage.getItem('consent_' + k);
    if (v === 'granted' || v === 'denied') {
      window.consent.state[k] = v;
      window.consent.consentMissing = false;
    }
  }
  catch (e) {
    window.consent.state[k] = null;
  }
});

const countryCookie = document.cookie.split(';').map(cookie => cookie.trim())
  .find(cookie => cookie.startsWith(window.consent.countryCookieName + '='));
const country = countryCookie
  ? countryCookie.slice(countryCookie.indexOf('=') + 1).trim().toUpperCase()
  : '';
const countryDefault = !country || window.consent.countries.includes(country) 
  ? 'denied' : 'granted';

if (countryDefault === 'granted') {
  window.consent.consentMissing = false;
}

gtag('consent', 'default', {
  ...Object.fromEntries(Object.entries(window.consent.state).map(([k, v]) => 
    [k, v ?? countryDefault]))
});
