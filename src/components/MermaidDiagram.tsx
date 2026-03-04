'use client';
import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { useTheme } from './ThemeProvider';

interface MermaidDiagramProps {
    chart: string;
    caption?: string;
}

let diagramIdCounter = 0;

export default function MermaidDiagram({ chart, caption }: MermaidDiagramProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const [svg, setSvg] = useState('');
    const idRef = useRef(`mermaid-${++diagramIdCounter}`);

    useEffect(() => {
        const renderDiagram = async () => {
            mermaid.initialize({
                startOnLoad: false,
                theme: theme === 'dark' ? 'dark' : 'default',
                themeVariables: theme === 'dark' ? {
                    darkMode: true,
                    background: '#111827',
                    primaryColor: '#6366f1',
                    primaryTextColor: '#f1f5f9',
                    primaryBorderColor: '#4f46e5',
                    lineColor: '#64748b',
                    secondaryColor: '#1e293b',
                    tertiaryColor: '#1e293b',
                    fontSize: '14px',
                } : {
                    primaryColor: '#6366f1',
                    primaryTextColor: '#0f172a',
                    primaryBorderColor: '#4f46e5',
                    lineColor: '#94a3b8',
                    secondaryColor: '#f1f5f9',
                    tertiaryColor: '#f1f5f9',
                    fontSize: '14px',
                },
                securityLevel: 'loose',
                fontFamily: 'Inter, sans-serif',
            });

            try {
                const uniqueId = `${idRef.current}-${Date.now()}`;
                const { svg: renderedSvg } = await mermaid.render(uniqueId, chart.trim());
                setSvg(renderedSvg);
            } catch (e) {
                console.error('Mermaid render error:', e);
                setSvg(`<p style="color:red;">Diagram rendering error</p>`);
            }
        };

        renderDiagram();
    }, [chart, theme]);

    return (
        <div className="diagram-container">
            <div ref={containerRef} dangerouslySetInnerHTML={{ __html: svg }} />
            {caption && <div className="diagram-label">{caption}</div>}
        </div>
    );
}
