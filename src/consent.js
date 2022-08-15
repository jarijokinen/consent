export const consent = (options) => {
  const opts = {
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
    settingsLinkSelector: '.consent-settings-link',
    ...options
  };

  let consentState = {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'denied'
  };

  let dialog = document.createElement('div');
  dialog.classList.add(opts.dialogClass);

  const getConsent = (storage) => {
    return localStorage.getItem('consent_' + storage);
  };

  const updateConsent = () => {
    Object.keys(opts.storages).forEach((storage) => {
      localStorage.setItem('consent_' + storage, consentState[storage]);
    });

    if (typeof gtag === 'function') {
      gtag('consent', 'update', consentState);
    }
  };

  const updateFields = () => {
    Object.keys(opts.storages).forEach((storage) => {
      dialog.querySelector('#consent-field-' + storage).checked =
        consentState[storage] == 'granted' ? true : false;
    });
  };

  const loadConsentState = () => {
    Object.keys(opts.storages).forEach((storage) => {
      consentState[storage] = getConsent(storage);
      if (consentState[storage] === null) {
        showDialog();
      }
    });

    if (typeof gtag === 'function') {
      gtag('consent', 'update', consentState);
    }
  };

  const createDialog = () => {
    dialog.innerHTML = opts.dialogMarkup;

    Object.keys(opts.storages).forEach((storage) => {
      const fieldset = document.createElement('fieldset');
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('name', 'consent-field-' + storage);
      checkbox.setAttribute('id', 'consent-field-' + storage);
      if (getConsent(storage) === 'granted') {
        checkbox.setAttribute('checked', 'checked');
      }
      const label = document.createElement('label');
      label.setAttribute('for', 'consent-field-' + storage);
      label.innerText = opts.storages[storage];
      fieldset.appendChild(checkbox);
      fieldset.appendChild(label);
      dialog.querySelector('.consent-fields').appendChild(fieldset);
    });

    Object.keys(opts.actions).forEach((action) => {
      const button = document.createElement('input');
      button.setAttribute('type', 'button');
      button.setAttribute('value', opts.actions[action]);

      switch (action) {
        case 'denyAll':
          button.onclick = () => {
            Object.keys(opts.storages).forEach((storage) => {
              consentState[storage] = 'denied';
            });
            updateConsent();
            updateFields();
            hideDialog();
          };
          break;
        case 'allowSelected':
          button.onclick = () => {
            Object.keys(opts.storages).forEach((storage) => {
              consentState[storage] = document.querySelector(
                '#consent-field-' + storage
              ).checked
                ? 'granted'
                : 'denied';
            });
            updateConsent();
            updateFields();
            hideDialog();
          };
          break;
        case 'allowAll':
          button.onclick = () => {
            Object.keys(opts.storages).forEach((storage) => {
              consentState[storage] = 'granted';
            });
            updateConsent();
            updateFields();
            hideDialog();
          };
          break;
      }

      dialog.querySelector('.consent-buttons').appendChild(button);
    });

    document.querySelector('body').appendChild(dialog);
  };

  const showDialog = () => {
    dialog.style.display = 'block';
  };

  const hideDialog = () => {
    dialog.style.display = 'none';
  };

  document.querySelector(opts.settingsLinkSelector).onclick = (ev) => {
    ev.preventDefault();
    showDialog();
  };

  loadConsentState();
  createDialog();
};
