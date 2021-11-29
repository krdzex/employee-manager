import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { deleteTeam, listTeamMembers, listTeams, teamInfo } from '../ApiService/teamApi';
import AddTeamMember from './AddTeamMember';
import { useDispatch, useSelector } from 'react-redux';
import { openTeamMemberPopUp } from '../Actions';
import authHelper from '../Auth/authHelper';

SwiperCore.use([Pagination, Navigation]);


const Teams = () => {
    const dispatch = useDispatch()
    const openAddMember = useSelector(state => state.teamMemberReducer)
    const [activeSlide, setActiveSlide] = useState(0);
    const [allTeams, setAllTeams] = useState([]);
    useEffect(() => {
        listTeams().then(res => {
            if (res.length > 0) {
                setAllTeams(res)
            }
        }).catch(err => console.log(err))
    }, [])

    const [currentTeamInfo, setCurrentTeamInfo] = useState({})
    const [teamMembers, setTeamMembers] = useState([])
    useEffect(() => {
        if (allTeams.length > 0) {
            teamInfo(allTeams[activeSlide]._id).then(res => setCurrentTeamInfo(res)).catch(err => console.log(err))
            listTeamMembers(allTeams[activeSlide]._id).then(res => {
                res.forEach(member => {
                    switch (member.role) {
                        case "Team Lead":
                            member.role = "TL"
                            break;
                        case "Project Manager":
                            member.role = "PM"
                            break;
                        case "Developer":
                            member.role = "DEV"
                            break;
                        case "QA Engineer":
                            member.role = "QA"
                            break;
                        case "UX designer":
                            member.role = "UX"
                            break;
                        default:
                            return member.role
                    }
                });
                setTeamMembers(res)
            }).catch(err => console.log(err))
        } else {
            setCurrentTeamInfo({})
            setTeamMembers([])
        }
    }, [activeSlide, allTeams.length, openAddMember])
    const [values, setValues] = useState({ redirect: false, id: "" })

    const onClick = (id) => {
        setValues({ id: id, redirect: true })
    }

    const onDeleteClick = (id) => {
        const newAllTeams = allTeams.filter((team) => team._id !== id)
        deleteTeam(id).then(res => console.log(res)).catch(err => console.log(err))
        if (newAllTeams.length === 0) {
            setAllTeams([])
        } else {
            setAllTeams(newAllTeams)
        }
    }
    if (values.redirect) return <Navigate to={`/viewTeam/${values.id}`} />
    return (
        <div className="teamsWrapper">
            <div className="header">
                <div className="title">
                    Teams
                </div>
                {authHelper.isAuthentcated().user.role === "Admin" && (<Link to="/addTeam"><div className="iconAdd">
                    <Icon icon="carbon:add-filled" />
                </div></Link>)}
            </div>
            <div className="allTeams">
                <Swiper slidesPerView={1} breakpoints={{

                    640: {
                        slidesPerView: 2,
                    },

                    900: {
                        slidesPerView: 3,
                    },
                }} centeredSlides={true} spaceBetween={30} pagination={{
                    "type": "fraction"
                }} navigation={true} onSwiper={(e) => setActiveSlide(e.realIndex)} onSlideChange={(e) => setActiveSlide(e.realIndex)} className="mySwiper">
                    {allTeams.map((team, id) => {
                        return <SwiperSlide key={id} >
                            <div onClick={() => onClick(team._id)} style={{ width: "100%", height: "100%", display: 'flex', alignItems: "center", justifyContent: "center" }}>{team.teamName}</div>
                            {authHelper.isAuthentcated().user.role === "Admin" && (<div className="iconsTeams">
                                <Link to={`/editTeam/${team._id}`} style={{ color: "black" }}>
                                    <Icon icon="entypo:edit" id="edit" />
                                </Link>
                                <Icon icon="fluent:delete-dismiss-28-filled" id="delete" onClick={() => onDeleteClick(team._id)} />
                            </div>)}
                        </SwiperSlide>
                    })}
                </Swiper>
            </div>
            <div className="teamDescription">
                {currentTeamInfo.shortDescription}
            </div>
            <div className="teamMembers">
                <div className="header">
                    <h3> Team members:
                    </h3>
                    {allTeams.length > 0 && authHelper.isAuthentcated().user.role === "Admin" && (<div className="iconAdd" onClick={() => dispatch(openTeamMemberPopUp())}>
                        <Icon icon="carbon:add-filled" />
                    </div>)}
                </div>
                {currentTeamInfo.emyploees !== undefined && currentTeamInfo.emyploees.length > 0 ? <Swiper slidesPerView={1}
                    breakpoints={{

                        640: {
                            slidesPerView: 2,
                        },

                        900: {
                            slidesPerView: 3,
                        },
                        1100: {
                            slidesPerView: 5
                        }

                        1300: {
                            slidesPerView: 5
                        }
                    }}
                    spaceBetween={30} pagination={{
                        "type": "fraction"
                    }} navigation={true} className="mySwiper">
                    {teamMembers.map((member, id) => {
                        return <SwiperSlide key={id}>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <div className="memberImg">
                                    <img src={process.env.PUBLIC_URL + `/images/${member.img}`}></img>
                                </div>
                                {member.userName}
                            </div>
                            <div className="topRightCirlce">
                                {member.role}
                            </div>
                        </SwiperSlide>
                    })}

                </Swiper> : ""}

            </div>
            {openAddMember && (<AddTeamMember id={currentTeamInfo._id} teamName={currentTeamInfo.teamName} />)}
        </div >
    );
};

export default Teams;