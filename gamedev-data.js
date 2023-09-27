// Define an array of projects as JSON objects
const projectsData = [
    {
        title: "Intro to Game Development Workshops",
        subtitle: "UBC Design League club",
        date: "Aug 2023 - PRESENT",
        images: ["UDL_0"],
        description: "As head of the game dev program for the UBC Design League club, I teach public workshops on game development. Topics include: game design, programming, art, and sound design.",
        skills: ["Unity", "C#", "Game design", "Education"],
        links_text: [],
        links: [],
        
    },
    {
        title: "Unannounced Game for Aamjiwnaang First Nation",
        subtitle: "Lambton College in partnership with Aamjiwnaang First Nation",
        date: "May 2023 - PRESENT",
        images: ["Lambton_0", "Lambton_1"],
        description: "Educational game for Aamjiwnaang First Nation to teac the history of the community and the importance of the land. Built in Unreal Engine 5. Personal responsibilities include: player character movement, NPCs, dialogue systems, and dialogue UI.",
        skills: ["Unreal Engine 5", "C++", "Blueprints", "MetaHuman creator", "Agile Development", "Scrum", "Jira", "Confluence", "Git"],
        links_text: [],
        links: [],
        
    },
    {
        title: "Gone Fishing",
        subtitle: "UBC Designathon Game Jam 2023",
        date: "Feb 2023",
        images: ["Fishing_0"],
        description: "30 hour game jam. Won first place! Theme: \"Exploring in Unity\". Built in Unity. Team lead and programmer for a team of 3.",
        skills: ["Unity", "C#", "Game Jam", "GitHub", ],
        links_text: ["Try it out on Itch.io!", "See project files on GitHub"],
        links: ["https://wiltonfs.itch.io/gone-fishing", "https://github.com/wiltonfs/UBC-DESIGNATHON-2023-Game-Jam"],
        
    },
    {
        title: "Twenty Flappy Eight",
        subtitle: "Personal project",
        date: "Feb 2023",
        images: ["TwentyFlappy_0", "TwentyFlappy_1", "TwentyFlappy_2"],
        description: "Combines the frantic arcade gameplay of Flappy Bird with the strategic number matching of 2048.",
        skills: ["Unity", "C#"],
        links_text: ["Try it out on Itch.io!", "See project files on GitHub"],
        links: ["http://wiltonfs.itch.io/twentyflappyeight", "http://github.com/wiltonfs/TwentyFlappyEight"],
        
    },
    {
        title: "Economic Schools of Thought",
        subtitle: "Final project for AP Macroeconomics",
        date: "Feb 2019",
        images: ["Economics_0", "Economics_1", "Economics_2"],
        description: "Fast paced arcade game built in Scratch that teaches the player about different schools of economic thought.",
        skills: ["Scratch", "Character balancing", "Educational game design"],
        links_text: ["Try it out on Scratch!"],
        links: ["https://scratch.mit.edu/projects/287915728/"], 
    },
    {
        title: "Text Adventure Template",
        subtitle: "Personal project",
        date: "Aug 2018",
        images: ["TextAdventure_0", "TextAdventure_1", "TextAdventure_2"],
        description: "Simple, node based text adventure template built in Unity. Template includes demo game. Supports save files, inventory, choices, and audio",
        skills: ["Unity", "C#"],
        links_text: ["Try it out on Itch.io!", "See project files on GitHub"],
        links: ["https://wiltonfs.itch.io/text-adventure-engine", "http://github.com/wiltonfs/TextAdventureTemplate-Unity"],
        
    },
    {
        title: "Civil War Spy",
        subtitle: "Final project for middle school history class",
        date: "May 2016",
        images: ["CivilWarSpy_0", "CivilWarSpy_1", "CivilWarSpy_2"],
        description: "Historical stealth game built in Scratch that teaches the player about espionage in the American Civil War.",
        skills: ["Scratch", "Educational game design", "Historical research", "Stealth game design"],
        links_text: ["Try it out on Scratch!"],
        links: ["https://scratch.mit.edu/projects/107238287/"], 
    },
    {
        title: "Turkey Hunt",
        subtitle: "Final project for middle school technology class",
        date: "Feb 2016",
        images: ["TurkeyHunter_0", "TurkeyHunter_1"],
        description: "Side-scrolling hunting game built in Scratch. Enviroment uses (low resolution) panoramic photos of my backyard.",
        skills: ["Scratch"],
        links_text: ["Try it out on Scratch!"],
        links: ["https://scratch.mit.edu/projects/96555151/"], 
    },
    {
        title: "Figure 8",
        subtitle: "Personal project",
        date: "Jan 2016",
        images: ["Figure8_0", "Figure8_1"],
        description: "Fast-paced arcade game, avoid crashing into the orbiting balls. Built in Scratch. Includes a global high score system for signed in users.",
        skills: ["Scratch", "High score system"],
        links_text: ["Try it out on Scratch!"],
        links: ["https://scratch.mit.edu/projects/92603656/"], 
    },
    
];
