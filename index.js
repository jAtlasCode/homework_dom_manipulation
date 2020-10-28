const container = document.getElementsByClassName("builder");
const age = document.getElementsByName("age");
const form = document.getElementsByTagName("form");
const relationship = document.getElementsByName("rel");
const isSmoker = document.getElementsByName("smoker");
const addButton = document.querySelector(".add");
const submitButton = document.getElementsByClassName("submit");
const submitBtn = form[0][4];
const householdList = document.getElementsByClassName("household");
const dataContainer = document.getElementsByClassName("debug");

let data = [];
const onSubmit = () => {
  event.preventDefault();
  console.log(data);

  // append members to debug area
  data.forEach((item, i) => {
    const node = document.createElement("li");
    node.setAttribute("id", "item" + i);
    const textNode = document.createTextNode(
      `Household Member #${i}: Age: ${item.validAge}, Relationship: ${item.validRel}, Smoker?: ${item.smokerAnswer} `
    );
    dataContainer[0].appendChild(node);
    node.appendChild(textNode);
  });

  dataContainer[0].style.display = "block";
};

window.onload = function () {
  addButton.addEventListener("click", addMember);
  form[0].addEventListener("submit", onSubmit);
};

let counter = 0;
const addMember = (event) => {
  event.preventDefault();
  // init household member object, valid member var
  let member = {
    age: "",
    relationship: "",
    smoker: "",
  };
  let memberValid = false;

  console.log("Add button clicked!");
  // answers
  const ageAnswer = age[0].value;
  const relationshipAnswer = relationship[0].value;
  const smokerAnswer = isSmoker[0].checked;
  let validAge;
  let validRel;

  // set answers that don't need validation
  member.relationship = relationshipAnswer;
  member.smoker = smokerAnswer;
  console.group("user answers");
  console.log(`Selected age of: ${ageAnswer}`);
  console.log(`Relationship: ${relationshipAnswer}`);
  console.log(`Smoker?: ${smokerAnswer}`);
  console.groupEnd();

  // validation function
  const validate = () => {
    if (ageAnswer === 0) {
      memberValid = false;
      alert("You must enter an age greater than 0");
      console.log("age is not valid!");
    }
    if (relationshipAnswer === "") {
      memberValid = false;
      alert("You must select a relationship");
      console.log("Relationship not selected");
    }
    if (ageAnswer > 0 && relationshipAnswer !== "") {
      memberValid = true;
      member.age = ageAnswer;
      validAge = ageAnswer;
      validRel = relationshipAnswer;
      console.log("age is valid!");
    }
  };

  validate();
  data.push({ validAge, validRel, smokerAnswer });

  const appendMember = () => {
    // append member to household list, append delete member button
    const node = document.createElement("li");
    const removeButton = document.createElement("button");
    const textNode = document.createTextNode(
      `Age: ${member.age}, Relationship: ${member.relationship}, Smoker: ${member.smoker}`
    );

    removeButton.className = "remove";
    removeButton.innerHTML = "x";

    node.appendChild(textNode);

    node.setAttribute("id", "item" + householdList[0].children.length);
    removeButton.setAttribute(
      "onClick",
      'removeMember("' + "item" + counter + '")'
    );

    householdList[0].appendChild(node);
    counter += 1;
    node.appendChild(removeButton);

    // reset form fields
    document.getElementsByName("age")[0].value = "";
    document.getElementsByName("rel")[0].value = "";
    document.getElementsByName("smoker")[0].checked = false;
  };

  // only append member if selections are valid
  if (memberValid === true) {
    console.log("member was valid");
    appendMember();
  }
};

// remove member and reduce counter
const removeMember = (itemId) => {
  console.log(itemId);
  const item = document.getElementById(itemId);
  const list = householdList[0];
  list.removeChild(item);
  counter -= 1;
};
