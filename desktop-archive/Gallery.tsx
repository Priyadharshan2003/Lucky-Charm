import React, { useState, useEffect, useMemo } from 'react';
import { CHARMS, getCharmById } from '@/core';
import { emit } from '@tauri-apps/api/event';
import './Gallery.css';

const Gallery: React.FC = () => {
    const [activeTab, setActiveTab] = useState('gallery');
    const [activeCharm, setActiveCharm] = useState(CHARMS[0].id);
    const [ropeStyle, setRopeStyle] = useState('golden');
    const [charmSize, setCharmSize] = useState(100);
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const storedCharm = localStorage.getItem('ld-active-charm');
        if (storedCharm && getCharmById(storedCharm)) setActiveCharm(storedCharm);
        
        const storedRope = localStorage.getItem('ld-rope-style');
        if (storedRope) setRopeStyle(storedRope);
        
        const storedSize = localStorage.getItem('ld-charm-size');
        if (storedSize) setCharmSize(parseInt(storedSize));

        const storedFavs = localStorage.getItem('ld-favorites');
        if (storedFavs) {
            try {
                setFavorites(JSON.parse(storedFavs));
            } catch (e) {}
        }
    }, []);

    const selectCharm = (id: string) => {
        setActiveCharm(id);
        localStorage.setItem('ld-active-charm', id);
        emit('charm:selected', id).catch(() => {});
    };

    const toggleFavorite = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setFavorites(prev => {
            const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
            localStorage.setItem('ld-favorites', JSON.stringify(next));
            return next;
        });
    };

    const updateRopeStyle = (style: string) => {
        setRopeStyle(style);
        localStorage.setItem('ld-rope-style', style);
        emit('change-rope', style).catch(() => {});
    };

    const updateCharmSize = (size: number) => {
        setCharmSize(size);
        localStorage.setItem('ld-charm-size', size.toString());
        emit('change-size', size).catch(() => {});
    };

    const groupedCollections = useMemo(() => {
        const filtered = CHARMS.filter(c => 
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            c.collection.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const groups: Record<string, typeof CHARMS> = {};
        
        // Always show Favorites first if they exist and match search
        const favs = filtered.filter(c => favorites.includes(c.id));
        if (favs.length > 0) {
            groups['Favorites'] = favs;
        }

        filtered.forEach(charm => {
            if (!groups[charm.collection]) {
                groups[charm.collection] = [];
            }
            groups[charm.collection].push(charm);
        });
        
        return groups;
    }, [searchQuery, favorites]);

    return (
        <div className="gallery-container">
            <div className="title-bar" data-tauri-drag-region>
                <div className="title" data-tauri-drag-region>Lucky Dangle</div>
            </div>
            
            <div className="tabs">
                <div className={`tab ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => setActiveTab('gallery')}>
                    <span className="icon">🏛️</span>
                    Gallery
                </div>
                <div className={`tab ${activeTab === 'general' ? 'active' : ''}`} onClick={() => setActiveTab('general')}>
                    <span className="icon">⚙️</span>
                    Settings
                </div>
                <div className={`tab ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>
                    <span className="icon">ℹ️</span>
                    About
                </div>
            </div>
            
            {activeTab === 'gallery' && (
                <div className="gallery-grid-wrapper">
                    <div className="search-bar-container" style={{ padding: '0 2rem', marginBottom: '1rem' }}>
                        <input 
                            type="text" 
                            placeholder="Search charms (e.g. Spiderman, Protection)..." 
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 20px',
                                borderRadius: '8px',
                                border: '1px solid #333',
                                background: '#1a1a1a',
                                color: '#fff',
                                fontSize: '16px'
                            }}
                        />
                    </div>
                    {Object.entries(groupedCollections).map(([collectionName, charms]) => (
                        <div key={collectionName} className="collection-section">
                            <div className="collection-header">
                                <h2>{collectionName}</h2>
                            </div>
                            <div className="gallery-grid">
                                {charms.map((charm) => (
                                    <div 
                                        key={charm.id} 
                                        className={`charm-card ${activeCharm === charm.id ? 'selected' : ''}`}
                                        onClick={() => selectCharm(charm.id)}
                                        style={{ position: 'relative' }}
                                    >
                                        <div 
                                            onClick={(e) => toggleFavorite(e, charm.id)}
                                            style={{
                                                position: 'absolute',
                                                top: '10px',
                                                right: '10px',
                                                cursor: 'pointer',
                                                fontSize: '20px',
                                                zIndex: 10,
                                                opacity: favorites.includes(charm.id) ? 1 : 0.3
                                            }}
                                        >
                                            ⭐
                                        </div>
                                        <div className="charm-preview" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '140px' }}>
                                            <img src={charm.assetUrl} alt={charm.name} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
                                        </div>
                                        <div className="charm-info">
                                            <h3>{charm.name}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'general' && (
                <div className="settings-wrapper">
                    <h2>Customization</h2>
                    <div className="setting-group">
                        <label>Rope Style</label>
                        <select value={ropeStyle} onChange={(e) => updateRopeStyle(e.target.value)}>
                            <option value="golden">Golden Thread</option>
                            <option value="dark">Dark String</option>
                            <option value="simple">Simple Twine</option>
                        </select>
                    </div>
                    <div className="setting-group">
                        <label>Charm Size: {charmSize}%</label>
                        <input 
                            type="range" 
                            min="50" max="150" 
                            value={charmSize} 
                            onChange={(e) => updateCharmSize(parseInt(e.target.value))} 
                        />
                    </div>
                </div>
            )}
            
            {activeTab === 'about' && (
                <div className="gallery-grid-wrapper">
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>
                        <h2>Lucky Dangle v3</h2>
                        <p>A little luck. A lot of personality.</p>
                        <p>Made for Windows.</p>
                        <div style={{ marginTop: '2rem' }}>
                            <a href="https://buymeacoffee.com/priyadharshan" target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', background: '#FF813F', padding: '10px 20px', borderRadius: '8px', display: 'inline-block', fontWeight: 'bold' }}>
                                ☕ Buy me a coffee
                            </a>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="bottom-bar">
                <span>A charm from your tradition missing?</span>
                <a href="#">Suggest a dangle</a>
            </div>
        </div>
    );
};

export default Gallery;
