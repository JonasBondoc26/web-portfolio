import logoDark from '../assets/logo-dark.png';
import logoLight from '../assets/logo-light.png';
import LapTimer from './LapTimer';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-logo">
                    <img src={logoDark.src} alt="JB logo" className="logo-img logo-dark" />
                    <img src={logoLight.src} alt="JB logo" className="logo-img logo-light" />
                </div>
                <LapTimer />
                <p className="footer-text">Built with passion and precision. Designed for performance.</p>
                <p className="footer-copyright">&copy; {new Date().getFullYear()} Jonas Bondoc. All rights reserved.</p>
            </div>
        </footer>
    );
}
