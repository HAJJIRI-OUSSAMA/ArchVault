'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiSun, FiMoon, FiMenu } from 'react-icons/fi';
import { useTheme } from './ThemeProvider';
import { searchContent, SearchEntry } from '@/data/searchIndex';

interface NavbarProps {
    onMenuToggle: () => void;
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
    const { theme, toggleTheme } = useTheme();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchEntry[]>([]);
    const [showResults, setShowResults] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleSearch = (value: string) => {
        setQuery(value);
        const res = searchContent(value);
        setResults(res);
        setShowResults(res.length > 0);
    };

    const handleSelect = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setShowResults(false);
        setQuery('');
    };

    return (
        <header className="navbar">
            <div className="navbar-left">
                <button className="menu-toggle" onClick={onMenuToggle} aria-label="Toggle menu">
                    <FiMenu />
                </button>
                <div className="navbar-breadcrumb">
                    Software Engineering <span>· Complete Reference</span>
                </div>
            </div>
            <div className="navbar-right">
                <div className="search-container" ref={containerRef}>
                    <FiSearch className="search-icon" />
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Search topics..."
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        onFocus={() => results.length > 0 && setShowResults(true)}
                    />
                    {showResults && (
                        <div className="search-results">
                            {results.map((r) => (
                                <div key={r.id} className="search-result-item" onClick={() => handleSelect(r.id)}>
                                    <h4>{r.title}</h4>
                                    <p>{r.section} · {r.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                    {theme === 'dark' ? <FiSun /> : <FiMoon />}
                </button>
            </div>
        </header>
    );
}
