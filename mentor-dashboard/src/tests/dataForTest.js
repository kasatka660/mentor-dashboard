export const githubsToCheck = [ 'TatsianaKhinevich-EPAM', 
                                'https://github.com/asharapa', 
                                'https://github.com/rolling-scopes-school/zerovers-2018Q3', 
                                'https://github.com/torchik-slava/'];
export const githubsChecked = [ 'TatsianaKhinevich-EPAM', 
                                'asharapa', 
                                'zerovers', 
                                'torchik-slava'];

export const expectedTasksList = [  { id: 'codejamcv', task: 'Code Jam "CV"', status: 'Checked' },
                            { id: 'codejamcorejs',
                              task: 'Code Jam "CoreJS" ',
                              status: 'Checked' },
                            { id: 'codejamdomdomevents',
                              task: 'Code Jam "DOM, DOM Events" ',
                              status: 'Checked' },
                            { id: 'markup1', task: 'Markup #1', status: 'Checking' },
                            { id: 'rsactivist',
                              task: 'RS Activist - ',
                              status: 'In Progress' },
                            { id: 'youtube', task: 'YouTube', status: 'Checking' },
                            { id: 'codejamscoreboard',
                              task: 'CodeJam "Scoreboard"',
                              status: 'Checking' },
                            { id: 'game', task: 'Game', status: 'In Progress' },
                            { id: 'coursework', task: 'Course work', status: 'ToDo' } ];

export const expectedScoreByStudent =  { bmvmarc:
       [ { id: 'markup1', task: 'Markup #1', score: 80 },
         { id: 'codejamcorejs', task: 'Code Jam "CoreJS"', score: 100 },
         { id: 'codejamcv', task: 'Code Jam "CV"', score: 90 },
         { id: 'codejamdomdomevents',
           task: 'Code Jam "DOM, DOM Events"',
           score: 80 },
         { id: 'youtube', task: 'YouTube', score: 70 },
         { id: 'codejamscoreboard',
           task: 'Code Jam "Scoreboard"',
           score: 85 } ],
      serg8:
       [ { id: 'codejamcv', task: 'Code Jam "CV"', score: 96 },
         { id: 'codejamcorejs', task: 'Code Jam "CoreJS"', score: 65 },
         { id: 'markup1', task: 'Markup #1', score: 95 },
         { id: 'presentation', task: 'Presentation', score: 120 },
         { id: 'presentation', task: 'Presentation', score: 120 },
         { id: 'codejamdomdomevents',
           task: 'Code Jam "DOM, DOM Events"',
           score: 92 },
         { id: 'codejamscoreboard',
           task: 'Code Jam "Scoreboard"',
           score: 65 } ],
      'dzmitry-karachun-1987':
       [ { id: 'codejamcv', task: 'Code Jam "CV"', score: 80 },
         { id: 'codejamcorejs', task: 'Code Jam "CoreJS"', score: 85 },
         { id: 'markup1', task: 'Markup #1', score: 90 } ],
      devildummy:
       [ { id: 'codejamcv', task: 'Code Jam "CV"', score: 85 },
         { id: 'codejamcorejs', task: 'Code Jam "CoreJS"', score: 115 },
         { id: 'markup1', task: 'Markup #1', score: 99 },
         { id: 'presentation', task: 'Presentation', score: 120 },
         { id: 'presentation', task: 'Presentation', score: 120 },
         { id: 'codejamdomdomevents', task: 'Code Jam "DOM, DOM Events"', score: 97 },
         { id: "codejamscoreboard", score: 130, task: "Code Jam \"Scoreboard\""}
         ] 
};

export const expectedUniqTasksFromScore =  [{"id": "markup1", "task": "Markup #1"}, {"id": "codejamcorejs", "task": "Code Jam \"CoreJS\""}, {"id": "codejamcv", "task": "Code Jam \"CV\""}, {"id": "codejamdomdomevents", "task": "Code Jam \"DOM, DOM Events\""}, {"id": "youtube", "task": "YouTube"}, {"id": "codejamscoreboard", "task": "Code Jam \"Scoreboard\""}, {"id": "presentation", "task": "Presentation"}]

export const expectedUniqueTasks =  [
        { id: 'codejamcv', task: 'Code Jam "CV"', status: 'Checked' },
        { id: 'codejamcorejs',
          task: 'Code Jam "CoreJS" ',
          status: 'Checked' },
        { id: 'codejamdomdomevents',
          task: 'Code Jam "DOM, DOM Events" ',
          status: 'Checked' },
        { id: 'markup1', task: 'Markup #1', status: 'Checking' },
        { id: 'rsactivist',
          task: 'RS Activist - ',
          status: 'In Progress' },
        { id: 'youtube', task: 'YouTube', status: 'Checking' },
        { id: 'codejamscoreboard',
          task: 'CodeJam "Scoreboard"',
          status: 'Checking' },
        { id: 'game', task: 'Game', status: 'In Progress' },
        { id: 'coursework', task: 'Course work', status: 'ToDo' },
        { id: 'presentation', task: 'Presentation' } ];

export const expectedPairsByTask = {"bmvmarc": "aliaksandrzahorski", "devildummy": "helenegritsuk", "dzmitry-karachun-1987": "helenegritsuk", "serg8": "helenegritsuk"};

export const expectedMentors = Array.from({"aliaksandrzahorski": ["grenbork", "bananovblu", "bmvmarc", "taukitianin", "deepenguin"], "helenegritsuk": ["devildummy", "dzmitry-karachun-1987", "serg8", "nik-av", "kishkun", "tsygancova"]});

export const expectedGroupsByMentor = Array.from({"aliaksandrzahorski": ["grenbork", "bananovblu", "bmvmarc", "taukitianin", "deepenguin"], "helenegritsuk": ["devildummy", "dzmitry-karachun-1987", "serg8", "nik-av", "kishkun", "tsygancova"]});





                                