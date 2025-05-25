import React from 'react';
import { FaGithub } from 'react-icons/fa';
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
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                <a
                    href="https://github.com/Winstonjames2"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{color: '#333', display: 'inline-flex', alignItems: 'center' }}
                >
                    <FaGithub /> 
                </a>
            </span>
        </footer>
    );
};

export default Footer;