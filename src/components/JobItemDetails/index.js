import {Component} from 'react'
import Header from '../Header'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

import Skillscard from '../Skillscard'
import SimilarjobCard from '../SimilarjobCard'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobData: {},
    simililarJobsData: [],
  }

  componentDidMount() {
    this.getJobsData()
  }

  getFormatedSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })
  getFormatedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.getFormatedData(data.job_details)
      const updatedDatasimilarData = data.similar_jobs.map(similarJobs =>
        this.getFormatedSimilarData(similarJobs),
      )
      this.setState({
        jobData: updatedData,
        simililarJobsData: updatedDatasimilarData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }
  renderFailureView = () => (
    <div className="job-item-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        className="job-item-failure-img"
        alt="failure view"
      />
      <h1 className="job-item-failure-heading-text">
        Oops! Something Went Wrong{' '}
      </h1>
      <p className="job-item-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        onClick={this.getJobsData}
        className="job-item-failure-button"
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="job-item-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetails = () => {
    const {jobData, simililarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompany,
      skills,
    } = jobData
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="Job-details-view-container">
        <div className="job-item">
          <div className="logo-title-location-container">
            <div className="logo-title-container">
              <img
                src={companyLogoUrl}
                className="company-logo"
                alt="job details company logo"
              />
              <div className="title-rating-container">
                <h1 className="title-heading">{title}</h1>
                <div className="rating-container">
                  <BsStarFill className="rating-icon" />
                  <p className="rating-heading">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-package-container">
              <div className="location-employee-container">
                <div className="location-container">
                  <MdLocationOn className="location-icon" />
                  <p className="location-heading">{location}</p>
                </div>
                <div className="employee-type-container">
                  <BsFillBriefcaseFill className="brief-case-icon" />
                  <p className="employee-type-heading">{employmentType}</p>
                </div>
              </div>
              <p className="package-heading">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="hr-line" />
          <div className="description-visit-container">
            <h1 className="description-heading">Description</h1>
            <div className="visit-container">
              <a href={companyWebsiteUrl} className="visit-heading">
                Visit
              </a>
              <BiLinkExternal className="visit-icon" />
            </div>
          </div>
          <p className="description-text">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list-container">
            {skills.map(eachSkill => (
              <Skillscard skillDetails={eachSkill} key={eachSkill.name} />
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-description-image-container">
            <p className="life-at-company-description">{description}</p>
            <img
              src={imageUrl}
              alt="Life at Company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">similar Jobs</h1>
        <ul className="similar-jobs-list">
          {simililarJobsData.map(eachSkill => (
            <SimilarjobCard jobdetails={eachSkill} key={eachSkill.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="Job-Item-Details-container">{this.renderAllJobs()}</div>
      </>
    )
  }
}
export default JobItemDetails
