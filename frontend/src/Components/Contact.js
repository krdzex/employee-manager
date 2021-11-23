import React from 'react';

const Contact = () => {
    return (
        <div className="contactWrapper">
            <div className="header">
                Contact us
            </div>
            <div className="grid">
                <div className="leftSide">
                    <input type="text" placeholder="Your name" />
                    <input type="text" placeholder="Your email" />
                    <input type="text" placeholder="Your phone" />
                </div>
                <div className="rightSide">
                    <textarea placeholder="Your message" />
                </div>
            </div>
            <div className="submit">
                <div className="button">
                    Send message
                </div>
            </div>
        </div>
    );
};

export default Contact;