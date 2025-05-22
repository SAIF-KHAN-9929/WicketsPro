// js/common.js

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }
});
// js/live.js

const apiKey = '8de811f2-b4c5-4dbb-b407-5baef328a731';  // Replace with your real API key

async function fetchLiveMatches() {
  try {
    const res = await fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}`);
    const data = await res.json();
    const container = document.getElementById('live-container');
    container.innerHTML = '';

    if (!data.data || data.data.length === 0) {
      container.innerHTML = '<p>No live matches currently.</p>';
      return;
    }

    data.data.forEach(match => {
      const card = document.createElement('div');
      card.className = 'match-card';
      card.innerHTML = `
        <strong>${match.name}</strong><br>
        ${match.status}<br>
        ${match.venue}<br>
        ${match.dateTimeGMT ? new Date(match.dateTimeGMT).toLocaleString() : ''}
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error('Error fetching live matches:', err);
  }
}

document.addEventListener('DOMContentLoaded', fetchLiveMatches);
// js/upcoming.js

const apiKey = '8de811f2-b4c5-4dbb-b407-5baef328a731';  // Replace with your real API key

async function fetchUpcomingMatches() {
  try {
    const res = await fetch(`https://api.cricapi.com/v1/upcomingMatches?apikey=${apiKey}`);
    const data = await res.json();
    const container = document.getElementById('upcoming-container');
    container.innerHTML = '';

    if (!data.data || data.data.length === 0) {
      container.innerHTML = '<p>No upcoming matches scheduled.</p>';
      return;
    }

    data.data.forEach(match => {
      const card = document.createElement('div');
      card.className = 'match-card';
      card.innerHTML = `
        <strong>${match.name}</strong><br>
        Date: ${new Date(match.date).toLocaleDateString()}<br>
        Venue: ${match.venue}
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error('Error fetching upcoming matches:', err);
  }
}

document.addEventListener('DOMContentLoaded', fetchUpcomingMatches);
const apiKey = "8de811f2-b4c5-4dbb-b407-5baef328a731"; // Your API key here

async function fetchCricketNews() {
  try {
    const response = await fetch(`https://api.cricapi.com/v1/cricNews?apikey=${apiKey}`);
    const data = await response.json();
    const newsContainer = document.getElementById('news-container');

    if (data && data.data && data.data.length > 0) {
      data.data.slice(0, 10).forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        newsCard.innerHTML = `
          <h3>${news.title}</h3>
          <p>${news.content || ''}</p>
          <a href="${news.link}" target="_blank" rel="noopener noreferrer">Read more</a>
        `;
        newsContainer.appendChild(newsCard);
      });
    } else {
      newsContainer.innerHTML = '<p>No news available currently.</p>';
    }
  } catch (err) {
    console.error("Error fetching news:", err);
    document.getElementById('news-container').innerHTML = '<p>Failed to load news.</p>';
  }
}

document.addEventListener('DOMContentLoaded', fetchCricketNews);
const apiKey = "8de811f2-b4c5-4dbb-b407-5baef328a731"; // Your API key

async function fetchRankings() {
  try {
    const response = await fetch(`https://api.cricapi.com/v1/rankings?apikey=${apiKey}`);
    const data = await response.json();
    const rankingsContainer = document.getElementById('rankings-container');

    if (data && data.data) {
      // Categories to show: ODI, T20, Test (Men)
      const categories = ['odi', 't20', 'test'];
      categories.forEach(cat => {
        const catData = data.data.find(r => r.type === cat && r.gender === "men");
        if (catData) {
          const card = document.createElement('div');
          card.className = 'ranking-card';
          card.innerHTML = `
            <h3>${cat.toUpperCase()} Teams</h3>
            ${catData.ranks.slice(0, 5).map(rank =>
              `<p>${rank.rank}. ${rank.team}</p>`).join('')}
          `;
          rankingsContainer.appendChild(card);
        }
      });
    } else {
      rankingsContainer.innerHTML = '<p>No rankings data available.</p>';
    }
  } catch (err) {
    console.error("Error fetching rankings:", err);
    document.getElementById('rankings-container').innerHTML = '<p>Failed to load rankings.</p>';
  }
}

document.addEventListener('DOMContentLoaded', fetchRankings);
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("match-container");

  const match = {
    title: "India vs Pakistan",
    date: "2025-06-05",
    time: "14:00 IST",
    venue: "Eden Gardens, Kolkata",
    teams: ["India", "Pakistan"],
    score: {
      India: "245/6 (50)",
      Pakistan: "238/9 (50)"
    },
    status: "India won by 7 runs",
    topScorer: "Virat Kohli - 87 runs",
    bestBowler: "Jasprit Bumrah - 3 wickets"
  };

  const html = `
    <div class="match-detail-card">
      <h3>${match.title}</h3>
      <p><strong>Date:</strong> ${match.date} at ${match.time}</p>
      <p><strong>Venue:</strong> ${match.venue}</p>
      <p><strong>Teams:</strong> ${match.teams.join(" vs ")}</p>
      <p><strong>Score:</strong></p>
      <ul>
        <li>${match.teams[0]}: ${match.score[match.teams[0]]}</li>
        <li>${match.teams[1]}: ${match.score[match.teams[1]]}</li>
      </ul>
      <p><strong>Status:</strong> ${match.status}</p>
      <p><strong>Top Scorer:</strong> ${match.topScorer}</p>
      <p><strong>Best Bowler:</strong> ${match.bestBowler}</p>
    </div>
  `;

  container.innerHTML = html;
});
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("live-container");

  const liveMatches = [
    {
      title: "India vs Australia",
      score: "India 198/4 (18.3)",
      status: "India needs 12 runs in 9 balls"
    },
    {
      title: "England vs New Zealand",
      score: "ENG 150/6 (20) | NZ 142/7 (18)",
      status: "England won by 8 runs"
    }
  ];

  liveMatches.forEach(match => {
    const card = document.createElement("div");
    card.className = "match-card";
    card.innerHTML = `
      <h3>${match.title}</h3>
      <p><strong>Score:</strong> ${match.score}</p>
      <p><strong>Status:</strong> ${match.status}</p>
    `;
    container.appendChild(card);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("upcoming-container");

  const upcomingMatches = [
    {
      title: "India vs Pakistan",
      date: "2025-06-01",
      venue: "Narendra Modi Stadium, Ahmedabad",
      time: "7:30 PM IST"
    },
    {
      title: "England vs South Africa",
      date: "2025-06-03",
      venue: "Lords, London",
      time: "1:30 PM GMT"
    }
  ];

  upcomingMatches.forEach(match => {
    const card = document.createElement("div");
    card.className = "match-card";
    card.innerHTML = `
      <h3>${match.title}</h3>
      <p><strong>Date:</strong> ${match.date}</p>
      <p><strong>Time:</strong> ${match.time}</p>
      <p><strong>Venue:</strong> ${match.venue}</p>
    `;
    container.appendChild(card);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("news-container");

  const cricketNews = [
    {
      title: "Virat Kohli to captain India in upcoming T20 World Cup",
      content: "The BCCI confirms Virat Kohli will lead the team in the 2025 T20 World Cup."
    },
    {
      title: "Australia names squad for England series",
      content: "Pat Cummins will continue to lead as captain. Smith, Warner included in the squad."
    },
    {
      title: "PCB announces domestic cricket overhaul",
      content: "Pakistan revamps its domestic structure to bring in more competitiveness."
    }
  ];

  cricketNews.forEach(news => {
    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
      <h3>${news.title}</h3>
      <p>${news.content}</p>
    `;
    container.appendChild(card);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("rankings-container");

  const rankings = {
    ODI: [
      { rank: 1, team: "India" },
      { rank: 2, team: "Australia" },
      { rank: 3, team: "England" },
      { rank: 4, team: "New Zealand" },
      { rank: 5, team: "Pakistan" }
    ],
    T20: [
      { rank: 1, team: "India" },
      { rank: 2, team: "Pakistan" },
      { rank: 3, team: "South Africa" },
      { rank: 4, team: "Australia" },
      { rank: 5, team: "West Indies" }
    ],
    TEST: [
      { rank: 1, team: "Australia" },
      { rank: 2, team: "India" },
      { rank: 3, team: "England" },
      { rank: 4, team: "South Africa" },
      { rank: 5, team: "New Zealand" }
    ]
  };

  for (const format in rankings) {
    const card = document.createElement("div");
    card.className = "ranking-card";
    card.innerHTML = `<h3>${format} Rankings</h3>`;
    rankings[format].forEach(entry => {
      card.innerHTML += `<p>${entry.rank}. ${entry.team}</p>`;
    });
    container.appendChild(card);
  }
});
const apiKey = '8de811f2-b4c5-4dbb-b407-5baef328a731';

async function fetchLiveMatches() {
  const response = await fetch(`https://api.cricapi.com/v1/matches?apikey=${apiKey}`);
  const data = await response.json();
  // Process and display data dynamically on your page
}
async function loadLiveMatches() {
  try {
    const res = await fetch(`https://api.cricapi.com/v1/matches?apikey=${apiKey}`);
    const data = await res.json();

    if (data && data.data) {
      const container = document.getElementById('live-container');
      container.innerHTML = '';

      data.data.forEach(match => {
        const div = document.createElement('div');
        div.className = 'match-card';
        div.innerHTML = `
          <h3>${match.name}</h3>
          <p>Status: ${match.status}</p>
          <p>Date: ${new Date(match.dateTimeGMT).toLocaleString()}</p>
        `;
        container.appendChild(div);
      });
    }
  } catch (error) {
    console.error('Error fetching live matches:', error);
  }
}
const apiKey = "8de811f2-b4c5-4dbb-b407-5baef328a731";

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("live-container")) {
    fetchLiveMatches();
  }
});

async function fetchLiveMatches() {
  const container = document.getElementById("live-container");
  container.innerHTML = "<p>Loading live matches...</p>";

  try {
    const response = await fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}`);
    const data = await response.json();

    if (!data || !data.data || data.data.length === 0) {
      container.innerHTML = "<p>No live matches available right now.</p>";
      return;
    }

    container.innerHTML = "";
    data.data.slice(0, 5).forEach(match => {
      const card = document.createElement("div");
      card.className = "match-card";
      card.innerHTML = `
        <div class="match-title">${match.name}</div>
        <div class="match-info"><strong>Status:</strong> ${match.status}</div>
        <div class="match-info"><strong>Teams:</strong> ${match.teams.join(" vs ")}</div>
        <div class="match-info"><strong>Score:</strong> ${match.score && match.score.length > 0 ? match.score.map(s => `${s.inning}: ${s.r}`).join(" | ") : "N/A"}</div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = "<p>Error fetching live matches.</p>";
    console.error("Live match fetch error:", err);
  }
}

{
  "apikey": "8de811f2-b4c5-4dbb-b407-5baef328a731",
  "offset": 0,
  "id": "0b12f428-98ab-4009-831d-493d325bc555"
}{
  "apikey": "8de811f2-b4c5-4dbb-b407-5baef328a731",
  "data": [
    {
      "teamName": "Kolkata Knight Riders",
      "players": [
        {
          "id": "d0d5f87d-78c3-4126-86a7-17ea315fda67",
          "name": "Aman Hakim Khan",
          "role": "Batsman",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm fast-medium",
          "country": "India",
          "playerImg": "https://cdorgapi.b-cdn.net/img/icon512.png"
        }
      ]
    },
    {
      "teamName": "Sunrisers Hyderabad",
      "players": [
        {
          "id": "9e6fa482-3ad3-4831-b05d-4fed2510cdf5",
          "name": "Glenn Phillips",
          "role": "WK-Batsman",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm offbreak",
          "country": "New Zealand",
          "playerImg": "https://cdorgapi.b-cdn.net/img/players/9e6fa482-3ad3-4831-b05d-4fed2510cdf5.jpg"
        }
      ]
    }
  ],
  "status": "success",
  "info": {
    "hitsToday": 3,
    "hitsLimit": 500,
    "credits": 0,
    "server": 11,
    "queryTime": 949.2343,
    "s": 0
  }
}{
  "apikey": "8de811f2-b4c5-4dbb-b407-5baef328a731",
  "offset": 0,
  "id": "0b12f428-98ab-4009-831d-493d325bc555"
}{
  "apikey": "1971b689-e4de-493b-8c1c-be3eb3cb7e6f",
  "data": {
    "id": "0b12f428-98ab-4009-831d-493d325bc555",
    "name": "Sunrisers Hyderabad vs Kolkata Knight Riders, 25th Match",
    "matchType": "t20",
    "status": "Sunrisers Hyderabad won by 7 wkts",
    "venue": "Brabourne Stadium, Mumbai",
    "date": "2022-04-15",
    "dateTimeGMT": "2022-04-15T14:00:00",
    "teams": [
      "Sunrisers Hyderabad",
      "Kolkata Knight Riders"
    ],
    "score": [
      {
        "r": 175,
        "w": 8,
        "o": 20,
        "inning": "Kolkata Knight Riders Inning 1"
      },
      {
        "r": 176,
        "w": 3,
        "o": 17.5,
        "inning": "Sunrisers Hyderabad Inning 1"
      }
    ],
    "tossWinner": "Sunrisers Hyderabad",
    "tossChoice": "bowl",
    "matchWinner": "Sunrisers Hyderabad",
    "series_id": "47b54677-34de-4378-9019-154e82b9cc1a",
    "scorecard": [
      {
        "batting": [
          {
            "batsman": {
              "id": "c3236037-6694-404a-8f01-9ad880564ea9",
              "name": "Venkatesh Iyer"
            },
            "dismissal": "bowled",
            "bowler": {
              "id": "d8826d0d-ef95-4dce-a47a-b09b97f49f07",
              "name": "T Natarajan"
            },
            "dismissal-text": "b T Natarajan",
            "r": 6,
            "b": 13,
            "4s": 1,
            "6s": 0,
            "sr": 46.15
          }
        ],
        "bowling": [
          {
            "bowler": {
              "id": "3f3ecf51-8411-4046-9477-18c0fe3da6ac",
              "name": "Bhuvneshwar Kumar"
            },
            "o": 4,
            "m": 0,
            "r": 37,
            "w": 1,
            "nb": 0,
            "wd": 1,
            "eco": 9.2
          }
        ],
        "catching": [
          {
            "stumped": 0,
            "runout": 0,
            "catch": 2,
            "catcher": {
              "id": "4e8ab9cd-c5af-430e-887b-d22bf74ad052",
              "name": "Nicholas Pooran"
            }
          }
        ],
        "extras": {
          "r": 9,
          "b": 2,
          "lb": 4,
          "w": 3,
          "nb": 0,
          "p": 0
        },
        "totals": {
          "R": 175,
          "O": 20,
          "W": 8,
          "RR": 8.75
        },
        "inning": "Kolkata Knight Riders Inning 1"
      },
      {
        "batting": [
          {
            "batsman": {
              "id": "83fe6ab6-d63c-420e-9416-a93d59a9a964",
              "name": "Abhishek Sharma"
            },
            "dismissal": "bowled",
            "bowler": {
              "id": "13b3d56e-0fba-4d31-a174-d211211404e2",
              "name": "Pat Cummins"
            },
            "dismissal-text": "b Cummins",
            "r": 3,
            "b": 10,
            "4s": 0,
            "6s": 0,
            "sr": 30
          }
        ],
        "bowling": [
          {
            "bowler": {
              "id": "1985ba7d-1f0a-4d4f-98d2-3ea741309a1a",
              "name": "Umesh Yadav"
            },
            "o": 4,
            "m": 0,
            "r": 31,
            "w": 0,
            "nb": 0,
            "wd": 1,
            "eco": 7.8
          }
        ],
        "catching": [
          {
            "stumped": 0,
            "runout": 0,
            "catch": 1,
            "catcher": {
              "id": "c3236037-6694-404a-8f01-9ad880564ea9",
              "name": "Venkatesh Iyer"
            }
          }
        ],
        "extras": {
          "r": 12,
          "b": 4,
          "lb": 0,
          "w": 8,
          "nb": 0,
          "p": 0
        },
        "totals": {
          "R": 176,
          "O": 17.5,
          "W": 3,
          "RR": 9.87
        },
        "inning": "Sunrisers Hyderabad Inning 1"
      }
    ]
  },
  "status": "success",
  "info": {
    "hitsToday": 10,
    "hitsLimit": 500,
    "credits": 0,
    "server": 9,
    "queryTime": 521.2308,
    "s": 0
  }
}{
  "apikey": "8de811f2-b4c5-4dbb-b407-5baef328a731",
  "offset": 0,
  "id": "0b12f428-98ab-4009-831d-493d325bc555",
  "ruleset": 0
}{
  "apikey": "8de811f2-b4c5-4dbb-b407-5baef328a731",
  "data": {
    "innings": [
      {
        "inning": "Kolkata Knight Riders Inning 1",
        "batting": [
          {
            "id": "c3236037-6694-404a-8f01-9ad880564ea9",
            "name": "Venkatesh Iyer",
            "points": 9
          }
        ],
        "bowling": [
          {
            "id": "3f3ecf51-8411-4046-9477-18c0fe3da6ac",
            "name": "Bhuvneshwar Kumar",
            "points": 2
          }
        ],
        "catching": [
          {
            "id": "4e8ab9cd-c5af-430e-887b-d22bf74ad052",
            "name": "Nicholas Pooran",
            "points": 19
          }
        ]
      },
      {
        "inning": "Sunrisers Hyderabad Inning 1",
        "batting": [
          {
            "id": "83fe6ab6-d63c-420e-9416-a93d59a9a964",
            "name": "Abhishek Sharma",
            "points": -3
          }
        ],
        "bowling": [
          {
            "id": "1985ba7d-1f0a-4d4f-98d2-3ea741309a1a",
            "name": "Umesh Yadav",
            "points": -2
          }
        ],
        "catching": [
          {
            "id": "c3236037-6694-404a-8f01-9ad880564ea9",
            "name": "Venkatesh Iyer",
            "points": 8
          }
        ]
      }
    ],
    "totals": [
      {
        "id": "c3236037-6694-404a-8f01-9ad880564ea9",
        "name": "Venkatesh Iyer",
        "points": 9
      }
    ]
  },
  "status": "success",
  "info": {
    "hitsToday": 26,
    "hitsLimit": 500,
    "credits": 0,
    "server": 9,
    "ruleset": 0,
    "queryTime": 135.4964,
    "s": 0
  }
}{
  "apikey": "8de811f2-b4c5-4dbb-b407-5baef328a731",
  "data": [
    {
      "teamName": "Ireland",
      "shortname": "IRE",
      "img": "https://g.cricapi.com/iapi/33-637926315578500224.png?w=48",
      "players": [
        {
          "id": "7f9344be-4c2b-465e-8eeb-02a344c96105",
          "name": "Cade Carmichael",
          "role": "Batsman",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm medium",
          "country": "Ireland",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling",
          "role": "Batting Allrounder",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm offbreak",
          "country": "Ireland",
          "playerImg": "https://h.cricapi.com/img/players/5c5d4165-c9bf-408e-a289-10d8be4baeb1.jpg"
        },
        {
          "id": "ecd6e0fe-661f-4bf4-9299-2632c9dc6d8f",
          "name": "Thomas Mayes",
          "role": "Bowler",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm fast-medium",
          "country": "Ireland",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "ba8b0b77-0620-43e2-a804-2dc0ab121b63",
          "name": "Harry Tector",
          "role": "Batsman",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm offbreak",
          "country": "Ireland",
          "playerImg": "https://h.cricapi.com/img/players/ba8b0b77-0620-43e2-a804-2dc0ab121b63.jpg"
        },
        {
          "id": "347d92c5-ef79-464e-9904-480158eae355",
          "name": "George Dockrell",
          "role": "Bowling Allrounder",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Left-arm orthodox",
          "country": "Ireland",
          "playerImg": "https://h.cricapi.com/img/players/347d92c5-ef79-464e-9904-480158eae355.jpg"
        },
        {
          "id": "10933774-95c2-444f-8fe6-4980b11661fe",
          "name": "Lorcan Tucker",
          "role": "WK-Batsman",
          "battingStyle": "Right Handed Bat",
          "country": "Ireland",
          "playerImg": "https://h.cricapi.com/img/players/10933774-95c2-444f-8fe6-4980b11661fe.jpg"
        },
        {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie",
          "role": "Batsman",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm offbreak",
          "country": "Ireland",
          "playerImg": "https://h.cricapi.com/img/players/f5e3e8bf-f067-4957-b43a-6d8019b4427b.jpg"
        },
        {
          "id": "1269d2a1-1fe7-4d35-88f8-779b874598e6",
          "name": "Matthew Humphreys",
          "role": "Bowling Allrounder",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Left-arm orthodox",
          "country": "Ireland",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "c97bab30-f2da-441d-8ef5-7b7f1cf39c7e",
          "name": "Andy McBrine",
          "role": "Bowling Allrounder",
          "battingStyle": "Left Handed Bat",
          "bowlingStyle": "Right-arm offbreak",
          "country": "Ireland",
          "playerImg": "https://h.cricapi.com/img/players/c97bab30-f2da-441d-8ef5-7b7f1cf39c7e.jpg"
        },
        {
          "id": "cce2cf7e-d161-4c8e-ab81-862107aa0dbe",
          "name": "Craig Young",
          "role": "Bowler",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm fast-medium",
          "country": "Ireland",
          "playerImg": "https://h.cricapi.com/img/players/cce2cf7e-d161-4c8e-ab81-862107aa0dbe.jpg"
        },
        {
          "id": "6d21756f-dc82-46f3-9aa0-88da89a4117f",
          "name": "Liam McCarthy",
          "role": "Bowler",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm fast-medium",
          "country": "Ireland",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "9a057014-ba0b-4c93-a68c-9f4f8a7e67bc",
          "name": "Joshua Little",
          "role": "Bowler",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Left-arm fast-medium",
          "country": "Ireland",
          "playerImg": "https://h.cricapi.com/img/players/9a057014-ba0b-4c93-a68c-9f4f8a7e67bc.jpg"
        },
        {
          "id": "18e2f906-929d-421d-addf-d806d2a455eb",
          "name": "Curtis Campher",
          "role": "Bowling Allrounder",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Left-arm medium",
          "country": "Ireland",
          "playerImg": "https://h.cricapi.com/img/players/18e2f906-929d-421d-addf-d806d2a455eb.jpg"
        },
        {
          "id": "fd7d72a2-44b6-45dd-9af4-dbb2a4f89118",
          "name": "Barry McCarthy",
          "role": "Bowler",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm fast-medium",
          "country": "Ireland",
          "playerImg": "https://h.cricapi.com/img/players/fd7d72a2-44b6-45dd-9af4-dbb2a4f89118.jpg"
        }
      ]
    },
    {
      "teamName": "West Indies",
      "shortname": "WI",
      "img": "https://g.cricapi.com/iapi/100-637877077978319234.webp?w=48",
      "players": [
        {
          "id": "631c0ba9-3863-44c9-a644-03c517d65be1",
          "name": "Jewel Andrew",
          "role": "WK-Batsman",
          "battingStyle": "Right Handed Bat",
          "country": "West Indies",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "f540dcd8-bbfc-4c3a-a0c4-1c14c2f51132",
          "name": "Justin Greaves",
          "role": "Batting Allrounder",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm medium",
          "country": "West Indies",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "2ff6091e-f412-422d-a5fe-3d8d1a3dd673",
          "name": "Alzarri Joseph",
          "role": "Bowler",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm fast",
          "country": "West Indies",
          "playerImg": "https://h.cricapi.com/img/players/2ff6091e-f412-422d-a5fe-3d8d1a3dd673.jpg"
        },
        {
          "id": "8c3270be-9b18-4fa6-b13e-3e37a06a08d7",
          "name": "Keacy Carty",
          "role": "Batting Allrounder",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm medium",
          "country": "West Indies",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "47ef7e3e-5808-49a8-934d-8d98b7889d28",
          "name": "Jayden Seales",
          "role": "Bowler",
          "battingStyle": "Left Handed Bat",
          "bowlingStyle": "Right-arm medium",
          "country": "West Indies",
          "playerImg": "https://h.cricapi.com/img/players/47ef7e3e-5808-49a8-934d-8d98b7889d28.jpg"
        },
        {
          "id": "a870c646-27e5-4747-8c40-99761728af7e",
          "name": "Jediah Blades",
          "role": "Bowler",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Left-arm medium",
          "country": "West Indies",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "eccad6b2-7fb5-4be4-a6a1-aeaadbd9f85b",
          "name": "Evin Lewis",
          "role": "Batsman",
          "battingStyle": "Left Handed Bat",
          "country": "West Indies",
          "playerImg": "https://h.cricapi.com/img/players/eccad6b2-7fb5-4be4-a6a1-aeaadbd9f85b.jpg"
        },
        {
          "id": "179d3fa8-d561-4471-979e-b165cfe2b40e",
          "name": "Amir Jangoo",
          "role": "WK-Batsman",
          "battingStyle": "Left Handed Bat",
          "country": "West Indies",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "14b11131-17c5-48d3-aefe-c40e0eff340b",
          "name": "John Campbell",
          "role": "Batting Allrounder",
          "battingStyle": "Left Handed Bat",
          "bowlingStyle": "Right-arm offbreak",
          "country": "West Indies",
          "playerImg": "https://h.cricapi.com/img/players/14b11131-17c5-48d3-aefe-c40e0eff340b.jpg"
        },
        {
          "id": "e5790c27-c428-4de8-82f7-d69a5452923e",
          "name": "Shai Hope",
          "role": "WK-Batsman",
          "battingStyle": "Right Handed Bat",
          "country": "West Indies",
          "playerImg": "https://h.cricapi.com/img/players/e5790c27-c428-4de8-82f7-d69a5452923e.jpg"
        },
        {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph",
          "role": "Bowler",
          "battingStyle": "Left Handed Bat",
          "bowlingStyle": "Right-arm fast",
          "country": "West Indies",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "90173068-f2ad-4278-b10c-dc5749bca0d3",
          "name": "Roston Chase",
          "role": "Bowling Allrounder",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm offbreak",
          "country": "West Indies",
          "playerImg": "https://h.cricapi.com/img/players/90173068-f2ad-4278-b10c-dc5749bca0d3.jpg"
        },
        {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie",
          "role": "Bowling Allrounder",
          "battingStyle": "Left Handed Bat",
          "bowlingStyle": "Left-arm orthodox",
          "country": "West Indies",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde",
          "role": "Bowler",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm fast-medium",
          "country": "West Indies",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "444e0a55-ec85-4ee1-9557-f1a51a96a7d5",
          "name": "Brandon King",
          "role": "Batsman",
          "battingStyle": "Right Handed Bat",
          "country": "West Indies",
          "playerImg": "https://h.cricapi.com/img/players/444e0a55-ec85-4ee1-9557-f1a51a96a7d5.jpg"
        }
      ]
    }
  ],
  "status": "success",
  "info": {
    "hitsToday": 52,
    "hitsUsed": 10,
    "hitsLimit": 100,
    "credits": 0,
    "server": 5,
    "queryTime": 30.0464,
    "s": 0,
    "cache": 0
  }
}{
  "apikey": "8de811f2-b4c5-4dbb-b407-5baef328a731",
  "data": [
    {
      "teamName": "Austria",
      "shortname": "AUT",
      "img": "https://g.cricapi.com/iapi/581-637867646191086862.webp?w=48",
      "players": [
        {
          "id": "0652dc95-ad8c-4465-97d7-1491c7adb551",
          "name": "Umair Tariq",
          "role": "Bowler",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm medium",
          "country": "Austria",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "be43552e-feae-42e3-aafa-57f7a7ac77bc",
          "name": "Zeeshan Goraya",
          "role": "--",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm medium",
          "country": "Austria",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "e1182d10-4578-487b-bfe0-663ff5d29246",
          "name": "Kumud Jha",
          "role": "--",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Left-arm orthodox",
          "country": "Austria",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "cecdb219-0496-4037-8bd7-70cf1b059ca6",
          "name": "Hamid Safi",
          "role": "Bowler",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm fast",
          "country": "Austria",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "506add1e-eb49-4e4e-bf3c-a4a816be8d11",
          "name": "Arsalan Arif",
          "role": "WK-Batsman",
          "battingStyle": "Right Handed Bat",
          "country": "Austria",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "441dba67-9198-4ba4-a341-d63a73fcc1f4",
          "name": "Aqib Javed Iqbal",
          "role": "Batting Allrounder",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm medium",
          "country": "Austria",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "12674574-3076-42c6-9236-e34853d711fd",
          "name": "Bilal Zalmai",
          "role": "Batting Allrounder",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm offbreak",
          "country": "Austria",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "de6e7b93-1725-4201-8d73-f0956d9166bc",
          "name": "Karanbir Singh",
          "role": "Bowler",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm medium",
          "country": "Austria",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "b0207dc1-79b6-40ab-9f80-f2e102679c29",
          "name": "Mansoor Safi",
          "role": "WK-Batsman",
          "battingStyle": "Right Handed Bat",
          "country": "Austria",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "a5dbebc3-2963-44c3-8147-f3567016a0d7",
          "name": "Ziaurahman Shinwari",
          "role": "--",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm medium",
          "country": "Austria",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "0bffe3c9-3ebd-409a-bb8c-f54d8ae58afb",
          "name": "Janan Ghelzai",
          "role": "Batsman",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm legbreak",
          "country": "Austria",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        }
      ]
    },
    {
      "teamName": "Slovenia",
      "shortname": "SLN",
      "img": "https://g.cricapi.com/iapi/1862-637992917116921761.webp?w=48",
      "players": [
        {
          "id": "39da0706-ae51-4c36-a385-2fb785177d98",
          "name": "Dinesh Matla",
          "role": "Batsman",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm offbreak",
          "country": "Slovenia",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "ee8da826-4831-4418-ae41-36e3da43c9aa",
          "name": "Shahid Arshad",
          "role": "Batsman",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm medium",
          "country": "Slovenia",
          "playerImg": "https://h.cricapi.com/img/players/ee8da826-4831-4418-ae41-36e3da43c9aa-637955650719795478.png"
        },
        {
          "id": "1f6f0c87-9b35-4b10-b5b2-8cb9fb8e9e98",
          "name": "Rasheed Ali Mamadkhel",
          "role": "WK-Batsman",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm medium",
          "country": "Slovenia",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "cc0b17e9-6a87-4284-83ea-8f8e3cfd39d0",
          "name": "Tarun Sharma",
          "role": "--",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm medium",
          "country": "Slovenia",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "4987fc89-dcb9-451f-beb0-d1067e7ec49c",
          "name": "Izaz Ali",
          "role": "--",
          "battingStyle": "Right Handed Bat",
          "bowlingStyle": "Right-arm medium",
          "country": "Slovenia",
          "playerImg": "https://h.cricapi.com/img/icon512.png"
        },
        {
          "id": "e3986a91-b350-4a0a-b8de-efca62e23285",
          "name": "Primoz Pustoslemsek",
          "role": "Bowling Allrounder",
          "battingStyle": "Left Handed Bat",
          "bowlingStyle": "Right-arm medium",
          "country": "Slovenia",
          "playerImg": "https://h.cricapi.com/img/players/e3986a91-b350-4a0a-b8de-efca62e23285-637955625980112467.png"
        }
      ]
    }
  ],
  "status": "success",
  "info": {
    "hitsToday": 54,
    "hitsUsed": 1,
    "hitsLimit": 100,
    "credits": 0,
    "server": 11,
    "queryTime": 13.8346,
    "s": 0,
    "cache": 0
  }
}{
  "apikey": "8de811f2-b4c5-4dbb-b407-5baef328a731",
  "data": {
    "id": "46d2c5d5-524e-4c24-9407-49319e386427",
    "name": "Ireland vs West Indies, 1st ODI",
    "matchType": "odi",
    "status": "West Indies opt to bowl",
    "venue": "The Village, Dublin",
    "date": "2025-05-21",
    "dateTimeGMT": "2025-05-21T09:45:00",
    "teams": [
      "Ireland",
      "West Indies"
    ],
    "teamInfo": [
      {
        "name": "Ireland",
        "shortname": "IRE",
        "img": "https://g.cricapi.com/iapi/33-637926315578500224.png?w=48"
      },
      {
        "name": "West Indies",
        "shortname": "WI",
        "img": "https://g.cricapi.com/iapi/100-637877077978319234.webp?w=48"
      }
    ],
    "score": [
      {
        "r": 88,
        "w": 0,
        "o": 17.4,
        "inning": "Ireland Inning 1"
      }
    ],
    "tossWinner": "West Indies",
    "tossChoice": "bowl",
    "series_id": "01e2078d-d00d-43b7-8909-7e6e8f792005",
    "scorecard": [
      {
        "batting": [
          {
            "batsman": {
              "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
              "name": "Andrew Balbirnie"
            },
            "dismissal-text": "batting",
            "r": 32,
            "b": 59,
            "4s": 5,
            "6s": 0,
            "sr": 54.24,
            "": 0
          },
          {
            "batsman": {
              "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
              "name": "Paul Stirling"
            },
            "dismissal-text": "batting",
            "r": 37,
            "b": 47,
            "4s": 4,
            "6s": 2,
            "sr": 78.72,
            "": 0
          }
        ],
        "bowling": [
          {
            "bowler": {
              "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
              "name": "Matthew Forde"
            },
            "o": 5,
            "m": 1,
            "r": 27,
            "w": 0,
            "nb": 1,
            "wd": 2,
            "eco": 5.4
          },
          {
            "bowler": {
              "id": "2ff6091e-f412-422d-a5fe-3d8d1a3dd673",
              "name": "Alzarri Joseph",
              "altnames": [
                "alzarri joseph"
              ]
            },
            "o": 3,
            "m": 0,
            "r": 6,
            "w": 0,
            "nb": 0,
            "wd": 0,
            "eco": 2
          },
          {
            "bowler": {
              "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
              "name": "Shamar Joseph"
            },
            "o": 4,
            "m": 0,
            "r": 28,
            "w": 0,
            "nb": 1,
            "wd": 1,
            "eco": 7
          },
          {
            "bowler": {
              "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
              "name": "Gudakesh Motie"
            },
            "o": 4,
            "m": 0,
            "r": 17,
            "w": 0,
            "nb": 0,
            "wd": 5,
            "eco": 4.2
          },
          {
            "bowler": {
              "id": "f540dcd8-bbfc-4c3a-a0c4-1c14c2f51132",
              "name": "Justin Greaves"
            },
            "o": 1.2,
            "m": 0,
            "r": 1,
            "w": 0,
            "nb": 0,
            "wd": 0,
            "eco": 0.8
          }
        ],
        "catching": [],
        "extras": {
          "r": 17,
          "b": 0
        },
        "totals": {},
        "inning": "Ireland Inning 1"
      }
    ],
    "matchStarted": true,
    "matchEnded": false
  },
  "status": "success",
  "info": {
    "hitsToday": 65,
    "hitsUsed": 10,
    "hitsLimit": 100,
    "credits": 0,
    "server": 9,
    "queryTime": 23.0187,
    "s": 0,
    "cache": 0
  }
}{
  "apikey": "8de811f2-b4c5-4dbb-b407-5baef328a731",
  "data": {
    "innings": [
      {
        "inning": "Ireland Inning 1",
        "batting": [
          {
            "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
            "name": "Andrew Balbirnie",
            "points": 38
          },
          {
            "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
            "name": "Paul Stirling",
            "points": 50
          }
        ],
        "bowling": [
          {
            "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
            "name": "Matthew Forde",
            "points": 0
          },
          {
            "id": "2ff6091e-f412-422d-a5fe-3d8d1a3dd673",
            "name": "Alzarri Joseph",
            "altnames": [
              "alzarri joseph"
            ],
            "points": 6
          },
          {
            "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
            "name": "Shamar Joseph",
            "points": -4
          },
          {
            "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
            "name": "Gudakesh Motie",
            "points": -4
          },
          {
            "id": "f540dcd8-bbfc-4c3a-a0c4-1c14c2f51132",
            "name": "Justin Greaves",
            "points": 6
          }
        ],
        "catching": []
      }
    ],
    "totals": [
      {
        "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
        "name": "Andrew Balbirnie",
        "points": 38
      },
      {
        "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
        "name": "Paul Stirling",
        "points": 50
      },
      {
        "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
        "name": "Matthew Forde",
        "points": 0
      },
      {
        "id": "2ff6091e-f412-422d-a5fe-3d8d1a3dd673",
        "name": "Alzarri Joseph",
        "altnames": [
          "alzarri joseph"
        ],
        "points": 6
      },
      {
        "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
        "name": "Shamar Joseph",
        "points": -4
      },
      {
        "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
        "name": "Gudakesh Motie",
        "points": -4
      },
      {
        "id": "f540dcd8-bbfc-4c3a-a0c4-1c14c2f51132",
        "name": "Justin Greaves",
        "points": 6
      }
    ]
  },
  "status": "success",
  "info": {
    "hitsToday": 76,
    "hitsUsed": 10,
    "hitsLimit": 100,
    "credits": 0,
    "server": 1,
    "ruleset": 0,
    "queryTime": 81.6576,
    "s": 0,
    "cache": 0
  }
}
{
  "apikey": "8de811f2-b4c5-4dbb-b407-5baef328a731",
  "data": [
    {
      "teamname": "Austria",
      "shortname": "AUT",
      "img": "https://g.cricapi.com/iapi/581-637867646191086862.webp?w=48",
      "matches": 4,
      "wins": 4,
      "loss": 0,
      "ties": 0,
      "nr": 0
    },
    {
      "teamname": "Slovenia",
      "shortname": "SLN",
      "img": "https://g.cricapi.com/iapi/1862-637992917116921761.webp?w=48",
      "matches": 4,
      "wins": 0,
      "loss": 4,
      "ties": 0,
      "nr": 0
    }
  ],
  "status": "success",
  "info": {
    "hitsToday": 78,
    "hitsUsed": 1,
    "hitsLimit": 100,
    "credits": 0,
    "server": 9,
    "queryTime": 12.4649,
    "s": 0,
    "cache": 0
  }
}
{
  "apikey": "8de811f2-b4c5-4dbb-b407-5baef328a731",
  "data": [],
  "status": "success",
  "info": {
    "hitsToday": 80,
    "hitsUsed": 1,
    "hitsLimit": 100,
    "credits": 0,
    "server": 5,
    "queryTime": 10.5428,
    "s": 0,
    "cache": 0
  }
}
{
  "apikey": "8de811f2-b4c5-4dbb-b407-5baef328a731",
  "data": {
    "id": "46d2c5d5-524e-4c24-9407-49319e386427",
    "name": "Ireland vs West Indies, 1st ODI",
    "matchType": "odi",
    "status": "West Indies opt to bowl",
    "venue": "The Village, Dublin",
    "date": "2025-05-21",
    "dateTimeGMT": "2025-05-21T09:45:00",
    "teams": [
      "Ireland",
      "West Indies"
    ],
    "teamInfo": [
      {
        "name": "Ireland",
        "shortname": "IRE",
        "img": "https://g.cricapi.com/iapi/33-637926315578500224.png?w=48"
      },
      {
        "name": "West Indies",
        "shortname": "WI",
        "img": "https://g.cricapi.com/iapi/100-637877077978319234.webp?w=48"
      }
    ],
    "score": [
      {
        "r": 88,
        "w": 0,
        "o": 17.5,
        "inning": "Ireland Inning 1"
      }
    ],
    "tossWinner": "West Indies",
    "tossChoice": "bowl",
    "series_id": "01e2078d-d00d-43b7-8909-7e6e8f792005",
    "bbb": [
      {
        "n": 1,
        "inning": 0,
        "over": 0,
        "ball": 1,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 2,
        "inning": 0,
        "over": 0,
        "ball": 2,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 3,
        "inning": 0,
        "over": 0,
        "ball": 3,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "penalty": "wide",
        "extras": 1
      },
      {
        "n": 4,
        "inning": 0,
        "over": 0,
        "ball": 3,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 5,
        "inning": 0,
        "over": 0,
        "ball": 4,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 6,
        "inning": 0,
        "over": 0,
        "ball": 5,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 1,
        "extras": 0
      },
      {
        "n": 7,
        "inning": 0,
        "over": 0,
        "ball": 6,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 8,
        "inning": 0,
        "over": 1,
        "ball": 1,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "2ff6091e-f412-422d-a5fe-3d8d1a3dd673",
          "name": "Alzarri Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 9,
        "inning": 0,
        "over": 1,
        "ball": 2,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "2ff6091e-f412-422d-a5fe-3d8d1a3dd673",
          "name": "Alzarri Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 10,
        "inning": 0,
        "over": 1,
        "ball": 3,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "2ff6091e-f412-422d-a5fe-3d8d1a3dd673",
          "name": "Alzarri Joseph"
        },
        "runs": 4,
        "extras": 0
      },
      {
        "n": 11,
        "inning": 0,
        "over": 1,
        "ball": 4,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "2ff6091e-f412-422d-a5fe-3d8d1a3dd673",
          "name": "Alzarri Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 12,
        "inning": 0,
        "over": 1,
        "ball": 5,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "2ff6091e-f412-422d-a5fe-3d8d1a3dd673",
          "name": "Alzarri Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 13,
        "inning": 0,
        "over": 1,
        "ball": 6,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "2ff6091e-f412-422d-a5fe-3d8d1a3dd673",
          "name": "Alzarri Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 14,
        "inning": 0,
        "over": 2,
        "ball": 1,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 15,
        "inning": 0,
        "over": 2,
        "ball": 2,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 16,
        "inning": 0,
        "over": 2,
        "ball": 3,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 17,
        "inning": 0,
        "over": 2,
        "ball": 4,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 18,
        "inning": 0,
        "over": 2,
        "ball": 5,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 19,
        "inning": 0,
        "over": 2,
        "ball": 6,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 20,
        "inning": 0,
        "over": 3,
        "ball": 1,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "2ff6091e-f412-422d-a5fe-3d8d1a3dd673",
          "name": "Alzarri Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 21,
        "inning": 0,
        "over": 3,
        "ball": 2,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "2ff6091e-f412-422d-a5fe-3d8d1a3dd673",
          "name": "Alzarri Joseph"
        },
        "runs": 1,
        "extras": 0
      },
      {
        "n": 22,
        "inning": 0,
        "over": 3,
        "ball": 3,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2ff6091e-f412-422d-a5fe-3d8d1a3dd673",
          "name": "Alzarri Joseph"
        },
        "runs": 0,
        "penalty": "leg byes",
        "extras": 1
      },
      {
        "n": 23,
        "inning": 0,
        "over": 3,
        "ball": 4,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "2ff6091e-f412-422d-a5fe-3d8d1a3dd673",
          "name": "Alzarri Joseph"
        },
        "runs": 0,
        "penalty": "leg byes",
        "extras": 1
      },
      {
        "n": 24,
        "inning": 0,
        "over": 3,
        "ball": 5,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2ff6091e-f412-422d-a5fe-3d8d1a3dd673",
          "name": "Alzarri Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 25,
        "inning": 0,
        "over": 3,
        "ball": 6,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2ff6091e-f412-422d-a5fe-3d8d1a3dd673",
          "name": "Alzarri Joseph"
        },
        "runs": 0,
        "penalty": "leg byes",
        "extras": 1
      },
      {
        "n": 26,
        "inning": 0,
        "over": 4,
        "ball": 1,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 27,
        "inning": 0,
        "over": 4,
        "ball": 2,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 28,
        "inning": 0,
        "over": 4,
        "ball": 3,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 4,
        "extras": 0
      },
      {
        "n": 29,
        "inning": 0,
        "over": 4,
        "ball": 4,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 30,
        "inning": 0,
        "over": 4,
        "ball": 5,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 31,
        "inning": 0,
        "over": 4,
        "ball": 6,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 6,
        "extras": 0
      },
      {
        "n": 32,
        "inning": 0,
        "over": 5,
        "ball": 1,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "2ff6091e-f412-422d-a5fe-3d8d1a3dd673",
          "name": "Alzarri Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 33,
        "inning": 0,
        "over": 5,
        "ball": 2,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "2ff6091e-f412-422d-a5fe-3d8d1a3dd673",
          "name": "Alzarri Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 34,
        "inning": 0,
        "over": 5,
        "ball": 3,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "2ff6091e-f412-422d-a5fe-3d8d1a3dd673",
          "name": "Alzarri Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 35,
        "inning": 0,
        "over": 5,
        "ball": 4,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "2ff6091e-f412-422d-a5fe-3d8d1a3dd673",
          "name": "Alzarri Joseph"
        },
        "runs": 1,
        "extras": 0
      },
      {
        "n": 36,
        "inning": 0,
        "over": 5,
        "ball": 5,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2ff6091e-f412-422d-a5fe-3d8d1a3dd673",
          "name": "Alzarri Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 37,
        "inning": 0,
        "over": 5,
        "ball": 6,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2ff6091e-f412-422d-a5fe-3d8d1a3dd673",
          "name": "Alzarri Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 38,
        "inning": 0,
        "over": 6,
        "ball": 1,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 39,
        "inning": 0,
        "over": 6,
        "ball": 2,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 4,
        "extras": 0
      },
      {
        "n": 40,
        "inning": 0,
        "over": 6,
        "ball": 3,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 41,
        "inning": 0,
        "over": 6,
        "ball": 3,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "penalty": "no ball",
        "extras": 1
      },
      {
        "n": 42,
        "inning": 0,
        "over": 6,
        "ball": 3,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 4,
        "extras": 0
      },
      {
        "n": 43,
        "inning": 0,
        "over": 6,
        "ball": 4,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 44,
        "inning": 0,
        "over": 6,
        "ball": 5,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 45,
        "inning": 0,
        "over": 6,
        "ball": 6,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 46,
        "inning": 0,
        "over": 7,
        "ball": 1,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 6,
        "extras": 0
      },
      {
        "n": 47,
        "inning": 0,
        "over": 7,
        "ball": 2,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 48,
        "inning": 0,
        "over": 7,
        "ball": 3,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 49,
        "inning": 0,
        "over": 7,
        "ball": 4,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 50,
        "inning": 0,
        "over": 7,
        "ball": 5,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 51,
        "inning": 0,
        "over": 7,
        "ball": 6,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 4,
        "extras": 0
      },
      {
        "n": 52,
        "inning": 0,
        "over": 8,
        "ball": 1,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 53,
        "inning": 0,
        "over": 8,
        "ball": 2,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 4,
        "extras": 0
      },
      {
        "n": 54,
        "inning": 0,
        "over": 8,
        "ball": 3,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "penalty": "wide",
        "extras": 1
      },
      {
        "n": 55,
        "inning": 0,
        "over": 8,
        "ball": 3,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 56,
        "inning": 0,
        "over": 8,
        "ball": 4,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 57,
        "inning": 0,
        "over": 8,
        "ball": 5,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 1,
        "extras": 0
      },
      {
        "n": 58,
        "inning": 0,
        "over": 8,
        "ball": 6,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "e2a2bbfb-1798-47a2-a036-e9c099ada5be",
          "name": "Matthew Forde"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 59,
        "inning": 0,
        "over": 9,
        "ball": 1,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 60,
        "inning": 0,
        "over": 9,
        "ball": 2,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 61,
        "inning": 0,
        "over": 9,
        "ball": 3,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 1,
        "extras": 0
      },
      {
        "n": 62,
        "inning": 0,
        "over": 9,
        "ball": 4,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 1,
        "extras": 0
      },
      {
        "n": 63,
        "inning": 0,
        "over": 9,
        "ball": 4,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 1,
        "penalty": "no ball",
        "extras": 1
      },
      {
        "n": 64,
        "inning": 0,
        "over": 9,
        "ball": 4,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 1,
        "extras": 0
      },
      {
        "n": 65,
        "inning": 0,
        "over": 9,
        "ball": 5,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 66,
        "inning": 0,
        "over": 9,
        "ball": 6,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 4,
        "extras": 0
      },
      {
        "n": 67,
        "inning": 0,
        "over": 10,
        "ball": 1,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 68,
        "inning": 0,
        "over": 10,
        "ball": 2,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 69,
        "inning": 0,
        "over": 10,
        "ball": 3,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 0,
        "penalty": "wide",
        "extras": 5
      },
      {
        "n": 70,
        "inning": 0,
        "over": 10,
        "ball": 3,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 71,
        "inning": 0,
        "over": 10,
        "ball": 4,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 72,
        "inning": 0,
        "over": 10,
        "ball": 5,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 4,
        "extras": 0
      },
      {
        "n": 73,
        "inning": 0,
        "over": 10,
        "ball": 6,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 74,
        "inning": 0,
        "over": 11,
        "ball": 1,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 1,
        "extras": 0
      },
      {
        "n": 75,
        "inning": 0,
        "over": 11,
        "ball": 2,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 1,
        "extras": 0
      },
      {
        "n": 76,
        "inning": 0,
        "over": 11,
        "ball": 3,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 1,
        "extras": 0
      },
      {
        "n": 77,
        "inning": 0,
        "over": 11,
        "ball": 4,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 78,
        "inning": 0,
        "over": 11,
        "ball": 5,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 79,
        "inning": 0,
        "over": 11,
        "ball": 6,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 80,
        "inning": 0,
        "over": 12,
        "ball": 1,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 81,
        "inning": 0,
        "over": 12,
        "ball": 2,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 82,
        "inning": 0,
        "over": 12,
        "ball": 3,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 1,
        "extras": 0
      },
      {
        "n": 83,
        "inning": 0,
        "over": 12,
        "ball": 4,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 1,
        "extras": 0
      },
      {
        "n": 84,
        "inning": 0,
        "over": 12,
        "ball": 5,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 1,
        "extras": 0
      },
      {
        "n": 85,
        "inning": 0,
        "over": 12,
        "ball": 6,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 86,
        "inning": 0,
        "over": 13,
        "ball": 1,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 87,
        "inning": 0,
        "over": 13,
        "ball": 2,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 2,
        "extras": 0
      },
      {
        "n": 88,
        "inning": 0,
        "over": 13,
        "ball": 3,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 89,
        "inning": 0,
        "over": 13,
        "ball": 4,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 4,
        "extras": 0
      },
      {
        "n": 90,
        "inning": 0,
        "over": 13,
        "ball": 5,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 91,
        "inning": 0,
        "over": 13,
        "ball": 6,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 0,
        "penalty": "wide",
        "extras": 1
      },
      {
        "n": 92,
        "inning": 0,
        "over": 13,
        "ball": 6,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "2a90b6a9-ac87-49d2-947a-db688f5fcb4c",
          "name": "Shamar Joseph"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 93,
        "inning": 0,
        "over": 14,
        "ball": 1,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 94,
        "inning": 0,
        "over": 14,
        "ball": 2,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 95,
        "inning": 0,
        "over": 14,
        "ball": 3,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 96,
        "inning": 0,
        "over": 14,
        "ball": 4,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 97,
        "inning": 0,
        "over": 14,
        "ball": 5,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 1,
        "extras": 0
      },
      {
        "n": 98,
        "inning": 0,
        "over": 14,
        "ball": 6,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 99,
        "inning": 0,
        "over": 15,
        "ball": 1,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "f540dcd8-bbfc-4c3a-a0c4-1c14c2f51132",
          "name": "Justin Greaves"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 100,
        "inning": 0,
        "over": 15,
        "ball": 2,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "f540dcd8-bbfc-4c3a-a0c4-1c14c2f51132",
          "name": "Justin Greaves"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 101,
        "inning": 0,
        "over": 15,
        "ball": 3,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "f540dcd8-bbfc-4c3a-a0c4-1c14c2f51132",
          "name": "Justin Greaves"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 102,
        "inning": 0,
        "over": 15,
        "ball": 4,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "f540dcd8-bbfc-4c3a-a0c4-1c14c2f51132",
          "name": "Justin Greaves"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 103,
        "inning": 0,
        "over": 15,
        "ball": 5,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "f540dcd8-bbfc-4c3a-a0c4-1c14c2f51132",
          "name": "Justin Greaves"
        },
        "runs": 1,
        "extras": 0
      },
      {
        "n": 104,
        "inning": 0,
        "over": 15,
        "ball": 6,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "f540dcd8-bbfc-4c3a-a0c4-1c14c2f51132",
          "name": "Justin Greaves"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 105,
        "inning": 0,
        "over": 16,
        "ball": 1,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 1,
        "extras": 0
      },
      {
        "n": 106,
        "inning": 0,
        "over": 16,
        "ball": 2,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 1,
        "extras": 0
      },
      {
        "n": 107,
        "inning": 0,
        "over": 16,
        "ball": 3,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 108,
        "inning": 0,
        "over": 16,
        "ball": 4,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 1,
        "extras": 0
      },
      {
        "n": 109,
        "inning": 0,
        "over": 16,
        "ball": 5,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 110,
        "inning": 0,
        "over": 16,
        "ball": 6,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "3b1ea632-ef6d-40f0-9402-e690b28907ca",
          "name": "Gudakesh Motie"
        },
        "runs": 1,
        "extras": 0
      },
      {
        "n": 111,
        "inning": 0,
        "over": 17,
        "ball": 1,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "f540dcd8-bbfc-4c3a-a0c4-1c14c2f51132",
          "name": "Justin Greaves"
        },
        "runs": 0,
        "penalty": "leg byes",
        "extras": 0
      },
      {
        "n": 112,
        "inning": 0,
        "over": 17,
        "ball": 2,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "f540dcd8-bbfc-4c3a-a0c4-1c14c2f51132",
          "name": "Justin Greaves"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 113,
        "inning": 0,
        "over": 17,
        "ball": 3,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "f540dcd8-bbfc-4c3a-a0c4-1c14c2f51132",
          "name": "Justin Greaves"
        },
        "runs": 1,
        "extras": 0
      },
      {
        "n": 114,
        "inning": 0,
        "over": 17,
        "ball": 4,
        "batsman": {
          "id": "f5e3e8bf-f067-4957-b43a-6d8019b4427b",
          "name": "Andrew Balbirnie"
        },
        "bowler": {
          "id": "f540dcd8-bbfc-4c3a-a0c4-1c14c2f51132",
          "name": "Justin Greaves"
        },
        "runs": 1,
        "extras": 0
      },
      {
        "n": 115,
        "inning": 0,
        "over": 17,
        "ball": 5,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "f540dcd8-bbfc-4c3a-a0c4-1c14c2f51132",
          "name": "Justin Greaves"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 116,
        "inning": 0,
        "over": 17,
        "ball": 6,
        "batsman": {
          "id": "5c5d4165-c9bf-408e-a289-10d8be4baeb1",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "f540dcd8-bbfc-4c3a-a0c4-1c14c2f51132",
          "name": "Justin Greaves"
        },
        "runs": 1,
        "extras": 0
      },
      {
        "n": 117,
        "inning": 0,
        "over": 18,
        "ball": 1,
        "batsman": {
          "id": "c:1114",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "c:9793",
          "name": "Gudakesh Motie"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 118,
        "inning": 0,
        "over": 18,
        "ball": 2,
        "batsman": {
          "id": "c:1114",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "c:9793",
          "name": "Gudakesh Motie"
        },
        "runs": 0,
        "extras": 0
      },
      {
        "n": 119,
        "inning": 0,
        "over": 18,
        "ball": 3,
        "batsman": {
          "id": "c:1114",
          "name": "Paul Stirling"
        },
        "bowler": {
          "id": "c:9793",
          "name": "Gudakesh Motie"
        },
        "runs": 0,
        "extras": 0
      }
    ],
    "matchStarted": true,
    "matchEnded": false
  },
  "status": "success",
  "info": {
    "hitsToday": 82,
    "hitsUsed": 1,
    "hitsLimit": 100,
    "credits": 0,
    "server": 5,
    "queryTime": 42.2993,
    "s": 0,
    "cache": 0
  }
}
{
  "apikey": "8de811f2-b4c5-4dbb-b407-5baef328a731",
  "id": "46d2c5d5-524e-4c24-9407-49319e386427"
}
{
  "apikey": "8de811f2-b4c5-4dbb-b407-5baef328a731",
  "id": "7d5a739a-5214-417e-b0b9-f77d55800d23"
}async function fetchLiveMatches() {
  const container = document.getElementById("live-container");
  container.innerHTML = "<p>Loading live matches...</p>";

  try {
    const response = await fetch(`https://api.cricapi.com/v1/currentMatches?apikey=8de811f2-b4c5-4dbb-b407-5baef328a731`);
    const data = await response.json();

    console.log("Live Matches API response:", data); // DEBUG LOG

    if (!data || !data.data || data.data.length === 0) {
      container.innerHTML = "<p>No live matches available right now.</p>";
      return;
    }

    container.innerHTML = "";
    data.data.slice(0, 5).forEach(match => {
      const card = document.createElement("div");
      card.className = "match-card";
      card.innerHTML = `
        <div class="match-title">${match.name}</div>
        <div class="match-info"><strong>Status:</strong> ${match.status}</div>
        <div class="match-info"><strong>Teams:</strong> ${match.teams.join(" vs ")}</div>
        <div class="match-info"><strong>Score:</strong> ${
          match.score && match.score.length > 0
            ? match.score.map(s => `${s.inning}: ${s.r}/${s.w}`).join(" | ")
            : "N/A"
        }</div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = "<p>Error fetching live matches.</p>";
    console.error("Error fetching live matches:", err); // DEBUG LOG
  }
}
fetchLiveMatches();