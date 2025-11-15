# 🎮 Math Fun Game - Grade 1

A complete web-based math learning game designed for Grade 1 students, focusing on simple addition and subtraction with numbers 0-100. Game ends after 5 wrong answers or when time runs out!

## 🆕 Recent Updates

**Latest Enhancements:**
- ⏱️ **Visual Timer Progress Bar** - Animated bar shows time remaining at a glance, turns red when low!
- ⏸️ **Pause/Resume System** - Pause anytime with button or `P` key, choose to resume or change settings
- 🔊 **Enhanced Sound Effects** - Pleasant ding for correct, gentle buzz for wrong, celebration chord for streaks
- 🔊 **Sound Toggle** - Enable/disable sound effects independently with button or `S` key
- ⌨️ **Keyboard Shortcuts** - Quick access to pause (`P`), sound (`S`), and answer selection (`1-4`)
- 🎨 **Quicksand Typography** - Beautiful, modern font that's perfect for educational content
- 🎨 **Gradient Themes** - Elegant color schemes with unique mascots (Butterfly, Flower, Deer, Cloud)

## 🎯 Features

### Core Features
- ✅ **Addition & Subtraction**: Simple math operations with numbers 0-100
- ✅ **Smart Multiple Choice**: 4 answer options with intelligent wrong answer generation (prevents guessing tricks)
- ✅ **Visual Feedback**: Green highlight for correct, red for wrong answers
- ✅ **Score System**: +1 point for each correct answer (with combo multipliers!)
- ✅ **Dynamic Timer**: Countdown timer that varies by difficulty + bonus time for correct answers
- ✅ **Visual Timer Progress Bar**: Animated progress bar shows time remaining at a glance (turns red when low!)
- ✅ **Pause/Resume**: Pause anytime during gameplay with button or `P` key
- ✅ **Wrong Answer Limit**: Game ends after 5 wrong answers (with visual warning at 3)
- ✅ **Kid-Friendly Design**: Bright colors, large buttons, emojis
- ✅ **Mobile Responsive**: Works on phones, tablets, and desktops
- ✅ **Final Score Screen**: Detailed breakdown with statistics and performance metrics

### Bonus Features Included
- 🎚️ **Difficulty Levels**: Easy (1-digit), Medium (mixed 1&2-digit), Hard (2-digit) with adaptive timers
- 📚 **Operation Modes**: Addition only, Subtraction only, or Mixed
- 🎮 **Answer Modes**: Multiple Choice (4 options) or Type Answer (manual input)
- 🏆 **High Score Tracking**: Saves best score per difficulty/mode in browser
- 🎵 **Audio System**: 
  - 🔊 **Sound Effects**: Pleasant ding for correct, gentle buzz for wrong, celebration chord for streaks
  - 🔊 **Sound Toggle**: Enable/disable sound effects with button or `S` key (on by default)
  - 🎵 **Background Music**: Optional calming chord progression
  - 🎵 **Music Toggle**: Enable/disable background music independently
  - **Web Audio API**: All sounds generated in-browser, no external files needed
- ✨ **Animations**: Confetti, particle effects (stars, sparkles), mascot animations
- 🎭 **Interactive Mascot**: Reacts with 5 different moods based on your performance
  - **Lavender Fields**: Beautiful butterfly with purple wings 🦋
  - **Hydrangea**: Lovely flower with pink/blue petals 🌸
  - **Lush Forest**: Friendly deer with antlers 🌲
  - **Stormy Morning**: Cute cloud with rain drops ⛈️
- 🎨 **Multiple Themes**: Beautiful gradient themes with elegant color palettes
- 📊 **Detailed Statistics**: Accuracy, speed, streaks, and comprehensive game analytics
- 📱 **Fully Responsive**: Adapts to any screen size

## 🎨 Typography

The game uses the **Quicksand** font from Google Fonts - a rounded, friendly sans-serif that perfectly matches the elegant gradient themes.

**Font Weights Used:**
- Regular (400): Body text, descriptions
- Medium (500): Secondary elements
- Semi-Bold (600): Options, selections
- Bold (700): Headings, buttons, numbers

**Why Quicksand?**
- Soft, rounded letterforms that are friendly yet professional
- Excellent readability at all sizes
- Modern aesthetic that complements gradient themes
- Great for educational content

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
   - Select answer mode: Multiple Choice (🔘) or Type Answer (⌨️)
   - Optional: Click 🎵 Music to enable calming background music
   - Optional: Click 📖 Learning Mode for unlimited time and retry chances

2. **Start the Game**:
   - Click "🚀 Start Game!"
   - You have 60 seconds to answer as many questions as possible
   - ⚠️ **Game ends if you get 5 wrong answers!**
   - Watch the **progress bar** under the timer - it shows time remaining visually

3. **Pause Anytime** (NEW!):
   - Click **⏸ Pause** button or press **`P`** key during gameplay
   - Game freezes - timer stops, questions hidden
   - **Pause Options:**
     - **▶️ Resume Game** - Continue from where you paused
     - **⚙️ Change Settings** - Quit and adjust difficulty/mode/theme
   - Perfect for bathroom breaks or changing your mind mid-game!

4. **Answer Questions**:
   - Read the math problem
   - Click on the correct answer from 3 options
   - ✅ Correct = Green highlight + confetti + next question
   - ❌ Wrong = Red highlight + shake animation, try again (but be careful!)

5. **Track Your Progress**:
   - ⭐ Score: Total correct answers
   - ❌ Wrong: Wrong answers count (max 4, then game over!)
   - ⏱️ Time: Seconds remaining with visual progress bar
   - 📊 **Progress Bar**: Blue bar shows time remaining, turns orange/red when low (<20%)
   - ❓ Question: Current question number

6. **Game Over & Final Score Screen**:
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

## ⌨️ Keyboard Shortcuts

Master these shortcuts for faster gameplay:

| Key | Action | Description |
|-----|--------|-------------|
| **`P`** | Pause/Resume | Toggle pause during gameplay |
| **`S`** | Toggle Sound | Turn sound effects on/off |
| **`1-4`** | Select Answer | Quick answer selection in Multiple Choice mode |
| **`Enter`** | Submit Answer | Submit answer in Type Answer mode |

**💡 Pro Tips:**
- Use `P` for quick breaks without losing your progress
- Press `S` if you need to play silently
- Number keys `1-4` correspond to answer positions (top-left, top-right, bottom-left, bottom-right)
- All shortcuts work during active gameplay only

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
- **HTML5**: Semantic structure with accessibility features
- **CSS3**: Advanced styling with gradients, animations, flexbox, grid, transitions
- **Vanilla JavaScript**: No libraries or frameworks - pure ES6+
- **Web Audio API**: Real-time sound synthesis for effects and music
- **localStorage**: Persistent high score tracking and settings
- **Google Fonts**: Quicksand typography for elegant, readable text

### Key Functions

```javascript
generateQuestion()           // Creates random math problems based on difficulty
handleCorrectAnswer()        // Processes correct answers, updates stats, spawns effects
handleWrongAnswer()          // Processes wrong answers, manages learning mode
startGame()                  // Initializes game with selected settings
endGame()                    // Ends game and shows score screen
showScoreScreen()            // Displays final score breakdown with statistics
resetGame()                  // Resets all game state to initial values
pauseGame()                  // Pauses game - freezes timer and disables controls
resumeGame()                 // Resumes game - continues from paused state
createMascotForTheme()       // Creates theme-specific mascot (butterfly, flower, deer, cloud)
setMascotMood()              // Changes mascot expression (5 different moods)
spawnConfetti()              // Creates falling confetti celebration
spawnParticles()             // Creates particle burst effects (stars, sparkles)
getTimeSettings()            // Returns time config based on difficulty
startTimer()                 // Dynamic countdown with bonus time mechanics
updateTimerDisplay()         // Updates time text and progress bar
updateUI()                   // Refreshes all UI elements

// Audio System
audio.playSfx(type)          // Plays sound effects (correct/wrong/streak)
audio.startMusic()           // Starts background chord progression
audio.stopMusic()            // Stops background music
audio.toggleMusic()          // Toggles music on/off
audio.soundEnabled           // Boolean flag for sound effects
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

## 🎮 Answer Modes

Choose how players should answer questions:

### 🔘 Multiple Choice (Default)
- **What it is**: 4 answer buttons to choose from
- **How to answer**: Click the button or press 1-4 on keyboard
- **Difficulty**: Easier - good for beginners
- **Features**: Smart wrong answers that prevent guessing tricks
- **Best for**: Learning, building confidence, younger students

### ⌨️ Type Answer (Manual Input)
- **What it is**: Type the answer directly
- **How to answer**: Type number and press Enter or click Submit
- **Difficulty**: Harder - requires knowing the exact answer
- **Features**: No hints from multiple choice options
- **Best for**: Advanced students, building mental math skills, testing true knowledge

**💡 Tip**: Start with Multiple Choice to learn, then switch to Type Answer for a real challenge!

## 🎲 Random Question Generation

- **Easy Mode**: Both numbers 0-10 (1-digit)
- **Medium Mode**: One 1-digit (0-9) + one 2-digit (10-99), order randomized
- **Hard Mode**: Both numbers 2-digit (10-99)
- **Addition**: `num1 + num2` with results up to 200
- **Subtraction**: `num1 - num2` where num1 ≥ num2 (no negatives)
- **Wrong Answers**: 
  - **Smart Generation Strategy**:
    - 2 wrong answers with same **LAST digit** as correct answer
    - 1 wrong answer with same **FIRST digit** as correct answer
    - All wrong answers have same **number of digits** as correct answer
  - **Example 1**: Answer is 22 (2-digit)
    - Wrong answer 1: 12 (ends in 2 ✓)
    - Wrong answer 2: 32 (ends in 2 ✓)
    - Wrong answer 3: 28 (starts with 2 ✓)
  - **Example 2**: Answer is 67 (2-digit)
    - Wrong answer 1: 47 (ends in 7 ✓)
    - Wrong answer 2: 87 (ends in 7 ✓)
    - Wrong answer 3: 62 (starts with 6 ✓)
  - **Example 3**: Answer is 145 (3-digit)
    - Wrong answer 1: 125 (ends in 5 ✓)
    - Wrong answer 2: 135 (ends in 5 ✓)
    - Wrong answer 3: 148 (starts with 1 ✓)
  - **Prevents guessing based on**:
    - Ones place digit (multiple answers end the same)
    - Tens place digit (multiple answers start the same)
    - Number of digits (all have same digit count)
  - **Forces true calculation** - no shortcuts work!
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

### Sound Effects (Toggle: 🔊 Button or `S` Key)
**On by default** - provides engaging audio feedback for better learning:

- **✅ Correct Answer**: Pleasant rising ding (800Hz → 1200Hz sine wave)
  - Duration: 0.3 seconds
  - Smooth envelope for gentle sound
  - Plays immediately on correct answer
  
- **❌ Wrong Answer**: Gentle descending buzz (200Hz → 100Hz sawtooth wave)
  - Duration: 0.2 seconds
  - Not harsh or discouraging
  - Helps students recognize mistakes
  
- **🔥 Streak Celebration**: Triumphant chord (C-E-G, 523-659-784 Hz)
  - Plays every 5 correct answers in a row
  - Three notes in sequence (0.1s apart)
  - Motivates students to keep streak going!

**Features:**
- Generated with Web Audio API (no external files)
- Volume optimized for classroom use
- Independent from background music
- Can be disabled for silent practice

### Background Music (Toggle: 🎵 Button)
**Off by default** - optional ambient music for relaxed practice:

- **Chord Progression**: Pleasant C-G-Am-F loop
- **Tempo**: Slow 2-second chord changes for calming effect
- **Volume**: Very low (8%) to not distract from gameplay
- **Auto-Stop**: Automatically stops when game ends or returning to settings
- **No External Files**: Generated entirely with Web Audio API
- **Independent Control**: Works separately from sound effects

**When to Use Music:**
- Relaxed practice sessions
- Reducing test anxiety
- Creating calming atmosphere
- Background ambiance in noisy environments

## 🎭 Interactive Mascots

Each theme has its own unique mascot that reacts to your performance!

### 🦋 **Lavender Fields - Butterfly**
- Beautiful purple wings with patterns
- Elegant antennae
- Graceful and calming
- Perfect for the dreamy lavender theme!

### 🌸 **Hydrangea - Flower**
- Pink and blue gradient petals
- Five petals arranged in a circle
- Green stem with leaves
- Lovely and elegant!

### 🌲 **Lush Forest - Deer**
- Brown fur with spotted details
- Antlers on head
- Gentle snout
- Friendly forest companion!

### ⛈️ **Stormy Morning - Cloud**
- Fluffy gray cloud body
- Rain drops falling
- Little lightning bolt accent
- Cozy and dramatic!

**All mascots show 5 moods:**
- 😊 **Happy**: Correct answer!
- 😢 **Sad**: Wrong answer
- 🤩 **Excited**: Streak milestone!
- 🤔 **Thinking**: New question appears
- 😮 **Surprised**: Special moments

## 🎨 Gradient Color Themes

Each theme features a beautiful color gradient that creates a calming, focused environment:

### 🦋 **Lavender Fields**
```
Colors: Deep purple (#9b59b6) → Soft lavender (#e8daef)
Feel: Dreamy, peaceful, calming
Best for: Relaxed practice sessions
```

### 🌸 **Hydrangea**
```
Colors: Sky blue (#5b9bd5) → Pink blush (#f0b4e4)
Feel: Elegant, floral, gentle
Best for: Creative learners
```

### 🌲 **Lush Forest**
```
Colors: Dark emerald (#0e4d3d) → Light mint (#a9dfbf)
Feel: Natural, fresh, grounding
Best for: Focus and concentration
```

### ⛈️ **Stormy Morning**
```
Colors: Dark slate (#34495e) → Soft gray (#aeb6bf)
Feel: Moody, dramatic, cozy
Best for: Serious study time
```

## ✨ Animations

- **Correct Answer**: Pulse effect + colorful confetti + particle burst (stars, sparkles)
- **Wrong Answer**: Shake effect
- **Timer Progress Bar**: 
  - Smooth 1-second transition as time counts down
  - Blue gradient (normal) → Orange/Red gradient (low time warning <20%)
  - Pulsing animation when time is critical
  - Grows when bonus time is earned
- **Pause Screen**: Backdrop blur + slide-up entrance animation
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
2. **Visual Streak Counter**: Display current streak on screen during gameplay
3. **Achievements System**: Unlock badges for milestones (partially coded, needs completion)
4. **More Operations**: Multiplication and division (for older grades)
5. **Custom Number Range**: Let teachers set min/max values
6. **Show Correct Answer**: Display correct answer when wrong for learning

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
- Click "Start Game" first to enable audio context
- Check browser audio permissions in settings
- Try toggling sound with `S` key or 🔊 button
- Check device volume and ensure it's not muted

### Timer Progress Bar Not Updating?
- Ensure JavaScript is enabled in your browser
- Try refreshing the page (Ctrl+F5 or Cmd+Shift+R)
- Clear browser cache if issues persist

### Pause Button Not Showing?
- Pause button only appears during active gameplay
- Start a game first, then pause button will replace start button
- Try pressing `P` key as alternative

### High Scores Not Saving?
- Ensure cookies/localStorage are enabled
- Private/Incognito mode may not persist data
- Check browser settings for site data permissions

### Layout Issues on Mobile?
- Try rotating device (landscape mode)
- Zoom out if text is too large
- Update to latest browser version
- Clear browser cache and reload

### Keyboard Shortcuts Not Working?
- Ensure game is in focus (click on game area)
- Number keys only work in Multiple Choice mode during gameplay
- `P` and `S` keys only work during active gameplay

## 📝 Browser Compatibility

- ✅ Chrome/Edge: Fully supported
- ✅ Firefox: Fully supported
- ✅ Safari: Fully supported
- ✅ Mobile browsers: Fully supported

## 📄 License

This is a free educational tool. Feel free to modify and use in classrooms!

## 🙏 Credits

Created for Grade 1 math learning with love and fun! 🎉

**Features Highlights:**
- 🎨 Beautiful gradient themes with unique mascots
- 🎵 Engaging sound system with pleasant feedback
- ⏸️ Full pause/resume control
- ⌨️ Keyboard shortcuts for power users
- 📊 Comprehensive statistics and analytics
- 🎓 Perfect for classroom or home learning

---

## 🚀 Quick Start

**Ready to play?**
1. Open `index.html` in your browser
2. Choose your difficulty and theme
3. Click "🚀 Start Game!"
4. Press `P` to pause, `S` to toggle sound
5. Have fun learning math! 🎉

**For Teachers:**
- Use Learning Mode for practice without pressure
- Toggle sound off for quiet classrooms
- Multiple difficulty levels for differentiated instruction
- Track progress with detailed statistics

**Need Help?** Check the troubleshooting section above or review the keyboard shortcuts! ⌨️
