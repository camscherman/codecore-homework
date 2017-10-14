//  I've created a class Cohort to isolate the methods and data for each cohort into an object

class Cohort {

    constructor(name, members, id) {
        this.name = name
        this.members = members
        this.id = id
        this.has_teams = false
        this.teams = []
    }
    // Makes teams by calling either breakIntoNTeams or nMembersPerTeam, depending on method selection. 
    makeTeams(number, method) {
        const cohortArray = this.members.split(',')
        let split = number
        if (cohortArray.length < number) {
            let split = cohortArray.length
        }
        if (method === 'team_count') {

            this.teams = this._breakIntoNTeams(cohortArray, split, this._shuffleArray)
        } else {
            this.teams = this._nMembersPerTeam(cohortArray, split, this._shuffleArray)
        }
        this.has_teams = true
    }


    // Breaks a cohort into N teams... you can pass it a function to change the ordering method (shuffleArray is used in this case)
    _breakIntoNTeams(arr, N, fn = (arr) => { return arr }) {
        let clone = fn(arr.map((n) => { return n }))
        let teams = []
        const length = arr.length
        for (let i = 0; i < N; i++) {
            teams.push([]);
        }
        for (let j = 0; j < length; j++) {
            let index = j % N
            teams[index].push(clone.pop())
        }
        return teams
    }

    _nMembersPerTeam(arr, N, fn) {
        const numTeams = Math.ceil(arr.length / N)
        return this._breakIntoNTeams(arr, numTeams, fn)
    }


    //  Returns a randomly shuffled copy array when passed any given array
    _shuffleArray(arr) {
        let arrayClone = arr.map((item) => { return item })
        let shuffledArray = []
        let l = arrayClone.length
        while (l > 0) {
            shuffledArray.push(arrayClone.splice(Math.floor(Math.random() * l), 1)[0])
            l = arrayClone.length
        }
        return shuffledArray
    }
    //returns boolean to tell if a cohort has been divided into teams or not
    hasTeams() {
        return this.has_teams
    }

    returnTeams() {
        let teams = {}
        for (let i = 1; i <= this.teams.length; i++) {
            teams[i] = this.teams[i - 1].join(", ")
        }
        return teams
    }
    returnMembers() {
        return this.members
    }
    returnName() {
        return this.name
    }


}

module.exports = Cohort