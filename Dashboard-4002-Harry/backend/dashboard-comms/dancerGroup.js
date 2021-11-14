
const Dancer = require("./dancer.js")
const SYNC_RATING = ["None", "Too Fast", "Just Right", "Too Slow"]
const MAX_DANCERS = 3

class DancerGroup {
    
    constructor() {
        this.dancers = [new Dancer(1), new Dancer(2, true), new Dancer(3)]
        this.performedMoves = 0


        this.groupMoveAccuracy = 0
        
        this.position
        this.correctPositions = 0
        this.groupPositionAccuracy = 0

        this.syncDelay = []
        this.averageSync = 0


    }


    updateBeetleStatus(beetle_index, status, isEmgBeetle = false) {
        if (isEmgBeetle)
            this.dancers[1].emgBeetleStatus = status
        else {
            var dancer_index = 0
            if (beetle_index > 3)
                dancer_index = 2
            else if (beetle_index > 1)
                dancer_index = 1
            
            this.dancers[dancer_index].beetleStatus[beetle_index % 2] = status
        }

    }

    updateDanceMove(index, move) {
        console.log(index)
        this.dancers[index].currMove = move
    }

    updateSyncRating(index, syncRating) {
        this.dancers[index].syncRating = syncRating
    }

    updateInferenceResults(position, move, syncDelay) {
	this.performedMoves += 1
        for (var i = 0; i < MAX_DANCERS; i++)
            this.dancers[i].updateMoveAccuracy(move, this.performedMoves)
        
        var calc_num = this.dancers[0].correctMoves + this.dancers[1].correctMoves + this.dancers[2].correctMoves
        var calc_den = this.performedMoves * 3
        this.groupMoveAccuracy = calc_num /calc_den * 100

        this.position = position.split(" ").map(Number)
    }


  }
export default DancerGroup;
