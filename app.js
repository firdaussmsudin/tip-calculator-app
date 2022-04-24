// formula
// tip-amount = (input-bill*(div-tip/100))/input-people
// total-amount = (input-bill/input-people)+tip-amount
input_bill = 0;
input_people = document.getElementById("input-people").value;
tip_value = 0;

// get all input value and call calculate function
document.getElementById("input-bill").addEventListener("keyup", () => {
  input_bill = document.getElementById("input-bill").value;
  console.log("input_bill:" + input_bill);
  calculateAmount();
});

document.getElementById("input-people").addEventListener("keyup", () => {
  input_people = document.getElementById("input-people").value;
  console.log("input_people:" + input_people);
  calculateAmount();
});

tip_selection =
  document.getElementsByClassName("div-tip-selection")[0].children;
tip_selection_array = Array.from(tip_selection);

tip_selection_array.forEach((element) => {
  element.addEventListener("click", () => {
    tip_selection_array.forEach((insideElement) => {
      insideElement.classList.contains("btn-active")
        ? insideElement.classList.remove("btn-active")
        : null;

      document.getElementById("input-tip").value = null;
    });

    if (element.tagName == "BUTTON") {
      element.classList.add("btn-active");
    }

    tip_value = element.value;
    console.log("tip-value=" + tip_value);
    calculateAmount();
  });
});

// automatic calculate when enter custom tip
document.getElementById("input-tip").addEventListener("keyup", () => {
  tip_value = document.getElementById("input-tip").value;
  console.log("tip-value=" + tip_value);
  calculateAmount();
});

//get all input value end

function calculateAmount() {
  if (input_people == 0) {
    console.log("people cant be zero");
    document.getElementsByClassName("err-message")[0].style.visibility =
      "visible";
    document.getElementById('input-people').classList.add('input-error')
    return;
  }

  document.getElementById('input-people').classList.remove('input-error');

  document.getElementsByClassName("err-message")[0].style.visibility = "hidden";

  tip_amount = (input_bill * (tip_value / 100)) / input_people;
  tip_amount = Math.round(tip_amount * 100) / 100;
  total_amount =
    Math.round((input_bill / input_people) * 100) / 100 + tip_amount;

  console.log("tip amount = " + tip_amount);
  console.log("total amount = " + total_amount);
  document.getElementById("tip-amount").innerHTML = "$" + tip_amount.toFixed(2);
  document.getElementById("total-amount").innerHTML =
    "$" + total_amount.toFixed(2);

  if (tip_amount > 0 || total_amount > 0) {
    buttonActive();
    buttonFunction();
  }
}

function buttonActive() {
  document.getElementById("btn-reset").removeAttribute("disabled");
  document.getElementById("btn-reset").classList.add("btn-active");
}

function buttonFunction() {
  document.getElementById("btn-reset").addEventListener("click", () => {
    inputBox = document.getElementsByTagName("input");

    
    for (i = 0; i < inputBox.length; i++) {
      inputBox[i].value = null;
    }

    input_bill = 0;
    input_people = 0;
    tip_value = 0;
    
    tip_select =
      document.getElementsByClassName("div-tip-selection")[0].children;
    Array.from(tip_select).forEach((element) => {
      element.classList.contains("btn-active")
        ? element.classList.remove("btn-active")
        : null;
    });

    document.getElementById("tip-amount").innerHTML = "$0.00";
    document.getElementById("total-amount").innerHTML = "$0.00";

    document.getElementById("btn-reset").setAttribute("disabled", "");
    document.getElementById("btn-reset").classList.remove("btn-active");
    document.getElementsByClassName("err-message")[0].style.visibility =
      "hidden";
  });


}
