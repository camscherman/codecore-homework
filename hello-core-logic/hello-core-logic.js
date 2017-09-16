const hello = {
    'Tester Board': {
      'To Do': ['Laundry', 'Buy Apples', 'Pay Phone Bill'],
      'Doing': ['Laundry', 'Studying Javascript', 'Studying HTML', 'Studying Ruby'],
      'Done': ['Laundry']
    },
    'Dreams': {
      'Wish List': ['Conquer the Seven Kingdoms', 'Get my baby back', 'My hand needs to chill'],
    }
};


function listBoards(obj){

      const break_line = "----------------"
      console.log(break_line);
      let enumerate = 1;

      for(let item in obj){
          curr_string = enumerate + "-" + item;
          console.log(curr_string);
          console.log(break_line);
          enumerate += 1;
      };

};

// Adds a board to the 'hello' object
function createBoard(boardName){
    if(!hello[boardName]){
      hello[boardName] = {};
      return `Board ${boardName} was created.`;

    }
    else{
      return "Board already exists."
    }
  };

// removes a board from the 'hello' object
function removeBoard(boardName){
    if(!hello[boardName]){
      return `Board doesn't exist`;
    }
    else{
      delete hello[boardName];
      return `Board ${boardName} was removed.`;
    }

};


function displayBoard(boardName){
  let displayString = ""
  if(!hello[boardName]){
    displayString = `Board doesn't exist`;
  }
  else{
    const break_line = "\n|----------------"
    let currentBoard = hello[boardName];
    displayString = break_line;
    for(let property in currentBoard){
      displayString += "\n| "+ property + break_line;
      for(let item of currentBoard[property]){
        displayString += "\n> " + item;

      }
    }


  }
  return displayString;
};
listBoards(hello);

console.log(createBoard('Books'))
console.log(createBoard('Dreams'))
console.log(removeBoard('Books'));
console.log(removeBoard('Airplanes'));
console.log(displayBoard('Tester Board'));
