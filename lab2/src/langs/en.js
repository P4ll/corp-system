export default {
    graph: {
        scale: "Scale",
        change: "Edit",
        add: "Add",
        addFunc: "Add function",
        close: "Close",
        title: "Function chart",
        addDialog: {
            funcName: "Function name",
            addHint: "May stay empty",
            funcsParms: "Function parameters",
            notANumber: "Not a number",
            color: "Color",
            colorError: "Wrong color value",
            colorHint: "Input color in HEX format",
        },
        updateDialog: {
            updateFunc: "Edit function",
            selectFunc: "Select function",
            delFuncErr: "Function not selected",
            delFunc: "Delete",
            delSucc: "function successfully deleted",
        },
    },
    menu: {
        siteTitle: "Laboratory work",
        enter: "Enter",
        reg: "Registration",
        hello: "You are logged in as",
        exit: "Exit",
        funcChart: "Function chart",
        userProfile: "User profile",
        nt: {
            exit: "You have successfully logged out",
        },
        lang: {
            ru: "Russian",
            en: "English",
        },
    },
    auth: {
        title: "Registration page",
        login: "Login",
        name: "Name",
        pass: "Password",
        repPass: "Repeat password",
        country: "Country",
        age: "Age",
        reg: "Registration",
        countries: ["Russia", "Ukraine", "Belarus", "Kazakhstan"],
        isAdm: "Is Admin?",
        formErrors: {
            passEq: "Passwords must match",
            country: "The country was not selected",
            less3sym: "Less than 3 characters entered",
            latinOnly: "Only latin characters",
            noCyr: "You can’t use the Cyrillic alphabet",
            ageInp: "Enter age",
            notANumber: "Not a number entered",
            wrNumb: "Age does not belong to segment [1, 150]",
            notAInt: "Non-integer age entered",
        },
        nt: {
            usedLogin: "This login is already in use",
            succesReg: "User successfully registered",
            authRed: "Automatically go to login page",
            stOnPage: "Click <b> Cancel </b> to stay on the page",
            someInpIsWrong:
                "Some fields are not filled / are filled incorrectly",
        },
    },
    usrData: {
        title: "User Settings Panel",
        update: "Edit",
        endUpdate: "End Editing",
        changePass: "Change Password",
        oldPass: "Old password",
        newPass: "New password",
        cancel: "Cancel",
        save: "Save",
        delUser: "Delete user",
        uSel: "Select user",
        nt: {
            inpOldPass: "Enter your old password",
            oldPassWrong: "Old password is incorrect",
            success: "Password changed successfully",
            isOk: "Are you sure?",
            delMess: "Deletion cannot be undone. Are you sure?",
        },
    },
    log: {
        title: "Log in",
        nt: {
            succExit: "You have successfully logged out",
            succEnter: "You have successfully logged in",
            wrPass: "Wrong password",
            wrLog: "User with such login not found",
        },
    },
    errorPage: {
        error404: "Error 404",
        pageNF: "Page not found",
        onMain: "Go to home page",
    },
};
