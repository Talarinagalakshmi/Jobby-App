import './index.css'
const Skillscard = props => {
  const {jobdetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    employmentType,
    location,
    jobDescription,
  } = jobdetails
  return (
    <li>
    <div className="list-item">
      <img
        src={companyLogoUrl}
        alt="job details company logo"
        className="logo-url"
      />
      <h1 className="heading">{title}</h1>
      <p>{rating}</p>
      <h1 className="heading">Description</h1>
      <p>{jobDescription}</p>
      <p>{location}</p>
      <p>{employmentType}</p>
    </div>
    </li>
  )
}
export default Skillscard
