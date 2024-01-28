const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

document.addEventListener('DOMContentLoaded', function () {
  var reloadButton = document.getElementById('reload');

  reloadButton.addEventListener('click', function () {
    location.reload();
  });
});

const learners = {
  // ... (your learner data)
  ClassEight2023: [
    {LearninArea:"Not yet Selected ",   
     imageUrl: "",
    },
    { 
      imageUrl: "",
      LearninArea: "1. EDWARD BENARD ABEKA ", 
      SchoolChoices: "https://1drv.ms/f/s!ApO7CeXy3fBY9gKcjHWX6jPP428P?e=wY8rvC",
      LearnerSelections: "https://1drv.ms/f/s!ApO7CeXy3fBY9gKcjHWX6jPP428P?e=wY8rvC", 
      LeavingCertificate: "./Pdfs/leaving/Abeka's leaving Cert.pdf", 
      OnlineResultSlip: "./Pdfs/Slip/Abeka's Slip.pdf", 
      Placement:"./Pdfs/Placements 2023.pdf", 
      CallingLetter:"#",
      password: "ass",
     
      },
    
    {
      imageUrl: "./img/randy.jpg",
      LearninArea: " 12. OTIENO RANDY FRANKLINE",
      Gender: "Female", 
     SchoolChoices: "./Pdfs/SCHOOLCHOICES.pdf",
     LearnerSelections: "./Pdfs/NominallKcpe.pdf",
      LeavingCertificate: "./Pdfs/leaving/stephanie.pdf", 
      OnlineResultSlip: "./Pdfs/Slip/stephanie Slip.pdf", 
      Placement:"./Pdfs/Placements 2023.pdf", 
      CallingLetter:"#",
     
      },
  
   
  
    // Other learner objects without passwords
  ],
  GradeSeven: [
    { LearninArea: "", Age: "", grade: "", imageUrl: "" },
    { LearninArea: "Alice Johnson", age: 16, grade: "A+", imageUrl: "url/to/image4.jpg" },
    // Other learner objects without passwords
  ],
  // Other classes and learners
};

function promptForDownloadPassword(learner, fileKey = "SchoolChoices") {
  handleDownload(learner, fileKey);
}

// ... (previous code)

function handleDownload(learner, fileKey) {
  const url = learner[fileKey];

  // Create a temporary anchor element to trigger the download
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("target", "_blank"); // Open link in a new tab
  document.body.appendChild(link); // Append the link to the body
  link.click();

  // Remove the temporary anchor element
  document.body.removeChild(link);

  // Note: Pop-up blockers usually allow window.open if called immediately in response to a user action.
  // Open a new window (optional, depending on your requirements)
  // const newWindow = window.open();

  // Close the new window after a short delay (e.g., 500 milliseconds)
  setTimeout(() => {
    window.close();
  }, 500);
}

// ... (rest of the code)


function countLearnersInClass(classLearninArea) {
  return learners[classLearninArea].length - 1;
}

function displayLearners() {
  const selectedClass = document.getElementById("classSelect").value;
  const learnerSelect = document.getElementById("learnerSelect");
  learnerSelect.innerHTML = "";

  learners[selectedClass].forEach((learner, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = learner.LearninArea;
    learnerSelect.appendChild(option);
  });

  const numberOfLearners = countLearnersInClass(selectedClass);
  const countDisplay = document.getElementById("learnerCount");
  countDisplay.textContent = `🔍Total Number of Learning areas: ${numberOfLearners}`;

  displayBiodata();
}

function displayBiodata() {
  const selectedClass = document.getElementById("classSelect").value;
  const selectedLearnerIndex = document.getElementById("learnerSelect").value;
  const biodataDiv = document.getElementById("learnerBiodata");
  const selectedLearner = learners[selectedClass][selectedLearnerIndex];

  biodataDiv.innerHTML = "";

  for (const [key, value] of Object.entries(selectedLearner)) {
    if (
      key !== "imageUrl" &&
      key !== "SchoolChoices" &&
      key !== "LearnerSelections" &&
      key !== "LeavingCertificate" &&
      key !== "OnlineResultSlip" &&
      key !== "Placement" &&
      key !== "CallingLetter" &&
      key !== "password"
    ) {
      const p = document.createElement("p");
      p.textContent = `${key}: ${value}`;
      biodataDiv.appendChild(p);
    }
  }

  if (selectedLearner.SchoolChoices) {
    createDownloadLink(biodataDiv, selectedLearner, "SchoolChoices", "🫂School Choices");
  }
  if (selectedLearner.LearnerSelections) {
    createDownloadLink(biodataDiv, selectedLearner, "LearnerSelections", "🚶‍♀️Learner Selections");
  }
  if (selectedLearner.LeavingCertificate) {
    createDownloadLink(biodataDiv, selectedLearner, "LeavingCertificate", "🤼Leaving Certificate");
  }
  if (selectedLearner.OnlineResultSlip) {
    createDownloadLink(biodataDiv, selectedLearner, "OnlineResultSlip", "👨‍⚕️Online Result Slip");
  }
  if (selectedLearner.Placement) {
    createDownloadLink(biodataDiv, selectedLearner, "Placement", "🔍Placements");
  }
  if (selectedLearner.CallingLetter) {
    createDownloadLink(biodataDiv, selectedLearner, "CallingLetter", "📩Calling Letter", true);
  }
}

function createDownloadLink(parent, learner, fileKey, text, alertPendingUpdate) {
  const downloadLink = document.createElement("a");
  downloadLink.href = "#"; // Set an initial value for href
  downloadLink.textContent = text;
  downloadLink.onclick = function () {
    promptForDownloadPassword(learner, fileKey);
  };
  if (alertPendingUpdate) {
    downloadLink.onclick = function () {
      promptForDownloadPassword(learner, fileKey);
      alert("Pending Update");
    };
  }
  parent.appendChild(downloadLink);
}

// Initial call to display learners
displayLearners();
