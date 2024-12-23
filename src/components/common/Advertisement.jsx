import React from 'react'

export default function Advertisement() {
    return (
        <div style={styles.adContainer}>
            <h2 style={styles.heading}>Take Control of Your Credit Cards</h2>
            <p style={styles.text}>Track your spending, manage multiple cards, and enjoy rewards!</p>
            <button style={styles.ctaButton}>Get Started</button>
        </div>
    )
}

const styles = {
    adContainer: {
        backgroundColor: '#f4f4f9',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        margin: '20px auto',
        textAlign: 'center'
    },
    heading: {
        fontSize: '1.5em',
        color: '#333',
        marginBottom: '10px'
    },
    text: {
        fontSize: '1em',
        color: '#666',
        marginBottom: '15px'
    },
    ctaButton: {
        backgroundColor: '#0056b3',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: '1em',
        transition: 'background-color 0.3s ease'
    }
}
