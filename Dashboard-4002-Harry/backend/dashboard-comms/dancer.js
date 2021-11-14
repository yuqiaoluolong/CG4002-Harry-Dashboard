class Dancer {
    
     
    
    constructor(number, isHoldingEmg) {
        this.index = number
        this.syncRating = null
        this.currMove = null
        this.correctMoves = 0
        this.moveAccuracy = 0

        this.beetleStatus = [false, false]
        if(isHoldingEmg)
            this.emgBeetleStatus = false
        

    }

    updateMoveAccuracy(new_move, performedMoves) {
        if (new_move == this.currMove)
            this.correctMoves += 1

        if (performedMoves > 0)
            this.moveAccuracy = this.correctMoves/performedMoves  * 100
    }

} 
export default Dancer;