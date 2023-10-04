import React from "react";
import "./Servic.css";
// import serviceImg from '../../../../assets/images/portfolio-05.jpg'
export default function Service() {
  return (
    <div className="service">
      <div className="hero">Agile Business Analysis</div>
      <div className="service_part2">
        <div className="images">{/* <img src={serviceImg} alt=''/> */}</div>
        <div className="service_parg">
          <h3>
            Using Agile techniques to deliver value to your customers faster
          </h3>
          <p>
            BAPLs Agile business analysis service is the practice of delivering
            exceptional business analysis in an Agile context, with an Agile
            mindset. Agile business analysis provides organisations with a
            competitive advantage in today’s fast-paced and complex
            marketplaces. Agile business analysis has moved beyond software
            development initiatives into the business domain. Embedding an Agile
            mindset of inspecting and adapting is the key element to the success
            of this service. We have delivered Agile business analysis and Agile
            practices across all delivery horizons (Strategy, Initiative,
            Delivery) and in many diverse businesses.
          </p>
        </div>
      </div>
      <div className="Service_include">
        <div>
          <h3>Agile business analysis consulting services include : </h3>
          <ul>
            <li>- Backlog discovery and prioritisation</li>
            <li>- Requirements elicitation modelling and </li>
            <li>- Backlog discovery and prioritisation</li>
            <li>- Backlog discovery and prioritisation</li>
          </ul>
        </div>
      </div>
      <div className="service_part2">
        <div className="images">{/* <img src={serviceImg} alt=''/> */}</div>
        <div className="service_parg">
          <h3>Some of our sector experience</h3>
          <div className="service_list">
            <ul>
              <li>. Banking</li>
              <li>. Banking</li>
              <li>. Banking</li>
              <li>. Banking</li>
              <li>. Banking</li>
              <li>. Banking</li>
              <li>. Banking</li>
              <li>. Banking</li>
            </ul>
            <ul>
              <li>. Banking</li>
              <li>. Banking</li>
              <li>. Banking</li>
              <li>. Banking</li>
              <li>. Banking</li>
              <li>. Banking</li>
              <li>. Banking</li>
              <li>. Banking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
