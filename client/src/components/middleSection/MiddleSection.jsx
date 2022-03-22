import React, { useEffect } from "react";
import "./MiddleSection.css";
import Aos from "aos";
import "aos/dist/aos.css";

function MiddleSection(props) {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <>
      <div className="middle">
        <section className="container-sect">
          <div className=" story-sect" data-aos="fade-up">
            <h1>What is ICT Academy of Kerala?</h1>
            <p>
              ICT Academy of Kerala is a Social Enterprise created in a Public
              Private Partnership model (PPP) for imparting ICT skills to the
              youths of Kerala and improve their employability opportunities in
              the Industry. The Company is supported by Govt. of India,
              partnered by Govt. of Kerala and the IT industry. ICTAK do
              research and offers training programs on diverse streams,ranging
              from emerging technologies to life skills. Being a Social
              Enterprise, we strive to enhance the technology skills of the
              youth thereby embibing industry relavent skills to this
            </p>
          </div>
          <div className="caption">
            <h1 data-aos="fade-right">BRIDGING THE SKILLS GAP</h1>
            <h1 data-aos="fade-left">BUILDING THE NATION'S FUTURE</h1>
          </div>
        </section>
      </div>
    </>
  );
}

export default MiddleSection;
