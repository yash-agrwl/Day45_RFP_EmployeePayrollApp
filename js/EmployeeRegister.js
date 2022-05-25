// UC10
window.addEventListener('DOMContentLoaded', (event) => {
    // UC10A - Update Salary value.
    let salary = document.querySelector("#salary");
    let output = document.querySelector(".salary-output");
    salary.addEventListener("input", function () {
        output.textContent = salary.value;
    });

    // Name Validation.
    let name = document.querySelector("#name");
    let nameError = document.querySelector(".name-error");
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            nameError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            nameError.textContent = "";
        }
        catch (e) {
            nameError.textContent = e;
        }
    });
})