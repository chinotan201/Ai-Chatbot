import dotenv from 'dotenv';
import readlineSync from 'readline-sync';

// Load environment variables from .env file
dotenv.config();

// Function to check if the user's input is negative or unsafe (this is just an example, you can improve it)
function checkSafety(userResponse) {
    const unsafeKeywords = [
    'hurt', 'kill', 'sad', 'angry', 'hate', 'suicide', 'pain', 'broken', 
    'stressed', 'hopeless', 'alone', 'fear', 'shame', 'abuse', 'violence', 
    'die', 'fearful', 'cry', 'depressed', 'regret', 'tired', 'suffocate', 
    'worthless', 'danger', 'self-harm', 'fearful', 'tragic', 'despair', 
    'lost', 'overwhelmed', 'rage', 'no', 'nope', 'not'
  ];
  return unsafeKeywords.some((word) => userResponse.toLowerCase().includes(word));
}

// Function to detect user mood based on the input (simplified for this example)
function detectMood(userResponse) {
  if (userResponse.toLowerCase().includes('happy')) {
    return 'happy';
  } else if (userResponse.toLowerCase().includes('sad')) {
    return 'sad';
  } else {
    return 'neutral';
  }
}

// Function to adjust the agent's energy based on user mood
function adjustEnergy(userMood) {
  if (userMood === 'happy') {
    return 'high';
  } else if (userMood === 'sad') {
    return 'low';
  } else {
    return 'neutral';
  }
}

// Function to adjust the agent's response based on mood and energy level
function respondToMoodAndEnergy(userMood, energyLevel) {
  console.log(`User mood: ${userMood}, Energy level: ${energyLevel}`);
  if (energyLevel === 'high') {
    console.log("Agent: Wow, you're so energetic today!");
  } else if (energyLevel === 'low') {
    console.log("Agent: I'm here for you if you want to talk.");
  } else {
    console.log("Agent: Let's keep this conversation going!");
  }
}

// Start the conversation script
function startScript() {
  console.log("Starting the conversation...");

  // Define the predefined script
  const script = [
    "hey baby! can i ask you a question?",
    "are u sure?",
    "promise u won't tell anyone?",
    "okkkii i went to the store today",
    "can i tell you more?"
  ];

  let scriptIndex = 0; // Start from the first message in the script

  while (true) {
    const currentMessage = script[scriptIndex];

    // Ask the current question/message
    console.log(`Agent: ${currentMessage}`);
    const userResponse = readlineSync.question("You: ");

    // If user types "exit", end the conversation
    if (userResponse.toLowerCase() === "exit") {
      console.log("Goodbye!");
      break;
    }

    // Check if the response is negative or unsafe
    if (checkSafety(userResponse)) {
      console.log("Okay, bye nice talking to you");
      break;
    }

    // Detect the user's mood
    const userMood = detectMood(userResponse);

    // Adjust agent's energy based on the detected mood
    const energyLevel = adjustEnergy(userMood);

    // Respond based on mood and energy
    respondToMoodAndEnergy(userMood, energyLevel);

    // Move to the next script message
    scriptIndex++;

    // If we reach the end of the script, restart or end
    if (scriptIndex >= script.length) {
      console.log("End of predefined script. Do you want to continue the conversation?");
      const continueResponse = readlineSync.question("Continue? (yes/no): ");
      if (continueResponse.toLowerCase() !== "yes") {
        console.log("Goodbye!");
        break;
      }
      scriptIndex = 0;  // Restart script
    }
  }
}

// Start the conversation
startScript();
