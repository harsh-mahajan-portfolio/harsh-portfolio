// ==========================================================================
// 1. SELECTING HTML ELEMENTS (Connecting JS with HTML)
// We use document.getElementById() to grab elements using their "id" attributes.
// ==========================================================================
const greetingText = document.getElementById('greetingText');
const quoteBtn = document.getElementById('quoteBtn');
const likeCounter = document.getElementById('likeCounter');
const likeBtn = document.getElementById('likeBtn');

// ==========================================================================
// 2. LOGIC: TIME-BASED GREETING
// JavaScript can read the user's system clock using "new Date()".
// ==========================================================================
function updateGreeting() {
  const currentHour = new Date().getHours();
  let timeOfDay = 'Hello';

  // Basic if-else conditional logic
  if (currentHour < 12) {
    timeOfDay = '🌅 Good Morning';
  } else if (currentHour < 18) {
    timeOfDay = '☀️ Good Afternoon';
  } else {
    timeOfDay = '🌙 Good Evening';
  }

  // Updating the text inside the HTML element
  greetingText.textContent = `${timeOfDay}! Welcome to Harsh Mahajan's AI & DS space.`;
}

// Call the function as soon as the page loads
updateGreeting();

// ==========================================================================
// 3. ARRAY & RANDOM PICKER (Motivation Generator)
// An array is an ordered list of items.
// ==========================================================================
const aiQuotes = [
  "🚀 'Data is the new oil, but AI is the refinery.'",
  "💡 'The goal is to turn data into information, and information into insight.'",
  "🤖 'Artificial Intelligence is not about replacing humans, it's about amplifying human potential.'",
  "🧠 'Small steps every day lead to massive machine learning breakthroughs!'"
];

// Event Listener: Runs this code whenever the user clicks the button
quoteBtn.addEventListener('click', function () {
  // Pick a random index from the array
  const randomIndex = Math.floor(Math.random() * aiQuotes.length);
  // Update the greeting box text
  greetingText.textContent = aiQuotes[randomIndex];
});

// ==========================================================================
// 4. COUNTER STATE (Interactive Button Click)
// A variable stores the current count.
// ==========================================================================
let count = 0; // State variable

likeBtn.addEventListener('click', function () {
  count = count + 1; // Increase count by 1
  likeCounter.textContent = count; // Display updated number in HTML
  
  // Optional fun visual feedback: slight button text change
  likeBtn.textContent = `Thanks for the Star! (${count}) ⭐`;
});
