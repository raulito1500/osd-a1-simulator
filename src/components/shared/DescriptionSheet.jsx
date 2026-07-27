import React from 'react';

const DescriptionSheet = ({ value, onChange, onFocus, onBlur, readOnly, correctedHtml, improvedHtml, isFocused, placeholder = 'Schreib deine Beschreibung auf Deutsch...', title = 'Deine Beschreibung', wordCountLabel }) => {
    return (
        <div className={`w-[62%] flex-grow flex flex-col rounded-2xl overflow-hidden bg-paper border shadow-sm transition-colors duration-200 ${isFocused ? 'border-primary-400 ring-2 ring-primary-100' : 'border-paper-edge'}`}>
            <div className="flex items-center gap-2 px-6 py-3 border-b border-paper-edge">
                <span className="font-semibold text-sm text-paper-text">{title}</span>
                <span className="ml-auto font-roboto-mono text-xs font-semibold text-paper-text/70">
                    {correctedHtml ? 'Korrigiert' : (wordCountLabel || '')}
                </span>
            </div>
            <div
                className="flex-grow p-8 leading-9 font-roboto-mono text-paper-text text-[15.5px] overflow-y-auto bg-[repeating-linear-gradient(#fffbf0_0px,#fffbf0_35px,#efe9da_35px,#efe9da_36px)] bg-local"
            >
                {correctedHtml ? (
                    <div className="graded-essay whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: correctedHtml }} />
                ) : (
                    <textarea
                        value={value}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        readOnly={readOnly}
                        className="w-full h-full bg-transparent border-none outline-none resize-none leading-9"
                        placeholder={placeholder}
                    />
                )}
                {improvedHtml && (
                    <div className="mt-8 pt-6 border-t border-dashed border-paper-edge">
                        <p className="font-roboto-mono text-xs font-semibold text-paper-text/70 mb-3">Idealversion (volle Punktzahl)</p>
                        <div className="graded-essay whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: improvedHtml }} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DescriptionSheet;
