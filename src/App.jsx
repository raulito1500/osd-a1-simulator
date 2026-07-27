import React, { useState, useEffect } from 'react';
import PlaceholderPage from './components/PlaceholderPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SpeakingAufgabe2 from './modules/SpeakingAufgabe2';
import WritingAufgabe2 from './modules/WritingAufgabe2';

// Read from a local .env file (REACT_APP_GEMINI_API_KEY=...), never committed.
// Get your free key from Google AI Studio: https://aistudio.google.com/app/apikey
// The public GitHub Pages build intentionally ships without this key — CRA bakes
// REACT_APP_* vars into the public JS bundle, so a real key would be extractable
// by anyone visiting the live demo. AI features are local-only by design.
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

export default function App() {
    const [activeView, setActiveView] = useState({ main: 'Sprechen', sub: 'Aufgabe 2' });
    const [modulePhase, setModulePhase] = useState('idle');

    const isModuleRoute = (activeView.main === 'Sprechen' && activeView.sub === 'Aufgabe 2') ||
        (activeView.main === 'Schreiben' && activeView.sub === 'Aufgabe 2');

    useEffect(() => {
        setModulePhase('idle');
    }, [activeView.main, activeView.sub]);

    const renderActiveView = () => {
        if (activeView.main === 'Sprechen' && activeView.sub === 'Aufgabe 2') {
            return <SpeakingAufgabe2 apiKey={GEMINI_API_KEY} onPhaseChange={setModulePhase} />;
        }
        if (activeView.main === 'Schreiben' && activeView.sub === 'Aufgabe 2') {
            return <WritingAufgabe2 apiKey={GEMINI_API_KEY} onPhaseChange={setModulePhase} />;
        }

        return <PlaceholderPage title={`${activeView.main} ${activeView.sub}`} />;
    };

    return (
        <div className="flex h-screen bg-slate-50 text-gray-800">
            <Sidebar activeView={activeView} setActiveView={setActiveView} />

            <main className="w-full flex flex-col overflow-y-auto bg-slate-50">
                <Header
                    main={activeView.main}
                    sub={activeView.sub}
                    phase={isModuleRoute ? modulePhase : null}
                />
                <div className="flex-1 min-h-0 flex gap-6 p-6">
                    {renderActiveView()}
                </div>
            </main>
        </div>
    );
}
