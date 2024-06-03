import Attitude from "./Attitude"
import MessagesColumnContainer from "./MessagesColumnContainer"
import GpsRawInt from "./GpsRawInt"

function UavSide() {
    

    return (
        <>
        
            <MessagesColumnContainer>
            <Attitude  />
            <GpsRawInt />
            </MessagesColumnContainer>
        </>
    )
}

export default UavSide
