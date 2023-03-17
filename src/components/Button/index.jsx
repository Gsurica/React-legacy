import './styles.css'

export const Button = ({ text, onClick, disable }) => {
  return (
    <div className="button-container">
      <button className="button" onClick={onClick} disabled={disable}>
        { text } 
      </button>
    </div>
  )
}