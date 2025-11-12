
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

// --- ICONS (SVG Components) ---
const HeartHandIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const KeyIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
  </svg>
);

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.553L16.5 21.75l-.398-1.197a3.375 3.375 0 00-2.456-2.456L12.75 18l1.197-.398a3.375 3.375 0 002.456-2.456L16.5 14.25l.398 1.197a3.375 3.375 0 002.456 2.456L20.25 18l-1.197.398a3.375 3.375 0 00-2.456 2.456z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.74.44 3.37 1.23 4.78L2 22l5.33-1.38c1.37.71 2.93 1.11 4.58 1.11h.01c5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.82-9.91-9.82zM17.2 15.25c-.21 0-.46-.07-.72-.18-.54-.22-1.04-.54-1.2-.72-.15-.17-.28-.36-.42-.53-.13-.17-.28-.34-.42-.51s-.29-.34-.44-.51c-.15-.17-.31-.34-.46-.51-.15-.17-.32-.34-.48-.51s-.32-.34-.49-.51c-.17-.17-.35-.34-.52-.51l-.14-.14s-.14-.14-.28-.28c-.14-.14-.28-.28-.42-.42s-.28-.28-.42-.42-.28-.28-.42-.42l-.14-.14c-.14-.14-.28-.28-.42-.42s-.28-.28-.42-.42-.28-.28-.42-.42c-.28-.28-.56-.56-.84-.84s-.56-.56-.84-.84l-.28-.28c-.28-.28-.56-.56-.84-.84s-.56-.56-.84-.84l-.28-.28c-1.12-1.12-2.24-2.24-3.36-3.36C3.06 6.37 4.1 5.25 4.1 5.25s1.12 1.12 1.12 1.12l.28.28.28.28.28.28.28.28.28.28.28.28.28.28.28.28.28.28.28.28.28.28.28.28c.14.14.28.28.42.42s.28.28.42.42.28.28.42.42.28.28.42.42l.14.14s.14.14.28.28c.14.14.28.28.42.42s.28.28.42.42.28.28.42.42l.14.14c.14.14.28.28.42.42s.28.28.42.42.28.28.42.42c.15.15.29.3.44.44s.29.3.44.44l.14.14c.15.15.29.3.44.44s.29.3.44.44l.14.14c.28.28.56.56.84.84s.56.56.84.84l.28.28c.28.28.56.56.84.84s.56.56.84.84l.28.28c.09.09.18.18.27.27s.18.18.27.27l.14.14c.09.09.18.18.27.27s.18.18.27.27l.14.14c.09.09.18.18.27.27s.18.18.27.27l.14.14c.09.09.18.18.27.27s.18.18.27.27l.14.14c.28.28.56.56.84.84s.56.56.84.84l.28.28c.28.28.56.56.84.84s.56.56.84.84l.28.28c.09.09.18.18.27.27s.18.18.27.27l.14.14c.09.09.18.18.27.27s.18.18.27.27l.14.14c.09.09.18.18.27.27s.18.18.27.27l.14.14c.09.09.18.18.27.27s.18.18.27.27l.14.14c.09.09.18.18.27.27s.18.18.27.27l.14.14c.09.09.18.18.27.27s.18.18.27.27l.14.14c.09.09.18.18.27.27s.18.18.27.27l.14.14c.09.09.18.18.27.27s.18.18.27.27l.14.14c.09.09.18.18.27.27s.18.18.27.27l.14.14c.09.09.18.18.27.27s.18.18.27.27l.14.14c.09.09.18.18.27.27s.18.18.27.27l.14.14c.09.09.18.18.27.27s.18.18.27.27l.14.14c.09.09.18.18.27.27s.18.18.27.27l.14.14c.09.09.18.18.27.27s.18.18.27.27l.14.14c.09.09.18.18.27.27s.18.18.27.27l.14.14c.09.09.18.18.27.27s.18.18.27.27l.14.14c.09.09.18.18.27.27s.18.18.27.27l.14.14c.09.09.18.18.27.27s.18.18.27.27l.1-4.1-3.3-3.3-1.42 1.42z" />
    </svg>
);

const NumerologyIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9.75v3M15 8.25v4.5M3 15v4.5A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V15M3 15h18" />
    </svg>
);

const CartomancyIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
);

const LahochiIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-16.522a8.967 8.967 0 016 2.292c1.052.332 2.062.512 3 .512v-14.25a8.987 8.987 0 00-3-1.748m0 16.522c-2.305 0-4.408-.867-6-2.292m0 0a8.967 8.967 0 01-6-2.292m0 0v-14.25a8.987 8.987 0 013-1.748m6 18.27C14.305 19.133 16.408 18 18 18c1.052 0 2.062.18 3 .512v-14.25a8.987 8.987 0 00-3-1.748" />
    </svg>
);

const ChatBubbleIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l3.663-3.938c.26-.29.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const SendIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
);


// --- COMPONENT DEFINITIONS ---

const Header = () => {
    return (
        <header className="bg-brand-dark bg-opacity-50 text-white p-4 fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-display font-bold text-brand-lilas">TOURMA-LINE</h1>
                <nav className="hidden md:flex space-x-6">
                    <a href="#accueil" className="hover:text-brand-purple transition-colors">Accueil</a>
                    <a href="#services" className="hover:text-brand-purple transition-colors">Mes Services</a>
                    <a href="#bienfaits" className="hover:text-brand-purple transition-colors">Bienfaits</a>
                    <a href="#tarifs" className="hover:text-brand-purple transition-colors">Tarifs</a>
                    <a href="#rendezvous" className="bg-brand-purple hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-full transition-colors">Prendre RDV</a>
                </nav>
            </div>
        </header>
    );
};

const Hero = () => {
    return (
        <section id="accueil" className="relative h-screen flex items-center justify-center text-center text-white bg-hero-pattern bg-cover bg-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 p-4">
                <h2 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-4 text-shadow-lg">Révélez votre potentiel et illuminez votre chemin de vie.</h2>
                <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto font-light">Guidance personnalisée par la numérologie, la cartomancie et les soins énergétiques Lahochi.</p>
                <a href="#services" className="bg-brand-purple hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105">Découvrir mes accompagnements</a>
            </div>
        </section>
    );
};

const Welcome = () => {
    return (
        <section id="bienvenue" className="py-20 bg-white">
            <div className="container mx-auto text-center px-6">
                <h2 className="text-4xl font-display text-brand-dark mb-4">Bonjour et bienvenue, je suis Tourma-Line.</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                   Je suis numérologue, cartomancienne et praticienne en soins énergétiques Lahochi. Mon objectif est de vous accompagner sur votre chemin de vie en vous offrant des outils puissants et des soins adaptés à vos besoins spécifiques.
                </p>
                <div className="grid md:grid-cols-3 gap-10">
                    <div className="bg-brand-lilas p-8 rounded-2xl shadow-lg">
                        <HeartHandIcon className="w-12 h-12 mx-auto mb-4 text-brand-purple"/>
                        <h3 className="text-2xl font-display text-brand-dark mb-2">Approche humaine et bienveillante</h3>
                        <p className="text-gray-700">Chaque consultation est un moment d'écoute et de partage. Mon objectif est de vous accompagner dans le respect de vos besoins et de vos attentes.</p>
                    </div>
                    <div className="bg-brand-lilas p-8 rounded-2xl shadow-lg">
                        <KeyIcon className="w-12 h-12 mx-auto mb-4 text-brand-purple"/>
                        <h3 className="text-2xl font-display text-brand-dark mb-2">Un chemin vers l'auto-connaissance</h3>
                        <p className="text-gray-700">Grâce à la numérologie et à la cartomancie, vous obtiendrez des réponses qui vous permettront d'avancer plus sereinement, tout en découvrant des clés pour mieux comprendre votre vie.</p>
                    </div>
                    <div className="bg-brand-lilas p-8 rounded-2xl shadow-lg">
                        <SparklesIcon className="w-12 h-12 mx-auto mb-4 text-brand-purple"/>
                        <h3 className="text-2xl font-display text-brand-dark mb-2">Guérison énergétique</h3>
                        <p className="text-gray-700">Les soins LAHOCHI sont une véritable source de revitalisation et de guérison, tant sur le plan physique qu'émotionnel, vous permettant de vous reconnecter à votre énergie vitale.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Benefits = () => {
    const benefitsList = [
        "Clarté et prise de décision : Obtenez des réponses à vos questions et prenez des décisions éclairées pour votre avenir.",
        "Meilleure connaissance de soi : Mettez en lumière vos talents et comprenez les défis de votre vie pour mieux les surmonter.",
        "Libération des blocages : Relâchez les tensions et les blocages énergétiques qui vous freinent.",
        "Apaisement et réduction du stress : Retrouvez un état de relaxation profonde et diminuez l'anxiété du quotidien.",
        "Harmonie intérieure : Rééquilibrez vos énergies et vos chakras pour un bien-être global.",
        "Confiance et sérénité : Avancez sur votre chemin de vie avec plus d'assurance et de paix intérieure."
    ];
    return (
        <section id="bienfaits" className="py-20 bg-brand-green">
            <div className="container mx-auto text-center px-6">
                <h2 className="text-4xl font-display text-brand-dark mb-4">Ce que mes pratiques peuvent vous apporter</h2>
                 <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">Chaque séance est une étape vers plus de clarté, d'harmonie et de confiance en vous.</p>
                <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
                    {benefitsList.map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-4">
                            <SparklesIcon className="w-6 h-6 text-brand-purple flex-shrink-0 mt-1"/>
                            <p className="text-gray-700">{benefit}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Services = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void; }) => {
    const tabs = {
        numerology: {
            title: "Numérologie",
            icon: NumerologyIcon,
            contentTitle: "Numérologie - Découvrez les secrets de votre chemin de vie",
            content: "La numérologie est une science ancienne qui étudie l'impact des nombres sur notre existence. À travers l’analyse de votre date de naissance la numérologie permet de révéler des aspects essentiels de votre personnalité, de vos talents cachés, ainsi que les défis auxquels vous êtes confronté dans votre vie. Chaque consultation vous permet de mieux comprendre vos choix, vos relations et les événements marquants de votre vie, afin de prendre des décisions éclairées et d’aligner votre vie avec votre véritable mission."
        },
        cartomancy: {
            title: "Cartomancie",
            icon: CartomancyIcon,
            contentTitle: "Cartomancie - Des réponses claires grâce aux cartes",
            content: "La cartomancie est l’art de lire et d’interpréter les cartes pour obtenir des réponses aux questions que vous vous posez. Que ce soit pour éclairer vos choix professionnels, amoureux ou personnels, la cartomancie offre des conseils pratiques et des prévisions sur votre avenir. J'utilise des jeux de cartes traditionnels ou des oracles pour explorer les énergies présentes et vous guider vers des solutions adaptées à votre situation."
        },
        lahochi: {
            title: "Soin LAHOCHI",
            icon: LahochiIcon,
            contentTitle: "Soin Énergétique LAHOCHI - Une puissante vague de guérison",
            content: "Le LAHOCHI est une méthode de soins énergétiques qui s'apparente à une forme de guérison par l'énergie, souvent comparée au Reiki, bien qu'elle soit considérée comme plus puissante et plus rapide. Son nom, 'LahoChi', fait référence à l’énergie divine universelle qui est canalisée à travers les mains du praticien pour être transmise à la personne recevant le soin. Le Lahochi utilise des fréquences vibratoires élevées pour rééquilibrer les énergies du corps et favoriser la guérison physique, émotionnelle et spirituelle.",
            features: [
                "Transmission d’énergie par les mains : Je canalise l’énergie à travers mes mains en les plaçant sur ou près du corps du receveur.",
                "Soin holistique : Le LAHOCHI agit sur les différents niveaux de l’être humain : physique, émotionnel, mental et spirituel.",
                "Équilibrage des chakras : Le Lahochi aide à équilibrer les chakras du corps, favorisant ainsi un flux énergétique harmonieux.",
                "Vibration élevée : Le LAHOCHI est réputé pour être un soin à hautes fréquences vibratoires ce qui permet des résultats rapides et profonds.",
                "Soin à distance : Cette méthode peut aussi être pratiquée à distance, ce qui la rend accessible à toute personne, peu importe sa localisation."
            ]
        }
    };

    return (
        <section id="services" className="py-20 bg-white">
            <div className="container mx-auto text-center px-6">
                <h2 className="text-4xl font-display text-brand-dark mb-12">Mes outils pour vous guider.</h2>
                <div className="flex justify-center mb-8 border-b-2 border-brand-lilas">
                    {Object.keys(tabs).map(tabKey => (
                        <button key={tabKey} onClick={() => setActiveTab(tabKey)} className={`flex items-center space-x-2 px-6 py-3 font-display text-xl transition-colors duration-300 ${activeTab === tabKey ? 'border-b-4 border-brand-purple text-brand-purple' : 'text-gray-500 hover:text-brand-dark'}`}>
                           {React.createElement(tabs[tabKey].icon, { className: "w-6 h-6" })}
                           <span>{tabs[tabKey].title}</span>
                        </button>
                    ))}
                </div>
                <div className="max-w-4xl mx-auto text-left p-8 bg-brand-lilas rounded-2xl shadow-inner">
                    <h3 className="text-3xl font-display text-brand-dark mb-4">{tabs[activeTab].contentTitle}</h3>
                    <p className="text-gray-700 leading-relaxed">{tabs[activeTab].content}</p>
                     {tabs[activeTab].features && (
                        <ul className="mt-6 space-y-4">
                            {tabs[activeTab].features.map((feature, index) => (
                                <li key={index} className="flex items-start space-x-3">
                                    <SparklesIcon className="w-5 h-5 text-brand-purple flex-shrink-0 mt-1" />
                                    <p className="text-gray-700"><span className="font-semibold">{feature.split(':')[0]}:</span>{feature.split(':')[1]}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
};

const SessionFlow = () => {
    return (
        <section id="deroulement" className="py-20 bg-brand-green">
            <div className="container mx-auto text-center px-6">
                <h2 className="text-4xl font-display text-brand-dark mb-12">Un accompagnement adapté à vous</h2>
                <div className="grid md:grid-cols-3 gap-10">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-brand-purple">
                        <h3 className="text-2xl font-display text-brand-dark mb-3">À distance</h3>
                        <p className="text-gray-600">Par téléphone, visio ou Messenger, pour une flexibilité totale où que vous soyez.</p>
                    </div>
                     <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-brand-purple">
                        <h3 className="text-2xl font-display text-brand-dark mb-3">À domicile</h3>
                        <p className="text-gray-600 mb-4">RDV à domicile au Résidence Les Peupliers, 76540 Gerponville.</p>
                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2577.679493979403!2d0.589862315706246!3d49.77123497938678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e06a3e5c3e5d7b%3A0x8e8b9d3e8e1f0e4b!2sR%C3%A9sidence%20les%20Peupliers%2C%2076540%20Gerponville%2C%20France!5e0!3m2!1sen!2sus!4v1701186729352!5m2!1sen!2sus" 
                                width="100%" 
                                height="200" 
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-brand-purple">
                        <h3 className="text-2xl font-display text-brand-dark mb-3">Au cabinet</h3>
                        <p className="text-gray-600 mb-4">Je vous accueille dans un espace serein au 161 rue Souveraine, 76450 Saint-Riquier-ès-Plains (sur RDV).</p>
                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2581.307994998918!2d0.6401878157038165!3d49.8052989793914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e069c9b19e2c6f%3A0x7d6f5f6b2a3a5f7!2s161%20Rue%20Souveraine%2C%2076450%20Saint-Riquier-%C3%A8s-Plains%2C%20France!5e0!3m2!1sen!2sus!4v1701186638458!5m2!1sen!2sus"
                                width="100%"
                                height="200"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Pricing = () => {
    return (
        <section id="tarifs" className="py-20 bg-white">
            <div className="container mx-auto text-center px-6">
                <h2 className="text-4xl font-display text-brand-dark mb-12">Mes tarifs</h2>
                <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                    <div className="bg-brand-lilas p-8 rounded-2xl shadow-lg text-brand-dark">
                        <h3 className="text-2xl font-display mb-4">Consultation Numérologie & Cartomancie</h3>
                        <p className="text-5xl font-bold mb-4">50€</p>
                        <p className="text-gray-700">À distance, à domicile ou au cabinet</p>
                    </div>
                    <div className="bg-brand-lilas p-8 rounded-2xl shadow-lg text-brand-dark">
                        <h3 className="text-2xl font-display mb-4">Soin énergétique LAHOCHI</h3>
                        <p className="text-5xl font-bold mb-4">50€</p>
                        <p className="text-gray-700">À distance ou à domicile</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Testimonials = () => {
    const testimonialsList = [
        {
            quote: "J’ai eu la chance de croiser Touma-Line lors d’un salon... Avec ma simple date de naissance, elle a su me décrire avec une justesse...",
            name: "PATRICIA FATRAS"
        },
        {
            quote: "Expérience très enrichissante, qui m'a permis de confirmer des ressentis et m'aiguiller... Line prend vraiment le temps, beaucoup de bienveillance.",
            name: "Jennifer R"
        },
        {
            quote: "Line est l'une des personnes les plus bienveillantes que j'ai pu rencontrer. Son professionnalisme, sa bienveillance et sa gentillesse sont des qualités rares.",
            name: "Virginie Dbsc"
        }
    ];

    return (
        <section id="temoignages" className="py-20 bg-brand-green">
            <div className="container mx-auto text-center px-6">
                <h2 className="text-4xl font-display text-brand-dark mb-12">Ce que mes clients disent</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonialsList.map((testimonial, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                            <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                            <p className="font-bold text-brand-purple">- {testimonial.name}</p>
                        </div>
                    ))}
                </div>
                 <a href="https://www.google.com/search?q=Tourma-Line%20Line%20Simon%20Num%C3%A9rologie%20Cartomancie%20et%20Soins%20%C3%A9nerg%C3%A9tiques%20LAHOCHI%20Avis&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDU2NTcyNTCyNDQwsbAwNzKzsNzAyPiKMSQkv7QoN1HXJzMvVQFMBGfm5ucp-JXmHl5ZlJ-Tn56ZquCcWFSSn5uYlwxkp5YoBOdn5hUrHF6Zl1qUfnhlSWZhaWqxgo-jh7-zh6eCY1lm8SJWmhgLAITx8bLJAAAA&rldimm=15357250291048872689&tbm=lcl&cs=1&hl=fr&sa=X&ved=0CAYQ5foLahcKEwiwsdzjoO2QAxUAAAAAHQAAAAAQCQ&biw=1014&bih=656&dpr=1#lkt=LocalPoiReviews&arid=ChdDSUhNMG9nS0VNTEV0NktUM19fQ2hnRRAB" target="_blank" rel="noopener noreferrer" className="mt-8 inline-block bg-brand-purple hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105">
                    Lire plus d'avis sur Google
                </a>
            </div>
        </section>
    );
};

const Booking = () => {
    return (
        <section id="rendezvous" className="py-20 bg-white">
            <div className="container mx-auto text-center px-6">
                <h2 className="text-4xl font-display text-brand-dark mb-4">Prêt(e) à commencer votre voyage intérieur ?</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                    Je suis là pour vous offrir des réponses et un accompagnement personnalisé. Contactez-moi dès maintenant pour réserver votre séance ! Je serai ravie de vous accompagner sur votre chemin de vie avec professionnalisme et bienveillance.
                </p>
                <a href="https://www.facebook.com/tourma.line.534540" target="_blank" rel="noopener noreferrer" className="bg-brand-purple hover:bg-opacity-80 text-white font-bold py-4 px-10 rounded-full text-xl transition-transform transform hover:scale-105 inline-block">
                    Réserver ma séance
                </a>
                <div className="mt-10">
                     <p className="text-gray-700 font-semibold">Pour me joindre :</p>
                    <p className="text-lg text-brand-dark mt-2">
                        <a href="tel:0649653186" className="hover:underline">06 49 65 31 86</a> | <a href="mailto:line.simon.ls@gmail.com" className="hover:underline">line.simon.ls@gmail.com</a>
                    </p>
                    <div className="flex justify-center space-x-6 mt-4">
                        <a href="https://www.facebook.com/tourma.line.534540" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-purple transition-colors">
                            <FacebookIcon className="w-8 h-8"/>
                        </a>
                        <a href="https://wa.me/qr/NZDHZRB3ZW52B1" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-purple transition-colors">
                            <WhatsAppIcon className="w-8 h-8" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="bg-brand-dark text-white py-8">
            <div className="container mx-auto text-center">
                 <h3 className="text-xl font-display text-brand-lilas mb-2">TOURMA-LINE</h3>
                <p className="text-brand-lilas mb-4">"Pour vous guider vers la clarté, la confiance et l'harmonie. ✨"</p>
                 <div className="flex justify-center space-x-4 mb-4">
                      <a href="https://www.facebook.com/tourma.line.534540" target="_blank" rel="noopener noreferrer" className="hover:text-brand-purple transition-colors"><FacebookIcon className="w-6 h-6"/></a>
                 </div>
                <p className="text-sm text-gray-400">Tourmaline, 76540 Gerponville | Siret : 93116533600013</p>
                <p className="text-sm text-gray-400 mt-1">Merci de votre visite.</p>
                 <a href="https://www.google.com/search?sca_esv=b1b93c191aaa47d3&sxsrf=AE3TifPYZY4KkqMWnY5gZGk3n-vOMMPhAg:1762975647931&q=Tourma-Line+Line+Simon+Num%C3%A9rologie+Cartomancie+et+Soins+%C3%A9nerg%C3%A9tiques+LAHOCHI&si=AMgyJEs9DArPE9xmb5yVYVjpG4jqWDEKSIpCRSjmm88XZWnGNboYSYaVnHI8Cn4IKluKbWRXYq-r0WYB-1748A7mqdXrZUulOMOySxFRN-q-rlVeZj6ypC5qIaStj2zXV6nogPxZwVFtXxigmA-dqJHtBVRMAectv_K5Xo0VYmewelH3do5M-dAjT6PwxvoziBwKDnAPsX9naiebeBv7x2A75ft3kXZHUg%3D%D&sa=X&ved=2ahUKExiFifiJrO2QAxW0NvsDHRiNLegQ_coHegQIKRAB" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-brand-purple transition-colors mt-2 inline-block">
                    Voir sur Google Business
                </a>
            </div>
        </footer>
    );
};

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'model', text: "Bonjour ! Je suis ravie de vous éclairer sur les activités de Tourma-Line. ✨ Tourma-Line, Line Simon, vous propose deux services principaux pour votre bien-être et votre développement personnel :\n\n1. **Consultation Numérologie & Cartomancie** (50€) : C'est une exploration profonde de votre chemin de vie. Grâce à la numérologie et à la cartomancie, vous pourrez mieux comprendre vos talents, vos défis et obtenir des éclaircissements sur des questions personnelles, professionnelles ou sentimentales. Une belle manière de trouver clarté et direction ! 🙏\n\n2. **Soin énergétique LAHOCHI** (50€) : Le LAHOCHI est une méthode de guérison énergétique de haute fréquence, un véritable moment de ressourcement. Ce soin aide à rééquilibrer vos chakras, libérer les blocages, réduire le stress et favoriser un bien-être profond. 💜\n\nComment puis-je vous guider aujourd'hui ?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isThinkingMode, setIsThinkingMode] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const systemInstruction = `You are 'Assistant Tourma-Line', a warm, authentic, and benevolent AI assistant for the TOURMA-LINE website. Your persona is that of a trusted guide: you are gentle, reassuring, deeply empathetic, and knowledgeable. Your primary purpose is to enlighten visitors about the services and gently guide them towards contacting the practitioner, Line Simon, to book a session. You must be professional and always respond in French.

**Business Information:**
- **Practitioner:** Tourma-Line (Line Simon)
- **Services:**
  1.  **Consultation Numérologie & Cartomancie (50€):** An exploration of one's life path using numerology (from birth date) and cartomancy (card reading). It provides clarity on talents, challenges, and personal, professional, or romantic questions. (Available: at the cabinet, at home, remotely).
  2.  **Soin énergétique LAHOCHI (50€):** A high-frequency energy healing method, stronger than Reiki. It rebalances chakras, releases blockages, reduces stress, and promotes deep physical and emotional well-being. (Available: at home, remotely).
- **Locations & How Sessions Work:**
  - **À distance (Remote):** Flexible sessions via Phone, Video call, or Messenger.
  - **À domicile (At home):** At "Résidence Les Peupliers, 76540 Gerponville" and surrounding areas.
  - **Au cabinet (At the cabinet):** A serene space at "161 rue Souveraine, 76450 Saint-Riquier-ès-Plains". By appointment only.
- **Client Testimonials (To be used naturally in conversation):**
  - **PATRICIA FATRAS:** "J’ai eu la chance de croiser Touma-Line... elle a su me décrire avec une justesse..."
  - **Jennifer R:** "Expérience très enrichissante, qui m'a permis de confirmer des ressentis... beaucoup de bienveillance."
  - **Virginie Dbsc:** "Line est l'une des personnes les plus bienveillantes que j'ai pu rencontrer. Son professionnalisme, sa bienveillance et sa gentillesse sont des qualités rares."

**Your Persona & Rules:**
- **Tone:** Always be warm, authentic, and gentle in French. Use emojis like ✨, 🙏, 💜 sparingly and appropriately to add warmth. You are here to enlighten, not to sell.
- **Main Goal:** Your primary goal is to answer questions and, when it feels natural, gently guide users to contact Tourma-Line.
- **Call to Action:** When a user is ready or asks how to book, present the contact options clearly. The preferred method is Facebook.
  - **Primary:** "Le plus simple pour prendre rendez-vous est de contacter Line directement sur sa page Facebook." (Provide link: https://www.facebook.com/tourma.line.534540)
  - **Others:** You can also mention Phone (06 49 65 31 86), Email (line.simon.ls@gmail.com), or WhatsApp.
- **Using Testimonials:** If a user seems hesitant or asks about the benefits, you can naturally weave in what clients have said. For example: "Je comprends votre questionnement. D'ailleurs, de nombreuses personnes trouvent les séances très éclairantes. Jennifer R. a partagé que c'était une 'expérience très enrichissante' qui lui a permis de 'confirmer des ressentis'."
- **Boundaries:** If you don't know an answer or if the question is too personal, gently redirect by saying, "C'est une excellente question. Le mieux serait d'en discuter directement avec Line lors d'un premier contact. Elle saura vous répondre avec précision et bienveillance."
- **Language:** ALWAYS respond in French.`;

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const model = isThinkingMode ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
            const config = isThinkingMode ? { thinkingConfig: { thinkingBudget: 32768 } } : {};
            
            const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
            // Remove the initial detailed message from history sent to API to keep it concise
            if (history.length > 0 && history[0].role === 'model') {
                history.shift();
            }

            const response = await ai.models.generateContent({
                model,
                contents: [
                    { role: 'user', parts: [{ text: `System instruction: ${systemInstruction}` }] },
                    { role: 'model', parts: [{ text: "Oui, je suis prêt à aider en tant qu'Assistant Tourma-Line avec une approche authentique et bienveillante." }] },
                    ...history,
                    { role: 'user', parts: [{ text: input }] }
                ],
                config
            });

            const modelMessage = { role: 'model', text: response.text };
            setMessages(prev => [...prev, modelMessage]);

        } catch (error) {
            console.error("Error calling Gemini API:", error);
            const errorMessage = { role: 'model', text: "Désolé, une erreur s'est produite. Veuillez réessayer plus tard." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-brand-purple text-white p-4 rounded-full shadow-lg hover:bg-opacity-80 transition-transform transform hover:scale-110 z-50"
                aria-label="Ouvrir le chat"
            >
                {isOpen ? <CloseIcon className="w-8 h-8" /> : <ChatBubbleIcon className="w-8 h-8" />}
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-6 w-full max-w-md bg-white rounded-2xl shadow-2xl flex flex-col z-50 h-[70vh]">
                    <header className="bg-brand-purple text-white p-4 rounded-t-2xl flex justify-between items-center">
                        <h3 className="font-display text-xl">Assistant Tourma-Line</h3>
                    </header>
                    <div className="flex-1 p-4 overflow-y-auto bg-brand-lilas">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex my-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-3 rounded-2xl max-w-xs whitespace-pre-wrap ${msg.role === 'user' ? 'bg-brand-purple text-white' : 'bg-white text-brand-dark'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex justify-start my-2">
                                <div className="p-3 rounded-2xl bg-white text-brand-dark">
                                    <span className="animate-pulse">...</span>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                     <div className="p-4 border-t border-gray-200">
                         <div className="flex items-center justify-center mb-2">
                            <label htmlFor="thinking-mode" className="flex items-center cursor-pointer">
                                <span className="mr-2 text-sm text-gray-600">Mode Réflexion</span>
                                <div className="relative">
                                    <input id="thinking-mode" type="checkbox" className="sr-only" checked={isThinkingMode} onChange={() => setIsThinkingMode(!isThinkingMode)} />
                                    <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isThinkingMode ? 'transform translate-x-full bg-brand-purple' : ''}`}></div>
                                </div>
                                <SparklesIcon className={`w-5 h-5 ml-2 ${isThinkingMode ? 'text-brand-purple' : 'text-gray-400'}`} />
                            </label>
                        </div>
                        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Posez votre question..."
                                className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-purple"
                                disabled={isLoading}
                            />
                            <button type="submit" className="bg-brand-purple text-white p-3 rounded-full hover:bg-opacity-80 disabled:bg-gray-400" disabled={isLoading}>
                                <SendIcon className="w-6 h-6" />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};


// --- MAIN APP COMPONENT ---
const App = () => {
  const [activeTab, setActiveTab] = useState('numerology');

  return (
    <div className="bg-brand-lilas text-brand-dark font-sans">
      <Header />
      <main>
        <Hero />
        <Welcome />
        <Benefits />
        <Services activeTab={activeTab} setActiveTab={setActiveTab} />
        <SessionFlow />
        <Pricing />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;
