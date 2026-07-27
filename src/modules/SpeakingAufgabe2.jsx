import React, { useState } from 'react';
import { generateSpeakingImageApi, gradeSpeakingAufgabe2Api } from '../api/gemini';
import { getRandomCachedImage } from '../constants/cachedImages';
import ImageModal from '../components/modals/ImageModal';
import FeedbackModal from '../components/modals/FeedbackModal';
import ErrorModal from '../components/modals/ErrorModal';
import ResultCard from '../components/shared/ResultCard';
import DescriptionSheet from '../components/shared/DescriptionSheet';
import ActionPanel from '../components/shared/ActionPanel';

const NO_API_KEY_MESSAGE = "Diese öffentliche Demo enthält keinen API-Key. Klone das Repository und füge deinen eigenen kostenlosen Gemini-Key in eine lokale .env-Datei ein, um diese Funktion zu nutzen.";
const MAX_TOTAL_SCORE = 15;

const SpeakingAufgabe2 = ({ apiKey, onPhaseChange }) => {
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isGrading, setIsGrading] = useState(false);
    const [score, setScore] = useState(null);
    const [correctedHtml, setCorrectedHtml] = useState(null);
    const [improvedHtml, setImprovedHtml] = useState(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [gradeButtonClicked, setGradeButtonClicked] = useState(false);
    const [showCopyMessage, setShowCopyMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleGenerateImage = async () => {
        if (!apiKey) {
            setErrorMessage(NO_API_KEY_MESSAGE);
            return;
        }
        setIsGenerating(true);
        try {
            const url = await generateSpeakingImageApi(apiKey);
            setImageUrl(url);
        } catch (error) {
            console.error("Error generating image:", error);
            setImageUrl(`https://placehold.co/600x400/ede9fe/4c1d95?text=Fehler+beim+Erstellen+des+Bildes`);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleUseCachedImage = () => {
        const url = getRandomCachedImage();
        if (!url) {
            setErrorMessage("Es sind noch keine vorgeladenen Bilder verfügbar. Nutze zuerst \"Mit KI generieren\".");
            return;
        }
        setImageUrl(url);
    };

    const handleGrade = async () => {
        if (!apiKey) {
            setErrorMessage(NO_API_KEY_MESSAGE);
            return;
        }
        setIsGrading(true);
        setGradeButtonClicked(true);
        try {
            const { scores, correctedHtml, improvedHtml } = await gradeSpeakingAufgabe2Api(description, apiKey);
            setScore(scores);
            setCorrectedHtml(correctedHtml);
            setImprovedHtml(improvedHtml);
        } catch (error) {
            console.error("Error grading text:", error);
            setCorrectedHtml(`<p class="text-red-500">Entschuldigung, bei der Bewertung ist ein Fehler aufgetreten. Bitte setze die Sitzung zurück und versuche es erneut.</p>`);
        } finally {
            setIsGrading(false);
        }
    };

    const handleReset = () => {
        setDescription('');
        setImageUrl(null);
        setScore(null);
        setCorrectedHtml(null);
        setImprovedHtml(null);
        setGradeButtonClicked(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(description);
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
                    <h2 className="text-lg font-bold mb-3">Bild beschreiben</h2>
                    <p className="text-sm text-slate-600 mb-4">Schau dir das Bild an und beschreibe es auf Deutsch: Wer ist zu sehen? Was machen die Personen? Wo findet die Szene statt?</p>
                    <div className="flex-grow flex items-center justify-center bg-slate-50 border-dashed border-2 border-slate-100 rounded-xl p-2">
                        {imageUrl ?
                        <img src={imageUrl} alt="Zu beschreibendes Bild" className="max-h-full max-w-full object-contain rounded-md cursor-pointer" onClick={() => setIsImageModalOpen(true)} /> :
                        <div className="flex flex-col gap-2 items-stretch">
                            <button onClick={handleGenerateImage} disabled={isGenerating} className="px-4 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg shadow-primary-600/20 hover:bg-primary-700 disabled:bg-primary-300"> {isGenerating ? 'Bild wird erstellt...' : 'Mit KI generieren'} </button>
                            <button onClick={handleUseCachedImage} disabled={isGenerating} className="px-4 py-3 bg-primary-100 text-primary-700 rounded-xl font-semibold hover:bg-primary-200 disabled:opacity-50">Vorgeladenes Bild verwenden</button>
                        </div>}
                    </div>
                </div>
                <ActionPanel
                    onReset={handleReset}
                    onGrade={handleGrade}
                    isGrading={isGrading}
                    gradeDisabled={!description.trim() || gradeButtonClicked}
                    hasScore={!!score}
                    onCopy={handleCopy}
                    showCopyMessage={showCopyMessage}
                />
            </div>
            <DescriptionSheet
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                readOnly={!!correctedHtml}
                correctedHtml={correctedHtml}
                improvedHtml={!isPerfectScore ? improvedHtml : null}
                isFocused={isFocused}
            />
            {isImageModalOpen && <ImageModal imageUrl={imageUrl} onClose={() => setIsImageModalOpen(false)} />}
            {isFeedbackModalOpen && <FeedbackModal score={score} onClose={() => setIsFeedbackModalOpen(false)} overallScore={calculateOverallScore()} />}
            {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />}
        </>
    );
};

export default SpeakingAufgabe2;
