const hello = {
  'Tester Board': {
    'To Do': ['Laundry', 'Buy Apples', 'Pay Phone Bill'],
    'Doing': ['Laundry', 'Studying Javascript', 'Studying HTML', 'Studying Ruby'],
    'Done': ['Laundry']
  },
  'Dreams': {
    'Wish List': ['Conquer the Seven Kingdoms', 'Get my baby back', 'My hand needs to chill']
  }
}

function listBoards (obj) {
  const breakLine = '----------------'
  console.log(breakLine);
  let enumerate = 1;
  for (let item in obj) {
    currString = enumerate + "-" + item;
    console.log(breakLine);
    enumerate += 1;
  }
};

// Adds a board to the 'hello' object
function createBoard (boardName) {
  if (!hello[boardName]) {
    hello[boardName] = {};
    return `Board ${boardName} was created.`;
 }  else {
    return "Board already exists.";
  }
};

// removes a board from the 'hello' object
function removeBoard (boardName) {
    if (!hello[boardName]) {
      return `Board doesn't exist`;
    }  else {
      delete hello[boardName];
      return `Board ${boardName} was removed.`;
  }
};

// Returns a string that neatly displays all of the items in a given board
function displayBoard (boardName) {
  let displayString = ''
  if (!hello[boardName]){
    displayString = `Board doesn't exist`;
} else {
    const break_line = "\n|----------------"
    let currentBoard = hello[boardName];
    displayString = break_line;
    for (let property in currentBoard) {
      displayString += "\n| "+ property + break_line;
      for(let item of currentBoard[property]) {
        displayString += "\n> " + item;
      }
    }
  }
  return displayString;
};
// Takes arguments 'board name' and 'list name'. It will create a new list inside the stated board, provided it exists.
function createList (boardName , listName) {
  let currentBoard = hello[boardName];
  if (!currentBoard) {
    return "Board does not exist";
  } else {
    if (!!currentBoard[listName]) {
              return "List name already exists";
          } else {
                  currentBoard[listName] =[];
                  return `List ${listName} created.`;
          }
    }
}

function createCard(boardName, listName, cardName){
  let currentBoard = hello[boardName];
  if (!currentBoard) {
    return "Board does not exist";
  } else {
    if (!currentBoard[listName]) {
      return "List doesn't exist";
    } else {
      currentList = currentBoard[listName];
      currentList.push(cardName);
      return `${cardName} added to ${listName}.`
    }
  }
}

function removeList (boardName, listName) {
  let currentBoard = hello[boardName];
  if(!currentBoard){
    return "No such board."
  } else {
    if (!currentBoard[listName]) {
      return `${boardName} does not contain a list called ${listName}`;
    }
    else{
      delete currentBoard[listName];
      return `${listName} deleted.`
    }
  }
};

function removeCard (boardName, listName, cardIndex) {
  let currentBoard = hello[boardName];
  if(!currentBoard){
    return 'No such board.';
  } else {
    if(!currentBoard[listName]){
      return "No such list.";
    } else {
      if(!currentBoard[listName][cardIndex]){
        return "No such card";
      } else {
        let item = currentBoard[listName].splice(cardIndex,1);
        return `${item} deleted from ${listName}.`;
      }
    }
  }
}

function moveCard(boardName, fromList, toList, fromCardIndex, toCardIndex){
  let currentBoard = hello[boardName];
  if (!currentBoard) {
    return "No such board.";
  } else {
      if( !currentBoard[fromList] || !currentBoard[toList]){
        return "One of more of these lists doesn't exist";
      } else {
         if(!currentBoard[fromList][fromCardIndex]){
          return `There is no item at index ${fromCardIndex}`;

        } else {
          let item = currentBoard[fromList].splice(fromCardIndex,1);
          currentBoard[toList].splice(toCardIndex,0, item);
          return `${item} moved from ${fromList} to ${toList}.`;
        }
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
console.log(removeList('Dreams', 'booo'));
console.log(removeCard('Dreams', 'Wish List', 0));
console.log(moveCard('Tester Board', 'To Do', 'Doing', 1 , 1));
