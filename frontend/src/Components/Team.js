import React from 'react';
import { Icon } from "@iconify/react"
const Team = () => {
    return (
        <div className="servicesWrapper">
            <div className="header">
                Our Team
            </div>
            <div className="grid">
                <div className="singleItem">
                    <div className="avatar">
                        <Icon icon="bi:person-circle" />
                    </div>
                    <div className="title">
                        John Doe
                    </div>
                    <div className="role">
                        Developer
                    </div>
                    <div className="socialNetwork">
                        <div className="socIcon">
                            <Icon icon="cib:facebook-f" />
                        </div>
                        <div className="socIcon">
                            <Icon icon="raphael:twitter" />
                        </div>
                        <div className="socIcon">
                            <Icon icon="line-md:linkedin" />
                        </div>
                    </div>
                </div>
                <div className="singleItem">
                    <div className="avatar">
                        <Icon icon="bi:person-circle" />
                    </div>
                    <div className="title">
                        John Doe
                    </div>
                    <div className="role">
                        Designer
                    </div>
                    <div className="socialNetwork">
                        <div className="socIcon">
                            <Icon icon="cib:facebook-f" />
                        </div>
                        <div className="socIcon">
                            <Icon icon="raphael:twitter" />
                        </div>
                        <div className="socIcon">
                            <Icon icon="line-md:linkedin" />
                        </div>
                    </div>
                </div>
                <div className="singleItem">
                    <div className="avatar">
                        <Icon icon="bi:person-circle" />
                    </div>
                    <div className="title">
                        John Smith
                    </div>
                    <div className="role">
                        Developer
                    </div>
                    <div className="socialNetwork">
                        <div className="socIcon">
                            <Icon icon="cib:facebook-f" />
                        </div>
                        <div className="socIcon">
                            <Icon icon="raphael:twitter" />
                        </div>
                        <div className="socIcon">
                            <Icon icon="line-md:linkedin" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Team;