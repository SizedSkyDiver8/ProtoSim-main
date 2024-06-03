function Checkbox({label,isChecked, setChekced}) {
    return (
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <label>{label}</label>
        <input type="checkbox" checked={isChecked} onChange={() => setChekced(!isChecked)} />
        </div>
    )
}

export default Checkbox
