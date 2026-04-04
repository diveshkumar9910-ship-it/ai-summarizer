async function summarizeText() {
  let text = document.getElementById("inputText").value;
  let output = document.getElementById("outputText");

  output.innerText = "Loading... ⏳";

  try {
    let response = await fetch("http://localhost:3000/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text
      })
    });

    let data = await response.json();

    if (data.choices && data.choices.length > 0) {
      output.innerText = data.choices[0].message.content;
    } else {
      output.innerText = "Error: " + (data.error?.message || "No response");
    }

  } catch (error) {
    output.innerText = "Error: " + error.message;
  }
}





// Character counter
document.getElementById("inputText").addEventListener("input", function() {
  document.getElementById("count").innerText = this.value.length + " characters";
});

// Copy function
function copyText() {
  let text = document.getElementById("outputText").innerText;
  navigator.clipboard.writeText(text);
  alert("Copied!");
}