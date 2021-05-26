import React, { useEffect, useState } from 'react'
import sunitapic from "../images/1.png";


import { useHistory } from "react-router-dom";

const About = () => {

    const history = useHistory();
    const [userData, setUserData] = useState({});

    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: "appllication/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);
            setUserData(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
            history.push('/login');
        }
    }

    useEffect(() => {
        callAboutPage();
    }, []);

    return (
        <>
            <div className="container emp-profile">
                <form method="GET">
                   <div className="row"> {/*2parts */}
                        <div className="col-md-4">
                         <div className="profile-img">  <img src={sunitapic} alt="sunita" />  </div>
                        </div>

                        <div className="col-md-6">
                         <div className="profile-head"> <h5>Sunita Singh</h5> <h6>Pre-final year undergraduate</h6>
                           <h7>Objective</h7><div>
                           <p>Seeking a challenging internship as a Web developer in an organization that provides me an opportunity to grow as a professional and where I can prove myself a valuable asset for its growth. And give my best to the organization.</p>
                             </div>  
                             
                         <ul className="nav nav-tabs" role="tablist">
                          <li className="nav-item">
                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                          </li>
                          <li className="nav-item">
                           <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Skills</a>
                          </li>
                         </ul>
                         
                         </div>
                        </div>
                        
                    </div>
                    
                    <div className="row">{/*3parts */}
                        <div className="col-md-4">
                            <div className="profile-work"><div className="mt"></div>
                                <h5>Profile Links</h5>
                                <a href="https://www.linkedin.com/in/sunita-singh-7bb728173/" target="_sunita">Linkedin</a> <br />
                                <a href="https://github.com/5125125" target="_sunita">Github</a> <br />
                                <a href="https://www.hackerrank.com/sunitasinghaer" target="_sunita">Hackerrank</a> <br />
                                <a href="https://www.codechef.com/users/sunita12" target="_sunita">Codechef</a> <br />
                                <a href="https://leetcode.com/Sunita12/" target="_sunita">Leetcode</a> <br />
                            </div>
                        </div>
                        <div className="col-md-8 pl-5 about-info">
                            <div className="tab-content profile-tab" id="myTabContent">
                                
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="row">
                                       <div className="col-md-6">
                                            <p>Mern Stack</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                       <div className="col-md-6">
                                            <p>JavaScript</p>
                                        </div>
                                    </div>
                                    <div className="row ">
                                       <div className="col-md-6">
                                            <p>Html</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                       <div className="col-md-6">
                                            <p>Css</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                       <div className="col-md-6">
                                            <p>bootstrap</p>
                                        </div>
                                    </div>

                                </div>
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row ">
                                        <div className="col-md-3">  {/*to manage space blw 2 columns */}
                                            <p>Email</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>sunitasinghaer@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="row ">       {/* mt: margintop*/}
                                        <div className="col-md-3">
                                            <p>Profession</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Student</p>
                                        </div>
                                    </div>
                                    <div className="row ">
                                        <div className="col-md-3">
                                            <p>Course</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>B.tech</p>
                                        </div>
                                    </div>
                                    <div className="row ">
                                        <div className="col-md-3">
                                            <p>Branch</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Computer Science</p>
                                        </div>
                                    </div>
                               </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default About ;
