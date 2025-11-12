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
      <h2 class="consent-title"></h2>
      <div class="consent-message"></div>
      <div class="consent-fields"></div>
      <div class="consent-buttons"></div>
    `,
    dialogClass: 'consent',
    dialogTitle: 'Cookie Consent',
    dialogMessage: 'This website uses cookies for:',
    settingsLinkSelector: '.consent-settings',
    ...options
  };
  
  function gtag() { dataLayer.push(arguments); }

  let dialog = document.createElement('div');
  dialog.classList.add(opts.dialogClass);

  const createDialog = () => {
    dialog.innerHTML = opts.dialogMarkup;
    dialog.querySelector('.consent-title').innerText = opts.dialogTitle;
    dialog.querySelector('.consent-message').innerText = opts.dialogMessage;

    Object.keys(opts.storages).forEach((storage) => {
      const fieldset = document.createElement('fieldset');
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('name', 'consent-field-' + storage);
      checkbox.setAttribute('id', 'consent-field-' + storage);
      if (window.consent.state[storage] === 'granted') {
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
            Object.keys(opts.storages).forEach(k => {
              window.consent.state[k] = 'denied'
            });
            saveState();
            updateFields();
            hideDialog();
          };
          break;
        case 'allowSelected':
          button.onclick = () => {
            Object.keys(opts.storages).forEach(k => {
              const el = document.querySelector('#consent-field-' + k);
              window.consent.state[k] = el.checked ? 'granted' : 'denied';
            });
            saveState();
            updateFields();
            hideDialog();
          };
          break;
        case 'allowAll':
          button.onclick = () => {
            Object.keys(opts.storages).forEach(k => {
              window.consent.state[k] = 'granted';
            });
            saveState();
            updateFields();
            hideDialog();
          };
          break;
      }

      dialog.querySelector('.consent-buttons').appendChild(button);
    });

    document.querySelector('body').appendChild(dialog);
  };

  const saveState = () => {
    Object.keys(window.consent.state).forEach(k => {
      try {
        localStorage.setItem('consent_' + k, window.consent.state[k]);
      }
      catch (e) {
        console.log('Unable to save consent to local storage');
      }
    });

    gtag('consent', 'update', window.consent.state);
  };

  const updateFields = () => {
    Object.keys(opts.storages).forEach(k => {
      dialog.querySelector('#consent-field-' + k).checked = 
        window.consent.state[k] === 'granted' ? true : false;
    });
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

  createDialog();

  if (window.consent.consentMissing) {
    showDialog();
  }
  else {
    hideDialog();
  }
};
