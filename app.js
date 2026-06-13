// DevForge App Logic

// 1. Data Definitions

// Curated Jams & Hackathons
const gameJams = [
  {
    id: 1,
    title: "GMTK Game Jam 2026",
    platform: "itch.io",
    platformClass: "itch",
    startDate: "2026-07-25T17:00:00Z",
    difficulty: "Beginner Friendly",
    participants: "~20,000",
    tags: ["beginner"],
    link: "https://itch.io/jams",
    desc: "Hosted by Mark Brown (Game Maker's Toolkit). 48 hours. Excellent for beginners because it forces you to think about clever game mechanics instead of complex code."
  },
  {
    id: 2,
    title: "Brackeys Game Jam 2026.2",
    platform: "itch.io",
    platformClass: "itch",
    startDate: "2026-08-15T18:00:00Z",
    difficulty: "Ideal for Unity beginners",
    participants: "~10,000",
    tags: ["beginner"],
    link: "https://itch.io/jams",
    desc: "The ultimate community jam for Unity developers. Huge support on Discord and thousands of constructive playtests from other participants."
  },
  {
    id: 3,
    title: "Scream Jam 2026",
    platform: "itch.io",
    platformClass: "itch",
    startDate: "2026-10-18T18:00:00Z",
    difficulty: "Beginner Friendly",
    participants: "~2,500",
    tags: ["horror", "beginner"],
    link: "https://itch.io/jams",
    desc: "Create a short scary horror game in 10 days. Great for you! Horror games rely heavily on atmosphere and simple triggers, which is perfect for your skill level."
  },
  {
    id: 4,
    title: "Smart India Hackathon (SIH) 2026",
    platform: "Gov of India / College",
    platformClass: "hackathon",
    startDate: "2026-09-05T09:00:00Z",
    difficulty: "First Year Student Friendly",
    participants: "Varies (Large Scale)",
    tags: ["hackathon", "beginner"],
    link: "https://sih.gov.in",
    desc: "National-level hackathon. You build digital prototypes for government and industrial problems. Great way to apply your engineering logic early on."
  },
  {
    id: 5,
    title: "Ludum Dare 59",
    platform: "ldjam.com",
    platformClass: "itch",
    startDate: "2026-09-25T18:00:00Z",
    difficulty: "Intermediate",
    participants: "~4,000",
    tags: ["beginner"],
    link: "https://ldjam.com",
    desc: "One of the longest-running jams. Try the 'Jam' category (72 hours, team allowed) to practice fast scoping. Avoid the strict 48-hour 'Compo' at first."
  },
  {
    id: 6,
    title: "Spooktober Horror Jam",
    platform: "itch.io",
    platformClass: "itch",
    startDate: "2026-09-01T00:00:00Z",
    difficulty: "Beginner Friendly",
    participants: "~1,500",
    tags: ["horror", "beginner"],
    link: "https://itch.io/jams",
    desc: "A month-long horror-themed jam. Great if you want to make a game with more narrative depth, puzzle scripting, and atmospheric visual effects."
  },
  {
    id: 7,
    title: "College Freshmen Hackathon",
    platform: "Devpost / College",
    platformClass: "hackathon",
    startDate: "2026-11-12T09:00:00Z",
    difficulty: "First Year / Freshmen",
    participants: "~300",
    tags: ["hackathon"],
    link: "https://devpost.com",
    desc: "Specifically organized for first-year engineering students. Meet new peers, build your first GitHub portfolio repository, and practice working in a team."
  }
];

// Slider Description Strings
const sliderDescriptions = {
  mechanics: [
    "Simple movement and look controller.",
    "Raycasts, flashlight toggles, simple sliding doors, basic key-card system.",
    "Patrolling enemy AI with pathfinding (NavMesh) and line-of-sight chase trigger.",
    "Health systems, inventory slots, shooting/combat systems, simple save files.",
    "Multiplayer networking, server synchronization, complex AI state machines."
  ],
  art: [
    "Purely free asset packs, basic colored materials, minimal geometry creation.",
    "Low-poly assets, customized skybox, basic fog, simple emission maps.",
    "Custom modular assets, vertex painting, basic animations, simple shaders.",
    "Custom models, armature rigging, fully animated character actions, customized URP shaders.",
    "High-fidelity custom assets, photogrammetry, advanced particles, complex physics destructibles."
  ],
  sound: [
    "Only a single loops track, standard footstep noise, simple UI click SFX.",
    "Ambience tracks, 3D sound spatialization, basic horror jumpscare noise triggers.",
    "Dynamic tension background audio, layered footstep sound types, custom audio mixes.",
    "Voice acted narrative dialog, immersive custom reverberation zones, complex audio mixing.",
    "Full custom orchestral soundtrack, procedural audio generation, advanced Foley recording."
  ]
};

// 2. Tab Navigation logic
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update button classes
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panels visibility
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `${targetTab}-tab`) {
          panel.classList.add('active');
        }
      });
    });
  });

  // Inner Roadmap Subtabs
  const roadmapButtons = document.querySelectorAll('.roadmap-step-btn');
  const roadmapPanels = document.querySelectorAll('.roadmap-panel');

  roadmapButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetRoadmap = btn.getAttribute('data-roadmap');

      roadmapButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      roadmapPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `${targetRoadmap}-panel`) {
          panel.classList.add('active');
        }
      });
    });
  });
}

// 3. Jams Grid Generation, Search, and Filtering
let jamSearchQuery = "";
let jamActiveFilter = "all";

function getRemainingTimeText(targetDateStr) {
  const diffMs = Date.parse(targetDateStr) - Date.now();
  if (diffMs <= 0) {
    return { text: "Active / Started", critical: true };
  }

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const remHours = hours % 24;
  const remMinutes = minutes % 60;

  if (days > 0) {
    return { text: `${days}d ${remHours}h remaining`, critical: days < 3 };
  } else if (hours > 0) {
    return { text: `${hours}h ${remMinutes}m remaining`, critical: true };
  } else {
    return { text: `${remMinutes}m remaining`, critical: true };
  }
}

function renderJams() {
  const grid = document.getElementById('jams-grid');
  if (!grid) return;

  grid.innerHTML = "";

  const filteredJams = gameJams.filter(jam => {
    // Search Filter
    const matchesSearch = jam.title.toLowerCase().includes(jamSearchQuery.toLowerCase()) ||
                          jam.desc.toLowerCase().includes(jamSearchQuery.toLowerCase());
    
    // Tag Button Filter
    let matchesTag = false;
    if (jamActiveFilter === "all") {
      matchesTag = true;
    } else {
      matchesTag = jam.tags.includes(jamActiveFilter);
    }

    return matchesSearch && matchesTag;
  });

  if (filteredJams.length === 0) {
    grid.innerHTML = `
      <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
        <p style="color: var(--text-secondary);">No jams match your criteria. Try searching for "horror" or switching filters!</p>
      </div>
    `;
    return;
  }

  filteredJams.forEach(jam => {
    const countdownInfo = getRemainingTimeText(jam.startDate);
    const dateFormatted = new Date(jam.startDate).toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });

    const card = document.createElement('article');
    card.className = "card";
    card.innerHTML = `
      <div class="jam-card-header">
        <span class="jam-platform-badge ${jam.platformClass}">${jam.platform}</span>
        <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500;">${dateFormatted}</span>
      </div>
      
      <div class="countdown-box">
        <div class="countdown-label">Time to Start</div>
        <div class="countdown-timer ${countdownInfo.critical ? 'critical' : ''}" data-start-date="${jam.startDate}">
          ${countdownInfo.text}
        </div>
      </div>
      
      <h3 class="jam-title">${jam.title}</h3>
      <p class="jam-desc">${jam.desc}</p>
      
      <div class="jam-footer">
        <div class="jam-info-points">
          <span>Target Level: <strong>${jam.difficulty}</strong></span>
          <span>Avg. Entries: <strong>${jam.participants}</strong></span>
        </div>
        <a href="${jam.link}" target="_blank" class="jam-btn">Join Jam</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Update countdown timers dynamically every minute
function startCountdownInterval() {
  setInterval(() => {
    const timerElements = document.querySelectorAll('.countdown-timer');
    timerElements.forEach(el => {
      const startDateStr = el.getAttribute('data-start-date');
      if (startDateStr) {
        const info = getRemainingTimeText(startDateStr);
        el.textContent = info.text;
        if (info.critical) {
          el.classList.add('critical');
        } else {
          el.classList.remove('critical');
        }
      }
    });
  }, 30000); // every 30 seconds
}

function initJamControls() {
  const searchInput = document.getElementById('jam-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      jamSearchQuery = e.target.value;
      renderJams();
    });
  }

  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      jamActiveFilter = btn.getAttribute('data-filter');
      renderJams();
    });
  });
}

// 4. Jam Scope Planner Logic
function initScopePlanner() {
  const sliders = {
    mechanics: document.getElementById('slide-mechanics'),
    levels: document.getElementById('slide-levels'),
    art: document.getElementById('slide-art'),
    sound: document.getElementById('slide-sound')
  };

  const values = {
    mechanics: document.getElementById('val-mechanics'),
    levels: document.getElementById('val-levels'),
    art: document.getElementById('val-art'),
    sound: document.getElementById('val-sound')
  };

  const subtexts = {
    mechanics: document.getElementById('subtext-mechanics'),
    levels: document.getElementById('subtext-levels'),
    art: document.getElementById('subtext-art'),
    sound: document.getElementById('subtext-sound')
  };

  const totalHoursEl = document.getElementById('total-hours');
  const gaugeFillEl = document.getElementById('gauge-fill');
  const markerMidEl = document.getElementById('marker-mid');
  const markerMaxEl = document.getElementById('marker-max');
  const statusAlertEl = document.getElementById('status-alert');

  const breakdownEls = {
    code: document.getElementById('breakdown-code'),
    design: document.getElementById('breakdown-design'),
    art: document.getElementById('breakdown-art'),
    sound: document.getElementById('breakdown-sound')
  };

  let targetDuration = 48; // default 48h

  // Handle Jam Duration switcher
  const durationButtons = document.querySelectorAll('.jam-type-btn');
  durationButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      durationButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      targetDuration = parseInt(btn.getAttribute('data-duration'));
      updateScoper();
    });
  });

  // Attach sliders input events
  Object.keys(sliders).forEach(key => {
    if (sliders[key]) {
      sliders[key].addEventListener('input', () => {
        values[key].textContent = sliders[key].value;
        updateScoper();
      });
    }
  });

  function updateScoper() {
    const mechVal = parseInt(sliders.mechanics.value);
    const lvlVal = parseInt(sliders.levels.value);
    const artVal = parseInt(sliders.art.value);
    const soundVal = parseInt(sliders.sound.value);

    // Update Slider Subtexts
    subtexts.mechanics.textContent = sliderDescriptions.mechanics[mechVal - 1];
    
    // Level Design Subtext
    if (lvlVal === 1) {
      subtexts.levels.textContent = "A single small level or compact horror corridor.";
    } else if (lvlVal <= 3) {
      subtexts.levels.textContent = `${lvlVal} small interconnected areas or rooms.`;
    } else if (lvlVal <= 6) {
      subtexts.levels.textContent = `${lvlVal} rooms with varying lighting setups or objectives.`;
    } else {
      subtexts.levels.textContent = `${lvlVal} full scenes requiring loading zones. Extremely hard to scope!`;
    }

    subtexts.art.textContent = sliderDescriptions.art[artVal - 1];
    subtexts.sound.textContent = sliderDescriptions.sound[soundVal - 1];

    // Formulas for estimating hours (based on beginner developers)
    // Coding/Mechanics hours
    const mechHoursTable = [2, 5, 9, 14, 24];
    const codeHours = mechHoursTable[mechVal - 1];

    // Level Design Setup hours
    const levelHours = lvlVal * 1.5;

    // Visual Art hours
    const artHoursTable = [1.5, 3.5, 7, 12, 20];
    const artHours = artHoursTable[artVal - 1];

    // Sound Design hours
    const soundHoursTable = [1, 2.5, 5, 9, 16];
    const soundHours = soundHoursTable[soundVal - 1];

    const totalHours = codeHours + levelHours + artHours + soundHours;

    // Display total hours
    totalHoursEl.textContent = totalHours.toFixed(1);

    // Update breakdown values
    breakdownEls.code.textContent = `${codeHours.toFixed(1)} hrs`;
    breakdownEls.design.textContent = `${levelHours.toFixed(1)} hrs`;
    breakdownEls.art.textContent = `${artHours.toFixed(1)} hrs`;
    breakdownEls.sound.textContent = `${soundHours.toFixed(1)} hrs`;

    // Calculate limit boundaries based on Jam length
    // For 48h jam: max dev hours is around 20h. Safe is <= 12h.
    // For 72h jam: max dev hours is around 32h. Safe is <= 18h.
    // For 168h (1 week) jam: max dev hours is around 60h. Safe is <= 35h.
    let devMaxLimit = 32;
    let devMidLimit = 16;

    if (targetDuration === 48) {
      devMaxLimit = 20;
      devMidLimit = 12;
    } else if (targetDuration === 72) {
      devMaxLimit = 32;
      devMidLimit = 18;
    } else if (targetDuration === 168) {
      devMaxLimit = 64;
      devMidLimit = 38;
    }

    markerMidEl.textContent = `${devMidLimit}h`;
    markerMaxEl.textContent = `${devMaxLimit}h max`;

    // Gauge bar width and color
    let fillPercent = (totalHours / devMaxLimit) * 100;
    if (fillPercent > 100) fillPercent = 100;
    gaugeFillEl.style.width = `${fillPercent}%`;

    // Reset alert styles
    statusAlertEl.className = "gauge-status-alert";

    if (totalHours <= devMidLimit) {
      gaugeFillEl.style.backgroundColor = "var(--success-green)";
      statusAlertEl.classList.add("safe");
      statusAlertEl.innerHTML = `
        <strong>Safe Scope:</strong> Estimated Dev Hours (${totalHours.toFixed(1)}h) are well within the target timeline. 
        You have ample safety margin to handle Unity compile issues, build publishing bugs, and get sufficient sleep!
      `;
    } else if (totalHours <= devMaxLimit) {
      gaugeFillEl.style.backgroundColor = "var(--warning-orange)";
      statusAlertEl.classList.add("warning");
      statusAlertEl.innerHTML = `
        <strong>Challenging Scope:</strong> Estimated Dev Hours (${totalHours.toFixed(1)}h) are getting tight. 
        You will need a very disciplined schedule. Cut any non-essential polish early and make sure your build is working by halfway through the jam!
      `;
    } else {
      gaugeFillEl.style.backgroundColor = "var(--danger-red)";
      statusAlertEl.classList.add("danger");
      
      // Determine what to suggest cutting
      let cutSuggestions = [];
      if (mechVal > 2) cutSuggestions.push("reducing gameplay mechanics (e.g. skip combat/AI, focus on simple keys/locks)");
      if (lvlVal > 3) cutSuggestions.push("reducing level counts (a single 5-minute polished level is far better than 5 empty ones)");
      if (artVal > 2) cutSuggestions.push("using free low-poly asset packs from the store rather than modeling custom geometry");
      if (soundVal > 2) cutSuggestions.push("grabbing free sfx packs instead of composing detailed dynamic audio systems");

      let cutText = cutSuggestions.length > 0 
        ? `We highly recommend: ${cutSuggestions.join(", or ")}.`
        : "Reduce your slider values to shrink the scope.";

      statusAlertEl.innerHTML = `
        <strong>Overscoped Warning:</strong> Estimated Dev Hours (${totalHours.toFixed(1)}h) exceed the healthy dev budget for this jam! 
        This path leads to burnout or an incomplete submission. ${cutText}
      `;
    }
  }

  // Initial trigger
  updateScoper();
}

// 5. Initialize application on load
window.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initJamControls();
  renderJams();
  startCountdownInterval();
  initScopePlanner();
});
