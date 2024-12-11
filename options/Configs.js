'use strict';

function Configs(aDefaults, aOptions = { syncKeys: [] }) {
  this.$default = aDefaults;
  this.$logging = false;
  this.$locked = {};
  this.$lastValues = {};
  this.$syncKeys = aOptions.syncKeys || [];
  this.$loaded = this.$load();
}
Configs.prototype = {
  $load: async function() {
    this.$applyValues(this.$default);
    chrome.runtime.onMessage.addListener(this.$onMessage.bind(this));
    if (this.$shouldUseStorage) {
      const values = await this.$getFromStorage();
      this.$applyValues(values);
      chrome.storage.onChanged.addListener(this.$onChanged.bind(this));
    }
  },

  $getFromStorage: async function() {
    return new Promise((resolve) => {
      chrome.storage.local.get(this.$default, (items) => {
        resolve(items || this.$default);
      });
    });
  },

  $applyValues: function(values) {
    Object.keys(values).forEach((key) => {
      if (!(key in this.$locked)) {
        this.$lastValues[key] = values[key];
        if (!(key in this)) {
          Object.defineProperty(this, key, {
            get: () => this.$lastValues[key],
            set: (value) => {
              if (key in this.$locked) return value;
              this.$lastValues[key] = value;
              this.$notifyUpdated(key);
              return value;
            },
          });
        }
      }
    });
  },

  $notifyUpdated: function(key) {
    const value = this[key];
    const locked = key in this.$locked;
    const updatedKey = {};
    updatedKey[key] = value;
    chrome.storage.local.set(updatedKey);
  },
};
