import Attitude from "./Attitude"
import MessagesColumnContainer from "./MessagesColumnContainer"
import SetMode from "./SetMode"

function GcsSide() {
    return (
        <MessagesColumnContainer>
            <SetMode />
            <Attitude disabled={true} />
        </MessagesColumnContainer>
    )
}

export default GcsSide
