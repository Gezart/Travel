import Link from "next/link";
import { useState } from "react";

export default function Footer({ menu }) {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can perform actions like sending the email to a server
        console.log('Subscribed with email:', email);
        // Reset the email input after submission if needed
        setEmail('');
    };
    return (
        <footer>
            <div className="container">
                <div className="footer-wrapper">
                    <div className="logo">
                        <Link href="/">
                            TRAVEL KOSOVA
                        </Link>
                    </div>
                    <div className="column">
                        <h3>Quick links</h3>
                        <div className="menu">
                            {
                                menu && menu.map(item =>

                                    <Link href={item.uri} key={item.label}>{item.label}</Link>
                                )
                            }
                        </div>
                    </div>
                    <div className="column">
                        <h3>Subscribe</h3>
                        <form onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            <button type="submit">Subscribe</button>
                        </form>

                    </div>

                </div>
                <div className="copyright">
                    <p>© 2024 TRAVEL KOSOVA. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}