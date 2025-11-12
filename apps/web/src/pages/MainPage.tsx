import type { EmblaOptionsType } from 'embla-carousel';
import '../index.css';
import './MainPage.css';
import EmblaCarousel from '../components/EmblaCarousel';

const MainPage = () => {
    const secretAgentQualities: string[] = [
        'Ghosted Since Birth',
        'Discount Store Bond',
        'Rusty Steel Trap',
        'Permanent Halloween Costume',
        'Professional Self-Distraction',
        'Olympic-Level Poker Face',
        'Fluent in Lies',
        'Quick Mind, Slow Texts',
        'Overconfident Briefing Skipper',
        'Problem-Causing Problem Solver',
        'Vanishing Work Ninja',
        'Vending Machine Hacker',
        'Cardio Avoidance Specialist',
        'Accidental Marksman Extraordinaire',
        'Emotionally Unavailable Operative',
        'Password Amnesia Master',
        'Snack-Driven Loyalist',
        'Calm Until Meeting',
        'Printer Nemesis Genius',
        'Graceful Disaster Planner',
    ];

    const username: string = localStorage.getItem('username') || '';
    const OPTIONS: EmblaOptionsType = {};
    const SLIDE_COUNT = 10;
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
    return (
        <main className="MainPage">
            <div className="welcome">
                <h1>
                    Welcome back Agent {username.split('')[0].toUpperCase()}
                    {username.slice(1, username.length)}
                </h1>
            </div>
            <div className="agent-container">
                <div className="profile">
                    <h2>Agent file</h2>
                    <span className="description">
                        <div>
                            Name:
                            <span className="Name">
                                {username.charAt(0).toUpperCase() + username.slice(1)}
                            </span>
                        </div>
                        <div>
                            Code Name:
                            <span className="CodeName">{username.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                            Agent Number:
                            <span className="Number">
                                A-
                                {Math.ceil(Math.random() * 9999)
                                    .toString()
                                    .padStart(4, '0')}
                            </span>
                        </div>
                    </span>
                    <span className="image"></span>
                    <div>
                        Qualities:
                        <ul>
                            <li>{secretAgentQualities[Math.floor(Math.random() * 20)]}</li>
                            <li>{secretAgentQualities[Math.floor(Math.random() * 20)]}</li>
                            <li>{secretAgentQualities[Math.floor(Math.random() * 20)]}</li>
                            <li>{secretAgentQualities[Math.floor(Math.random() * 20)]}</li>
                        </ul>
                    </div>
                </div>

                <div className="agent-notes">
                    <h2>Notes / Description</h2>
                    <textarea placeholder="Enter mission notes or agent intel here..."></textarea>
                </div>
            </div>

            <div className="carousel popular">
                <h1>Popular Quizzes</h1>
                <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            </div>
            <div className="carousel most-played">
                <h1>Most Played Quizzes</h1>
                <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            </div>
            <div className="carousel own">
                <h1>Your Quizzes</h1>
                <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            </div>
        </main>
    );
};

export default MainPage;
