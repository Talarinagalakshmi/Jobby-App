import Profile from '../Profile'
import {BsSearch} from 'react-icons/bs'
import './index.css'
const FilterItems = props => {
  const onChangeEmployeType = event => {
    const {changeEmployeeList} = props

    changeEmployeeList(event.target.value)
  }
  const renderTypeOfEmployment = () => {
    const {employmentTypesList} = props

    return (
      <div className="employement-type-container">
        <h1 className="employement-type-heading">Type Of Employment</h1>
        <ul className="employee-type-list-container">
          {employmentTypesList.map(employeType => (
            <li className="list-item-input" key={employeType.employmentTypeId}>
              <input
                type="checkbox"
                id={employeType.employmentTypeId}
                value={employeType.employmentTypeId}
                className="check-input"
                onChange={onChangeEmployeType}
              />
              <label
                className="check-label"
                htmlFor={employeType.employmentTypeId}
              >
                {employeType.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const renderSalaryRange = () => {
    const {salaryRangesList} = props
    return (
      <div className="salary-range-container">
        <h1 className="salary-range-heading">Salary Range</h1>
        <ul className="salary-range-list-container">
          {salaryRangesList.map(eachsalary => {
            const {changeSalary} = props
            const onClickSalary = () => {
              changeSalary(eachsalary.salaryRangeId)
            }
            return (
              <li
                className="salary-item"
                key={eachsalary.salaryRangeId}
                onClick={onClickSalary}
              >
                <input
                  type="radio"
                  id={eachsalary.salaryRangeId}
                  name="salary"
                  className="check-input"
                />
                <label
                  className="check-label"
                  htmlFor={eachsalary.salaryRangeId}
                >
                  {eachsalary.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
  return (
    <div className="Filters-group-container">
      <Profile />
      <hr className="hr-line" />
      {renderTypeOfEmployment()}
      <hr className="hr-line" />
      {renderSalaryRange()}
    </div>
  )
}
export default FilterItems
