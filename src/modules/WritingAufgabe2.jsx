import React, { useState } from 'react';
import { generateWritingAufgabe2TaskApi, gradeWritingAufgabe2Api } from '../api/gemini';
import { getRandomCachedMessage } from '../constants/cachedMessages';
import FeedbackModal from '../components/modals/FeedbackModal';
import ErrorModal from '../components/modals/ErrorModal';
import ResultCard from '../components/shared/ResultCard';
import DescriptionSheet from '../components/shared/DescriptionSheet';
import ActionPanel from '../components/shared/ActionPanel';
import MessagePrompt from '../components/writing/MessagePrompt';

const NO_API_KEY_MESSAGE = "Diese öffentliche Demo enthält keinen API-Key. Klone das Repository und füge deinen eigenen kostenlosen Gemini-Key in eine lokale .env-Datei ein, um diese Funktion zu nutzen.";
const MAX_TOTAL_SCORE = 15;
const TARGET_WORD_COUNT = 30;

const WritingAufgabe2 = ({ apiKey, onPhaseChange }) => {
    const [message, setMessage] = useState(null);
    const [reply, setReply] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isGrading, setIsGrading] = useState(false);
    const [score, setScore] = useState(null);
    const [correctedHtml, setCorrectedHtml] = useState(null);
    const [improvedHtml, setImprovedHtml] = useState(null);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [gradeButtonClicked, setGradeButtonClicked] = useState(false);
    const [showCopyMessage, setShowCopyMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleGenerateMessage = async () => {
        if (!apiKey) {
            setErrorMessage(NO_API_KEY_MESSAGE);
            return;
        }
        setIsGenerating(true);
        try {
            const task = await generateWritingAufgabe2TaskApi(apiKey);
            setMessage(task);
        } catch (error) {
            console.error("Error generating message:", error);
            setErrorMessage("Beim Erstellen der Nachricht ist ein Fehler aufgetreten. Bitte versuche es erneut oder nutze eine vorgeladene Nachricht.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleUseCachedMessage = () => {
        const task = getRandomCachedMessage();
        if (!task) {
            setErrorMessage("Es sind noch keine vorgeladenen Nachrichten verfügbar. Nutze zuerst \"Mit KI generieren\".");
            return;
        }
        setMessage(task);
    };

    const handleGrade = async () => {
        if (!apiKey) {
            setErrorMessage(NO_API_KEY_MESSAGE);
            return;
        }
        setIsGrading(true);
        setGradeButtonClicked(true);
        try {
            const { scores, correctedHtml, improvedHtml } = await gradeWritingAufgabe2Api(reply, message, apiKey);
            setScore(scores);
            setCorrectedHtml(correctedHtml);
            setImprovedHtml(improvedHtml);
        } catch (error) {
            console.error("Error grading reply:", error);
            setCorrectedHtml(`<p class="text-red-500">Entschuldigung, bei der Bewertung ist ein Fehler aufgetreten. Bitte setze die Sitzung zurück und versuche es erneut.</p>`);
        } finally {
            setIsGrading(false);
        }
    };

    const handleReset = () => {
        setMessage(null);
        setReply('');
        setScore(null);
        setCorrectedHtml(null);
        setImprovedHtml(null);
        setGradeButtonClicked(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(reply);
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

    const wordCount = reply.trim() ? reply.trim().split(/\s+/).length : 0;

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
                <div className="bg-white p-5 rounded-2xl border border-slate-100 flex-grow flex flex-col shadow-sm">
                    <h2 className="text-lg font-bold mb-3">Nachricht beantworten</h2>
                    <p className="text-sm text-slate-600 mb-4">Lies die Nachricht und antworte auf Deutsch. Beantworte alle Fragen und schreibe am Ende einen Gruß. Circa 30 Wörter.</p>
                    <div className="flex-grow flex items-center justify-center bg-slate-50 border-dashed border-2 border-slate-100 rounded-xl p-2">
                        <MessagePrompt
                            message={message}
                            isGenerating={isGenerating}
                            onGenerate={handleGenerateMessage}
                            onUseCached={handleUseCachedMessage}
                        />
                    </div>
                </div>
                <ActionPanel
                    onReset={handleReset}
                    onGrade={handleGrade}
                    isGrading={isGrading}
                    gradeDisabled={!reply.trim() || gradeButtonClicked}
                    hasScore={!!score}
                    onCopy={handleCopy}
                    showCopyMessage={showCopyMessage}
                />
            </div>
            <DescriptionSheet
                title="Deine Antwort"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                readOnly={!!correctedHtml}
                correctedHtml={correctedHtml}
                improvedHtml={!isPerfectScore ? improvedHtml : null}
                isFocused={isFocused}
                placeholder="Schreib deine Antwort auf Deutsch..."
                wordCountLabel={`${wordCount} / ${TARGET_WORD_COUNT} Wörter`}
            />
            {isFeedbackModalOpen && <FeedbackModal score={score} onClose={() => setIsFeedbackModalOpen(false)} overallScore={calculateOverallScore()} />}
            {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />}
        </>
    );
};

export default WritingAufgabe2;
