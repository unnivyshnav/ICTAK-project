import React,{useEffect} from 'react';
import'./LastSection.css';
import Aos from "aos";
import "aos/dist/aos.css";
function LastSection(props) {
    useEffect(()=>{
    Aos.init({duration:2000});
  },[]);
    return (
        
        <section className='serv-container'>
            <div className="offer-div">
            <h1> OUR  </h1>
            <br />
            <h1>OFFERINGS</h1>
            </div>
            <div className="inst-div" data-aos="fade-right">
            <h2> INSTITUTIONAL TRAINING </h2>
            <p> ICT Academy of Kerala associate with educational institutions across the state of Kerala to improve employability skills of the both Faculty and the Students. The educational institutions include Engineering, Arts & science Colleges and Polytechnics.  Apart from training programs, ICTAK provides customized solutions, not limited to Learning Management Systems and other value added services in these colleges to improve the quality of college education eco system of Kerala. </p>
            </div>
            

            <div className="grad-div" data-aos="fade-left">
            <h2> GRADUATE TRAINING </h2>
            <p> ICT Academy of Kerala provides Industry focused ICT skills development program for Students . Project assignment related to capability building for are also provided. </p>
            </div>

            <div className="corp-div" data-aos="fade-right">
            <h2> CORPORATE TRAINING </h2>
            <p> ICT Academy of Kerala provides world class training to the corporates which enables them to upskill their employees ,reduce the cost and gain competitive edge in the Industry .We do create and conduct customized corporate training programs after understanding the needs of the companies .The major corporate training programs conducted by us are in the following domains. </p>
            </div>

            <div className="part-div" data-aos="fade-left">
            <h2> PARTNER PROGRAMME </h2>
            <p> We in association with wolld wide MNC companies and other stakeholders, conducts various industry as well as academic relevent training programms for students faculties as well as working professionals.</p>
            </div>
        </section>
    );
}

export default LastSection;