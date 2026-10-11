import type { MenuItem } from '../../types/menu'
import { isDrink, menuProductImages } from './menuProductImages'

export default function MenuProductVisual({ item }: { item: MenuItem }) {
  const image = menuProductImages[item._id]
  return <div className="menu-tile-visual">
    {image ? <img src={image.src} alt={image.alt} className="menu-tile-image" /> :
      <svg className="menu-tile-image menu-tile-placeholder" viewBox="0 0 280 280" role="img" aria-label={`Image placeholder for ${item.name}`} fill="none">
        {isDrink(item) ? <>
          <path d="M109 55c-12-14 13-21 1-36M144 55c-12-14 13-21 1-36" stroke="#526B3F" strokeWidth="3" strokeLinecap="round" opacity=".55" />
          <path d="M189 105h15c43 0 43 65 0 65h-17" stroke="#526B3F" strokeWidth="11" />
          <path d="M61 86h137l-9 99c-2 27-23 39-60 39s-58-12-60-39z" fill="#A8B982" fillOpacity=".35" stroke="#526B3F" strokeWidth="3" />
          <ellipse cx="129" cy="86" rx="68" ry="17" fill="#F7F3E8" stroke="#526B3F" strokeWidth="3" />
          <ellipse cx="129" cy="86" rx="55" ry="10" fill="#362820" fillOpacity=".8" />
          <path d="M49 241h166" stroke="#526B3F" strokeWidth="3" strokeLinecap="round" opacity=".35" />
        </> : <>
          <path d="M76 80h128l13 157H63z" fill="#A8B982" fillOpacity=".35" stroke="#526B3F" strokeWidth="3" strokeLinejoin="round" />
          <path d="M109 99V68a31 31 0 0 1 62 0v31" stroke="#526B3F" strokeWidth="3" strokeLinecap="round" />
          <path d="M125 169h30M140 154v30" stroke="#526B3F" strokeWidth="3" strokeLinecap="round" opacity=".5" />
        </>}
      </svg>}
  </div>
}
