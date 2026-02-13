import React from "react";
import "./WhyThrillYatraSection.css";

import img1 from "../images/img1.webp";
import img2 from "../images/img2.webp";
import img3 from "../images/img3.webp";
import img4 from "../images/img4.webp";
import img5 from "../images/img5.webp";
import img6 from "../images/img6.png";

function WhyThrillYatraSection() {
  return (
    <section className="thrill-section">
      <div className="thrill-container">

        
        <div className="thrill-image-grid">
          <img src={img1} alt="Trekking Adventure" />
          <img src={img2} alt="River Rafting" />
          <img src={img3} alt="Paragliding" />
          <img src={img4} alt="Mountain Camping" />
          <img src={img5} alt="Rock Climbing" />
          <img src={img6} alt="Desert Safari" />
        </div>

        
        <div className="thrill-content">
          <h2>Why Choose ThrillYatra?</h2>
          <p>
            ThrillYatra is your gateway to unforgettable adventures across
            breathtaking destinations. Whether you seek adrenaline or nature,
            we ensure safe, thrilling, and well-guided experiences.
          </p>

          <ul>
            <li>✔ 100+ curated adventure activities</li>
            <li>✔ Certified instructors & safety gear</li>
            <li>✔ Easy booking & transparent pricing</li>
            <li>✔ Trusted by thousands of travelers</li>
          </ul>
        </div>

      </div>
    </section>
  );
}

export default WhyThrillYatraSection;
