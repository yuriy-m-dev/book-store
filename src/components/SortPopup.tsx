import React, { useState, useRef, useEffect } from 'react'
import cn from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { AppStateType } from '../redux/store'
import { setSortBy } from '../redux/reducers/sort'

const SortPopup = () => {

  const sortData = useSelector((state: AppStateType) => state.sort.sortData)
  const [visiblePopup, setVisiblePopup] = useState(false)
  const [activeItem, setActiveItem] = useState(sortData[0].name)
  const sortRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useDispatch()

  const onPopupClick = () => {
    setVisiblePopup(!visiblePopup)
  }
  const onSortItemClick = (id: number, type: string, order: string) => {
    setActiveItem(sortData[id].name)
    setVisiblePopup(false)
    dispatch(setSortBy(type, order))
  }
  const handleOutsideClick = (event: any) => {
    const path = event.path || (event?.composedPath && event.composedPath())
    if (!path.includes(sortRef.current)) {
      setVisiblePopup(false)
    }
  }
  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick)
    return () => {
      document.body.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  return (
    <div className="sorting">
      <div ref={sortRef} className='sorting__inner'>
        <div className="sorting__label">
          <p>Sort by:</p>
          <span className={cn({rotate: visiblePopup})} onClick={onPopupClick}>{activeItem}</span>
        </div>
        {
          visiblePopup && <div className="sorting__popup">
            <ul>
              {
                sortData.map(obj => <li onClick={() => onSortItemClick(obj.id, obj.type, obj.order)} key={obj.id}>{obj.name}</li>)
              }
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default SortPopup