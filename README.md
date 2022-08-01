# consent

A zero-dependency, vanilla JavaScript consent manager with native Consent Mode
support.

## Installation

NPM:

    npm install @jarijokinen/consent

Yarn:

    yarn add @jarijokinen/consent

## Usage

    import { consent } from '@jarijokinen/consent';

    document.addEventListener('DOMContentLoaded', () => {
      consent();
    });

## Configuration

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
        <h2>Cookies</h2>
        <p>
          We would like to get your permission to use cookies for these purposes:
        </p>
        <form>
          <div class="consent-fields"></div>
          <div class="consent-buttons"></div>
        </form>
      `,
      dialogClass: 'consent',
      settingsLinkSelector: '.consent-settings-link'
    };

    consent(options);

## License

MIT License. Copyright (c) 2022 [Jari Jokinen](https://jarijokinen.com).  See
[LICENSE](https://github.com/jarijokinen/consent/blob/main/LICENSE.txt)
for further details.
