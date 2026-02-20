import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useConversation } from '@elevenlabs/react';
import { Leaf, Mic, PhoneOff, Volume2, X } from 'lucide-react';
import { maruthompalProducts } from '../data/products';
import ProductCard from '../components/ProductCard/ProductCard';
import AiVoicebotImage from '../assets/AI_voicebot_image.png';
import './MaruthompalPage.css';

const AGENT_ID = 'agent_8001khx0a8vee5z8gcab88e1xhye';

// ── Maruthompal Page ────────────────────────────────────────────────────────
const MaruthompalPage: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const sessionStartedRef = useRef(false);

    // Hoist useConversation to page level so we can pre-warm on hover
    const conversation = useConversation({
        onConnect: () => console.log('ElevenLabs: connected'),
        onDisconnect: () => {
            console.log('ElevenLabs: disconnected');
            sessionStartedRef.current = false;
        },
        onError: (msg) => console.error('ElevenLabs error:', msg),
    });

    const { status, isSpeaking } = conversation;
    const isConnected = status === 'connected';

    /* Pre-warm: start session as soon as the user hovers the image */
    const handleImageHover = useCallback(async () => {
        if (sessionStartedRef.current) return; // don't start twice
        sessionStartedRef.current = true;
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            await conversation.startSession({
                agentId: AGENT_ID,
                connectionType: 'webrtc',
            });
        } catch (err) {
            console.error('Pre-warm failed:', err);
            sessionStartedRef.current = false;
        }
    }, [conversation]);

    /* On click: just open the modal (session is already warming up / connected) */
    const handleImageClick = useCallback(() => {
        setModalOpen(true);
        // If hover didn't fire (e.g. touch device), start now
        if (!sessionStartedRef.current) {
            handleImageHover();
        }
    }, [handleImageHover]);

    /* End session and close modal */
    const handleEnd = useCallback(async () => {
        await conversation.endSession();
        sessionStartedRef.current = false;
        setModalOpen(false);
    }, [conversation]);

    /* Lock body scroll when modal is open */
    useEffect(() => {
        document.body.style.overflow = modalOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [modalOpen]);

    /* Close on Escape */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleEnd(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [handleEnd]);

    /* Clean up session if user leaves the page */
    useEffect(() => {
        return () => { conversation.endSession(); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main className="maruthompal-page">
            {/* Hero Banner */}
            <section className="maruthompal-hero">
                <div className="maruthompal-hero-overlay">
                    <div className="container">
                        <div className="maruthompal-hero-inner">
                            {/* Text content */}
                            <div className="maruthompal-hero-content">
                                <div className="maruthompal-badge">
                                    <Leaf size={16} />
                                    <span>Traditional Herbal Blends</span>
                                </div>
                                <h1 className="maruthompal-title">Maruthompal</h1>
                                <p className="maruthompal-subtitle">
                                    Authentic South Indian herbal idly podis, masalas &amp; teas — crafted from
                                    nature's finest medicinal plants. Every product is a time-honoured recipe
                                    that nourishes both body and soul.
                                </p>
                                <div className="maruthompal-stats">
                                    <div className="stat-item">
                                        <span className="stat-num">27+</span>
                                        <span className="stat-label">Herbal Products</span>
                                    </div>
                                    <div className="stat-divider" />
                                    <div className="stat-item">
                                        <span className="stat-num">100%</span>
                                        <span className="stat-label">Natural</span>
                                    </div>
                                    <div className="stat-divider" />
                                    <div className="stat-item">
                                        <span className="stat-num">0</span>
                                        <span className="stat-label">Preservatives</span>
                                    </div>
                                </div>
                            </div>

                            {/* Clickable AI voicebot image — hover pre-warms the session */}
                            <div
                                className="maruthompal-hero-img-wrap"
                                onMouseEnter={handleImageHover}
                                onClick={handleImageClick}
                                role="button"
                                tabIndex={0}
                                aria-label="Talk to our Voice AI Assistant"
                                onKeyDown={e => e.key === 'Enter' && handleImageClick()}
                            >
                                <div className="ai-img-pulse-ring" />
                                <img
                                    src={AiVoicebotImage}
                                    alt="Voice AI Assistant"
                                    className="maruthompal-hero-img"
                                />
                                <div className="ai-img-hint">
                                    <Mic size={13} />
                                    <span>Click to talk</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Voice AI Modal */}
            {modalOpen && (
                <div
                    className="ai-modal-overlay"
                    onClick={e => { if (e.target === e.currentTarget) handleEnd(); }}
                >
                    <div className="ai-modal">
                        {/* Close */}
                        <button className="ai-modal-close" onClick={handleEnd} aria-label="Close">
                            <X size={20} />
                        </button>

                        {/* Status badge */}
                        <div className={`ai-status-badge ${isConnected ? (isSpeaking ? 'speaking' : 'listening') : 'connecting'}`}>
                            {!isConnected && <span>Connecting…</span>}
                            {isConnected && isSpeaking && (
                                <><Volume2 size={13} /><span>Agent is speaking</span></>
                            )}
                            {isConnected && !isSpeaking && (
                                <><Mic size={13} /><span>Listening to you</span></>
                            )}
                        </div>

                        {/* Enlarged floating image */}
                        <div className="ai-modal-img-wrap">
                            <div className={`ai-modal-pulse ${isConnected && isSpeaking ? 'active' : ''}`} />
                            <img
                                src={AiVoicebotImage}
                                alt="Voice AI Agent"
                                className={`ai-modal-img ${isConnected && isSpeaking ? 'speaking-glow' : ''}`}
                            />
                        </div>

                        {/* Controls */}
                        <div className="ai-modal-controls">
                            <p className="ai-modal-hint">
                                {isConnected
                                    ? 'Speak naturally — ask about any Maruthompal product!'
                                    : 'Connecting to your herbal assistant…'}
                            </p>
                            <button className="ai-end-btn" onClick={handleEnd}>
                                <PhoneOff size={18} />
                                End conversation
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Products Grid */}
            <section className="maruthompal-products-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title-main">Our Herbal Collection</h2>
                        <p className="section-desc">
                            Explore our complete range of traditional South Indian herbal blends,
                            each crafted with care from premium medicinal plants.
                        </p>
                    </div>
                    <div className="maruthompal-grid">
                        {maruthompalProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default MaruthompalPage;
