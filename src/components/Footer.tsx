import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={{
            padding: '1rem',
            textAlign: 'center',
            background: '#f5f5f5',
            fontSize: '0.9rem',
            marginTop: '2rem',
        }}>
            <span>&copy; {new Date().getFullYear()} TaskManager. Developed By Kyaw Htet Myat Tun. </span>
            <a
                href="https://github.com/Winstonjames2"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: '0.5rem', color: '#333', textDecoration: 'underline' }}
            >
                GitHub
            </a>
        </footer>
    );
};

export default Footer;