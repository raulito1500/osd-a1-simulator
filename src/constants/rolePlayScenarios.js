// Locally curated role-play scenarios for Sprechen Aufgabe 3 ("Miteinander
// sprechen"). Written by hand (not AI-generated) so the situation, roles,
// goals, and opening line are always coherent. Each scenario can optionally
// have a cachedImage to avoid a Gemini image-generation call — drop the file
// into public/images/roleplay_cached/ and set the filename here, same
// pattern as src/constants/cachedImages.js.
export const ROLE_PLAY_SCENARIOS = [
    {
        id: 'kleidergeschaeft',
        imagePrompt: "A simple, clean illustration of a saleswoman helping a female customer try on a jacket in a small clothing boutique, no visible text anywhere in the image",
        cachedImage: 'download_1.png',
        situationDe: 'Du bist in einem Kleidergeschäft. Du möchtest ein Kleidungsstück kaufen.',
        partnerRole: 'Verkäuferin',
        userRole: 'Kundin/Kunde',
        goals: [
            'Frage nach einer anderen Größe.',
            'Frage nach dem Preis.',
            'Sag, ob du das Kleidungsstück kaufen möchtest.',
        ],
        openingLine: 'Guten Tag! Kann ich Ihnen helfen?',
    },
    {
        id: 'supermarkt',
        imagePrompt: "A simple, clean illustration of a supermarket employee helping a customer find a product on a shelf, no visible text anywhere in the image",
        cachedImage: null,
        situationDe: 'Du bist in einem Supermarkt und suchst ein Produkt.',
        partnerRole: 'Mitarbeiterin',
        userRole: 'Kundin/Kunde',
        goals: [
            'Frage, wo du das Produkt findest.',
            'Frage, ob es im Angebot ist.',
            'Bedanke dich am Ende.',
        ],
        openingLine: 'Guten Tag, suchen Sie etwas Bestimmtes?',
    },
    {
        id: 'restaurant',
        imagePrompt: "A simple, clean illustration of a waiter taking a food order from a customer at a restaurant table, no visible text anywhere in the image",
        cachedImage: null,
        situationDe: 'Du bist in einem Restaurant und möchtest etwas essen.',
        partnerRole: 'Kellner/in',
        userRole: 'Gast',
        goals: [
            'Bestelle etwas zu essen und zu trinken.',
            'Frage nach einer Empfehlung.',
            'Bitte am Ende um die Rechnung.',
        ],
        openingLine: 'Guten Tag! Was darf ich Ihnen bringen?',
    },
    {
        id: 'werkstatt',
        imagePrompt: "A simple, clean illustration of a mechanic talking to a customer in a garage workshop, no visible text anywhere in the image",
        cachedImage: null,
        situationDe: 'Dein Auto oder Fahrrad ist kaputt. Du bist in der Werkstatt.',
        partnerRole: 'Mechaniker/in',
        userRole: 'Kundin/Kunde',
        goals: [
            'Beschreibe das Problem.',
            'Frage, wie lange die Reparatur dauert.',
            'Frage, was die Reparatur kostet.',
        ],
        openingLine: 'Guten Tag, was kann ich für Sie tun?',
    },
    {
        id: 'apotheke',
        imagePrompt: "A simple, clean illustration of a pharmacist talking to a customer at a pharmacy counter, no visible text anywhere in the image",
        cachedImage: null,
        situationDe: 'Du fühlst dich nicht gut und bist in der Apotheke.',
        partnerRole: 'Apotheker/in',
        userRole: 'Kundin/Kunde',
        goals: [
            'Sag, was dir fehlt.',
            'Frage nach einem passenden Medikament.',
            'Frage, wie oft du es nehmen sollst.',
        ],
        openingLine: 'Guten Tag, wie kann ich Ihnen helfen?',
    },
    {
        id: 'grillfest',
        imagePrompt: "A simple, clean illustration of two friends having a barbecue together in a sunny garden, no visible text anywhere in the image",
        cachedImage: null,
        situationDe: 'Du planst mit einer Freundin/einem Freund ein Grillfest am Wochenende.',
        partnerRole: 'Freund/in',
        userRole: 'Freund/in',
        goals: [
            'Schlage einen Tag und eine Uhrzeit vor.',
            'Frage, was du mitbringen sollst.',
            'Verabschiede dich am Ende.',
        ],
        openingLine: 'Hallo! Sollen wir am Wochenende zusammen grillen?',
    },
    {
        id: 'wanderung',
        imagePrompt: "A simple, clean illustration of two friends hiking together on a forest trail, no visible text anywhere in the image",
        cachedImage: null,
        situationDe: 'Du planst mit einer Freundin/einem Freund eine Wanderung.',
        partnerRole: 'Freund/in',
        userRole: 'Freund/in',
        goals: [
            'Schlage einen Ort für die Wanderung vor.',
            'Vereinbare eine Uhrzeit.',
            'Frage, was ihr mitnehmen sollt.',
        ],
        openingLine: 'Hallo! Hast du Lust, am Samstag zu wandern?',
    },
    {
        id: 'wg',
        imagePrompt: "A simple, clean illustration of two roommates talking in a shared apartment kitchen, no visible text anywhere in the image",
        cachedImage: null,
        situationDe: 'Du wohnst in einer Wohngemeinschaft und brauchst Hilfe von deiner Mitbewohnerin/deinem Mitbewohner.',
        partnerRole: 'Mitbewohner/in',
        userRole: 'Mitbewohner/in',
        goals: [
            'Bitte um Hilfe (z. B. beim Putzen oder Einkaufen).',
            'Schlage einen Tag dafür vor.',
            'Bedanke dich.',
        ],
        openingLine: 'Hallo! Kannst du mir kurz helfen?',
    },
    {
        id: 'umzug',
        imagePrompt: "A simple, clean illustration of a person packing moving boxes while a neighbor offers to help, no visible text anywhere in the image",
        cachedImage: null,
        situationDe: 'Du ziehst um und sprichst mit deiner Nachbarin/deinem Nachbarn.',
        partnerRole: 'Nachbar/in',
        userRole: 'Nachbar/in',
        goals: [
            'Bitte um Hilfe beim Umzug.',
            'Schlage einen Tag und eine Uhrzeit vor.',
            'Sag, was getragen werden muss.',
        ],
        openingLine: 'Hallo! Brauchst du Hilfe beim Umzug?',
    },
    {
        id: 'buero',
        imagePrompt: "A simple, clean illustration of two colleagues talking at a desk in an office, no visible text anywhere in the image",
        cachedImage: null,
        situationDe: 'Du bist im Büro und brauchst Hilfe von einer Kollegin/einem Kollegen.',
        partnerRole: 'Kollege/in',
        userRole: 'Kollege/in',
        goals: [
            'Bitte um Hilfe bei einer Aufgabe.',
            'Schlage einen Termin dafür vor.',
            'Bedanke dich am Ende.',
        ],
        openingLine: 'Hallo! Hast du kurz Zeit?',
    },
];

export const getRandomScenario = () => {
    return ROLE_PLAY_SCENARIOS[Math.floor(Math.random() * ROLE_PLAY_SCENARIOS.length)];
};

export const getRandomScenarioWithCachedImage = () => {
    const withImages = ROLE_PLAY_SCENARIOS.filter(s => s.cachedImage);
    if (withImages.length === 0) return null;
    return withImages[Math.floor(Math.random() * withImages.length)];
};
