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
listBoards(hello);
