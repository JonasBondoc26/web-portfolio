import { tech } from '../data/tech';

/* A race-broadcast style ticker of the tech stack, scrolling across the page.
   The list is drawn twice so the loop is seamless; the copy is hidden from screen readers. */
export default function Ticker() {
    const names = tech.map(({ name }) => name);

    return (
        // The band is wider than the screen so its tilted ends reach past both edges.
        // .ticker-clip trims that sideways overflow; without it the page is wider than a phone
        // screen, the browser zooms out, and bars fixed to the bottom slide partly off-screen.
        <div className="ticker-clip">
            <div className="ticker" aria-label="Tech stack">
                <div className="ticker-label"><span>Live</span></div>
                <div className="ticker-window">
                    <div className="ticker-track">
                        {[0, 1].map((copy) => (
                            <ul className="ticker-list" key={copy} aria-hidden={copy === 1 || undefined}>
                                {names.map((name) => <li key={name}>{name}</li>)}
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
