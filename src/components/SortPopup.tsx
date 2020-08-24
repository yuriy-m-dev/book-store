import React, { useState, useRef, useEffect } from 'react'
import cn from 'classnames'

type PropsType = {
  sortData: Array<SortDataType>,
  onSortItemClick: (type: string, order: string) => void
}
type SortDataType = {
  id: number
  name: string
  type: string
  order: string
}

const SortPopup = ({ sortData, onSortItemClick }: PropsType) => {

  const [visiblePopup, setVisiblePopup] = useState(false)
  const [activeItem, setActiveItem] = useState(sortData[0].name)
  const sortRef = useRef<HTMLDivElement | null>(null)

  const onPopupClick = () => {
    setVisiblePopup(!visiblePopup)
  }
  const onItemClick = (id: number, type: string, order: string) => {
    setActiveItem(sortData[id].name)
    setVisiblePopup(false)
    onSortItemClick(type, order)
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
                sortData.map(obj => <li onClick={() => onItemClick(obj.id, obj.type, obj.order)} key={obj.id}>{obj.name}</li>)
              }
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default SortPopup