# consent

A zero-dependency, vanilla JavaScript consent manager with native Consent Mode
support.

## Installation

NPM:

    npm install @jarijokinen/consent

Yarn:

    yarn add @jarijokinen/consent

## Usage

Initialization:

    import { consent } from '@jarijokinen/consent';

    document.addEventListener('DOMContentLoaded', () => {
      consent();
    });

Add link that opens the dialog:

    <a href="#" class="consent-settings-link">Cookie Settings</a>

## Configuration

Customize configuration options by passing some or all of them as a first
argument to the consent() function.

    const options = {
      storages: {
        analytics_storage: 'Analytics',
        ad_storage: 'Marketing'
      },
      actions: {
        denyAll: 'Deny All',
        allowSelected: 'Allow Selected',
        allowAll: 'Allow All'
      },
      dialogMarkup: `
        <h2 class="consent-title"></h2>
        <div class="consent-message"></div>
        <div class="consent-fields"></div>
        <div class="consent-buttons"></div>
      `,
      dialogTitle: 'Cookies',
      dialogMessage: 'We would like to get your permission to use cookies for:',
      dialogClass: 'consent',
      settingsLinkSelector: '.consent-settings-link',
      countryCookie: 'cf_country',
      countries: ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 
                  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
                  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO',
                  'GB', 'CH', 'MC', 'SM', 'VA', 'JE', 'GG', 'IM']
    };

    consent(options);

## License

MIT License. Copyright (c) 2022 - 2025 [Jari Jokinen](https://jarijokinen.com).
See [LICENSE](https://github.com/jarijokinen/consent/blob/main/LICENSE.txt)
for further details.
