async function summarizeText() {
  let text = document.getElementById("inputText").value;
  let output = document.getElementById("outputText");

  if (!text.trim()) {
  alert("Please enter text!");
  return;
}

  document.getElementById("loader").style.display = "block";
output.innerText = "";

  try {
    let response = await fetch("https://ai-summarizer-backend-0va4.onrender.com/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text
      })
    });

    let data = await response.json();

        document.getElementById("loader").style.display = "none";

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
function clearText() {
  document.getElementById("inputText").value = "";
  document.getElementById("outputText").innerText = "";
  document.getElementById("count").innerText = "0 characters";
}