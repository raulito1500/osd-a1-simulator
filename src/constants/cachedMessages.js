// Locally cached Schreiben Aufgabe 2 tasks (short informal emails with 2-3
// embedded questions) used by the "Vorgeladene Nachricht verwenden" button so
// practicing doesn't need a Gemini call for every attempt. Mirrors the shape
// returned by generateWritingAufgabe2TaskApi in src/api/gemini.js.
export const CACHED_MESSAGES = [
    {
        senderName: 'Metin',
        situation: 'In einer Woche ist dein Deutschkurs zu Ende. Dein Kollege Metin schreibt dir.',
        emailText: 'Hallo!\n\nIn einer Woche ist unser Deutschkurs zu Ende. Wir können am letzten Kurstag eine Party mit Picknick im Garten machen. Und vielleicht geben wir unserer Lehrerin ein Geschenk.\n\nWas kannst du zum Essen und Trinken mitbringen? Was geben wir unserer Lehrerin? Was können wir nach dem Essen noch machen?\n\nLiebe Grüße\nMetin',
        questions: ['Was kannst du zum Essen und Trinken mitbringen?', 'Was geben wir unserer Lehrerin?', 'Was können wir nach dem Essen noch machen?'],
    },
    {
        senderName: 'Sara',
        situation: 'Deine Freundin Sara hat bald Geburtstag und plant eine Feier.',
        emailText: 'Hallo!\n\nIch habe nächsten Samstag Geburtstag und mache eine kleine Feier bei mir zu Hause.\n\nHast du am Samstag Zeit? Was möchtest du trinken? Kannst du eine Freundin oder einen Freund mitbringen?\n\nBis bald\nSara',
        questions: ['Hast du am Samstag Zeit?', 'Was möchtest du trinken?', 'Kannst du eine Freundin oder einen Freund mitbringen?'],
    },
    {
        senderName: 'Jonas',
        situation: 'Dein Nachbar Jonas zieht am Wochenende um und braucht Hilfe.',
        emailText: 'Hallo!\n\nAm Samstag ziehe ich in meine neue Wohnung um. Ich habe viele Kisten und brauche Hilfe.\n\nKannst du mir am Samstag helfen? Hast du ein Auto? Was können wir danach zusammen essen?\n\nDanke und Grüße\nJonas',
        questions: ['Kannst du mir am Samstag helfen?', 'Hast du ein Auto?', 'Was können wir danach zusammen essen?'],
    },
    {
        senderName: 'Lena',
        situation: 'Deine Kollegin Lena möchte am Wochenende einen Ausflug machen.',
        emailText: 'Hallo!\n\nAm Wochenende habe ich frei und möchte einen Ausflug machen.\n\nWohin sollen wir fahren? Wann sollen wir starten? Was sollen wir zum Essen mitnehmen?\n\nLiebe Grüße\nLena',
        questions: ['Wohin sollen wir fahren?', 'Wann sollen wir starten?', 'Was sollen wir zum Essen mitnehmen?'],
    },
    {
        senderName: 'Paul',
        situation: 'Dein Kollege Paul ist krank und bittet dich um Hilfe im Kurs.',
        emailText: 'Hallo!\n\nIch bin krank und kann morgen nicht zum Deutschkurs kommen.\n\nWas machen wir morgen im Kurs? Kannst du mir deine Notizen schicken? Wann bist du zu Hause?\n\nDanke!\nPaul',
        questions: ['Was machen wir morgen im Kurs?', 'Kannst du mir deine Notizen schicken?', 'Wann bist du zu Hause?'],
    },
    {
        senderName: 'Nina',
        situation: 'Nina zieht in deine Wohngemeinschaft ein und hat Fragen.',
        emailText: 'Hallo!\n\nIch ziehe nächste Woche in unsere Wohngemeinschaft ein.\n\nWann bist du zu Hause? Was soll ich für die Küche mitbringen? Gibt es Regeln in der Wohnung?\n\nBis bald\nNina',
        questions: ['Wann bist du zu Hause?', 'Was soll ich für die Küche mitbringen?', 'Gibt es Regeln in der Wohnung?'],
    },
    {
        senderName: 'Tom',
        situation: 'Dein Freund Tom möchte euer Treffen verschieben.',
        emailText: 'Hallo!\n\nAm Freitag kann ich leider nicht ins Kino kommen.\n\nHast du am Sonntag Zeit? Welchen Film möchtest du sehen? Wo sollen wir uns treffen?\n\nGrüße\nTom',
        questions: ['Hast du am Sonntag Zeit?', 'Welchen Film möchtest du sehen?', 'Wo sollen wir uns treffen?'],
    },
    {
        senderName: 'Elif',
        situation: 'Deine Freundin Elif plant einen Filmabend bei sich zu Hause.',
        emailText: 'Hallo!\n\nAm Samstag mache ich einen Filmabend bei mir zu Hause.\n\nKannst du kommen? Was möchtest du essen? Welchen Film sollen wir schauen?\n\nLiebe Grüße\nElif',
        questions: ['Kannst du kommen?', 'Was möchtest du essen?', 'Welchen Film sollen wir schauen?'],
    },
    {
        senderName: 'Marco',
        situation: 'Dein Kollege Marco organisiert ein Grillfest im Park.',
        emailText: 'Hallo!\n\nAm Sonntag machen wir ein Grillfest im Park.\n\nHast du Zeit? Was kannst du mitbringen? Kommst du mit dem Auto oder mit dem Bus?\n\nBis dann\nMarco',
        questions: ['Hast du Zeit?', 'Was kannst du mitbringen?', 'Kommst du mit dem Auto oder mit dem Bus?'],
    },
    {
        senderName: 'Anna',
        situation: 'Deine Freundin Anna möchte sich in einem Sportverein anmelden.',
        emailText: 'Hallo!\n\nIch möchte mich in einem Sportverein anmelden.\n\nWelchen Sport machst du gern? Wann hast du Zeit für Sport? Möchtest du mit mir zusammen anfangen?\n\nLiebe Grüße\nAnna',
        questions: ['Welchen Sport machst du gern?', 'Wann hast du Zeit für Sport?', 'Möchtest du mit mir zusammen anfangen?'],
    },
];

export const getRandomCachedMessage = () => {
    if (CACHED_MESSAGES.length === 0) return null;
    return CACHED_MESSAGES[Math.floor(Math.random() * CACHED_MESSAGES.length)];
};
