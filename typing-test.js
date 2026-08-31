// -----------------------------------
    // 1. VARIABLES
    // -----------------------------------

    const textDisplay = document.getElementById("textDisplay");
    const input = document.getElementById("input");

    const timeDisplay = document.getElementById("time");
    const wpmDisplay = document.getElementById("wpm");
    const accuracyDisplay = document.getElementById("accuracy");
    const errorsDisplay = document.getElementById("errors");

    const startBtn = document.getElementById("startBtn");
    const restartBtn = document.getElementById("restartBtn");

    const result = document.getElementById("result");
    const finalWpm = document.getElementById("finalWpm");
    const finalAccuracy = document.getElementById("finalAccuracy");
    const finalErrors = document.getElementById("finalErrors");


    // -----------------------------------
    // 2. SAMPLE TEXT
    // -----------------------------------

    const texts = [
      "JavaScript is a powerful programming language used to create interactive websites. Learning to type faster can help you become more productive when programming. A good programmer does not only write code but also learns how to solve problems.",
      "React is a JavaScript library that makes it easier to build modern user interfaces. Practice every day and you will gradually improve your typing speed and accuracy. A good programmer does not only write code but also learns how to solve problems.",
      "Network engineering is a complicated task, which involves software, firmware, chip level engineering, hardware, and electric pulses. To ease network engineering, the whole networking concept is divided into multiple layers.",
      "Each layer is involved in some particular task and is independent of all other layers. But as a whole, almost all networking tasks depend on all of these layers. Layers share data between them and they depend on each other only to take input and send output.",
      "A computer network consists software and hardware that is used to send and receive data from one device to another. The role of hardware is to prove the physical equipment that are required in order to send and receive data while software defines the set of instructions that uses the hardware equipment for data transmission.",
      "A simple transmission of data consists several steps at various layers of computer network. In computer network models we will discuss the models in detail to understand how the data is actually transferred and received at a computer level. Before we discuss the computer network models, let have a discussion on the layers that a computer model consists.",
      "Let have a basic idea of layers involved in data communication. For data communication to take place and two or more users can transmit data from one to other, a systematic approach is required. This approach enables users to communicate and transmit data through efficient and ordered path.It is implemented using models in computer networks and are known as computer network models.",
      "Computer network models are responsible for establishing a connection among the sender and receiver and transmitting the data in a smooth manner respectively. There are two computer network models i.e. OSI Model and TCP/IP Model on which the whole data communication process relies."
    ];


    // -----------------------------------
    // 3. GAME VARIABLES
    // -----------------------------------

    let currentText = "";

    let timeLeft = 60;

    let timer = null;

    let isRunning = false;

    let totalTyped = 0;

    let correctCharacters = 0;

    let errors = 0;


    // -----------------------------------
    // 4. SELECT RANDOM TEXT
    // -----------------------------------

    function selectText() {

      const randomIndex =
        Math.floor(Math.random() * texts.length);

      currentText = texts[randomIndex];

      displayText();

    }


    // -----------------------------------
    // 5. DISPLAY TEXT CHARACTER BY CHARACTER
    // -----------------------------------

    function displayText() {

      textDisplay.innerHTML = "";

      currentText.split("").forEach((character, index) => {

        const span = document.createElement("span");

        span.textContent = character;

        if (index === 0) {
          span.classList.add("current");
        }

        textDisplay.appendChild(span);

      });

    }


    // -----------------------------------
    // 6. START GAME
    // -----------------------------------

    function startGame() {
      if (isRunning) {
        return;
      }

      isRunning = true;
      
      input.disabled = false;
      

      input.focus();

      startBtn.disabled = true;

      result.style.display = "none";

      timeLeft = 60;

      totalTyped = 0;

      correctCharacters = 0;

      errors = 0;

      input.value = "";

      timeDisplay.textContent = timeLeft;

      wpmDisplay.textContent = "0";

      accuracyDisplay.textContent = "100%";

      errorsDisplay.textContent = "0";
      selectText();
      
      timer = setInterval(updateTimer, 1000);

    }


    // -----------------------------------
    // 7. TIMER
    // -----------------------------------

    function updateTimer() {

      timeLeft--;

      timeDisplay.textContent = timeLeft;

      calculateStats();

      if (timeLeft <= 0) {

        finishGame();

      }

    }


    // -----------------------------------
    // 8. HANDLE USER TYPING
    // -----------------------------------

    input.addEventListener("input", function () {

      if (!isRunning) {
        return;
      }

      const typedText = input.value;
      totalTyped = typedText.length;

      correctCharacters = 0;

      errors = 0;


      const spans = textDisplay.querySelectorAll("span");


      spans.forEach((span, index) => {

        span.classList.remove("correct");
        span.classList.remove("incorrect");
        span.classList.remove("current");


        if (index < typedText.length) {

          if (typedText[index] === currentText[index]) {

            span.classList.add("correct");

            correctCharacters++;

          } else {

            span.classList.add("incorrect");

            errors++;

          }

        }

      });


      // Highlight current character

      if (typedText.length < spans.length) {

        spans[typedText.length].classList.add("current");

      }


      calculateStats();


      // Automatically move to next text

      if (typedText === currentText) {

        input.value = "";

        selectText();

      }

    });


    // -----------------------------------
    // 9. CALCULATE WPM AND ACCURACY
    // -----------------------------------

    function calculateStats() {

      const elapsedTime = 60 - timeLeft;

      if (elapsedTime <= 0) {
        return;
      }


      // WPM formula:
      // characters / 5 = words
      // words / minutes = WPM

      const words = correctCharacters / 5;

      const minutes = elapsedTime / 60;

      const wpm = Math.round(words / minutes);


      // Accuracy

      let accuracy = 100;

      if (totalTyped > 0) {

        accuracy =
          Math.round(
            (correctCharacters / totalTyped) * 100
          );

      }


      wpmDisplay.textContent = wpm;

      accuracyDisplay.textContent =
        accuracy + "%";

      errorsDisplay.textContent = errors;

    }


    // -----------------------------------
    // 10. FINISH GAME
    // -----------------------------------

    function finishGame() {

      clearInterval(timer);

      isRunning = false;

      input.disabled = true;

      startBtn.disabled = false;

      calculateStats();


      finalWpm.textContent =
        wpmDisplay.textContent;

      finalAccuracy.textContent =
        accuracyDisplay.textContent;

      finalErrors.textContent =
        errorsDisplay.textContent;


      result.style.display = "block";

    }


    // -----------------------------------
    // 11. RESTART GAME
    // -----------------------------------

    function restartGame() {

      clearInterval(timer);

      isRunning = false;

      timeLeft = 60;

      totalTyped = 0;

      correctCharacters = 0;

      errors = 0;

      input.value = "";

      input.disabled = true;

      startBtn.disabled = false;

      timeDisplay.textContent = "60";

      wpmDisplay.textContent = "0";

      accuracyDisplay.textContent = "100%";

      errorsDisplay.textContent = "0";

      result.style.display = "none";

      selectText();

    }


    // -----------------------------------
    // 12. BUTTON EVENTS
    // -----------------------------------

    startBtn.addEventListener("click", startGame);

    restartBtn.addEventListener("click", restartGame);


    // -----------------------------------
    // 13. INITIALIZE GAME
    // -----------------------------------

    selectText();