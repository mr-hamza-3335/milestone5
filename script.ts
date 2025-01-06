import { jsPDF } from "jspdf"; // Import jsPDF

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resume-form") as HTMLFormElement;
    const resumeContainer = document.getElementById("resume-container") as HTMLDivElement;
    const profilePictureInput = document.getElementById("profile-picture") as HTMLInputElement;
    const profilePreview = document.getElementById("profile-preview") as HTMLImageElement;
    const displayProfile = document.getElementById("display-profile") as HTMLImageElement;
    const finalizeButton = document.getElementById("finalize-resume") as HTMLButtonElement;
    const shareableLinkButton = document.getElementById("shareable-link") as HTMLButtonElement;
    const downloadPdfButton = document.getElementById("download-pdf") as HTMLButtonElement;

    // Update profile picture preview
    profilePictureInput.addEventListener("change", (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result as string;
                profilePreview.src = result;
                displayProfile.src = result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle form submission
    form.addEventListener("submit", (e: Event) => {
        e.preventDefault();

        // Collect form data
        const name = (document.getElementById("name") as HTMLInputElement).value;
        const title = (document.getElementById("title") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const contact = (document.getElementById("contact") as HTMLInputElement).value;
        const address = (document.getElementById("address") as HTMLTextAreaElement).value;
        const objective = (document.getElementById("objective") as HTMLTextAreaElement).value;

        const educationItems = document.querySelectorAll(".education-item") as NodeListOf<HTMLElement>;
        const education = Array.from(educationItems).map((item) => {
            const degree = (item.querySelector(".degree") as HTMLInputElement).value;
            const year = (item.querySelector(".year") as HTMLInputElement).value;
            return `${degree} (${year})`;
        });

        const skills = (document.getElementById("skills") as HTMLTextAreaElement).value.split(",");
        const experience = (document.getElementById("experience") as HTMLTextAreaElement).value.split(",");

        // Populate the resume
        (document.getElementById("display-name") as HTMLElement).textContent = name;
        (document.getElementById("display-title") as HTMLElement).textContent = title;
        (document.getElementById("display-email") as HTMLElement).textContent = email;
        (document.getElementById("display-contact") as HTMLElement).textContent = contact;
        (document.getElementById("display-address") as HTMLElement).textContent = address;
        (document.getElementById("display-objective") as HTMLElement).textContent = objective;

        const educationList = document.getElementById("display-education") as HTMLElement;
        educationList.innerHTML = education.map((edu) => `<li contenteditable="true">${edu}</li>`).join("");

        const skillsList = document.getElementById("display-skills") as HTMLElement;
        skillsList.innerHTML = skills.map((skill) => `<li contenteditable="true">${skill.trim()}</li>`).join("");

        const experienceList = document.getElementById("display-experience") as HTMLElement;
        experienceList.innerHTML = experience.map((exp) => `<li contenteditable="true">${exp.trim()}</li>`).join("");

        // Show the resume and action buttons
        resumeContainer.style.display = "block";
        finalizeButton.style.display = "inline-block";
        shareableLinkButton.style.display = "inline-block";
        downloadPdfButton.style.display = "inline-block";
    });

    // Finalize the resume (disable editing)
    finalizeButton.addEventListener("click", () => {
        const editableFields = resumeContainer.querySelectorAll("[contenteditable='true']") as NodeListOf<HTMLElement>;
        editableFields.forEach((field) => field.removeAttribute("contenteditable"));
        form.style.display = "none";
        finalizeButton.style.display = "none";
        alert("Resume has been finalized!");
    });

    // Generate and copy a shareable link
    shareableLinkButton.addEventListener("click", () => {
        const resumeHtml = resumeContainer.innerHTML;
        const blob = new Blob([resumeHtml], { type: "text/html" });
        const link = URL.createObjectURL(blob);

        navigator.clipboard.writeText(link).then(() => {
            alert("Shareable link copied to clipboard!");
        });
    });

    // Download the resume as PDF
    downloadPdfButton.addEventListener("click", () => {
        const doc = new jsPDF(); // Create a new jsPDF instance

        doc.html(resumeContainer, {
            callback: function (doc: jsPDF) { // Explicitly type `doc`
                doc.save("resume.pdf");
            },
            x: 10,
            y: 10,
        });
    });
});
