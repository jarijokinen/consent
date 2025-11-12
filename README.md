# consent

A zero-dependency, vanilla JavaScript consent manager with native Google
Consent Mode v2 support.

## Installation

NPM:

    npm install @jarijokinen/consent

## Usage

Load the consent-loader.js in the HEAD section deferred before any GTM tags.

    <head>
      <script src="path/to/consent-loader.js" defer></script>
      <script>
        // GTM and any other scripts
      </script>
    </head>

Import consent from the npm package and initialize it later on the page.

    import { consent } from '@jarijokinen/consent';

    document.addEventListener('DOMContentLoaded', () => {
      consent();
    });

Add link that opens the dialog:

    <a href="#" class="consent-settings">Cookie Settings</a>

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
      dialogClass: 'consent',
      dialogTitle: 'Cookie Consent',
      dialogMessage: 'This website uses cookies for:',
      settingsLinkSelector: '.consent-settings'
    };

    consent(options);

## License

MIT License. Copyright (c) 2022 - 2025 [Jari Jokinen](https://jarijokinen.com).
See [LICENSE](https://github.com/jarijokinen/consent/blob/main/LICENSE.txt)
for further details.
