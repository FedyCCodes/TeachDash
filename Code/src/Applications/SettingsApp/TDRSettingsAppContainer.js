"use strict";

// TDRSettingsAppContainer.babel

/**
 * @function TDRSettingsAppContainer - the settings app container.
 */
function TDRSettingsAppContainer(props) {
  var app = TeachDash.core.applications[TeachDash.core.idToNumber["settings-app-id"]]; // gets the application

  return /*#__PURE__*/React.createElement("div", {
    className: "tdr-settings-app"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Settings App"), /*#__PURE__*/React.createElement("h3", null, "General:"), /*#__PURE__*/React.createElement("div", {
    className: "tdr-settings-app-item default-style"
  }, /*#__PURE__*/React.createElement("span", null, "Set Animation type:"), /*#__PURE__*/React.createElement(TDRButton, {
    onClick: function onClick() {
      return TeachDash.userData.setAnimationMode(false);
    }
  }, "Minimal"), /*#__PURE__*/React.createElement(TDRButton, {
    onClick: function onClick() {
      return TeachDash.userData.setAnimationMode(true);
    }
  }, "Normal")), /*#__PURE__*/React.createElement("div", {
    className: "tdr-settings-app-item default-style"
  }, /*#__PURE__*/React.createElement("span", null, "Set Notification type:"), /*#__PURE__*/React.createElement(TDRButton, {
    onClick: function onClick() {
      return TeachDash.userData.setNotificationMode(true);
    }
  }, "On"), /*#__PURE__*/React.createElement(TDRButton, {
    onClick: function onClick() {
      return TeachDash.userData.setNotificationMode(false);
    }
  }, "Off")), /*#__PURE__*/React.createElement("div", {
    className: "tdr-settings-app-item default-style"
  }, /*#__PURE__*/React.createElement("span", null, "Set dark mode to:"), /*#__PURE__*/React.createElement("button", {
    className: "tdr-app-button system-style",
    onClick: function onClick() {
      return TeachDash.userData.setColorMode();
    }
  }, "System"), /*#__PURE__*/React.createElement("button", {
    className: "tdr-app-button light-style",
    onClick: function onClick() {
      return TeachDash.userData.setColorMode("body-light");
    }
  }, "Light"), /*#__PURE__*/React.createElement("button", {
    className: "tdr-app-button dark-style",
    onClick: function onClick() {
      return TeachDash.userData.setColorMode("body-dark");
    }
  }, "Dark")), /*#__PURE__*/React.createElement("div", {
    className: "tdr-settings-app-item default-style"
  }, /*#__PURE__*/React.createElement("span", null, "Open path of data:"), /*#__PURE__*/React.createElement(TDRButton, {
    onClick: function onClick() {
      return TeachDash.core.fs.openFolderWithApp(new TDFSSimplified().getFullPath());
    }
  }, "Open Folder")), /*#__PURE__*/React.createElement("h3", null, "About:"), /*#__PURE__*/React.createElement("div", {
    className: "tdr-settings-app-item default-style"
  }, "Version: ", TeachDash.version, /*#__PURE__*/React.createElement("br", null), "Update Log:", /*#__PURE__*/React.createElement("br", null), TeachDash.updateText.split("\n").map(function (e) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, e, /*#__PURE__*/React.createElement("br", null));
  })), /*#__PURE__*/React.createElement("div", {
    className: "tdr-settings-app-item default-style",
    style: {
      display: "block"
    }
  }, "Made with:", /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(TDRIonicon, {
    src: "logo-nodejs"
  }), "Node.JS (version: ", process.versions.node, ")"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(TDRIonicon, {
    src: "logo-electron"
  }), "ElectronJS (version: ", process.versions.electron, ")"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(TDRIonicon, {
    src: "logo-react"
  }), "ReactJS (version: ", React.version, ")"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(TDRIonicon, {
    src: "logo-css3"
  }), "Less (version: 4.1.1)"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(TDRIonicon, {
    src: "logo-ionic"
  }), "Ionic (for ionicons)"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(TDRIonicon, {
    src: "logo-google"
  }), "Google Fonts"))), /*#__PURE__*/React.createElement("div", {
    className: "tdr-settings-app-item default-style",
    style: {
      display: "block"
    }
  }, "Compatible with:", /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(TDRIonicon, {
    src: "logo-apple"
  }), "MacOS"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(TDRIonicon, {
    src: "logo-windows"
  }), "Windows"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(TDRIonicon, {
    src: "logo-tux"
  }), "Linux")))));
}