import React from 'react';

const MessagePrompt = ({ message, isGenerating, onGenerate, onUseCached }) => {
    if (!message) {
        return (
            <div className="flex flex-col gap-2 items-stretch">
                <button onClick={onGenerate} disabled={isGenerating} className="px-4 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg shadow-primary-600/20 hover:bg-primary-700 disabled:bg-primary-300">
                    {isGenerating ? 'Nachricht wird erstellt...' : 'Mit KI generieren'}
                </button>
                <button onClick={onUseCached} disabled={isGenerating} className="px-4 py-3 bg-primary-100 text-primary-700 rounded-xl font-semibold hover:bg-primary-200 disabled:opacity-50">
                    Vorgeladene Nachricht verwenden
                </button>
            </div>
        );
    }

    return (
        <div className="w-full bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 text-xs text-slate-500">
                <span className="font-semibold text-slate-600">Von:</span> {message.senderName}
            </div>
            <div className="p-4 text-sm text-slate-700 whitespace-pre-wrap leading-6">
                {message.emailText}
            </div>
        </div>
    );
};

export default MessagePrompt;
