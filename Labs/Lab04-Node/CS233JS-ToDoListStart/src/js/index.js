/*  Overview
    This application simulates an electronic todo list.  Users can add and delete
    tasks from the list.  They can also mark that a task is complete.  The list
    of tasks is stored on the user's machine in local storage so that the tasks
    persist over time.

    The app is encapsulated in an ES6 style class.  
    
    The class has the following instance variables declared in the constructor:
    - tasks - an array of tasks.  Each task has a description and an isComplete property.

    The class has the following methods
    - loadTasks - displays the tasks on the page.  It is called in the constructor
                  and whenever a task is changed in any way.  It calls a helper method
                  generateTaskHtml to generate the html for an individual task object.
                  It also calls a helper method addEventHandlers to add the event handlers
                  that allow checking or deleting of a task to each task.
    - toggleTaskStatus - changes the isComplete property for an individual task.
                  This changes the style of the task on the page.  It is called by 
                  the change event handler on each checkbox.
    - deleteTask - removes a task from the list of tasks.  It is called by 
                  the click event handler for the trash can icon for each task.
    - addTask -   allows the user to add a new task to the list.  It is called
                  by the click event handler for the add button on the page.
*/

/*  Create a class called ToDoList
    PART 1 - Show the tasks
    -   Add stubs for all of the methods in the class:
        -   addTask, addEventHandlers, loadTask, generateTaskHtml
            toggleTaskStatus, deleteTask
        -   You can add a console.log statement to each of these if you like

    -   Add a constructor
        -   Create an instance variable called tasks.
        -   Set it equal to the following object literal
        -   [
                {description: 'Go to Dentist', isComplete: false},
                {description: 'Do Gardening', isComplete: true},
                {description: 'Renew Library Account', isComplete: false},
            ]
        -   call bind on addTask and addEventHandlers
        -   call the method loadTasks

    -   Finish the generateTaskHtml method (copy from below)
        -   This method generates the html for ONE task in the array
            It gets called in loadTasks.
        -   Replace TASK GOES HERE with with a template string that
            will write the description property of the task parameter
        -   Replace the other 2 ALL caps phrases with template strings
            that use the isComplete property of the task

    -   Finish the loadTasks method
        -   Create a variable tasksHtml and set it equal to the
            the return value for each of the individual tasks combined
            You can do this by calling the reduce method on the array
            It manipulates each element of an array to produce ONE result
                let tasksHtml = this.tasks.reduce(
                    (html, task, index) => html += this.generateTaskHtml(task), ''
                    )
        -   Set contents of the taskList element on the page to the tasksHtml variable
        -   Call the method addEventHandlers.  Eventually this will add the event handlers
            to the checkbox and delete icon for each task on the page.
        );
    END OF PART 1 - TEST AND DEBUG YOUR CODE - YOU SHOULD SEE 3 TASKS ON PAGE

    PART 2 - Toggle task status
    -   Finish the toggleTaskStatus method.  It has ONE parameter, the index of the task
        -   Change the isCompete property for the current task to its opposite
        -   Call loadTasks again to reload the list of tasks

    -   Finish the addEventHandlers method
        -   Create a variable called checkBoxes that refers to all of the 
            checkboxes on the page.  Each checkbox has the name toggleTaskStatus.
        -   Create a for loop that iterates through the checkBoxes array
            -   set the onchange event for the current checkbox to the method
                toggleTaskStatus and bind this and the index of the checkbox in that statement
                checkBoxes[i].onchange = this.toggleTaskStatus.bind(this, i);
        -   Repeat the 2 steps above for the links elements named deleteTask.
            Use the click event and deleteTask.  Use bind in the same way.
    END OF PART 2 - TEST AND DEBUG YOUR CODE

    PART 3 - Delete task
    -   Finish the deleteTask method.  It has 2 parameters, index and event
        -   prevent the default action of the anchor tag using the event parameter
        -   delete the task from the list
        -   call loadTasks
    END OF PART 3 - TEST AND DEBUG YOUR CODE

    PART 4 - Add task
    -   Add the function addTask.  It has no parameters
        -   get the text from the textbox with an id of add task
        -   if the text is blank 
                add a style is-invalid to the textbox
            otherwise
                remove the style is-invalid from the textbox
                create a new task object (use an object literal)
                    the newTask should have the description that the user entered
                    and an isComplete property of false
                add the new task to the task list
                call loadTasks
                clear the text box
            end if
    -   Add an onclick handler to the add button on the page
        in the constructor.  It should call addTaskClick
    END OF PART 4 - TEST AND DEBUG YOUR CODE

    PART 5 - Local Storage
    -   Load the task list from the 'TASKS' element from local storage
        at the top of the constructor.  
            You'll have to parse the json in order to put it in the task list
            You will also need to add an if statement to only load the default
            list of tasks when there's nothing in local storage
    -   Save the task list to the TASKS element in local storage in loadTasks
            You'll have to convert the json to a string to put it in local storage
            JSON.stringify is the opposite of JSON.parse
    END OF PART 5 - TEST AND DEBUG YOUR CODE - You're done writing code
*/

/*  THIS IS NECESSARY FOR TESTING ANY OF YOUR CODE
    declare a variable toDo
    Add a window on load event handler that instantiates a ToDo object.  
    Use and arrow or anonymous function
*/

function generateTaskHtml(task) {
    return `
      <li class="list-group-item checkbox">
        <div class="row">
          <div class="col-sm-1 pt-2 checkbox">
            <label><input name="toggleTaskStatus" type="checkbox" value="" class="" IS IT CHECKED></label>
          </div>
          <div class="col-sm-10 task-text SHOULD IT HAVE THE CHECKED CLASS">
            TASK DESCRIPTION GOES HERE
          </div>
          <div class="col-sm-1 pt-2 delete-icon-area">
            <a name="deleteTask" class="" href="/" ><i class="bi-trash delete-icon"></i></a>
          </div>
        </div>
      </li>
    `;
}

/* this is the completed version of generateTaskHtml
function generateTaskHtml(task) {
    return `
      <li class="list-group-item checkbox">
        <div class="row">
          <div class="col-sm-1 pt-2 checkbox">
            <label><input name="toggleTaskStatus" type="checkbox" value="" 
            class="" ${(task.isComplete)?"checked":"" } 
            /></label>
          </div>
          <div class="col-sm-10 task-text ${(task.isComplete)?"complete":"" }">
            ${task.description}
          </div>
          <div class="col-sm-1 pt-2 delete-icon-area">
            <a name="deleteTask"class="" href="/">
                <i class="bi-trash delete-icon"></i>
            </a>
          </div>
        </div>
      </li>
    `;
}
*/
