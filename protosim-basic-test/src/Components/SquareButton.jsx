function SquareButton({type, onClick}) {
    return (
        <button onClick={onClick} className="square-button">
            {type === "send" && <span><img className="btn-wrapper" src="play-buttton.png" alt="" />▶️</span>}
            {type === "pause" && <span><img className="btn-wrapper" src="play-buttton.png" alt="" />⏸️</span>}
            {type === "repeat" && <span><img className="btn-wrapper" src="repeat.png" alt="" />🔁</span>}
        </button>
    )
}

export default SquareButton
