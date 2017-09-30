// Create the Task class. It should take a 'task' and an optional 'name' as imput
// Returns string formatted as "Clean Table" or "Clean Table • Cam"
// Example Usage:
// 
// const myTask = new Task('Clean dishes');
// const myTaskWithAssignee = new Task('Wash clothes', 'You');
// It should have a render method that returns a formatted string to display the task with its name and its assignee.
// 
    // myTask.render() // returns 'Clean Dishes'
// myTaskWithAssignee.render() // returns 'Wash clothes • You'

// I'm constructing a Render Helper to make rendering easier and to avoid 
// redundant code later.

class RenderHelper{
    constructor(){
        this.index = 0;
    }
    title(titleString){
        return `************\n*${titleString}*\n************\n`;
    }
    header(headerString){
        return `|----------\n| ${headerString} \n|----------\n`
    }
    listEnumerate(listItem){
        
        let curr_string = `| ${this.index}> ${listItem}\n`
        this.index +=1;
        return curr_string;
    }
    listIndexReset(){
        //returns an empty line for list formatting
        this.index = 0;
        return `| \n`
    }
}


class Task{
    constructor(task, name = null){
        this.task = task;
        this.name= name;
    }
    render() {
        let retString = this.task;
        if(!this.name){
            retString += '.';
            return retString;
        } else {
            retString += ` • `;
            retString += this.name;
            retString += ".";
            return retString;
        }
    }
}

// test
const newTask = new Task("Wash dishes", "Cam");
console.log(newTask.render());
       
    
    
    
    // Lists
    // Create a List class that represents a list.It should be initialized with a name.
// 
        // List#addTask
    // It should have a addTask method that takes a Task instance and adds it to the end of the list.You should be able to chain addTask.
// 
    // Example Usage:
// 
    // const toDoList = new List('To Do');
// 
    // adds 'Laundry' task to 'To Do' list
    // toDoList.addTask(new Task('Laundry', 'You'));
    // also works by chaining
    // toDoList
        // .addTask(new Task('Buy Apples'))
        // .addTask(new Task('Pay Phone Bill', 'Me'));
    // List#removeTask
    // It should have a removeTask method that takes the name of a Task, finds it in the list and removes it.Then, it should return the removed task object or null if it couldn't find a task with that name to remove.
// 
    // Example Usage:
// 
    // toDoList.addTask('Remove Me!');
// 
    // Finds and removes task named 'Remove Me!'
    // toDoList.removeTask('Remove Me!');
    // List#render
    // It should have a render method that returns a formatted string to display the list with its name and all its tasks (using their render methods).
// 
        // toDoList.render();
// 
    // returns '|---------\n| To Do\n|---------\n| 0> Laundry • You\n| 1> Buy Apples \n| 2> Pay Phone Bill • Me\n|'
// 
    // 
class List{

    constructor(listName){
        this.listName = listName;
        this.tasks =[];
        this.helper = new RenderHelper;
        }
    addTask(NewTask){
        this.tasks.push(NewTask);
        return this;
    }
    removeTask(taskName){
        let retItem = null
        for (let i = 0 ; i < this.tasks.length ; i++){
            if( this.tasks[i].task === taskName){
                retItem = this.tasks[i];
                this.tasks.splice(i, 1);
                return retItem;
            }
        }

        return retItem;
    }
    
    render(){
        let retString = this.helper.header(this.listName);
        for ( let task of this.tasks ){
            retString += this.helper.listEnumerate(task.render());
        }
        retString += this.helper.listIndexReset();
        return retString;

    }

}





    // Board
    // Create a Board class that represents a board.It should be initialized with a name.
// 
        // Board#addlist
    // It should have a addList method that takes a List instance and adds it to the end of the board.You should be able to chain addList.
// 
        // Here's a more complete usage that involves creating several lists, adding their tasks then adding those lists to a board with heavy use of chaining:
// 
    
    // Board#removeList
    // It should have a removeList method that takes the name of a List, finds it in list board and removes it.Then, it should return the removed list object or null if it couldn't find a list with that name to remove.
// 
    // Example Usage:
// 
    // myBoard.addList('Remove Me!');
// 
    // Finds and removes the list named 'Remove Me!'
    // myBoard.removeList('Remove Me!');
    // Board#render
    // It should have a render method that returns a formatted string to display the entire board with its name and all its rendered lists.
// 
    // Example Usage:
// 
    // myBoard.render();
// 
    // returns some very long ugly string with a bunch of '\n' characters, but 
    // displays as shown below when it is logged with `console.log`.
// 
    // console.log(myBoard.render());
// 
    // /* logs
    // 
    // ************
    // * My Board *
    // ************
    // |---------
    // | To Do
    // |---------
    // | 0> Laundry • You
    // | 1> Buy Apples
    // | 2> Pay Phone Bill • Me
    // |
    // |---------
    // | Doing
    // |---------
    // | 0> Laundry
    // | 1> Study JavaScript • Jill
    // | 2> Study HTML • Jill
    // | 3> Study Ruby • Me
    // |
    // |--------
    // | Done
    // |--------
    // | 0> Laundry
    // | 1> Ruby Exercises Homework
    // |
    // 
    // */
    // Board#moveTaskTo
    // It should have a moveTaskTo method that moves a task from a list in the board to a another list in the board.
// 
        // Using the same myBoard declared above
        // myBoard.moveTaskTo('Laundry', 'To Do', 'Doing');
    // myBoard.moveTaskTo('Buy Apples', 'To Do', 'Doing');
// 
    // After moving two tasks from 'To Do' to 'Doing', ...
    // console.log(myBoard.render())
// 
// /* logs
// ************
// * My Board *
// ************
// |---------
// | To Do
// |---------
// | 0> Pay Phone Bill • Me
// |
// |---------
// | Doing
// |---------
// | 0> Laundry
// | 1> Study JavaScript • Jill
// | 2> Study HTML • Jill
// | 3> Study Ruby • Me
// | 4> Laundry • You
// | 5> Buy Apples
// |
// |--------
// | Done
// |--------
// | 0> Laundry
// | 1> Ruby Exercises Homework
// |
// */

class Board{
    
    constructor (boardName) {
        this.boardName = boardName;
        this.lists = [];
        this.helper = new RenderHelper;
    }

    addList (listObj) {
        this.lists.push(listObj);
        return this;
    }
    removeList (listName){
        let retItem = null;
        for( let i = 0; i < this.lists.length ; i++){
            if(this.lists[i].listName === listName){
                retItem = this.lists[i];
                this.lists.splice(i,1);
                return retItem;
            }
        }
        
        return retItem;
    }
    moveTaskTo(task, fromList, toList){
        
        let fromL = this.listGetter(fromList, this.lists);
        let toL = this.listGetter(toList, this.lists);
        let taskObj = fromL.removeTask(task);
        if(fromL === null || toL === null || taskObj === null){
            return null;
        }
        else{
            toL.addTask(taskObj);
            return this;
        }

    }
    render(){
        let retString = this.helper.title(this.boardName);
        for (let list of this.lists){
            retString += list.render();
        }
        return retString; 
    }
    // List getter method is used internally by moveTaskTo to make retrieving lists easier and less
    // redundant.
    listGetter(targetItem, holderArr){
        let holder =null;
        for ( let item of holderArr){
            if (item.listName === targetItem){
                holder = item;
                return holder;
            }   
        }
        return holder;

    }

    
}





// Tests 
 const toDoList = new List('To Do').addTask(new Task('Laundry', 'You')).addTask(new Task('Buy Apples')).addTask(new Task('Pay Phone Bill', 'Me'));
// 
     const doingList = new List('Doing').addTask(new Task('Laundry')).addTask(new Task('Study JavaScript', 'Jill')).addTask(new Task('Study HTML', 'Jill')).addTask(new Task('Study Ruby', 'Me'));
// 
     const doneList = new List('Done')
         .addTask(new Task('Laundry'))
         .addTask(new Task('Ruby Exercises Homework'));
// 
     const myBoard = new Board('My Board').addList(toDoList).addList(doingList).addList(doneList);

     console.log(myBoard.render());

    myBoard.moveTaskTo('Laundry', 'To Do', 'Doing');
     myBoard.moveTaskTo('Buy Apples', 'To Do', 'Doing');

     console.log(myBoard.render());

 // Test Remove List
 
 myBoard.removeList('To Do');
 console.log(myBoard.render());