import React, {useState, useEffect} from 'react'
import homepic from "../images/2.png";
const Home = () => {
    const [userName, setUserName] = useState('');
    const [show, setShow] = useState(false);

    const userHomePage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            // console.log(data);
            setUserName(data.name);
            setShow(true);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        userHomePage();
    }, []);
    return (
        <>
            <div className="container mt-5">   {/*it shows the box.*/}
             <div className="signin-content">  {/*it shows image and content left to right.*/}
                <div className="signup-image">
                 <figure>
                 <img src={homepic} alt="home pic" />
                 </figure>
                </div>
               <div className="home-page">
               <div className="home-div">
                <p className="pt-5">WELCOME</p>
                <h1>{userName}</h1>
                <h2> { show ? 'Happy, to see you back' :  'Happy, to see you' }</h2>
               </div>
               </div>
               </div></div><div className="mb"></div>
        </>
    )
}

export default Home
