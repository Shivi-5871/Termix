// References to HTML elements
const info = document.getElementById('info');
const mainHeading = document.getElementById('main-heading');
const executeCommand = document.getElementById('executeCommandPara');
const codeInputField = document.getElementById('codeInputField');
const inputPara = document.getElementById('inputPara');
const resultPara = document.getElementById('resultPara');
const startNode = document.getElementById('startNode');
const cursor = document.getElementById('cursor');
const codeInputFieldResult = document.getElementById('codeInputFieldResult');   
const body = document.querySelector('body');




// Background Color
const gradients = [  
    "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
    "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
    "linear-gradient(120deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
    "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
    "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)"
];
body.style.background = gradients[Math.floor(Math.random() * gradients.length)];




// Animating Text and Cursor
const text = "To get started; type help and press Enter!!";
let animatingText = '';
let charIndex = 0;
let cursorVisible = true;
let cursorBlinkInterval;

function animateText() {
    if (charIndex < text.length) {
        animatingText += text[charIndex];
        if (startNode && startNode.children[1]) {
            startNode.children[1].textContent = animatingText;
        } 
        charIndex++;
        setTimeout(animateText, 70);
    } else {
        setTimeout(displayHelp, 800);
        cursor.style.display = "none";
    }
}




//blinking cursor
function blinkCursor() {
    cursorBlinkInterval = setInterval(() => {
        cursor.style.visibility = cursorVisible ? "hidden" : "visible";
        cursorVisible = !cursorVisible;
    }, 500);
}

function stopBlinkingCursor() {
    clearInterval(cursorBlinkInterval);
    cursor.style.visibility = "visible";
}




//displaying help in start
function displayHelp() {
    inputPara.style.display = "block";
    codeInputField.value = "help";
    codeInputField.focus();
    codeInputField.select();
}


//greetings array
const greetings = ["Hello (English), ", "Hola (Spanish), ", "Bonjour (French), ", "Hallo (German), ", "你好 (Chinese), ", "こんにちは (Japanese), ", "안녕하세요 (Korean), ", "Здравствуйте (Russian), ", "مرحبا (Arabic), ", "Olá (Portuguese), ", "Ciao (Italian), ", "नमस्ते (Hindi), ", "Habari (Swahili), ", "Merhaba (Turkish), ", "Hallo (Dutch), "];
const commandPrefix = "C:\\Users\\shivi agarwal>";





//displaying result in the resultPara
function displayResult(command) {
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    let text = "";
    let url = "";

    switch (command) {
        case "help":
            text = "You can type the following commands:\n1. help\n2. resume\n3. linkedin\n4. github\n5. instagram\n6. contact\n7. About_Myself\n8. clear";
            break;
        case "resume":
            text = "Opening resume...";
            url = "https://drive.google.com/file/d/1G_e5ywikiwfpW2lysHpx8XbOG_UUhg5Y/view?usp=drive_link";
            break;
        case "portfolio":
            text = "Opening Portfolio.....";
            url = "https://shiviagarwal-portfolio.vercel.app/";
            break;
        case "linkedin":
            text = "Opening LinkedIn...";
            url = "https://www.linkedin.com/in/shivi-agarwal-02018b228";
            break;
        case "github":
            text = "Opening Github.....";
            url = "https://github.com/Shivi-5871";
            break;
        case "instagram":
            text = "Opening Instagram.....";
            url = "https://www.instagram.com/_shiviagarwal_/";
            break;
        case "contact":
            text = "Here's my contact information\nEmail: shiviagarwal253@gmail.com\nPhone: +91-9456945871";
            break;
        case "About_Myself":
            text = "I'm a passionate Fullstack Developer with expertise in MERN stack development. I love creating dynamic and responsive web applications that provide a great user experience. My skills include JavaScript, React, Node.js, Express, and MongoDB. I'm always eager to learn new technologies and take on challenging projects.";
            break;
        case "clear":
            inputPara.style.display = "block";
            resultPara.style.display = "block";
            codeInputField.value = "";
            resultPara.children[0].textContent = commandPrefix;
            executeCommand.style.display = "none";
            codeInputField.removeAttribute('readonly');
            return;
        default:
            text = "Invalid command. Type 'help' to see the list of available commands.";
            break;
    }

    const resultText = greeting + " " + text;
    let index = 0;

    function animateResultText() {
        if (resultText.length > index) {
            resultPara.children[0].textContent = commandPrefix + " " + resultText.substring(0, index + 1);
            index++;
            setTimeout(animateResultText, 50);
        }
        else {
            stopBlinkingCursor();

            if (url) {
                setTimeout(() => {
                    window.open(url, '_blank');
                }, 800);
            }

            setTimeout(() => {
                executeCommand.style.display = "block";
                codeInputFieldResult.focus();
                codeInputFieldResult.select();
            }, 1500);
        }
    }
    animateResultText();
    blinkCursor();
}



//codeInputField wala part jiske andr pehele tto help ko display krwate hai aur fir jbh wo enter krdete hai tto baki ko fields ko hide krke sirf inputCommand aur resultPara aur ExecuteCommand ko display krwate hai
codeInputField.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const command = codeInputField.value.trim();
        if (command) {
            inputPara.style.display = "block";
            resultPara.style.display = "none";
            inputPara.children[0].textContent = "";
            resultPara.children[0].textContent = commandPrefix;
            mainHeading.style.display = "none";
            info.style.display = 'none';
            startNode.style.display = "none";
            inputPara.children[0].textContent = commandPrefix + " " + "Executed Command: ";
            resultPara.style.display = "block";
            codeInputField.setAttribute('readonly', true);
            setTimeout(() => {
                displayResult(command);
            }, 500);
        }   
    }
});




//ye execute command wala part hai
codeInputFieldResult.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const command = codeInputFieldResult.value.trim();
        if (command) {
            inputPara.style.display = "block";
            resultPara.style.display = "none";
            executeCommand.style.display = "none";
            codeInputFieldResult.value = "";
            resultPara.children[0].textContent = commandPrefix;
            setTimeout(() => {
                codeInputField.value = " ";
                codeInputField.removeAttribute('readonly');

                inputPara.children[0].textContent = commandPrefix + " Executed Command: " + command;
                resultPara.style.display = "block";
                displayResult(command);
            }, 500);
        }
    }
});

// Function call for animate text and blink cursor
animateText();
blinkCursor();