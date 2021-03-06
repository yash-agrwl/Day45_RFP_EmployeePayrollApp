// UC10
window.addEventListener('DOMContentLoaded', (event) => {
    // UC10A - Update Salary value.
    let salary = document.querySelector("#salary");
    let output = document.querySelector(".salary-output");
    salary.addEventListener("input", function () {
        output.textContent = salary.value;
    });

    // UC10B - Name Validation.
    let name = document.querySelector("#name");
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            setValueByClass(".name-error", "");
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            setValueByClass(".name-error", "");
        }
        catch (e) {
            setValueByClass(".name-error", e);
        }
    });

    // UC10C - startDate Validation.
    const date = document.querySelector("#date");
    date.addEventListener('input', function () {
        const startDate = getInputValueById("#day") + " " + getInputValueById("#month") + " " + getInputValueById("#year");
        try {
            (new EmployeePayrollData()).startDate = new Date(startDate);
            setValueByClass(".date-error", "");
        }
        catch (e) {
            setValueByClass(".date-error", e);
        }
    });
});

/*
* 1: querySelector is the newer feature.
* 2: The querySelector method can be used when selecting by element name, nesting or class name.
* 3: querySelector lets you find elements with rules that can't be expressed with getElementById.
*/
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

// /*
// * 1: getElementById is better supported than querySelector in older versions of the browsers.
// * 2: The thing with getElementById is that it only allows to select an element by its id.
// */
// const getInputElementValue = (id) => {
//     let value = document.getElementById(id).value;
//     return value;
// }

const setValueByClass = (className, value) => {
    const element = document.querySelector(className);
    element.textContent = value;
}

// UC11
const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    }
    catch (e) {
        alert(e + "\nPlease try again...");
    }
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById("#name");
    }
    catch (e) {
        setValueByClass(".name-error", e);
        throw e;
    }
    employeePayrollData.ProfilePic = getSelectedValues("[name=profile]").pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById("#notes");
    let date = getInputValueById("#day") + " " + getInputValueById("#month") + " " + getInputValueById("#year");
    employeePayrollData.startDate = new Date(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selectItems = [];
    allItems.forEach(item => {
        if (item.checked)
            selectItems.push(item.value);
    });
    return selectItems;
}

// UC12
function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if (employeePayrollList != undefined)
        employeePayrollList.push(employeePayrollData);
    else
        employeePayrollList = [employeePayrollData];

    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
}

// UC13
const resetForm = () => {
    setValueByClass(".name-error", "");
    setValueByClass(".salary-output", 40000);
    setValueByClass(".date-error", "");

    // Optional: needed when resetButton is of type button instead of reset.
    setValueById("#name", "");
    unsetSelectedValues("[name=profile]");
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValueById("#salary", "");
    setValueById("#day", "");
    setValueById("#month", "");
    setValueById("#year", "");
    setValueById("#notes", "");
}

const setValueById = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}