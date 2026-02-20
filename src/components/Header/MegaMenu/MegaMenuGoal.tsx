import React from 'react';
import { Link } from 'react-router-dom';
import './MegaMenu.css';

const goals = [
    { icon: '⚡', label: 'Energy & Stamina', goal: 'Energy', color: '#ff6b35' },
    { icon: '🧘', label: 'Calm & Stress Relief', goal: 'Calm', color: '#7b68ee' },
    { icon: '🫃', label: 'Digestion & Gut', goal: 'Digestion', color: '#2e7d32' },
    { icon: '🛡️', label: 'Immunity Boost', goal: 'Immunity', color: '#e65100' },
    { icon: '🚿', label: 'Detox & Cleanse', goal: 'Detox', color: '#00838f' },
    { icon: '💪', label: 'Gym & Fitness', goal: 'Fitness', color: '#1565c0' },
    { icon: '😴', label: 'Sleep Support', goal: 'Sleep', color: '#4a148c' },
    { icon: '⚖️', label: 'Weight Management', goal: 'Weight', color: '#bf360c' },
    { icon: '🌟', label: 'Overall Wellness', goal: 'Wellness', color: '#558b2f' },
];

const MegaMenuGoal: React.FC = () => (
    <div className="mega-menu">
        <div className="container mega-inner">
            <div className="goals-grid">
                {goals.map(g => (
                    <Link key={g.goal} to={`/products?goal=${encodeURIComponent(g.goal)}`} className="goal-tile">
                        <div className="goal-icon" style={{ background: `${g.color}18`, color: g.color }}>
                            {g.icon}
                        </div>
                        <span className="goal-label">{g.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    </div>
);

export default MegaMenuGoal;
