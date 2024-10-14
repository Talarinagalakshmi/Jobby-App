import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import FilterItems from '../FilterItems'
import {BsSearch} from 'react-icons/bs'
import JobsList from '../JobsList'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}
class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    employeType: [],
    minimumSalary: 0,

    jobsList: [],
  }
  componentDidMount() {
    this.getjobs()
  }
  getjobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {employeType, minimumSalary, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeType.join()}&minimum_package=${minimumSalary}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchData = await response.json()
      const updatedJobs = fetchData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }
  renderJobsList = () => {
    const {jobsList} = this.state
    const renderJobsListlength = jobsList.length > 0

    return renderJobsListlength ? (
      <div className='all-jobs-container'>
        <ul className='jobs-list'>
          {jobsList.map(job => (
            <JobsList key={job.id} jobDetails={job} />
          ))}
        </ul>
      </div>
    ) : (
      <div className='no-jobs-view'>
        <img
          src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png'
          className='no-jobs-img'
          alt='no jobs'
        />
        <h1 className='no-jobs-heading'>No Jobs Found</h1>
        <p className='no-jobs-description'>
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className='jobs-error-view-container'>
      <img
        src='https://assets.ccbp.in/frontend/react-js/failure-img.png '
        className='jobs-failure-img'
        alt='failure view'
      />
      <h1 className='jobs-failure-heading-text'>Oops! Something Went Wrong </h1>
      <p className='jobs-failure-description'>
        We cannot seem to find the page you are looking for
      </p>
      <button
        type='button'
        onClick={this.getjobs}
        className='jobs-failure-button'
      >
        Retry
      </button>
    </div>
  )
  renderLoadingView = () => (
    <div className='loader-container' data-testid='loader'>
      <Loader type='ThreeDots' color='#ffffff' height='50' width='50' />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getjobs()
    }
  }

  changeSalary = salary => {
    this.setState({minimumSalary: salary}, this.getjobs)
  }

  changeEmployeeList = type => {
    const {employeType} = this.state

    const inputNotInList = employeType.filter(eachItem => eachItem === type)
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          employeType: [...prevState.employeType, type],
        }),
        this.getjobs,
      )
    } else {
      const filteredData = employeType.filter(eachItem => eachItem !== type)
      this.setState({employeType: filteredData}, this.getjobs)
    }
  }
  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className='jobs-container'>
          <div className='jobs-content'>
            <FilterItems
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeSearchInput={this.changeSearchInput}
              searchInput={searchInput}
              getJobs={this.getjobs}
              changeSalary={this.changeSalary}
              changeEmployeeList={this.changeEmployeeList}
            />
          </div>
          <div className='search-input-jobs-list-container'>
            <div className='search-input-container-desktop'>
              <input
                onChange={this.changeSearchInput}
                className='search-input-desktop'
                type='search'
                placeholder='Search'
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                type='button'
                className='search-button-container-desktop'
                data-testid='searchButton'
                onClick={this.getjobs}
              >
                <span className='visually-hidden'>Search</span>
                <BsSearch className='search-icon-desktop' />
              </button>
            </div>
            {this.renderAllJobs()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
