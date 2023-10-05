"use strict";

// TDRReportCardAppContainer.babel

/**
 * @function TDRReportCardAppContainer - the schedule app container.
 */
function TDRReportCardAppContainer(props) {
  var app = TeachDash.core.applications[TeachDash.core.idToNumber["report-card-app-id"]]; // gets the app

  return /*#__PURE__*/React.createElement("div", {
    className: "tdr-report-card-app"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tdr-report-card-app-layout tdr-report-card-app-bottom-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tdr-report-card-app-header default-style",
    style: {
      boxShadow: "none",
      overflowX: "scroll",
      overflowY: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "max-content"
    }
  }, "Current Class:", /*#__PURE__*/React.createElement("select", {
    className: "default-style tdr-report-card-app-header-class-select",
    style: {
      padding: "5px",
      margin: "0 8px"
    },
    onChange: function onChange(e) {
      // checks when the app is clicked
      var app = TeachDash.core.applications[TeachDash.core.idToNumber["report-card-app-id"]]; // gets the app

      var schoolClass = TeachDash.userData.getSchoolClassById(e.target.value); // this gets the school class by the id

      if (schoolClass != undefined) {
        // checks that gender is a property of the student
        app.setCurrentClass(schoolClass); // sets the school class

        app.updateSentences(); // reloads the sentences to be used
      }
    }
  }, TeachDash.userData.schoolClasses.map(function (e, i) {
    return /*#__PURE__*/React.createElement("option", {
      value: e.id
    }, e.name);
  })), ", Select Student:", /*#__PURE__*/React.createElement("select", {
    className: "default-style tdr-report-card-app-header-class-students",
    style: {
      padding: "5px",
      margin: "0 8px"
    },
    onChange: function onChange(e) {
      // checks when the app is clicked
      var app = TeachDash.core.applications[TeachDash.core.idToNumber["report-card-app-id"]]; // gets the app

      console.log(app.currentClass.students[parseInt(e.target.value)], parseInt(e.target.value));

      if (app.currentClass.students[parseInt(e.target.value)] != undefined) {
        // checks that gender is a property of the student
        app.setCurrentStudent(app.currentClass.students[parseInt(e.target.value)]); // sets the new student

        app.updateSentences(); // reloads the sentences to be used
      }
    }
  }, "".split("").map(function (e) {
    return /*#__PURE__*/React.createElement("option", {
      value: e
    }, e);
  })), ", Select Gender:", /*#__PURE__*/React.createElement("select", {
    className: "default-style tdr-report-card-app-header-student-gender",
    style: {
      padding: "5px",
      margin: "0 8px"
    },
    onChange: function onChange(e) {
      // checks when the app is clicked
      var app = TeachDash.core.applications[TeachDash.core.idToNumber["report-card-app-id"]]; // gets the app

      if (app.student.gender != undefined) {
        // checks that gender is a property of the student
        app.student.gender = e.target.value; // sets the gender

        app.fixTextPronouns(); // fixes any pronoun issues

        TeachDash.userData.save(); // saves changed data

        app.updateSentences(); // reloads the sentences to be used
      }
    }
  }, "male female unknown".split(" ").map(function (e) {
    return /*#__PURE__*/React.createElement("option", {
      value: e
    }, e);
  })), ", Set Name:", /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "default-style tdr-report-card-app-header-student-name",
    style: {
      padding: "5px",
      margin: "0 8px"
    },
    onChange: function onChange(e) {
      // checks when the app is clicked
      var app = TeachDash.core.applications[TeachDash.core.idToNumber["report-card-app-id"]]; // gets the app

      if (app.student.name != undefined) {
        // checks that gender is a property of the student
        app.student.name = e.target.value; // sets the gender

        TeachDash.userData.save(); // saves changed data

        app.updateSentences(); // reloads the sentences to be used
      }
    }
  }), ", Set Grade:", /*#__PURE__*/React.createElement("select", {
    className: "default-style tdr-report-card-app-header-student-grade",
    style: {
      padding: "5px",
      margin: "0 8px"
    },
    onChange: function onChange(e) {
      // checks when the app is clicked
      var app = TeachDash.core.applications[TeachDash.core.idToNumber["report-card-app-id"]]; // gets the app

      if (app.student.name != undefined) {
        // checks that gender is a property of the student
        app.student.reportCard.grade = parseInt(e.target.value); // sets the grade

        TeachDash.userData.save(); // saves changed data

        app.updateSentences(); // reloads the sentences to be used
      }
    }
  }, "7654321".split("").map(function (e) {
    return /*#__PURE__*/React.createElement("option", {
      value: e
    }, e);
  })), ",", /*#__PURE__*/React.createElement(TDRButton, {
    style: {
      fontSize: "14px"
    },
    onClick: function onClick() {
      return app.learnData();
    }
  }, "Click to learn the data"), ",", /*#__PURE__*/React.createElement(TDRButton, {
    style: {
      fontSize: "14px"
    },
    onClick: function onClick() {
      if (app.student.reportCard != undefined) {
        document.getElementsByClassName("tdr-report-card-app-body-textarea")[0].value = app.student.reportCard.suggestText();
      }
    }
  }, "Click to generate"), ",", /*#__PURE__*/React.createElement(TDRButton, {
    style: {
      fontSize: "14px"
    },
    onClick: function onClick() {
      return app.copyToClipboard();
    }
  }, "Copy to Clipboard"))), /*#__PURE__*/React.createElement("div", {
    className: "tdr-report-card-app-navigation default-style",
    style: {
      boxShadow: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "tdr-report-card-app-body default-style",
    style: {
      boxShadow: "none"
    }
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "tdr-report-card-app-body-textarea default-style",
    style: {
      resize: "none",
      width: "calc(100% - 20px)",
      height: "calc(100% - 20px)",
      boxShadow: "none",
      border: "none",
      fontFamily: "Roboto",
      fontSize: "20px"
    },
    onChange: function onChange(event) {
      var app = TeachDash.core.applications[TeachDash.core.idToNumber["report-card-app-id"]]; // gets the app

      app.student.reportCard.totalText = event.target.value; // changes the value of the total text

      TeachDash.userData.save(); // saves changed data
    }
  }))));
}
/**
 * @static TDRReportCardAppContainer
 * @method Sentences - the react element to display the sentences
 */


TDRReportCardAppContainer.Sentences = function (props) {
  var app = TeachDash.core.applications[TeachDash.core.idToNumber["report-card-app-id"]]; // gets the app

  return /*#__PURE__*/React.createElement(React.Fragment, null, "7654321".split("").map(function (number) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "default-style",
      style: {
        border: "none",
        marginBottom: "16px",
        cursor: "pointer"
      }
    }, "Grade: ", number, /*#__PURE__*/React.createElement(TDRCircleButton, {
      src: "chevron-forward",
      className: "tdr-report-card-app-navigation-item-container-button-" + number,
      style: {
        transform: "rotate(90deg)",
        marginLeft: "calc(100% - 107px)"
      },
      onClick: function onClick(e) {
        // once the button is clicked
        console.log(e, [e.currentTarget]);
        var button = e.currentTarget; // gets the button

        var containerNumber = button.className.split("tdr-report-card-app-navigation-item-container-button-").pop(); // gets the number of the container it modifies

        var container = document.getElementsByClassName("tdr-report-card-app-navigation-item-container-" + containerNumber)[0]; // gets the container

        console.log(button, containerNumber, container);

        if (button.style.transform == "rotate(90deg)") {
          // checks if the button wants to collapse the list
          button.style.transform = ""; // changes the icon

          container.style.height = "0px"; // sets the height to be closed of the container
        } else {
          // checks if the button wants to expand the list
          button.style.transform = "rotate(90deg)"; // changes the icon

          container.style.height = TDStudentReport.presetData[parseInt(containerNumber)].length * (56 + 16) + "px"; // sets the height to be open of the container
        }
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "tdr-report-card-app-navigation-item-container-" + number,
      style: {
        height: TDStudentReport.presetData[parseInt(number)].length * (56 + 16) + "px",
        transition: "height 0.3s",
        overflow: "hidden"
      }
    }, TDStudentReport.presetData[parseInt(number)].map(function (sentence, sentenceIndex) {
      return /*#__PURE__*/React.createElement("div", {
        className: "tdr-report-card-app-navigation-item default-style",
        style: {
          border: "none",
          marginBottom: "16px",
          cursor: "pointer",
          position: "relative"
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "tdr-report-card-app-navigation-item-sentence",
        onDoubleClick: function onDoubleClick(event) {
          var app = TeachDash.core.applications[TeachDash.core.idToNumber["report-card-app-id"]]; // gets the app

          app.student.reportCard.totalText += " " + event.target.innerText; // changes the value of the total text

          TeachDash.userData.save(); // saves changed data

          var textElement = document.getElementsByClassName("tdr-report-card-app-body-textarea")[0]; // this gets the element of the data

          textElement.value = app.student.reportCard.totalText; // adds the text data
          // 

          /*
          var dragAndDrop = document.getElementsByClassName("report-card-app-drag-drop")[0];
          // the element for drag and drop
          
          dragAndDrop.innerText = event.target.innerText;
          // sets the name
          
          dragAndDrop.style.top = event.clientY + "px";
          // puts in the y position of the drag and drop
          
          dragAndDrop.style.left = event.clientX + "px";
          // puts in the x position of the drag and drop
          
          dragAndDrop.style.display = "block";
          // shows the element
          */
        }
      }, TDStudentReport.createSentenceFrom(sentence, app.student, app.currentClass)), /*#__PURE__*/React.createElement("div", {
        className: "tdr-report-card-app-navigation-item-edit",
        style: {
          justifyContent: "space-evenly"
        }
      }, /*#__PURE__*/React.createElement(TDRCircleButton, {
        onClick: function onClick(event) {
          var app = TeachDash.core.applications[TeachDash.core.idToNumber["report-card-app-id"]]; // gets the app

          var parentElement = event.target.parentElement.parentElement.parentElement; // gets the parent element which has the text area

          console.log(parentElement);
          var textarea = parentElement.getElementsByClassName("tdr-report-card-app-navigation-item-textarea")[0]; // gets the text element from the parent

          textarea.style.display = textarea.style.display.includes("block") ? "none" : "block"; // toggles showing or hidding the text area

          if (textarea.style.display.includes("none")) app.updateSentences(); // if the text area was done editing it rerenders the sentences
        },
        src: "create-outline"
      }), /*#__PURE__*/React.createElement(TDRCircleButton, {
        onClick: function onClick(event) {
          var app = TeachDash.core.applications[TeachDash.core.idToNumber["report-card-app-id"]]; // gets the app

          if (confirm("Are you sure you want to delete this")) {
            // confrims if the user wants to do delete or not
            TDStudentReport.presetData[parseInt(number)].splice(sentenceIndex, 1); // removes the sentence

            app.save(); // saves any changed data

            app.updateSentences(); // rerenders the sentences
          }
        },
        src: "trash-outline"
      })), /*#__PURE__*/React.createElement("textarea", {
        type: "text",
        defaultValue: TDStudentReport.createSentenceFrom(sentence, app.student, app.currentClass),
        className: "default-style tdr-report-card-app-navigation-item-textarea",
        style: {
          border: "none",
          resize: "none",
          position: "absolute",
          display: "none"
        },
        onChange: function onChange(event) {
          var app = TeachDash.core.applications[TeachDash.core.idToNumber["report-card-app-id"]]; // gets the app

          var sentence = TDStudentReport.learnFromSentence(event.target.value, app.student, app.currentClass); // recreates the sentence

          TDStudentReport.presetData[parseInt(number)][sentenceIndex] = sentence; // and stores it

          app.save(); // saves any changed data
        }
      }));
    })));
  }));
};
/**
 * @static TDRReportCardAppContainer
 * @method OptionsStudents - the react element to display the students in the select option
 */


TDRReportCardAppContainer.OptionsStudents = function (props) {
  var app = TeachDash.core.applications[TeachDash.core.idToNumber["report-card-app-id"]]; // gets the app

  return /*#__PURE__*/React.createElement(React.Fragment, null, (app.currentClass || {
    students: []
  }).students.map(function (student, i) {
    return /*#__PURE__*/React.createElement("option", {
      value: i
    }, student.name);
  }));
};
/**
 * @function TDRReportCardAppOutside - the react element for dragging and dropping data (Teach Dash React)
 */


function TDRReportCardAppOutside(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "default-style report-card-app-drag-drop default-style-glass",
    onMouseMove: function onMouseMove(e) {
      e.target.style.left = e.clientX + "px"; // sets x position

      e.target.style.top = e.clientY + "px"; // sets x position
    },
    onMouseUp: function onMouseUp(e) {
      e.target.style.display = "none"; // hides the data

      var app = TeachDash.core.applications[TeachDash.core.idToNumber["report-card-app-id"]]; // gets the app

      app.droppedItem({
        x: e.clientX,
        y: e.clientY
      }, e.target.innerText); // calls the drop item
    },
    style: {
      display: "none"
    }
  });
}