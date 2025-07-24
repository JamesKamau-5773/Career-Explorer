import React from 'react'

function CareerCard({career, onEdit, onDelete}) {
  if (!career) {
    return <div className='Card'>No career data available</div>;
  }

  console.log('CareerCard received:', career);

 

  const { 
    id, 
    title, 
    description, 
    salaryRange, 
    requiredSkills, 
    educationLevel,  
    requiredGrades 
  } = career;
  
    return (
    <div className='Card'>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>Salary Range: {salaryRange}</p>
      <p>Required Skills: {requiredSkills.join(', ')}</p>
      <p>Education Level: {Array.isArray(educationLevel) ? educationLevel.join(', ') : educationLevel}</p>
      <p>Required Grades: {Array.isArray(requiredGrades) ? requiredGrades.join(', ') : requiredGrades}</p>
      <div className='CardBtns'>
        {onEdit && <button onClick={() => onEdit(id)}>Edit</button>}
        {onDelete && <button onClick={() => onDelete(id)}>Delete</button>}
      </div>
    </div>  
  )
}

export default CareerCard