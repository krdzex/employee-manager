import React from 'react';
import { Icon } from "@iconify/react"
const Services = () => {
    return (
        <div className="servicesWrapper">
            <div className="header">
                Services
            </div>
            <div className="grid">
                <div className="singleItem">
                    <div className="photo">
                        <Icon icon="subway:world-1" />
                    </div>
                    <div className="title">
                        Web applications
                    </div>
                    <div className="text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                </div>
                <div className="singleItem">
                    <div className="photo">
                        <Icon icon="ri:lock-password-fill" />
                    </div>
                    <div className="title">
                        cyber security
                    </div>
                    <div className="text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                </div>
                <div className="singleItem">
                    <div className="photo">
                        <Icon icon="fa-solid:mobile-alt" />
                    </div>
                    <div className="title">
                        mobile first
                    </div>
                    <div className="text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;