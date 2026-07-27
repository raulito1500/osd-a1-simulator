import React from 'react';

const ResultCard = ({ overallScore, onOpenFeedback }) => {
    return (
        <div className="bg-white py-5 rounded-2xl border border-slate-100 flex justify-around items-center text-center shadow-slate-90/4 shadow-sm">
            <div className="w-full hover:cursor-pointer" onClick={onOpenFeedback}>
                <p className="text-xs text-slate-500">Gesamtpunktzahl</p>
                <p className="text-5xl font-bold text-primary-600">{overallScore}</p>
                <p className="text-xs text-slate-400 mt-1">Für Feedback klicken</p>
            </div>
        </div>
    );
};

export default ResultCard;
