import './index.css'
const Skillscard = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails
  return (
    <li className="skills-item-container">
      <div className="skills-container">
        <img src={imageUrl} alt={name} className="skill-image" />
        <p className="skill-name">{name}</p>
      </div>
    </li>
  )
}
export default Skillscard
