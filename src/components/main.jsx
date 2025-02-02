import React from "react";
import "./styles.css"; // Assuming the CSS file remains the same
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
const handleButtonClick = () => {
    // Navigate to the desired route
    navigate('/another-page'); // Change '/another-page' to your desired route
                };
const EcoCalc = () => {
  return (
    <div>
      <section id="hero">
        <header>
          <a href="/" className="logo">
            <span>EcoCalc</span>
          </a>
          <nav>
            <Navbar />
          </nav>
        </header>

        <div className="container">
          <div className="hero__content">
            <h1>
              Calculate Your <span>Carbon Footprint</span>
            </h1>
            <h3>
              Understand your impact on the environment and learn how to reduce
              it with our easy-to-use carbon footprint calculator.
            </h3>
          </div>
        </div>

        <svg width="40" height="56" viewBox="0 0 40 56" fill="none" id="scroll-icon">
          <rect x="0.5" y="0.5" width="39" height="55" rx="19.5" stroke="white" />
          <path
            d="M20 37V19M24 33L20 37L24 33ZM20 37L16 33L20 37Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </section>

      <section id="features">
        <div className="container">
          <div className="feature">
            <div className="feature__meta">
              <h6>
                Carbon Footprint<span></span>Awareness
              </h6>
              <h4>Understand Your Impact</h4>
              <p>
                A carbon footprint is the total amount of greenhouse gases
                (GHGs), primarily carbon dioxide (CO₂), released into the
                atmosphere as a result of human activities. These activities range
                from transportation and energy use to food production and
                consumption.
              </p>
            </div>
            <figure className="feature__media">
              <img
                src="https://d32m1btok6bzqh.cloudfront.net/wp-content/uploads/2019/11/CarbonFootprint.jpg"
                alt="Carbon Footprint Awareness"
              />
            </figure>
          </div>

          <div className="feature">
            <div className="feature__meta">
              <h6>
                Eco-friendly Tips<span></span>Reduce
              </h6>
              <h4>Get Personalized Recommendations</h4>
              <p>
                Reducing your carbon footprint is key to protecting the
                environment. Simple actions like using public transport, switching
                to energy-efficient appliances, conserving water, and reducing meat
                consumption can make a big difference. Opt for reusable items,
                recycle properly, and choose sustainable products to minimize waste.
                Planting trees or using renewable energy, help combat climate change
                and create a healthier planet for future generations. Every effort
                counts!
              </p>
            </div>
            <figure className="feature__media">
              <img
                src="https://images.squarespace-cdn.com/content/v1/600878a0f931384d59d707dc/1618501884328-DMBIAHUUKVPD1SD87I0L/6+SIMPLE+TIPS+FOR+A+SUSTAINABLE+LIFESTYLE.jpg"
                alt="Eco-friendly Tips"
              />
            </figure>
          </div>

          <div className="feature">
            <div className="feature__meta">
              <h6>
                Progress Tracking<span></span>Improve
              </h6>
              <h4>Monitor Your Environmental Impact Over Time</h4>
              <p>
                Tracking progress effectively ensures steady growth and success in
                achieving goals. Start by setting clear, measurable milestones and
                using tools like apps or journals to monitor your advancements.
                Regular check-ins help you stay on track, while visualizing progress
                through charts or graphs keeps you motivated. Reflect on any setbacks,
                adjust your strategies, and celebrate small wins along the way.
                Consistent tracking not only boosts accountability but also builds
                confidence as you see tangible results.
              </p>
            </div>
            <figure className="feature__media">
              <img src="https://www.constellation.com/energy-101/energy-innovation/what-is-a-carbon-footprint/jcr:content/ogimage.img.png/carbon-footprint-examples.png" alt="Progress Tracking" />
            </figure>
          </div>
        </div>
      </section>

      <section id="calculate">
        <div className="container">
          <div className="calculate__content">
            <h6>Calculate Your Carbon Footprint</h6>
            <h2>
              Ready to make a <span>difference?</span>
            </h2>
            
            <button className="btn">
              Start Calculating
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                className="arrow-right"
              >
                <path
                  d="M21.5 12H3.5M17.5 8L21.5 12L17.5 8ZM21.5 12L17.5 16L21.5 12Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section id="emissions">
        <div className="feature">
          <div className="feature__meta">
            <h6>Tracking The C02 Emissions</h6>
            <h4>The Environmental Impact around the Globe</h4>
          </div>
          <figure className="feature__media">
            <iframe
              src="https://ourworldindata.org/explorers/co2?facet=entity&hideControls=true&Gas+or+Warming=CO%E2%82%82&Accounting=Production-based&Fuel+or+Land+Use+Change=All+fossil+emissions&Count=Per+capita&country=CHN~USA~IND~GBR~OWID_WRL&tab=chart"
              loading="lazy"
              style={{ width: "100%", height: "600px", border: "0px none" }}
              allow="web-share; clipboard-write"
            ></iframe>
          </figure>
        </div>

        <div className="feature">
          <figure className="feature__media">
            <iframe
              src="https://ourworldindata.org/grapher/temperature-anomaly?time=1940..latest&tab=chart"
              loading="lazy"
              style={{ width: "auto", height: "600px", border: "0px none" }}
              allow="web-share; clipboard-write"
            ></iframe>
          </figure>
          <figure className="feature__media">
            <iframe
              src="https://ourworldindata.org/grapher/ghg-emissions-by-world-region?tab=chart"
              loading="lazy"
              style={{ width: "100%", height: "600px", border: "0px none" }}
              allow="web-share; clipboard-write"
            ></iframe>
          </figure>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <div className="contact-info">
            <h2>
              Get in <span>Touch</span>
            </h2>
            <p>Have questions about our carbon footprint calculator? We're here to help!</p>
            <p>
              <span>Email:</span> info@ecocalc.com
            </p>
            <p>
              <span>Phone:</span> +1 (555) 123-4567
            </p>
            <p>
              <span>Address:</span> 123 Green Street, Eco City, EC 12345
            </p>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <h2>
            Join the <span>EcoCalc</span> Community
          </h2>
          <p>Stay updated with our latest features and eco-friendly tips.</p>
          <ul className="social-links">
            <li>
              <a href="#">FB</a>
            </li>
            <li>
              <a href="#">IG</a>
            </li>
            <li>
              <a href="#">LI</a>
            </li>
            <li>
              <a href="#">X</a>
            </li>
            <li>
              <a href="#">YT</a>
            </li>
          </ul>
          <p>&copy; 2023 EcoCalc. All rights reserved.</p>
        </div>
      </footer>

      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
      ></script>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.27/bundled/lenis.min.js"
      ></script>
      <script>
        // Custom JavaScript code
      </script>
    </div>
  );
};

export default EcoCalc;
