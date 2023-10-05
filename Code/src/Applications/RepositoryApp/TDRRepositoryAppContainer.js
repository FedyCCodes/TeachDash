"use strict";

// TDRRepositoryAppContainer.babel

/**
 * @function TDRRepositoryAppContainer - the schedule app container.
 */
function TDRRepositoryAppContainer(props) {
  var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]]; // gets the app

  return /*#__PURE__*/React.createElement("div", {
    className: "tdr-repository-app"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tdr-repository-app-header default-style",
    style: {
      boxShadow: "none"
    }
  }, "Current Folder:", /*#__PURE__*/React.createElement("div", {
    className: "default-style tdr-repository-app-header-folder"
  }, "Unknown Class"), ", Layout Type:", /*#__PURE__*/React.createElement("select", {
    className: "default-style",
    defaultValue: app.itemsStyle,
    style: {
      padding: "5px",
      margin: "0 8px"
    },
    onChange: function onChange(e) {
      // changes the 
      var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]]; // gets the app

      app.setItemsStyle(e.target.value); // sets the items style
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "list"
  }, "List"), /*#__PURE__*/React.createElement("option", {
    value: "grid"
  }, "Grid"))), /*#__PURE__*/React.createElement("div", {
    className: "tdr-repository-app-body tdr-repository-app-body-hide-preview",
    style: {
      boxShadow: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "default-style tdr-repository-app-body-container tdr-repository-app-body-container-" + app.itemsStyle,
    onDrop: function onDrop(e) {
      var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]]; // gets the app

      app.onDragAndDrop(e); // runs the drag and drop
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "tdr-repository-app-body-preview default-style"
  })));
}
/**
 * @static TDRRepositoryAppContainer
 * @method PreviewFile - an element used to preview a file
 */


TDRRepositoryAppContainer.PreviewFile = function (props) {
  var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]]; // gets the app

  return /*#__PURE__*/React.createElement("div", {
    className: "tdr-repository-app-body-preview-file",
    style: {
      width: "100%",
      height: "100%",
      position: "relative"
    }
  }, props.fileType == "text" ? /*#__PURE__*/React.createElement("textarea", {
    className: "default-style tdr-repository-app-body-preview-file-textarea",
    value: props.data,
    style: {
      width: "calc(100% - 30px)",
      height: "calc(100% - 30px)",
      resize: "none"
    },
    onchange: app.editPreviewFile
  }) : props.fileType == "image" ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: "calc(100% - 30px)",
      height: "calc(100% - 30px)",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundImage: "url(".concat(props.data, ")")
    }
  }) : /*#__PURE__*/React.createElement("p", null, "Invalid File Type"), /*#__PURE__*/React.createElement(TDRCircleButton, {
    src: "close",
    style: {
      boxShadow: "none",
      position: "absolute",
      bottom: "10px",
      right: "10px"
    },
    onClick: function onClick() {
      return app.togglePreviewFrom(app.currentPreviewPath);
    }
  }));
};
/**
 * @static TDRRepositoryAppContainer
 * @method Files - list all the files
 */


TDRRepositoryAppContainer.Files = function (props) {
  var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]]; // gets the app

  return /*#__PURE__*/React.createElement("div", null, app.currentEntries.map(function (entry) {
    // gets the entry
    return /*#__PURE__*/React.createElement(TDRRepositoryAppContainer.Item, {
      entry: entry,
      fileName: entry.fileName,
      src: entry.src,
      onClick: entry.onClick,
      fullPath: entry.fullPath,
      fileFunctions: entry.fileFunctions
    });
  }));
};
/**
 * @static TDRRepositoryAppContainer
 * @method Item - the item for files or folder
 */


TDRRepositoryAppContainer.Item = function (props) {
  var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]]; // gets the app

  return /*#__PURE__*/React.createElement("div", {
    className: "tdr-repository-app-body-item default-style",
    onClick: props.onClick || function () {},
    fullPath: props.fullPath
  }, /*#__PURE__*/React.createElement(TDRIonicon, {
    src: props.src || props.icon || RepositoryApp.fileExtToIcon[props.fileName.split(".").pop()] || RepositoryApp.fileExtToIcon["default"]
  }), /*#__PURE__*/React.createElement("p", null, props.fileName || "Unknown file"), /*#__PURE__*/React.createElement("div", {
    style: {
      "float": "right"
    }
  }, /*#__PURE__*/React.createElement(TDRCircleButton, {
    src: app.pinnedEntries.indexOf(props.fullPath) < 0 ? "add-circle-outline" : "remove-circle-outline",
    style: {
      boxShadow: "none"
    },
    onClick: function onClick() {
      return props.fileFunctions.pin(props.entry || props.fullPath);
    }
  }), /*#__PURE__*/React.createElement(TDRCircleButton, {
    src: "eye-sharp",
    style: {
      boxShadow: "none"
    },
    onClick: function onClick() {
      return props.fileFunctions.preview(props.fullPath);
    }
  }), /*#__PURE__*/React.createElement(TDRCircleButton, {
    src: "open-outline",
    style: {
      boxShadow: "none"
    },
    onClick: function onClick() {
      return props.fileFunctions.open(props.fullPath);
    }
  }), /*#__PURE__*/React.createElement(TDRCircleButton, {
    src: "trash-outline",
    style: {
      boxShadow: "none"
    },
    onClick: function onClick() {
      return props.fileFunctions.remove(props.fullPath);
    }
  })));
};
/**
 * @function TDRRepositoryWidget - the schedule app container.
 */


function TDRRepositoryWidget(props) {
  var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]]; // gets the app

  return /*#__PURE__*/React.createElement("div", {
    className: "tdr-repository-widget"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tdr-repository-widget-header default-style",
    style: {
      marginBottom: "10px",
      display: "flex"
    }
  }, "Pinned Files:"), /*#__PURE__*/React.createElement("div", {
    className: "tdr-repository-widget-body tdr-repository-app-body-container-list default-style",
    style: {
      marginBottom: "10px",
      overflow: "scroll"
    }
  }, app.pinnedEntries.map(function (entryPath) {
    // gets the entry
    return /*#__PURE__*/React.createElement(TDRRepositoryAppContainer.Item, {
      fileName: entryPath.split("/").pop(),
      src: entryPath,
      fullPath: entryPath,
      fileFunctions: app.fileFunctions
    });
  })));
}