function generatePassword() {
  let input = document.getElementById("userInput").value.trim();
  let errorMessage = "";

  if (input.length < 8) {
    errorMessage = "Please enter at least 8 characters.";
    showError(errorMessage);
    return;
  }

  if (input.length > 50) {
    errorMessage = "Please enter no more than 50 characters.";
    showError(errorMessage);
    return;
  }

  if (!/^[\x20-\x7E]+$/.test(input)) {
    errorMessage = "Please use only standard ASCII characters.";
    showError(errorMessage);
    return;
  }

  if (!/[A-Za-z]/.test(input) || !/[0-9]/.test(input)) {
    errorMessage = "Please include at least one letter and one number.";
    showError(errorMessage);
    return;
  }

  if (/^[A-Za-z]+$/.test(input) || /^[0-9]+$/.test(input)) {
    errorMessage = "Input should not be entirely letters or numbers.";
    showError(errorMessage);
    return;
  }

  if (/([A-Za-z0-9])\1\1\1/.test(input)) {
    errorMessage = "Please avoid using repetitive characters.";
    showError(errorMessage);
    return;
  }

  const replacements = {
    a: ["@", "A", "4"],
    b: ["8", "B"],
    c: ["(", "C"],
    d: ["|)", "D"],
    e: ["3", "E"],
    f: ["ƒ", "F"],
    g: ["6", "G"],
    h: ["#", "H"],
    i: ["!", "1", "I"],
    k: ["|<", "K"],
    l: ["1", "L"],
    m: ["^^", "M"],
    o: ["0", "O"],
    s: ["$", "5", "S"],
    t: ["7", "T"],
    z: ["2", "Z"],
    0: ["@", "O", "o"],
    1: ["!", "I", "|"],
    2: ["@", "Z"],
    3: ["E", "£"],
    4: ["A", "h"],
    5: ["S", "$"],
    6: ["G", "b"],
    7: ["T", "J"],
    8: ["B", "∞"],
    9: ["g", "p"],
  };

  let password = generateRandomPassword(input, replacements);

  document.getElementById("generatedPassword").innerText = password;
  let resultModal = new bootstrap.Modal(
    document.getElementById("passwordModal")
  );
  resultModal.show();
}

function copyPassword() {
  let password = document.getElementById("generatedPassword").innerText;
  if (password) {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        alert("Password copied to clipboard!");
      })
      .catch((err) => {
        alert("Failed to copy password.");
      });
  }
}

function showError(message) {
  document.getElementById("errorMessage").innerText = message;
  let errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
  errorModal.show();
}

function regeneratePassword() {
  let input = document.getElementById("userInput").value.trim();
  if (input) {
    const replacements = {
      a: ["@", "A", "4"],
      b: ["8", "B"],
      c: ["(", "C"],
      d: ["|)", "D"],
      e: ["3", "E"],
      f: ["ƒ", "F"],
      g: ["6", "G"],
      h: ["#", "H"],
      i: ["!", "1", "I"],
      k: ["|<", "K"],
      l: ["1", "L"],
      m: ["^^", "M"],
      o: ["0", "O"],
      s: ["$", "5", "S"],
      t: ["7", "T"],
      z: ["2", "Z"],
      0: ["@", "O", "o"],
      1: ["!", "I", "|"],
      2: ["@", "Z"],
      3: ["E", "£"],
      4: ["A", "h"],
      5: ["S", "$"],
      6: ["G", "b"],
      7: ["T", "J"],
      8: ["B", "∞"],
      9: ["g", "p"],
    };

    let newPassword = generateRandomPassword(input, replacements);
    document.getElementById("generatedPassword").innerText = newPassword;
  }
}

function generateRandomPassword(input, replacements) {
  return input
    .split("")
    .map((char) => {
      let lowerChar = char.toLowerCase();
      if (replacements[lowerChar]) {
        let options = replacements[lowerChar];
        return options[Math.floor(Math.random() * options.length)];
      }
      return char;
    })
    .join("");
}

window.onload = function () {
  const instructionsModal = new bootstrap.Modal(
    document.getElementById("instructionsModal")
  );
  instructionsModal.show();
};
