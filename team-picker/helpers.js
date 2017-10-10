const helpers = {
    divideIntoNteams: function(members, numTeams=1){
      let teams= []
      let shuffledmems = this.shuffleMembers(members)
      let length = shuffledmems.length
      let index = Math.ceil(length/numTeams);
      let bottomSlice =0;
      let topSlice = index;
      while(bottomSlice < length){
        if(topSlice > length){
          teams.push(shuffledmems.slice(bottomSlice, length).join(', '))
          return teams;
        }
        teams.push(shuffledmems.slice(bottomSlice, topSlice).join(', '))
        bottomSlice += index;
        topSlice += index;
      }
      return teams;

    },
    membersPerTeam: function(members, membersPerTeam=1){
      let teams = []
      let shuffledmems = this.shuffleMembers(members)
      let length = shuffledmems.length
      let index = membersPerTeam;
      let bottomSlice =0;
      let topSlice = index;
      while(bottomSlice < length){
        if(topSlice > length){
          teams.push(shuffledmems.slice(bottomSlice, length).join(', '))
          return teams;
        }
        teams.push(shuffledmems.slice(bottomSlice, topSlice).join(', '))
        bottomSlice += index;
        topSlice += index;
      }
      return teams;

    },
    shuffleMembers: function(members){

      let shuffledMembers = []
      let holder = members.slice(0, members.length)
      while(holder.length > 0){
        shuffledMembers.push(holder.splice(Math.floor(Math.random()*holder.length), 1)[0]);
      }
      return shuffledMembers;
    }

}

module.exports = helpers
