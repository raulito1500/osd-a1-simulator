import React, { useEffect, useRef } from 'react';

const RolePlayChat = ({ messages, userInput, onInputChange, onSend, isPartnerTyping, disabled, partnerRole }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isPartnerTyping]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !disabled && userInput.trim()) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="w-[62%] flex-grow flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-100">
                <span className="font-semibold text-sm text-slate-700">Gespräch mit {partnerRole}</span>
            </div>
            <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto flex flex-col gap-3">
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                            m.role === 'partner'
                                ? 'self-start bg-slate-100 text-slate-700'
                                : 'self-end bg-primary-600 text-white'
                        }`}
                    >
                        {m.text}
                    </div>
                ))}
                {isPartnerTyping && (
                    <div className="self-start bg-slate-100 text-slate-500 px-4 py-2 rounded-2xl text-sm italic">
                        {partnerRole} tippt...
                    </div>
                )}
            </div>
            <div className="border-t border-slate-100 p-3 flex gap-2">
                <input
                    value={userInput}
                    onChange={(e) => onInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    placeholder={disabled ? 'Genug gesprochen — klicke auf Bewerten.' : 'Schreib deine Antwort auf Deutsch...'}
                    className="flex-grow px-4 py-2 rounded-xl border border-slate-200 outline-none focus:border-primary-400 disabled:bg-slate-50 disabled:text-slate-400"
                />
                <button
                    onClick={onSend}
                    disabled={disabled || !userInput.trim()}
                    className="px-4 py-2 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 disabled:bg-slate-200 disabled:text-slate-400"
                >
                    Senden
                </button>
            </div>
        </div>
    );
};

export default RolePlayChat;
