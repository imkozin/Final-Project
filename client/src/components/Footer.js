// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../styles/Main.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <p>&copy; {new Date().getFullYear()} Made by Ivan Kozin</p>
                    {/* <p>Contact: ivan@example.com</p>
                    <div className="social-icons">
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div> */}
                </div>
                {/* <div className="footer-right">
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                    </ul>
                </div> */}
            </div>
        </footer>
    );
}

export default Footer;
