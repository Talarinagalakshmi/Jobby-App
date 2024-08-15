import Header from '../Header'
import {Link} from 'react-router-dom'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading">
          Find The Job That <br /> Fits Your Life
        </h1>
        <p className="home-discription">
          Millions of People are searching for jobs, salary <br /> information,
          company reviews. Find the job that fits your
          <br /> abilities and potential"
        </p>
        <Link to="/jobs">
          <button className="find-jobs-button" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
