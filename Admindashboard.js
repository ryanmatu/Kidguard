// Wait for DOM to be ready before attaching listeners
document.addEventListener("DOMContentLoaded", function () {
  // Attach toggle functionality to all menu buttons
  document.querySelectorAll(".menu-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation(); // prevent click from reaching the document
      toggleMenu(this);
    });
  });

  // Close all dropdowns if clicked outside
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".menu-dropdown").forEach((dropdown) => {
      dropdown.classList.remove("show");
    });
  });
});

// Function to toggle one dropdown
function toggleMenu(button) {
  const currentDropdown = button.nextElementSibling;

  // Close all other dropdowns
  document.querySelectorAll(".menu-dropdown").forEach((dropdown) => {
    if (dropdown !== currentDropdown) {
      dropdown.classList.remove("show");
    }
  });

  // Toggle visibility of this one
  currentDropdown.classList.toggle("show");
}
