async function fetchGitHubJoinDate(username) {
    // Check local storage for existing join date data
    const savedData = JSON.parse(localStorage.getItem("githubJoinDate"));
  
    // If data exists and is less than 24 hours old, use it
    const now = new Date().getTime();
    if (savedData && now - savedData.timestamp < 24 * 60 * 60 * 1000) {
      displayDuration(savedData.joinDate);
      return;
    }
  
    try {
      // Fetch join date from GitHub API
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      const joinDate = new Date(data.created_at);
  
      // Save to local storage with a timestamp
      localStorage.setItem("githubJoinDate", JSON.stringify({ joinDate, timestamp: now }));
      displayDuration(joinDate);
  
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
      document.getElementById("github-duration").innerText = "Unable to load GitHub data.";
    }
  }
  
  // Calculate and display the duration
  function displayDuration(joinDate) {
    const currentDate = new Date();
    const timeDiff = currentDate - new Date(joinDate);
  
    const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
  
    document.getElementById("github-duration").innerText = 
      `GitHub Member for ${years} years, ${months} months, ${days} days`;
  }
  
  // Replace 'your-username' with your actual GitHub username
  fetchGitHubJoinDate("your-username");
  