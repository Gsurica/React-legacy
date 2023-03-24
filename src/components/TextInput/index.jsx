import './styles.css'

export const TextINput = ({ searchValue, handleChange }) => {
  return (
    <input 
      className="text-input"
      value={searchValue}
      type="search" 
      onChange={handleChange}
      placeholder="Type your search!@"
    />
  )
}