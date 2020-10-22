import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const LIST_VIEW_ICONS = ["bars", "border-all"]
const DATE_FILTERING_ICONS = ["sort-numeric-down", "sort-numeric-up"]

const FilterButtons = ({ onChange, filter }) => {
  return (
    <div className="filtering-menu mb-2">
      <FontAwesomeIcon size="2x" className="clickable hoverable mr-3" icon={LIST_VIEW_ICONS[filter.view.list]} onClick={() => onChange("view", { list: +!filter.view.list })} />
      <FontAwesomeIcon size="2x" className="clickable hoverable" icon={DATE_FILTERING_ICONS[filter.date.asc]} onClick={() => onChange("date", { asc: +!filter.date.asc })} />
    </div>
  )
}

export default FilterButtons
