# 💝 Valentine's Day Web App

A fun and interactive web app to ask your special someone to be your Valentine!

## ✨ Features

- **Interactive Quiz**: 4 personalized questions about your relationship
- **Playful "No" Button**: Moves away and shrinks when clicked, eventually runs from the cursor!
- **Beautiful Animations**: Floating hearts, confetti celebration, smooth transitions
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Single Page App**: Everything runs in the browser, no server needed

## 📁 Project Structure

```
Valentines/
├── index.html    # Main HTML structure
├── styles.css    # All styling and animations
├── script.js     # Quiz logic and interactive behaviors
└── README.md     # This file
```

## 🚀 Quick Start

### Step 1: Customize Your Questions
1. Open `script.js`
2. Find the `quizData` array (line ~20)
3. Replace the placeholder questions with your own personal questions
4. Make sure to set `correct: true` for the right answer!

### Step 2: Personalize Messages
1. Open `index.html`
2. Change the greeting (line 18) to your partner's name
3. Customize the success message (lines 54-61)

### Step 3: Test It!
Simply double-click `index.html` to open it in your browser and test everything works!

### Step 4: Share It!

#### Option A: Send Files Directly
Send all 3 files (`index.html`, `styles.css`, `script.js`) to your partner via:
- Text/Email
- AirDrop
- Cloud storage link

They can open `index.html` in any browser!

#### Option B: Deploy Online

#### Quick Deploy with Netlify Drop (30 seconds!)
1. Go to [drop.netlify.com](https://drop.netlify.com)
2. Drag and drop all three files (`index.html`, `styles.css`, `script.js`)
3. Get your shareable URL instantly!

#### Deploy with GitHub Pages
```bash
# Initialize git and push
git init
git add .
git commit -m "Add Valentine's app"
gh repo create valentines-app --public --source=. --remote=origin --push

# Then enable GitHub Pages in your repo settings
```

## 🎨 Customization Guide

### 1️⃣ **Customize Quiz Questions** (Required!)

Open `script.js` and find the `quizData` array (around line 20). Replace the placeholder questions with your own:

```javascript
const quizData = [
    {
        question: "Your question here?",
        options: [
            { text: "a. First option", correct: false },
            { text: "b. Second option (correct)", correct: true },
            { text: "c. Third option", correct: false },
            { text: "d. Fourth option", correct: false }
        ]
    },
    // Add 3 more questions...
];
```

**Tips for great questions:**
- Ask about memorable moments (first date, first kiss, etc.)
- Include inside jokes or shared experiences
- Keep one answer obviously correct for them
- Make it fun, not too hard!

**Examples:**
```javascript
{
    question: "What was the activity we did on our first date?",
    options: [
        { text: "a. Mini golf", correct: false },
        { text: "b. Bowling", correct: true },
        { text: "c. Arcade", correct: false },
        { text: "d. Amusement park", correct: false }
    ]
}
```

---

### 2️⃣ **Personalize Messages**

**Opening Greeting** - `index.html` line 18:
```html
<h1>Hi Chakli! 🐥</h1>
<!-- Change to your partner's name or nickname -->
```

**Success Message** - `index.html` lines 54-61:
```html
<p class="message" style="font-size: 1.5em; color: #d63447;">
    You just made me the happiest person ever! ❤️
</p>
<p class="message">
    I can't wait to spend this Valentine's Day with you! 💕
</p>
<div class="emoji" style="font-size: 60px; margin-top: 20px;">
    👩🏽‍❤️‍👨🏽 💝 🌹 😘 🐥
</div>
```

**"No" Button Messages** - `script.js` lines 219-225:
```javascript
const noMessages = [
    'Are you sure? 🥺',
    'Really? 😢',
    'Please? 🥹',
    'Think again! 💔',
    'You\'ll break my heart! 😭',
    'Pretty please? 🥺',
    'One more chance? 💝'
];
```

---

### 3️⃣ **Change Colors** (Optional)

Edit `styles.css` to customize the color scheme:

**Background Gradient** - Line 9:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
```

**Yes Button Color** - Line 117:
```css
background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
```

**No Button Color** - Line 129:
```css
background: linear-gradient(135deg, #95a5a6, #7f8c8d);
```

**Quiz Option Colors** - Line 161:
```css
background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
```

---

### 4️⃣ **Add/Remove Questions**

You can have anywhere from 1 to 10 questions! Just add or remove question objects in the `quizData` array.

**To add a question:**
```javascript
const quizData = [
    // ... existing questions ...
    {
        question: "New question here?",
        options: [
            { text: "a. Option 1", correct: false },
            { text: "b. Option 2", correct: true },
            { text: "c. Option 3", correct: false },
            { text: "d. Option 4", correct: false }
        ]
    }
];
```

**Update the progress text** in `index.html` line 30 if you change the number of questions:
```html
Question <span id="currentQuestion">1</span> of 4
<!-- Change "4" to match your total number of questions -->
```

## 💕 Made with Love

Built using vanilla HTML, CSS, and JavaScript. No frameworks required!

---

Good luck! 🍀
