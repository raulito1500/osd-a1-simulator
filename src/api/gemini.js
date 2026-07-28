const IMAGE_PROMPTS = [
    // Kleidergeschäft / Boutique
    "A simple, clean illustration of a saleswoman helping a female customer try on a jacket in a small clothing boutique, no visible text anywhere in the image",
    "A simple, clean illustration of a shop assistant showing a customer a shirt on a clothing rack in a boutique, no visible text anywhere in the image",
    // Supermarkt
    "A simple, clean illustration of a woman picking apples from a fruit stand in a supermarket, no visible text anywhere in the image",
    "A simple, clean illustration of a cashier scanning groceries for a customer at a supermarket checkout counter, no visible text anywhere in the image",
    // Restaurant / Café
    "A simple, clean illustration of a waiter taking a food order from a couple sitting at a café table, no visible text anywhere in the image",
    "A simple, clean illustration of a waitress serving a cup of coffee to a customer at a restaurant table, no visible text anywhere in the image",
    // Werkstatt / Autohaus
    "A simple, clean illustration of a mechanic explaining a car repair to a customer inside a garage workshop, no visible text anywhere in the image",
    "A simple, clean illustration of a car salesman showing a customer a car in a dealership showroom, no visible text anywhere in the image",
    // Apotheke
    "A simple, clean illustration of a pharmacist handing a box of medicine to a customer at a pharmacy counter, no visible text anywhere in the image",
    // Grillfest / Park
    "A simple, clean illustration of a family having a barbecue together in a sunny park, no visible text anywhere in the image",
    "A simple, clean illustration of a group of friends grilling food outdoors in a garden on a sunny afternoon, no visible text anywhere in the image",
    // Sport / Natur
    "A simple, clean illustration of two friends hiking together on a forest trail, no visible text anywhere in the image",
    "A simple, clean illustration of a man and a woman riding bicycles together on a countryside path, no visible text anywhere in the image",
    // Zuhause
    "A simple, clean illustration of a couple cooking dinner together in a home kitchen, no visible text anywhere in the image",
    "A simple, clean illustration of a family eating dinner together at a table at home, no visible text anywhere in the image",
    "A simple, clean illustration of a couple watching television together on a sofa at home, no visible text anywhere in the image",
    // Büro
    "A simple, clean illustration of two colleagues having a short meeting at a desk in an office, no visible text anywhere in the image",
    "A simple, clean illustration of a person working at a computer in a modern office, no visible text anywhere in the image",
    // Umzug
    "A simple, clean illustration of a couple packing moving boxes together in their apartment, no visible text anywhere in the image",
    "A simple, clean illustration of a family carrying moving boxes out of their house into a moving van, no visible text anywhere in the image",
];

export const generateImageApi = async (prompt, apiKey) => {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseModalities: ["IMAGE", "TEXT"] }
        })
    });

    if (!response.ok) {
        const errorBody = await response.text().catch(() => '');
        throw new Error(`API error: ${response.statusText}${errorBody ? ` — ${errorBody}` : ''}`);
    }

    const result = await response.json();
    const imagePart = result?.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (imagePart?.inlineData) {
        return `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
    } else {
        throw new Error("Invalid response structure from image generation API.");
    }
};

export const generateSpeakingImageApi = async (apiKey) => {
    const randomPrompt = IMAGE_PROMPTS[Math.floor(Math.random() * IMAGE_PROMPTS.length)];
    return generateImageApi(randomPrompt, apiKey);
};

export const gradeSpeakingAufgabe2Api = async (text, apiKey) => {
    const systemPrompt = `You are an expert ÖSD (Österreichisches Sprachdiplom Deutsch) examiner grading the A1 Zertifikat Sprechen module, Aufgabe 2 ("Ein Bild beschreiben"). The candidate was shown a picture of an everyday scene and asked to describe it in German: who is in the picture, what they are doing, and where the scene takes place. Evaluate the candidate's written German description at an A1 level and provide your feedback as a single JSON object.
    IMPORTANT: This is a Sprechen (speaking) task. The candidate typed their answer only because this practice tool has no audio input yet — in the real exam this description would be spoken aloud, not written down. Because of that, you must NOT deduct any points for typing/spelling slips that would be imperceptible or irrelevant when spoken, e.g. a doubled or missing consonant like "Superrmarkt" instead of "Supermarkt", a missing capital letter on a noun, a swapped "ss"/"ß", or any similar orthographic slip that doesn't change how the word sounds or what it means. Ignore these completely when assigning every score. Only deduct points for things that would actually be audible/apparent in real speech: wrong word choice, wrong grammar (verb conjugation, word order, articles, cases), missing content, or a genuinely wrong/nonexistent word. Still, in 'correctedHtml' mark and correct spelling slips exactly like any other error (same <del>/<span class='handwritten'> treatment) so the candidate learns correct spelling — just don't let them lower any score.
    Do not include any text, markdown, or comments outside of the JSON object. The JSON object must have the following structure:
    {
      "scores": {
        "Aufgabenerfuellung": { "score": 4, "observation": "Eine Erklärung auf Deutsch, ob die Personen, Objekte, der Ort und die Handlung im Bild genannt wurden. Stärken und Verbesserungsmöglichkeiten erwähnen." },
        "Wortschatz": { "score": 3, "observation": "Eine Erklärung auf Deutsch zur Angemessenheit des Wortschatzes für das Niveau A1. Stärken und Verbesserungsmöglichkeiten erwähnen." },
        "Grammatik": { "score": 3, "observation": "Eine Erklärung auf Deutsch zur Grammatik (Verbkonjugation, Wortstellung, Artikel) für das Niveau A1. Stärken und Verbesserungsmöglichkeiten erwähnen." }
      },
      "correctedHtml": "<string>",
      "improvedHtml": "<string>"
    }
    Each score must be a whole number from 0 to 5. For the 'correctedHtml' string, use the candidate's original text. For each error, wrap the incorrect word/phrase in a <del> tag. Inside this tag, after the incorrect word, insert the German correction inside a <span class='handwritten'> tag. Example: 'Die Frau <del>kauft<span class='handwritten'>kauft ein</span></del> Obst.'
    For the 'improvedHtml' string, rewrite the candidate's description as a model answer that would score a perfect 5/5 on every criterion — but it must stay strictly at CEFR A1 level, the same level the candidate is being examined at. This is NOT a chance to show off B1/B2 German: use only basic A1 vocabulary (everyday, high-frequency words), simple present tense, simple sentence structures, and at most the connectors "und"/"aber"/"oder". Do not introduce subordinate clauses, modal-verb constructions beyond "können/müssen/möchten", advanced adjectives, or any vocabulary a true beginner wouldn't know. The only goal is to complete the A1 task more fully and accurately than the candidate did — e.g. naming a person/object/place the candidate left out, adding one simple adjective (e.g. "groß", "klein", "neu"), or fixing word order — never to raise the proficiency level, since an unrealistically advanced model answer would just discourage an A1 candidate. Wrap every word or phrase that is new or changed compared to the candidate's original text in a <span class='addition'> tag, so it can be highlighted in green as something to add. Do not use <del> or <span class='handwritten'> in this field, only <span class='addition'> around the new/changed parts; leave unchanged words with no wrapping tag at all. Always produce this field, even if the candidate's answer is already strong.
    Ensure the entire output is a valid JSON object starting with { and ending with }.`;

    const userQuery = `The candidate's description of the picture is:\n---\n${text}\n---`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('Grading API request failed.');

    const result = await response.json();
    let responseText = result.candidates[0].content.parts[0].text;

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) responseText = jsonMatch[0];

    return JSON.parse(responseText);
};

export const generateWritingAufgabe2TaskApi = async (apiKey) => {
    const systemPrompt = `You are creating one task for the ÖSD (Österreichisches Sprachdiplom Deutsch) A1 Zertifikat exam, Schreiben module, Aufgabe 2 ("Nachricht/E-Mail beantworten"). Generate a short, informal German email from a friend or colleague about an everyday topic (a party, a birthday, moving house, a weekend trip, being sick and needing help, a new roommate, rescheduling a meetup, a barbecue, a film night, joining a sports club, etc. — pick one at random). The email must contain exactly 3 simple embedded questions that a true A1 beginner could answer in about 30 words total. Return ONLY a single valid JSON object, no markdown, no extra text, with this exact structure:
    {
      "senderName": "<a first name>",
      "situation": "<one sentence in German describing the context, e.g. 'Dein Freund Tom schreibt dir.'>",
      "emailText": "<the full email, starting with 'Hallo!' and ending with a closing like 'Liebe Grüße\\n<senderName>', with the 3 questions naturally embedded in the body>",
      "questions": ["<question 1>", "<question 2>", "<question 3>"]
    }
    Keep the vocabulary and grammar strictly at CEFR A1 level. Ensure the entire output is a valid JSON object starting with { and ending with }.`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: 'Generate one Schreiben Aufgabe 2 task.' }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('Task generation API request failed.');

    const result = await response.json();
    let responseText = result.candidates[0].content.parts[0].text;

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) responseText = jsonMatch[0];

    return JSON.parse(responseText);
};

export const gradeWritingAufgabe2Api = async (reply, message, apiKey) => {
    const systemPrompt = `You are an expert ÖSD (Österreichisches Sprachdiplom Deutsch) examiner grading the A1 Zertifikat Schreiben module, Aufgabe 2 ("Nachricht/E-Mail beantworten"). The candidate received an informal email containing 3 embedded questions and had to reply in German in about 30 words, answering all 3 questions and ending with a closing greeting. Evaluate the candidate's reply and provide your feedback as a single JSON object. Do not include any text, markdown, or comments outside of the JSON object. The JSON object must have the following structure:
    {
      "scores": {
        "Aufgabenerfuellung": { "score": 4, "observation": "Eine Erklärung auf Deutsch, ob alle drei Fragen beantwortet wurden und ob am Ende ein Gruß steht. Stärken und Verbesserungsmöglichkeiten erwähnen." },
        "Wortschatz": { "score": 3, "observation": "Eine Erklärung auf Deutsch zur Angemessenheit des Wortschatzes für das Niveau A1. Stärken und Verbesserungsmöglichkeiten erwähnen." },
        "Grammatik": { "score": 3, "observation": "Eine Erklärung auf Deutsch zur Grammatik (Verbkonjugation, Wortstellung, Artikel) für das Niveau A1. Stärken und Verbesserungsmöglichkeiten erwähnen." }
      },
      "correctedHtml": "<string>",
      "improvedHtml": "<string>"
    }
    Each score must be a whole number from 0 to 5. For the 'correctedHtml' string, use the candidate's original reply. For each error, wrap the incorrect word/phrase in a <del> tag. Inside this tag, after the incorrect word, insert the German correction inside a <span class='handwritten'> tag. Example: 'Ich <del>komme<span class='handwritten'>kann kommen</span></del> gern.'
    For the 'improvedHtml' string, rewrite the candidate's reply as a model answer that would score a perfect 5/5 on every criterion — but it must stay strictly at CEFR A1 level, the same level the candidate is being examined at. This is NOT a chance to show off B1/B2 German: use only basic A1 vocabulary (everyday, high-frequency words), simple present tense, simple sentence structures, and at most the connectors "und"/"aber"/"oder". Do not introduce subordinate clauses, modal-verb constructions beyond "können/müssen/möchten", advanced adjectives, or any vocabulary a true beginner wouldn't know. The only goal is to complete the task more fully and accurately than the candidate did — e.g. answering a question the candidate left out, adding one simple adjective (e.g. "groß", "klein", "neu"), or adding the closing greeting if it's missing — never to raise the proficiency level, since an unrealistically advanced model answer would just discourage an A1 candidate. Wrap every word or phrase that is new or changed compared to the candidate's original reply in a <span class='addition'> tag, so it can be highlighted in green as something to add. Do not use <del> or <span class='handwritten'> in this field, only <span class='addition'> around the new/changed parts; leave unchanged words with no wrapping tag at all. Always produce this field, even if the candidate's answer is already strong.
    Ensure the entire output is a valid JSON object starting with { and ending with }.`;

    const userQuery = `The email the candidate received was:\n---\n${message.emailText}\n---\nThe 3 questions the candidate had to answer were:\n${message.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n---\nThe candidate's reply is:\n---\n${reply}\n---`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('Grading API request failed.');

    const result = await response.json();
    let responseText = result.candidates[0].content.parts[0].text;

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) responseText = jsonMatch[0];

    return JSON.parse(responseText);
};

const formatTranscript = (scenario, messages) => messages
    .map(m => `${m.role === 'partner' ? scenario.partnerRole : 'Kandidat/in'}: ${m.text}`)
    .join('\n');

export const continueRolePlayApi = async (scenario, messages, apiKey) => {
    const systemPrompt = `You are role-playing as "${scenario.partnerRole}" in an ÖSD (Österreichisches Sprachdiplom Deutsch) A1 Zertifikat Sprechen module, Aufgabe 3 ("Miteinander sprechen") practice exercise. Situation: ${scenario.situationDe} The candidate is playing the role of "${scenario.userRole}". Stay fully in character as ${scenario.partnerRole} at all times — never break character, never mention you are an AI, never comment on the candidate's German. Reply naturally to what the candidate just said, in very simple, natural, spoken CEFR A1-level German: short sentences (1-2 sentences), everyday vocabulary, simple present tense. Return ONLY your next line of dialogue as plain text — no quotes, no labels, no markdown, no JSON.`;

    const userQuery = `Conversation so far:\n${formatTranscript(scenario, messages)}\n\nContinue as ${scenario.partnerRole} with your next line only.`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('Role-play API request failed.');

    const result = await response.json();
    return result.candidates[0].content.parts[0].text.trim();
};

export const gradeRolePlayApi = async (scenario, messages, apiKey) => {
    const systemPrompt = `You are an expert ÖSD (Österreichisches Sprachdiplom Deutsch) examiner grading the A1 Zertifikat Sprechen module, Aufgabe 3 ("Miteinander sprechen"). The candidate (role: "${scenario.userRole}") had a spoken role-play conversation in German with a partner (role: "${scenario.partnerRole}"). Situation: ${scenario.situationDe} The candidate was expected to achieve these goals during the conversation: ${scenario.goals.map((g, i) => `${i + 1}. ${g}`).join(' ')} Evaluate only the candidate's own turns (labeled "Kandidat/in" in the transcript) and provide your feedback as a single JSON object.
    IMPORTANT: This is a Sprechen (speaking) task. The candidate typed their turns only because this practice tool has no audio input yet — in the real exam this conversation would be spoken aloud, not written. Because of that, you must NOT deduct any points for typing/spelling slips that would be imperceptible or irrelevant when spoken, e.g. a doubled or missing consonant, a missing capital letter on a noun, a swapped "ss"/"ß", or any similar orthographic slip that doesn't change how the word sounds or what it means. Ignore these completely when assigning every score. Only deduct points for things that would actually be audible/apparent in real speech: wrong word choice, wrong grammar (verb conjugation, word order, articles, cases), missing content, or a genuinely wrong/nonexistent word.
    Do not include any text, markdown, or comments outside of the JSON object. The JSON object must have the following structure:
    {
      "scores": {
        "Aufgabenerfuellung": { "score": 4, "observation": "Eine Erklärung auf Deutsch, ob die genannten Ziele des Gesprächs erreicht wurden. Stärken und Verbesserungsmöglichkeiten erwähnen." },
        "Wortschatz": { "score": 3, "observation": "Eine Erklärung auf Deutsch zur Angemessenheit des Wortschatzes für das Niveau A1. Stärken und Verbesserungsmöglichkeiten erwähnen." },
        "Grammatik": { "score": 3, "observation": "Eine Erklärung auf Deutsch zur Grammatik (Verbkonjugation, Wortstellung, Artikel) für das Niveau A1. Stärken und Verbesserungsmöglichkeiten erwähnen." }
      },
      "correctedHtml": "<string>",
      "improvedHtml": "<string>"
    }
    Each score must be a whole number from 0 to 5. For 'correctedHtml', reproduce the FULL transcript exactly, with each line starting with its speaker label followed by a colon (e.g. "${scenario.partnerRole}: ..." or "Kandidat/in: ..."), one line per turn, separated by newlines. Leave every "${scenario.partnerRole}" line completely untouched. Only inside "Kandidat/in" lines, wrap each error in a <del> tag with the German correction inside a nested <span class='handwritten'> tag, e.g. 'Kandidat/in: Ich <del>möchte kaufen<span class='handwritten'>möchte das kaufen</span></del>.'
    For 'improvedHtml', reproduce the same full labeled transcript again, untouched on the "${scenario.partnerRole}" lines, but rewrite the "Kandidat/in" lines as a model answer that would score a perfect 5/5 on every criterion — strictly at CEFR A1 level (this is NOT a chance to show B1/B2 German: only basic everyday vocabulary, simple present tense, simple sentences, at most "und"/"aber"/"oder", no subordinate clauses, no modal verbs beyond "können/müssen/möchten"). The only goal is completing the stated goals more fully/accurately than the candidate did, never raising the proficiency level. Wrap every new or changed word/phrase inside "Kandidat/in" lines in a <span class='addition'> tag; leave unchanged words with no tag. Always produce this field, even if the candidate's conversation is already strong.
    Ensure the entire output is a valid JSON object starting with { and ending with }.`;

    const userQuery = `Full transcript:\n${formatTranscript(scenario, messages)}`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('Grading API request failed.');

    const result = await response.json();
    let responseText = result.candidates[0].content.parts[0].text;

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) responseText = jsonMatch[0];

    return JSON.parse(responseText);
};
