import React, { useState } from 'react';
import { generateImageApi, continueRolePlayApi, gradeRolePlayApi } from '../api/gemini';
import { getRandomScenario, getRandomScenarioWithCachedImage } from '../constants/rolePlayScenarios';
import ImageModal from '../components/modals/ImageModal';
import FeedbackModal from '../components/modals/FeedbackModal';
import ErrorModal from '../components/modals/ErrorModal';
import ResultCard from '../components/shared/ResultCard';
import DescriptionSheet from '../components/shared/DescriptionSheet';
import ActionPanel from '../components/shared/ActionPanel';
import RolePlayChat from '../components/speaking/RolePlayChat';

const NO_API_KEY_MESSAGE = "Diese öffentliche Demo enthält keinen API-Key. Klone das Repository und füge deinen eigenen kostenlosen Gemini-Key in eine lokale .env-Datei ein, um diese Funktion zu nutzen.";
const MAX_TOTAL_SCORE = 15;
const MAX_USER_TURNS = 6;

const SpeakingAufgabe3 = ({ apiKey, onPhaseChange }) => {
    const [scenario, setScenario] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isPartnerTyping, setIsPartnerTyping] = useState(false);
    const [isGrading, setIsGrading] = useState(false);
    const [score, setScore] = useState(null);
    const [correctedHtml, setCorrectedHtml] = useState(null);
    const [improvedHtml, setImprovedHtml] = useState(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [gradeButtonClicked, setGradeButtonClicked] = useState(false);
    const [showCopyMessage, setShowCopyMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const userTurnCount = messages.filter(m => m.role === 'user').length;

    const handleGenerateScenario = async () => {
        if (!apiKey) {
            setErrorMessage(NO_API_KEY_MESSAGE);
            return;
        }
        const picked = getRandomScenario();
        setIsGenerating(true);
        try {
            const url = await generateImageApi(picked.imagePrompt, apiKey);
            setImageUrl(url);
        } catch (error) {
            console.error("Error generating image:", error);
            setImageUrl(`https://placehold.co/600x400/ede9fe/4c1d95?text=Fehler+beim+Erstellen+des+Bildes`);
        } finally {
            setIsGenerating(false);
        }
        setScenario(picked);
        setMessages([{ role: 'partner', text: picked.openingLine }]);
    };

    const handleUseCachedScenario = () => {
        const picked = getRandomScenarioWithCachedImage();
        if (!picked) {
            setErrorMessage("Es sind noch keine vorgeladenen Rollenspiele verfügbar. Nutze zuerst \"Mit KI generieren\".");
            return;
        }
        setScenario(picked);
        setImageUrl(`${process.env.PUBLIC_URL}/images/roleplay_cached/${picked.cachedImage}`);
        setMessages([{ role: 'partner', text: picked.openingLine }]);
    };

    const handleSend = async () => {
        if (!apiKey) {
            setErrorMessage(NO_API_KEY_MESSAGE);
            return;
        }
        const text = userInput.trim();
        if (!text || isPartnerTyping) return;

        const updatedMessages = [...messages, { role: 'user', text }];
        setMessages(updatedMessages);
        setUserInput('');
        setIsPartnerTyping(true);
        try {
            const reply = await continueRolePlayApi(scenario, updatedMessages, apiKey);
            setMessages([...updatedMessages, { role: 'partner', text: reply }]);
        } catch (error) {
            console.error("Error continuing role-play:", error);
            setErrorMessage("Bei der Antwort deines Gesprächspartners ist ein Fehler aufgetreten. Versuche es noch einmal.");
        } finally {
            setIsPartnerTyping(false);
        }
    };

    const handleGrade = async () => {
        if (!apiKey) {
            setErrorMessage(NO_API_KEY_MESSAGE);
            return;
        }
        setIsGrading(true);
        setGradeButtonClicked(true);
        try {
            const { scores, correctedHtml, improvedHtml } = await gradeRolePlayApi(scenario, messages, apiKey);
            setScore(scores);
            setCorrectedHtml(correctedHtml);
            setImprovedHtml(improvedHtml);
        } catch (error) {
            console.error("Error grading role-play:", error);
            setCorrectedHtml(`<p class="text-red-500">Entschuldigung, bei der Bewertung ist ein Fehler aufgetreten. Bitte setze die Sitzung zurück und versuche es erneut.</p>`);
        } finally {
            setIsGrading(false);
        }
    };

    const handleReset = () => {
        setScenario(null);
        setImageUrl(null);
        setMessages([]);
        setUserInput('');
        setScore(null);
        setCorrectedHtml(null);
        setImprovedHtml(null);
        setGradeButtonClicked(false);
    };

    const transcriptText = () => messages
        .map(m => `${m.role === 'partner' ? scenario?.partnerRole : 'Du'}: ${m.text}`)
        .join('\n');

    const handleCopy = () => {
        navigator.clipboard.writeText(transcriptText());
        setShowCopyMessage(true);
        setTimeout(() => setShowCopyMessage(false), 2000);
    };

    const getTotalScore = () => {
        if (!score) return 0;
        return Object.values(score).reduce((sum, item) => sum + item.score, 0);
    };

    const calculateOverallScore = () => {
        if (!score) return 'N/A';
        return `${getTotalScore()} / ${MAX_TOTAL_SCORE}`;
    };

    const isPerfectScore = !!score && getTotalScore() >= MAX_TOTAL_SCORE;
    const chatDisabled = !scenario || gradeButtonClicked || userTurnCount >= MAX_USER_TURNS;

    const phase = score ? 'graded' : 'idle';

    React.useEffect(() => {
        onPhaseChange?.(phase);
    }, [phase, onPhaseChange]);

    return (
        <>
            <div className="w-[30%] min-w-[350px] flex flex-col gap-5">
                {score && (
                    <ResultCard
                        overallScore={calculateOverallScore()}
                        onOpenFeedback={() => setIsFeedbackModalOpen(true)}
                    />
                )}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 flex-grow flex flex-col shadow-sm overflow-y-auto">
                    <h2 className="text-lg font-bold mb-3">Miteinander sprechen</h2>
                    <p className="text-sm text-slate-600 mb-4">Du bist in einer Alltagssituation. Sprich mit deinem Gesprächspartner auf Deutsch.</p>
                    <div className="flex items-center justify-center bg-slate-50 border-dashed border-2 border-slate-100 rounded-xl p-2 mb-4" style={{ minHeight: '180px' }}>
                        {imageUrl ?
                        <img src={imageUrl} alt="Rollenspiel-Situation" className="max-h-full max-w-full object-contain rounded-md cursor-pointer" onClick={() => setIsImageModalOpen(true)} /> :
                        <div className="flex flex-col gap-2 items-stretch w-full">
                            <button onClick={handleGenerateScenario} disabled={isGenerating} className="px-4 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg shadow-primary-600/20 hover:bg-primary-700 disabled:bg-primary-300"> {isGenerating ? 'Situation wird erstellt...' : 'Mit KI generieren'} </button>
                            <button onClick={handleUseCachedScenario} disabled={isGenerating} className="px-4 py-3 bg-primary-100 text-primary-700 rounded-xl font-semibold hover:bg-primary-200 disabled:opacity-50">Vorgeladenes Bild verwenden</button>
                        </div>}
                    </div>
                    {scenario && (
                        <div className="text-sm text-slate-600 space-y-2">
                            <p><span className="font-semibold text-slate-800">Deine Rolle:</span> {scenario.userRole}</p>
                            <p><span className="font-semibold text-slate-800">Gesprächspartner:</span> {scenario.partnerRole}</p>
                            <div>
                                <span className="font-semibold text-slate-800">Deine Ziele:</span>
                                <ul className="list-disc list-inside mt-1 space-y-1">
                                    {scenario.goals.map((goal, i) => <li key={i}>{goal}</li>)}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                <ActionPanel
                    onReset={handleReset}
                    onGrade={handleGrade}
                    isGrading={isGrading}
                    gradeDisabled={userTurnCount === 0 || gradeButtonClicked}
                    hasScore={!!score}
                    onCopy={handleCopy}
                    showCopyMessage={showCopyMessage}
                />
            </div>
            {correctedHtml ? (
                <DescriptionSheet
                    title="Das Gespräch"
                    value={transcriptText()}
                    readOnly
                    correctedHtml={correctedHtml}
                    improvedHtml={!isPerfectScore ? improvedHtml : null}
                />
            ) : scenario ? (
                <RolePlayChat
                    messages={messages}
                    userInput={userInput}
                    onInputChange={setUserInput}
                    onSend={handleSend}
                    isPartnerTyping={isPartnerTyping}
                    disabled={chatDisabled}
                    partnerRole={scenario.partnerRole}
                />
            ) : (
                <div className="w-[62%] flex-grow flex items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm">
                    <p className="text-slate-400 text-sm">Wähle links ein Bild aus, um das Gespräch zu starten.</p>
                </div>
            )}
            {isImageModalOpen && <ImageModal imageUrl={imageUrl} onClose={() => setIsImageModalOpen(false)} />}
            {isFeedbackModalOpen && <FeedbackModal score={score} onClose={() => setIsFeedbackModalOpen(false)} overallScore={calculateOverallScore()} />}
            {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />}
        </>
    );
};

export default SpeakingAufgabe3;
