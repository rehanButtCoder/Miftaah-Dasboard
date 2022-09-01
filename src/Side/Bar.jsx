import React from 'react'
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
function Bar() {
    const showMenuu = (e) => {
        e.target.closest(".actionContent").classList.toggle("block");
    }

    const showNotifications = (e) => {
        e.target.closest(".actionContent").classList.toggle("block");
    }

    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('miftaahadmin');
        setTimeout(() => {
            navigate("/");
        }, 1000);
    }
    return (
        <div className="mainSidebar">
            <div class="sidenav">
                <div className="sidebar-container">
                    <div className="sidebar-icons">
                        <div>
                            <NavLink to="/speakers" className='sideBarBox'>
                                <div>
                                    <img className="sidebarIcon" src="/assets/images/bar/Speaker.svg" alt="" />
                                    <img className="sidebarIcons" src="/assets/images/bar/SpeakerH.svg" alt="" />
                                </div>
                                <div> <span className="ctnnn">Speaker</span></div>
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to="/lessons" className='sideBarBox'>
                                <div>
                                    <img className="sidebarIcon" src="/assets/images/bar/Lessons.svg" alt="" />
                                    <img className="sidebarIcons" src="/assets/images/bar/LessonsH.svg" alt="" />
                                </div>
                                <div>  <span className="ctnnn">Lesson's</span>  </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashboardContainer">
                <div className="Main_dash_icon">
                    <div></div>
                    <div><img src="/assets/images/Logo(1).png" alt="" /></div>
                    <div className="align">
                        {/* profile dropdwn */}
                        <div className='actionContent'>
                            <img onClick={showMenuu} className="profile" src="/assets/images/Profile.png" alt="" />
                            <div className="dropdownn">
                                <div className="dropdown-contentt">
                                    <Link to='' onClick={logout} >Log Out</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Bar