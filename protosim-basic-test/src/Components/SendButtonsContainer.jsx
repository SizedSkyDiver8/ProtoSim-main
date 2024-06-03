import SquareButton from "./SquareButton"

function SendButtonsContainer({timestamp, onClick}) {
    return (
        <div className="send-buttons-container">
            <span className="timestamp">{"00:00:00" || timestamp}</span>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center", gap:"10px"}}>
            <input style={{width:"100px"}} className="repeat-input" type="number" inputMode="numeric" defaultValue={1000} />
            ms
            <SquareButton type={"repeat"} />
            </div>
            <SquareButton onClick={() => onClick} type={"send"} />
        </div>
    )
}

export default SendButtonsContainer

