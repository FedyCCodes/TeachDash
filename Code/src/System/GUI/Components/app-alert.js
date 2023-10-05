"use strict";

// app-alert.babel
function TDRAlert(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "tdr-alert-fill"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tdr-centerize",
    style: {
      width: "100%",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tdr-alert-container default-style default-style-glass"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tdr-alert-container-header default-style default-style-glass"
  }, /*#__PURE__*/React.createElement("h2", null, "Alert")), /*#__PURE__*/React.createElement("div", {
    className: "tdr-alert-container-body default-style default-style-glass"
  }, props.content), /*#__PURE__*/React.createElement("div", {
    className: "tdr-alert-container-footer default-style default-style-glass"
  }, /*#__PURE__*/React.createElement(TDRButton, {
    style: {
      marginRight: "5px"
    },
    onClick: function onClick(e) {
      TDAlert.close();
      props.okay(e);
    }
  }, "Okay"), /*#__PURE__*/React.createElement(TDRButton, {
    onClick: function onClick(e) {
      TDAlert.close();
      props.cancel(e);
    }
  }, "Cancel")))));
}