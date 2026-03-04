'use client';
import React, { useState } from 'react';

interface CodeBlockProps {
    code: string;
    language?: string;
}

export default function CodeBlock({ code, language = 'typescript' }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="code-block-wrapper">
            <div className="code-block-header">
                <span className="code-block-lang">{language}</span>
                <button className="code-block-copy" onClick={handleCopy}>
                    {copied ? '✓ Copied' : 'Copy'}
                </button>
            </div>
            <pre className="code-block">
                <code>{code}</code>
            </pre>
        </div>
    );
}
