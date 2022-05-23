// UC8 - Update Salary value.
let salary = document.querySelector("#salary");
let output = document.querySelector(".salary-output");
salary.addEventListener("input", function () {
    output.textContent = salary.value;
});