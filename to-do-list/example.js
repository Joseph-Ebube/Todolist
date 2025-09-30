  const btn = document.getElementById("myBtn");

  btn.addEventListener("click", function() {
    alert("Button was clicked!");
  });

  //eg.2
  

  const input = document.getElementById("myInput");

  function handleInput() {
    console.log("You typed:", input.value);
  }

  input.addEventListener("input", handleInput);
