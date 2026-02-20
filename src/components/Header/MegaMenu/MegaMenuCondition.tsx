import React from 'react';
import { Link } from 'react-router-dom';
import './MegaMenu.css';

const conditions = [
    {
        group: '🫃 Gut Care',
        items: ['Bloating / Gas / Indigestion', 'Constipation', 'IBS / IBD', 'Colon Cleansing', 'Gut Cleansing'],
    },
    {
        group: '🫀 Liver / Kidney',
        items: ['Liver Support', 'Kidney Care', 'Detox'],
    },
    {
        group: '🔥 Immunity Care',
        items: ['Cough / Cold', 'Respiratory Care', 'Nasal Congestion', 'Pollution Care'],
    },
    {
        group: '❤️ Heart Care',
        items: ['Cholesterol', 'Triglycerides', 'Hypertension', 'Palpitations'],
    },
    {
        group: '💊 Nutrition',
        items: ['Anaemia', 'Plant Proteins', 'Healthy Cooking Medium', 'Healthy Sweeteners'],
    },
    {
        group: '🦴 Joint Care',
        items: ['Arthritis / Joint Pain', 'Muscle Care'],
    },
    {
        group: '⚡ Quick Links',
        items: ["Men's Health", "Women's Health", 'Sleep Care', 'Metabolism Care'],
    },
];

const MegaMenuCondition: React.FC = () => (
    <div className="mega-menu">
        <div className="container mega-inner">
            <div className="mega-grid mega-grid-cond">
                {conditions.map(grp => (
                    <div className="mega-cat" key={grp.group}>
                        <div className="mega-cat-title mega-cat-group">{grp.group}</div>
                        <ul className="mega-sub-list">
                            {grp.items.map(item => (
                                <li key={item}>
                                    <Link to={`/products?condition=${encodeURIComponent(item)}`}>{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default MegaMenuCondition;
