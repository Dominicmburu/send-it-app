import React from "react";
import { Link } from "react-router-dom";
<link href=""></link>


const IndexPage: React.FC = () => {
  return (
    <div className="container">

        <div className="form-container">
            <div className="welcome-container">
                <img src="./src/images/senditlogo.png" alt="" className="welcome-logo" />
                <div className="welcome-text">
                    <h1>Welcome</h1>
                    <p>Send your parcel today</p>
                    <Link to="/login"
                        className="btn">Get Started NOW</Link>
                </div>
           
          </div>
        </div>

        {/* User dashboard */}

        <div className="wrapper">
          <div className="container">
            <nav>
              <p>Welcome, <strong> JOHNSON</strong></p>
              <div>
                < notification/>
                <button>Logout</button>
              </div>
            </nav>
          </div>
        </div>
        
        
    </div>
  );
};

export default IndexPage;
