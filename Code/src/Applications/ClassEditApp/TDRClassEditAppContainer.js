"use strict";

// TDRClassEditAppContainer.babel

/**
 * @function TDRClassEditAppContainer - the class edit app container.
 */
function TDRClassEditAppContainer(props) {
  var app = TeachDash.core.applications[TeachDash.core.idToNumber["class-edit-app-id"]]; // gets the application to use

  return /*#__PURE__*/React.createElement("div", {
    className: "tdr-class-edit-app"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tdr-class-edit-app-header default-style",
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
    className: "default-style tdr-class-edit-app-header-class-select",
    style: {
      padding: "5px",
      margin: "0 8px"
    },
    onChange: function onChange(e) {
      // checks when the app is clicked
      var app = TeachDash.core.applications[TeachDash.core.idToNumber["class-edit-app-id"]]; // gets the app

      var schoolClass = TeachDash.userData.getSchoolClassById(e.target.value); // this gets the school class by the id

      if (schoolClass != undefined) {
        // checks that gender is a property of the student
        app.setCurrentClass(schoolClass); // sets the school class
      }
    }
  }, /*#__PURE__*/React.createElement(TDRClassEditAppContainer.SchoolList, null)), ", Set Name:", /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "default-style tdr-class-edit-app-header-class-name",
    style: {
      padding: "5px",
      margin: "0 8px"
    },
    onChange: function onChange(e) {
      // checks when the app is clicked
      var app = TeachDash.core.applications[TeachDash.core.idToNumber["class-edit-app-id"]]; // gets the app

      if (app.currentClass.name != undefined) {
        // checks that gender is a property of the student
        app.currentClass.name = e.target.value; // sets the gender

        app.updateSchoolList(); // re renders the school list

        app.save(); // saves changed data
      }
    }
  }), ", Set Color:", /*#__PURE__*/React.createElement("select", {
    className: "default-style tdr-class-edit-app-header-class-color ",
    style: {
      padding: "5px",
      margin: "0 8px"
    },
    onChange: function onChange(e) {
      // checks when the app is clicked
      var app = TeachDash.core.applications[TeachDash.core.idToNumber["class-edit-app-id"]]; // gets the app

      if (app.currentClass.name != undefined) {
        // checks that class names
        app.currentClass.gradientColor = TDGradientColor.classNames[e.target.value]; // changes the color

        app.save(); // saves changed data

        document.getElementsByClassName("tdr-class-edit-app-header-class-select")[0].setAttribute("class", "default-style tdr-class-edit-app-header-class-select " + "td-gradient-color-".concat(app.currentClass.gradientColor.className, "-background-border")); // changes the color of the item

        document.getElementsByClassName("tdr-class-edit-app-header-class-color")[0].setAttribute("class", "default-style tdr-class-edit-app-header-class-color " + "td-gradient-color-".concat(app.currentClass.gradientColor.className, "-background-border")); // changes the color of the item
      }
    }
  }, Object.getOwnPropertyNames(TDGradientColor.classNames).map(function (className) {
    return /*#__PURE__*/React.createElement("option", {
      value: className
    }, className.split("-").map(function (e) {
      return e.replaceAt(0, e[0].toUpperCase());
    }).join(" "));
  })), ",", /*#__PURE__*/React.createElement(TDRButton, {
    onClick: function onClick() {
      var newSchoolClass = new TDSchoolClass({
        name: "Class Name #" + TeachDash.userData.schoolClasses.length.toString(),
        gradientColor: TDGradientColor.gray
      }); // creates a new school class

      TeachDash.userData.addSchoolClass(newSchoolClass); // adds the new class

      app.setCurrentClass(TeachDash.userData.schoolClasses[TeachDash.userData.schoolClasses.length - 1]); // sets the school class

      app.save(); // saves changed data
    }
  }, "Add New Class"), ",", /*#__PURE__*/React.createElement(TDRButton, {
    onClick: function onClick() {
      if (confirm("Are you sure you would like to delete this class?")) {
        // checks if the user wants to delete
        var app = TeachDash.core.applications[TeachDash.core.idToNumber["class-edit-app-id"]]; // gets the app

        console.log();
        TeachDash.userData.schoolClasses.splice(TeachDash.userData.schoolClasses.indexOf(app.currentClass), 1); // removes the school class from the index

        app.setCurrentClass(TeachDash.userData.schoolClasses[TeachDash.userData.schoolClasses.length - 1]); // sets the school class to undefined

        TeachDash.userData.reloadIdSystem(); // reloads the id dictionary of all the classes

        app.save(); // saves changed data
      }
    }
  }, "Delete This Class"))), /*#__PURE__*/React.createElement("div", {
    className: "tdr-class-edit-app-body default-style",
    style: {
      boxShadow: "none"
    }
  }, /*#__PURE__*/React.createElement(TDRClassEditAppContainer.StudentList, null)));
}
/**
 * @static TDRClassEditAppContainer
 * @method SchoolList - the school class list items
 */


TDRClassEditAppContainer.SchoolList = function (props) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, TeachDash.userData.schoolClasses.map(function (e, i) {
    return /*#__PURE__*/React.createElement("option", {
      value: e.id
    }, e.name);
  }));
};
/**
 * @static TDRClassEditAppContainer
 * @method StudentList - the student list items
 */


TDRClassEditAppContainer.StudentList = function (props) {
  var app = TeachDash.core.applications[TeachDash.core.idToNumber["class-edit-app-id"]]; // gets the application to use

  return /*#__PURE__*/React.createElement("div", null, (app.currentClass || {
    students: []
  }).students.map(function (student, studentIndex) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        border: "none",
        marginBottom: "10px",
        display: "flex"
      },
      className: "default-style"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        margin: "9px 2px"
      }
    }, "Name:"), /*#__PURE__*/React.createElement("input", {
      defaultValue: student.name,
      className: "default-style",
      style: {
        padding: "5px",
        margin: "0 8px",
        boxShadow: "none"
      },
      onChange: function onChange(e) {
        // checks when the app is clicked
        student.name = e.target.value; // sets the gender

        TeachDash.userData.save(); // saves changed data
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        margin: "9px 2px"
      }
    }, "Gender:"), /*#__PURE__*/React.createElement("select", {
      className: "default-style",
      style: {
        padding: "5px",
        margin: "0 8px",
        boxShadow: "none"
      },
      onChange: function onChange(e) {
        // checks when the app is clicked
        student.gender = e.target.value; // sets the gender

        TeachDash.userData.save(); // saves changed data
      },
      defaultValue: student.gender
    }, "male female unknown".split(" ").map(function (e) {
      return /*#__PURE__*/React.createElement("option", {
        value: e
      }, e);
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        margin: "9px 2px"
      }
    }, ", Set Grade:"), /*#__PURE__*/React.createElement("select", {
      className: "default-style",
      style: {
        padding: "5px",
        margin: "0 8px",
        boxShadow: "none"
      },
      onChange: function onChange(e) {
        // checks when the app is clicked
        student.reportCard.grade = parseInt(e.target.value); // sets the grade

        TeachDash.userData.save(); // saves changed data
      },
      defaultValue: student.reportCard.grade
    }, "7654321".split("").map(function (e) {
      return /*#__PURE__*/React.createElement("option", {
        value: e
      }, e);
    })), /*#__PURE__*/React.createElement(TDRCircleButton, {
      src: "trash-outline",
      style: {
        boxShadow: "none"
      },
      onClick: function onClick(e) {
        // when the remove the click
        var app = TeachDash.core.applications[TeachDash.core.idToNumber["class-edit-app-id"]]; // gets the app

        if (app.currentClass) {
          // gets the current class
          if (confirm("Are you sure you want to delete this")) {
            // confrims if the user wants to do delete or not
            app.currentClass.students.splice(studentIndex, 1); // removes the student index

            app.updateStudentList(); // re renders the student list

            TeachDash.userData.save(); // saves changed data
          }
        }
      }
    }));
  }), /*#__PURE__*/React.createElement(TDRButton, {
    onClick: function onClick(e) {
      // when a button is clicked
      var app = TeachDash.core.applications[TeachDash.core.idToNumber["class-edit-app-id"]]; // gets the app

      app.addStudent(); // adds a new student
    }
  }, "Add New Student"));
};