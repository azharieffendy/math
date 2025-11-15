# 🎮 Math Fun Game - Grade 1

A complete web-based math learning game designed for Grade 1 students, focusing on simple addition and subtraction with numbers 0-100. Game ends after 5 wrong answers or when time runs out!

## 🎯 Features

### Core Features
- ✅ **Addition & Subtraction**: Simple math operations with numbers 0-100
- ✅ **Smart Multiple Choice**: 4 answer options with intelligent wrong answer generation (prevents guessing tricks)
- ✅ **Visual Feedback**: Green highlight for correct, red for wrong answers
- ✅ **Score System**: +1 point for each correct answer (with combo multipliers!)
- ✅ **Dynamic Timer**: Countdown timer that varies by difficulty + bonus time for correct answers
- ✅ **Wrong Answer Limit**: Game ends after 5 wrong answers (with visual warning at 3)
- ✅ **Kid-Friendly Design**: Bright colors, large buttons, emojis
- ✅ **Mobile Responsive**: Works on phones, tablets, and desktops
- ✅ **Final Score Screen**: Detailed breakdown with statistics and performance metrics

### Bonus Features Included
- 🎚️ **Difficulty Levels**: Easy (1-digit), Medium (mixed 1&2-digit), Hard (2-digit) with adaptive timers
- 📚 **Game Modes**: Addition only, Subtraction only, or Mixed
- 🏆 **High Score Tracking**: Saves best score per difficulty/mode in browser
- 🎵 **Audio System**: 
  - Sound effects for correct/wrong answers
  - Optional background music with calming chord progression
  - Music toggle button with on/off states
- ✨ **Animations**: Confetti, particle effects (stars, sparkles), mascot animations
- 🎭 **Interactive Mascot**: Reacts with 5 different moods based on your performance
- 🎨 **Multiple Themes**: Space, Underwater, Jungle, Candy with active highlighting
- 📊 **Detailed Statistics**: Accuracy, speed, streaks, and comprehensive game analytics
- 📱 **Fully Responsive**: Adapts to any screen size

## 🚀 How to Run

### Method 1: Direct File Opening
1. Navigate to the `math` folder
2. Double-click on `index.html`
3. The game will open in your default browser
4. Click "🚀 Start Game!" to begin playing

### Method 2: Using a Local Server (Recommended)
```bash
# If you have Python installed:
cd /mnt/d/games/math
python3 -m http.server 8000

# Then open in browser:
# http://localhost:8000
```

### Method 3: VSCode Live Server
1. Open the folder in Visual Studio Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🎮 How to Play

1. **Choose Settings**:
   - Select difficulty: Easy (😊), Medium (😎), or Hard (🔥)
   - Select mode: Mixed (➕➖), Addition (➕), or Subtraction (➖)
   - Optional: Click 🎵 Music to enable calming background music
   - Optional: Click 📖 Learning Mode for unlimited time and retry chances

2. **Start the Game**:
   - Click "🚀 Start Game!"
   - You have 60 seconds to answer as many questions as possible
   - ⚠️ **Game ends if you get 5 wrong answers!**

3. **Answer Questions**:
   - Read the math problem
   - Click on the correct answer from 3 options
   - ✅ Correct = Green highlight + confetti + next question
   - ❌ Wrong = Red highlight + shake animation, try again (but be careful!)

4. **Track Your Progress**:
   - ⭐ Score: Total correct answers
   - ❌ Wrong: Wrong answers count (max 4, then game over!)
   - ⏱️ Time: Seconds remaining
   - ❓ Question: Current question number

5. **Game Over & Final Score Screen**:
   - ⏰ Time runs out (varies by difficulty), OR
   - ❌ Get 5 wrong answers
   - **Detailed Score Breakdown** displays:
     - 🏆 Final Score with celebration animation
     - ✅ Correct Answers count
     - ❌ Wrong Answers count
     - 🎯 Accuracy Percentage
     - ⚡ Average Speed per question
     - 🔥 Best Streak achieved
     - 📝 Total Questions answered
   - 🏆 **New High Score Badge** appears if you beat your previous best!
   - Choose your next action:
     - 🔄 **Play Again** - Start new game with same settings
     - ⚙️ **Change Settings** - Adjust difficulty/mode before next game

## 📁 File Structure

```
/mnt/d/personal/kids-games/math/
├── index.html    (Game HTML structure with mascot and score screen)
├── style.css     (All styling, animations, and responsive design)
├── game.js       (Game engine, logic, and state management)
├── README.md     (This file - comprehensive documentation)
└── TODO.txt      (Development roadmap and completed features)
```

## 🎨 Design Features

### Colors
- **Purple Gradient Background**: Modern and appealing
- **Yellow Score Boxes**: Bright and attention-grabbing
- **Purple Question Box**: Easy to read
- **Blue Answer Buttons**: Friendly and clickable
- **Green for Correct**: Positive reinforcement
- **Red for Wrong**: Clear error indication

### Typography
- **Comic Sans MS**: Kid-friendly, playful font
- **Large Font Sizes**: Easy to read for young children
- **Bold Text**: Clear and prominent

### Responsive Design
- Desktop: Large, spacious layout
- Tablet: Adapts to medium screens
- Mobile: Optimized for small screens with touch-friendly buttons

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Structure
- **CSS3**: Styling with gradients, animations, flexbox, grid
- **Vanilla JavaScript**: No libraries or frameworks
- **Web Audio API**: Simple sound effects
- **localStorage**: High score persistence

### Key Functions

```javascript
generateQuestion()           // Creates random math problems based on difficulty
handleCorrectAnswer()        // Processes correct answers, updates stats, spawns effects
handleWrongAnswer()          // Processes wrong answers, manages learning mode
startGame()                  // Initializes game with selected settings
endGame()                    // Ends game and shows score screen
showScoreScreen()            // Displays final score breakdown with statistics
setMascotMood()              // Changes mascot expression (5 different moods)
spawnConfetti()              // Creates falling confetti celebration
spawnParticles()             // Creates particle burst effects (stars, sparkles)
getTimeSettings()            // Returns time config based on difficulty
startTimer()                 // Dynamic countdown with bonus time mechanics
updateUI()                   // Refreshes all UI elements

// Audio System
audio.playSfx(type)          // Plays sound effects (correct/wrong)
audio.startMusic()           // Starts background chord progression
audio.stopMusic()            // Stops background music
audio.toggleMusic()          // Toggles music on/off
```

## 🎯 Difficulty Levels

| Level  | Number Format | Range | Description |
|--------|---------------|-------|-------------|
| Easy   | 1-digit + 1-digit | 0-10 | Perfect for beginners (e.g., 5 + 3, 8 - 2) |
| Medium | 1-digit + 2-digit OR 2-digit + 1-digit | 0-100 | Good for practice (e.g., 2 + 15, 45 + 7, 30 - 5) |
| Hard   | 2-digit + 2-digit | 0-100 | Challenge mode (e.g., 25 + 37, 68 - 23) |

### ⏱️ Timer Mechanics by Difficulty

| Level  | Starting Time | Time Bonus per Correct Answer |
|--------|---------------|-------------------------------|
| Easy   | 30 seconds    | +5 seconds                    |
| Medium | 60 seconds    | +10 seconds                   |
| Hard   | 120 seconds   | +30 seconds                   |

Each correct answer adds bonus time to the countdown timer, allowing players to keep playing longer and achieve higher scores!

## 🎲 Random Question Generation

- **Easy Mode**: Both numbers 0-10 (1-digit)
- **Medium Mode**: One 1-digit (0-9) + one 2-digit (10-99), order randomized
- **Hard Mode**: Both numbers 2-digit (10-99)
- **Addition**: `num1 + num2` with results up to 200
- **Subtraction**: `num1 - num2` where num1 ≥ num2 (no negatives)
- **Wrong Answers**: 
  - **Smart Generation**: At least 2 wrong answers have the same last digit as correct answer
  - **Digit Count Matching**: All wrong answers have same number of digits as correct answer
  - Example 1: If answer is 22 (2-digit), wrong answers: 12, 32, 52 (all 2-digit, ending in 2)
  - Example 2: If answer is 7 (1-digit), wrong answers: 3, 5, 9 (all 1-digit)
  - Example 3: If answer is 145 (3-digit), wrong answers: 125, 135, 155 (all 3-digit)
  - Prevents students from guessing based on:
    - Ones place digit alone
    - Number of digits (can't eliminate 8 vs 18 vs 118)
  - Remaining wrong answer uses random offset (1-20)
- **Shuffling**: Answers randomly positioned each time

## 💾 High Score System & Statistics

- Scores saved separately for each difficulty + mode combination
- Stored in browser's localStorage
- Persists across sessions
- Shows "🏆 New High Score!" badge on score screen when beaten
- **Tracked Statistics During Gameplay**:
  - ✅ Correct answers count
  - ❌ Wrong answers count
  - 🎯 Accuracy percentage calculation
  - ⚡ Average speed per correct answer
  - 🔥 Best streak achieved in session
  - 📝 Total questions attempted
  - ⏱️ Game duration and timing analytics

## 🎵 Audio System

### Sound Effects
- **Correct Answer**: Three ascending notes (C-E-G)
- **Wrong Answer**: Two descending notes
- Uses Web Audio API (no external files needed)
- Volume optimized for classroom use

### Background Music
- **Optional Feature**: Toggle on/off with 🎵 Music button
- **Chord Progression**: Pleasant C-G-Am-F loop
- **Tempo**: Slow 2-second chord changes for calming effect
- **Volume**: Low (8%) to not distract from gameplay
- **Auto-Stop**: Automatically stops when game ends or returning to settings
- **No External Files**: Generated entirely with Web Audio API

## ✨ Animations

- **Correct Answer**: Pulse effect + colorful confetti + particle burst (stars, sparkles)
- **Wrong Answer**: Shake effect
- **Mascot Moods**: Bounce (happy), shake (sad), spin (excited) with smooth transitions
- **Theme Selection**: Pulsing gradient on active theme button
- **Score Screen**: Fade-in backdrop, slide-up entrance, bouncing emoji, score counter, wiggling badge
- **Slide In**: Game container entrance
- **Timer Warning**: Blinking when ≤10 seconds
- **Hover Effects**: Button lift on hover, theme rotation, stat icon scale
- **Tooltips**: Smooth fade-in with slide-up animation

## 🔄 Possible Improvements

### Easy Additions
1. **More Time Options**: 30s, 90s, unlimited
2. **Streak Counter**: Track consecutive correct answers
3. **Achievements**: Unlock badges for milestones
4. **More Operations**: Multiplication (for older grades)
5. **Custom Number Range**: Let teachers set min/max
6. **Sound Toggle**: Mute button for quiet environments

### Advanced Features
1. **Progress Tracking**: Save performance over time
2. **Multiple Players**: Student profiles
3. **Leaderboard**: Class-wide competition
4. **Printable Certificates**: Reward for achievements
5. **Teacher Dashboard**: View student progress
6. **Accessibility**: Screen reader support, keyboard navigation

### Code Modifications
```javascript
// To change timer duration (around line 353):
gameState.timeLeft = 90; // Change from 60 to 90 seconds

// To add multiplication (around line 488-496):
// Add '*' to operations object
const operations = {
    'mixed': ['+', '-', '*'],
    'addition': ['+'],
    'subtraction': ['-'],
    'multiplication': ['*']
};

// To change number ranges for difficulty (around line 498-518):
// Modify the generateQuestion() function's number generation logic
// Easy example: num1 = Math.floor(Math.random() * 11);
// Medium example: num1 = Math.floor(Math.random() * 10);
// Hard example: num1 = Math.floor(Math.random() * 90) + 10;
```

## 🐛 Troubleshooting

### Sounds Not Working?
- Most browsers require user interaction before playing audio
- Click "Start Game" first
- Check browser audio permissions

### High Scores Not Saving?
- Ensure cookies/localStorage are enabled
- Private/Incognito mode may not persist data

### Layout Issues on Mobile?
- Try rotating device (landscape mode)
- Zoom out if text is too large
- Update to latest browser version

## 📝 Browser Compatibility

- ✅ Chrome/Edge: Fully supported
- ✅ Firefox: Fully supported
- ✅ Safari: Fully supported
- ✅ Mobile browsers: Fully supported

## 📄 License

This is a free educational tool. Feel free to modify and use in classrooms!

## 🙏 Credits

Created for Grade 1 math learning with love and fun! 🎉

---

**Ready to play? Open `index.html` and start learning math the fun way!** 🚀
