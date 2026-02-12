// ========================================
// Valentine's Day App - Main Script
// ========================================
// CUSTOMIZE: Scroll down to the "Quiz data" section
// to personalize your questions!
// ========================================

// Create floating hearts
function createHearts() {
    const heartBg = document.getElementById('heartBg');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💘'];

    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 15 + 's';
        heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
        heartBg.appendChild(heart);
    }
}

createHearts();

// Quiz data - CUSTOMIZE THESE QUESTIONS!
const quizData = [
    {
        question: "What was our first date activity?",
        options: [
            { text: "a. Coffee shop", correct: false },
            { text: "b. Movie theater", correct: true },
            { text: "c. Restaurant", correct: false },
            { text: "d. Walk in the park", correct: false }
        ]
    },
    {
        question: "What's my favorite food?",
        options: [
            { text: "a. Pizza", correct: false },
            { text: "b. Sushi", correct: false },
            { text: "c. Pasta", correct: true },
            { text: "d. Burgers", correct: false }
        ]
    },
    {
        question: "When is our anniversary?",
        options: [
            { text: "a. January 1st", correct: false },
            { text: "b. February 14th", correct: true },
            { text: "c. March 15th", correct: false },
            { text: "d. December 25th", correct: false }
        ]
    },
    {
        question: "What do I love most about you?",
        options: [
            { text: "a. Your smile", correct: false },
            { text: "b. Your kindness", correct: false },
            { text: "c. Everything", correct: true },
            { text: "d. Your humor", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;

// Initialize quiz
function initQuiz() {
    showQuestion(currentQuestionIndex);
}

// Show question
function showQuestion(index) {
    const questionData = quizData[index];
    document.getElementById('questionText').textContent = questionData.question;
    document.getElementById('currentQuestion').textContent = index + 1;
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'quiz-feedback';

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    questionData.options.forEach((option, optionIndex) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option.text;
        optionDiv.onclick = () => selectAnswer(optionIndex, option.correct);
        optionsContainer.appendChild(optionDiv);
    });
}

// Handle answer selection
function selectAnswer(selectedIndex, isCorrect) {
    const options = document.querySelectorAll('.option');
    const feedback = document.getElementById('feedback');

    if (isCorrect) {
        // Correct answer - disable all options and move to next
        correctAnswers++;
        feedback.textContent = '🎉 Correct!';
        feedback.className = 'quiz-feedback correct';

        options.forEach((opt, idx) => {
            opt.style.pointerEvents = 'none';
            if (idx === selectedIndex) {
                opt.classList.add('correct');
            }
        });

        // Move to next question or finish
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                showQuestion(currentQuestionIndex);
            } else {
                finishQuiz();
            }
        }, 1500);
    } else {
        // Wrong answer - show feedback and let them try again
        feedback.textContent = '💔 Oops! Try again!';
        feedback.className = 'quiz-feedback wrong';

        // Temporarily disable and highlight the wrong option
        const selectedOption = options[selectedIndex];
        selectedOption.classList.add('wrong');
        selectedOption.style.pointerEvents = 'none';

        // Re-enable after animation
        setTimeout(() => {
            selectedOption.classList.remove('wrong');
            selectedOption.style.pointerEvents = 'auto';
            feedback.textContent = '';
        }, 800);
    }
}

// Finish quiz and show Valentine question
function finishQuiz() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('question').style.display = 'block';
}

// Start the quiz
initQuiz();

// Handle No button (it runs away!)
let noClickCount = 0;
let mouseMoveListenerAdded = false;

function handleNo() {
    noClickCount++;
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.querySelector('.yes-btn');
    const container = document.querySelector('.container');

    // Get current position before making it absolute
    const currentRect = noBtn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Make it absolutely positioned on first click
    if (noClickCount === 1) {
        noBtn.classList.add('moving');
        // Set initial position relative to container
        const relativeLeft = currentRect.left - containerRect.left;
        const relativeTop = currentRect.top - containerRect.top;
        noBtn.style.left = relativeLeft + 'px';
        noBtn.style.top = relativeTop + 'px';
    }

    // Make the button smaller each time (but not too small)
    const newSize = Math.max(0.7, 1 - (noClickCount * 0.1));

    // Get button dimensions
    const noBtnRect = noBtn.getBoundingClientRect();
    const noBtnWidth = noBtnRect.width;
    const noBtnHeight = noBtnRect.height;

    // Get Yes button position relative to container
    const yesBtnRect = yesBtn.getBoundingClientRect();

    // Calculate safe bounds within container
    const padding = 20;
    const minX = padding;
    const maxX = containerRect.width - noBtnWidth - padding;
    const minY = padding;
    const maxY = containerRect.height - noBtnHeight - padding;

    // Calculate random position within the container
    let randomX, randomY;
    let attempts = 0;
    const maxAttempts = 50;

    do {
        // Random position within container bounds
        randomX = minX + Math.random() * (maxX - minX);
        randomY = minY + Math.random() * (maxY - minY);

        attempts++;

        // Convert to absolute positions for overlap check
        const absoluteX = containerRect.left + randomX;
        const absoluteY = containerRect.top + randomY;

        // Check if overlaps with Yes button
        const buffer = 80;
        const overlapsX = absoluteX < yesBtnRect.right + buffer &&
                         absoluteX + noBtnWidth > yesBtnRect.left - buffer;
        const overlapsY = absoluteY < yesBtnRect.bottom + buffer &&
                         absoluteY + noBtnHeight > yesBtnRect.top - buffer;
        const overlaps = overlapsX && overlapsY;

        if (!overlaps || attempts >= maxAttempts) {
            break;
        }
    } while (true);

    // Use setTimeout to allow transition to work
    setTimeout(() => {
        noBtn.style.transform = `scale(${newSize})`;
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
    }, 10);

    // Change button text
    // CUSTOMIZE: Change these playful messages when they click "No"
    const noMessages = [
        'Are you sure? 🥺',
        'Really? 😢',
        'Please? 🥹',
        'Think again! 💔',
        'You\'ll break my heart! 😭',
        'Pretty please? 🥺',
        'One more chance? 💝'
    ];

    if (noClickCount <= noMessages.length) {
        noBtn.textContent = noMessages[noClickCount - 1];
    }

    // Add mouse tracking on the last message
    if (noClickCount >= 7 && !mouseMoveListenerAdded) {
        mouseMoveListenerAdded = true;
        enableCursorAvoidance();
    }
}

// Make button avoid cursor
function enableCursorAvoidance() {
    const noBtn = document.getElementById('noBtn');
    const container = document.querySelector('.container');
    let isMoving = false;

    document.addEventListener('mousemove', (e) => {
        if (isMoving || noClickCount < 7) return;

        const noBtnRect = noBtn.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // Calculate button center
        const btnCenterX = noBtnRect.left + noBtnRect.width / 2;
        const btnCenterY = noBtnRect.top + noBtnRect.height / 2;

        // Calculate distance from cursor to button center
        const distanceX = e.clientX - btnCenterX;
        const distanceY = e.clientY - btnCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // If cursor is too close, move button away
        const avoidanceRadius = 150;
        if (distance < avoidanceRadius) {
            isMoving = true;

            // Calculate direction away from cursor
            const angle = Math.atan2(distanceY, distanceX);
            const moveDistance = 150;

            // Calculate new position (moving away from cursor)
            const currentLeft = parseFloat(noBtn.style.left) || 0;
            const currentTop = parseFloat(noBtn.style.top) || 0;

            let newX = currentLeft - Math.cos(angle) * moveDistance;
            let newY = currentTop - Math.sin(angle) * moveDistance;

            // Ensure button stays within container bounds
            const padding = 20;
            const minX = padding;
            const maxX = containerRect.width - noBtnRect.width - padding;
            const minY = padding;
            const maxY = containerRect.height - noBtnRect.height - padding;

            newX = Math.max(minX, Math.min(newX, maxX));
            newY = Math.max(minY, Math.min(newY, maxY));

            noBtn.style.left = newX + 'px';
            noBtn.style.top = newY + 'px';

            // Allow next move after a short delay
            setTimeout(() => {
                isMoving = false;
            }, 300);
        }
    });
}

// Handle Yes button
function handleYes() {
    document.getElementById('question').style.display = 'none';
    document.getElementById('success').classList.add('active');

    // Create confetti
    createConfetti();

    // Play celebration
    celebrate();
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff6b6b', '#ee5a6f', '#f06595', '#cc5de8', '#845ef7', '#5c7cfa', '#339af0', '#22b8cf', '#20c997', '#51cf66', '#94d82d', '#fcc419', '#ff922b'];

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.3 + 's';
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 3000);
        }, i * 20);
    }
}

// Celebration animation
function celebrate() {
    const emojis = document.querySelectorAll('.success .emoji');
    emojis.forEach((emoji, index) => {
        setTimeout(() => {
            emoji.style.animation = 'bounce 0.5s ease';
        }, index * 200);
    });
}
