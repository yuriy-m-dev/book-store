import React from 'react'
import cn from 'classnames'

type PropsType = {
  categoryNames: Array<string>,
  activeCategory: number,
  onCategoryItemClick: (index: number) => void
}

const Categories = ({ categoryNames, activeCategory, onCategoryItemClick }: PropsType) => {

  return (
    <div className="nav">
      <div className="nav__title">Categories</div>
      <ul className="nav__list">
        {
          categoryNames.map((item, index) => <li onClick={() => onCategoryItemClick(index)} 
          className={cn('nav__item', {active: activeCategory === index})} 
          key={index}>{item}</li>)
        }
      </ul>
    </div>
  )
}

export default Categories