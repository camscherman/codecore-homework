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

// Returns a string that neatly displays all of the items in a given board
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
// Takes arguments 'board name' and 'list name'. It will create a new list inside the stated board, provided it exists.
function createList(boardName , listName){
  let currentBoard = hello[boardName];
  if(!currentBoard){
    return "Board does not exist";
  }
  else{
    if(!!currentBoard[listName]){
      return "List name already exists";
    }
    else{
      currentBoard[listName] =[];
      return `List ${listName} created.`
    }
  }
}

function createCard(boardName, listName, cardName){
  let currentBoard = hello[boardName];
  if(!currentBoard){
    return "Board does not exist";
  }
  else{
    if(!currentBoard[listName]){
      return "List doesn't exist";
    }
    else{
      currentList = currentBoard[listName];


        currentList.push(cardName);
        return `${cardName} added to ${listName}.`

      }
    }
  }


listBoards(hello);

console.log(createBoard('Books'))
console.log(createBoard('Dreams'))
console.log(removeBoard('Books'));
console.log(removeBoard('Airplanes'));
console.log(displayBoard('Tester Board'));
console.log(createList('Dreams', 'Fly'));
console.log(createList('Dreams', 'Wish List'));
console.log(createCard('Dreams', 'Wish List', 'Flying'));
console.log(createCard('Dreams', 'Flying', 'Flying'));
console.log(createCard('Dreams', 'Wish List', 'Get my baby back'));
