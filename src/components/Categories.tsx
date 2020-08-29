import React, { useState } from 'react'
import cn from 'classnames'
import { useDispatch } from 'react-redux'
import { setActiveCategory } from '../redux/reducers/category'

type PropsType = {
  categoryNames: Array<string>,
  activeCategory: number | null
}

const Categories = ({ categoryNames, activeCategory }: PropsType) => {

  const dispatch = useDispatch()
  let [allCategory, setAllCategory] = useState(true)

  const onAllCategoryClick = () => {
    setAllCategory(true)
    onCategoryItemClick(null)
  }
  const onCategoryItemClick = (index: number | null) => {
    dispatch(setActiveCategory(index))
    setAllCategory(false)
  }

  return (
    <div className="nav">
      <div className="nav__title">Categories</div>
      <ul className="nav__list">
        <li onClick={onAllCategoryClick} className={cn('nav__item', {active: allCategory})}>All</li>
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