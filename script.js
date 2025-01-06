document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("resume-form");
    var resumeContainer = document.getElementById("resume-container");
    var profilePictureInput = document.getElementById("profile-picture");
    var profilePreview = document.getElementById("profile-preview");
    var displayProfile = document.getElementById("display-profile");
    var finalizeButton = document.getElementById("finalize-resume");
    var shareableLinkButton = document.getElementById("shareable-link");
    var downloadPdfButton = document.getElementById("download-pdf");
    // Update profile picture preview
    profilePictureInput.addEventListener("change", function (e) {
        var _a;
        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var _a;
                var result = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
                profilePreview.src = result;
                displayProfile.src = result;
            };
            reader.readAsDataURL(file);
        }
    });
    // Handle form submission
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        // Collect form data
        var name = document.getElementById("name").value;
        var title = document.getElementById("title").value;
        var email = document.getElementById("email").value;
        var contact = document.getElementById("contact").value;
        var address = document.getElementById("address").value;
        var objective = document.getElementById("objective").value;
        var educationItems = document.querySelectorAll(".education-item");
        var education = Array.from(educationItems).map(function (item) {
            var degree = item.querySelector(".degree").value;
            var year = item.querySelector(".year").value;
            return "".concat(degree, " (").concat(year, ")");
        });
        var skills = document.getElementById("skills").value.split(",");
        var experience = document.getElementById("experience").value.split(",");
        // Populate the resume
        document.getElementById("display-name").textContent = name;
        document.getElementById("display-title").textContent = title;
        document.getElementById("display-email").textContent = email;
        document.getElementById("display-contact").textContent = contact;
        document.getElementById("display-address").textContent = address;
        document.getElementById("display-objective").textContent = objective;
        var educationList = document.getElementById("display-education");
        educationList.innerHTML = education.map(function (edu) { return "<li contenteditable=\"true\">".concat(edu, "</li>"); }).join("");
        var skillsList = document.getElementById("display-skills");
        skillsList.innerHTML = skills.map(function (skill) { return "<li contenteditable=\"true\">".concat(skill.trim(), "</li>"); }).join("");
        var experienceList = document.getElementById("display-experience");
        experienceList.innerHTML = experience.map(function (exp) { return "<li contenteditable=\"true\">".concat(exp.trim(), "</li>"); }).join("");
        // Show the resume and action buttons
        resumeContainer.style.display = "block";
        finalizeButton.style.display = "inline-block";
        shareableLinkButton.style.display = "inline-block";
        downloadPdfButton.style.display = "inline-block";
    });
    // Finalize the resume (disable editing)
    finalizeButton.addEventListener("click", function () {
        var editableFields = resumeContainer.querySelectorAll("[contenteditable='true']");
        editableFields.forEach(function (field) { return field.removeAttribute("contenteditable"); });
        form.style.display = "none";
        finalizeButton.style.display = "none";
        alert("Resume has been finalized!");
    });
    // Generate and copy a shareable link
    shareableLinkButton.addEventListener("click", function () {
        var resumeHtml = resumeContainer.innerHTML;
        var blob = new Blob([resumeHtml], { type: "text/html" });
        var link = URL.createObjectURL(blob);
        navigator.clipboard.writeText(link).then(function () {
            alert("Shareable link copied to clipboard!");
        });
    });
    // Download the resume as PDF
    downloadPdfButton.addEventListener("click", function () {
        var jsPDF = window.jspdf.jsPDF;
        var doc = new jsPDF();
        doc.html(resumeContainer, {
            callback: function (doc) {
                doc.save("resume.pdf");
            },
            x: 10,
            y: 10,
        });
    });
});
