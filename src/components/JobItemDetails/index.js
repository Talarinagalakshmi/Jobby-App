import {Component} from 'react'
import Header from '../Header'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

import Skillscard from '../Skillscard'

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
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        className="failure-view"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong </h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" onClick={this.getJobsData} className="failure-button">Retry</button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
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

    return (
      <div className="Job-details-container">
        <div className="image-heading-container">
          <img
            src={companyLogoUrl}
            className="logo-url"
            alt="job details company logo"
          />
          <div className="title-rating-container">
            <h1>{title}</h1>
            <div className="icon-title-container">
              <BsStarFill />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="location-employmentType-container">
            <div className="icon-title-container">
              <MdLocationOn />
              <p>{location}</p>
            </div>
            <div className="icon-title-container">
              <BsFillBriefcaseFill />
              <p>{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr className="hr-line" />
        <div className="container">
          <h1 className="heading">Description</h1>
          <div className="icon-title-container">
            <a href={companyWebsiteUrl} className="visit-icon">
              Visit
            </a>
            <BiLinkExternal />
          </div>
        </div>
        <p className="description">{jobDescription}</p>
        <h1 className="heading">Skills</h1>
        <h1 className="heading">Life at Company</h1>
        <h1 className="heading">similar Jobs</h1>
        <ul className="list">
          {simililarJobsData.map(eachSkill => (
            <Skillscard jobdetails={eachSkill} key={eachSkill.id} />
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
