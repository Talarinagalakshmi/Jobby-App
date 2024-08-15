import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {Link} from 'react-router-dom'
import './index.css'
const JobsList = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    location,
    rating,
    employmentType,
    jobDescription,
    companyLogoUrl,
    packagePerAnnum,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`}>
      <li className="list-item">
        <div className="logo-title-container">
          <div className="img-title-rating-container">
            <img src={companyLogoUrl} className="logo-url" alt="company logo" />
            <div>
              <h1>{title}</h1>
              <div className="icon-container">
                <BsStarFill />
                <p>{rating}</p>
              </div>
            </div>
          </div>

          <div className="location-packagePerAnnum-container">
            <div className="location-employmentType-container">
              <div className="icon-container">
                <MdLocationOn />
                <p className="location">{location}</p>
              </div>
              <div className="icon-container">
                <BsFillBriefcaseFill />
                <p>{employmentType}</p>
              </div>
            </div>

            <p>{packagePerAnnum}</p>
          </div>
          <hr className="hr-line" />
          <h1 className="heading">Description</h1>
          <p className="description"> {jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobsList
