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
  