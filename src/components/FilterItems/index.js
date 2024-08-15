import Profile from "../Profile"

import './index.css'
const FilterItems = props => {
  const renderTypeOfEmployment = () => {
    const {employmentTypesList} = props
    return (
      <div className="">
        <h1 className="heading">Type Of Employment</h1>
        <ul>
          {employmentTypesList.map(employeType => {
            const {changeEmployeeList} = props
            const onChangeEmployeType = () => {
              changeEmployeeList(employeType.employmentTypeId)
            }

            return (
              <li
                className="list-item-input"
                key={employeType.employmentTypeId}
                onChange={onChangeEmployeType}
              >
                <input
                  type="checkbox"
                  id={employeType.employmentTypeId}
                  value={employeType.employmentTypeId}
                />
                <label className="label" htmlFor={employeType.employmentTypeId}>
                  {employeType.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const renderSalaryRange = () => {
    const {salaryRangesList} = props
    return (
      <div>
        <h1 className="heading">Salary Range</h1>
        <ul>
          {salaryRangesList.map(eachsalary => {
            const {changeSalary} = props
            const onClickSalary = () => {
              changeSalary(eachsalary.salaryRangeId)
            }
            return (
              <li
                className="list-item-input"
                key={eachsalary.salaryRangeId}
                onClick={onClickSalary}
              >
                <input
                  type="radio"
                  id={eachsalary.salaryRangeId}
                  value={eachsalary.salaryRangeId}
                />
                <label className="label" htmlFor={eachsalary.salaryRangeId}>
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
    <div className="Filter-Items-container">
    <Profile />
      <hr className="hr-line" />
      {renderTypeOfEmployment()}
      <hr className="hr-line" />
      {renderSalaryRange()}
    </div>
  )
}
export default FilterItems
