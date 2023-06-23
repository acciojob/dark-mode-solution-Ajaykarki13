//your code here
	// Toggle dark mode
		function toggleDarkMode() {
			let toggle = document.getElementById("dark-mode-toggle");
			let body = document.getElementsByTagName("body")[0];
			if (toggle.checked) {
				body.classList.add("dark-mode");
				localStorage.setItem("dark-mode", "true");
			} else {
				body.classList.remove("dark-mode");
				localStorage.setItem("dark-mode", "false");
			}
		}

		// Check for previous dark mode setting
		function checkDarkMode() {
			let darkMode = localStorage.getItem("dark-mode");
			if (darkMode && darkMode === "true") {
				let toggle = document.getElementById("dark-mode-toggle");
				toggle.checked = true;
				toggleDarkMode();
			}
		}

		checkDarkMode();
