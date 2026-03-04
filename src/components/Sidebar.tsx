'use client';
import React, { useState } from 'react';
import { navigation } from '@/data/navigation';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

interface SidebarProps {
    activeSection: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ activeSection, isOpen, onClose }: SidebarProps) {
    const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
        const init: Record<string, boolean> = {};
        navigation.forEach((item) => { init[item.id] = true; });
        return init;
    });

    const toggleExpand = (id: string) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            onClose();
        }
    };

    return (
        <>
            <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <div className="sidebar-logo-icon">SE</div>
                        <span>SE Docs</span>
                    </div>
                </div>
                <nav className="sidebar-nav">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isParentActive =
                            activeSection === item.id ||
                            (item.children?.some((c) => c.id === activeSection) ?? false);

                        return (
                            <div className="sidebar-section" key={item.id}>
                                {item.children ? (
                                    <>
                                        <div
                                            className="sidebar-section-title"
                                            onClick={() => toggleExpand(item.id)}
                                            style={{ cursor: 'pointer', userSelect: 'none' }}
                                        >
                                            <Icon style={{ fontSize: '0.85rem' }} />
                                            <span style={{ flex: 1 }}>{item.label}</span>
                                            {expanded[item.id] ? (
                                                <FiChevronDown style={{ fontSize: '0.75rem' }} />
                                            ) : (
                                                <FiChevronRight style={{ fontSize: '0.75rem' }} />
                                            )}
                                        </div>
                                        {expanded[item.id] &&
                                            item.children.map((child) => (
                                                <a
                                                    key={child.id}
                                                    className={`sidebar-link ${activeSection === child.id ? 'active' : ''}`}
                                                    onClick={() => scrollTo(child.id)}
                                                >
                                                    {child.label}
                                                </a>
                                            ))}
                                    </>
                                ) : (
                                    <a
                                        className={`sidebar-link ${activeSection === item.id ? 'active' : ''}`}
                                        onClick={() => scrollTo(item.id)}
                                        style={{ paddingLeft: '20px' }}
                                    >
                                        <Icon className="sidebar-link-icon" />
                                        {item.label}
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
