import './index.css'

const MenuItem = props => {
  const {menuItem, clickMenuItem, isActive} = props
  const {menuCategory, menuCategoryid} = menuItem
  const onClickMenuItem = () => {
    clickMenuItem(menuCategoryid)
  }
  const activeMenuClass = isActive ? 'activeMenu' : ''
  return (
    <button
      className={`menuCategoryButton ${activeMenuClass}`}
      type="button"
      onClick={onClickMenuItem}
    >
      {menuCategory}
    </button>
  )
}

export default MenuItem
