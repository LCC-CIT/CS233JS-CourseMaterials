// Notice the import statements
import './general';
const regeneratorRuntime = require("regenerator-runtime");
import { Chart, registerables } from 'chart.js';

class Status {
  constructor() {
    Chart.register(...registerables);
    /* Part 1 - Finish the constructor
    - Add references to each of these elements on the page
        this.$experienceTab = document.querySelector('#experienceTab');
        this.$professionTab = 
        this.$professionCanvas = 
        this.$experienceCanvas = 
        this.$loadingIndicator = 
        this.$tabArea = 
        this.$chartArea = 
        this.$errorMessage = 
    - Add an instance variables for the data that comes back from the service
        this.allData;
        this.professionData;
        this.experienceData;
    - Add instance variables for the chart objects themselves
        this.experienceChart;
        this.professionChart;
        
    - Call loadData.  It will make the ajax call and create one graph
    - Call addEventListeners
    */
  }
 
  /* This method will take the raw data from the api - an array of participant objects and 
     will return the number of times each value for that property occurs for a participant.
     Calling groupData with "profession" returns an object {college: 1, employee: 2, school: 1, trainee: 2} for example
  */
  groupData(data, property)
  {
     return data.map(val => val[property]).
        reduce((acc, val, i) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
        }, {}
      );
  }

/* Part 2 - Write these 2 methods. 
   Instantiate an object at the bottom of the class.
   Then TEST.  The experience chart should work at this point. */
  loadData() {
    /* Make an api call using fecth. Because it's a get request with no data,
       the only parameter is SERVER_URL.
       When the Promise returns successfully, parse the response as json
       When the json parse returns successfully, 
          set allData to the data that's returned
          set experienceData to the return from calling groupData with all of the data and 'experience' as parameters
          set professionData to the return from calling groupData with all of the data and 'profession' as parameters
          hide the loading indicator - add visually-hidden style
          show the tab area and the chart area - remove visually-hidden style
          call createExperienceChart
          call createProfessionChart - it won't work yet but it will at the end of part 3
          call showExperience - it's the default chart.  Eventually you'll call loadProfession too
       When an error occurs
          hide the loading indicator
          show the error message
      */
  }

  addEventListeners() {
    // add a click event handler to the experienceTab.  Call loadExperience.  Bind the class.
    // add a click event handler to the professionTab...
  }

  hideCharts() {
    this.$experienceTab.classList.remove('active');
    this.$professionTab.classList.remove('active');
    this.$professionCanvas.classList.add('visually-hidden');
    this.$experienceCanvas.classList.add('visually-hidden');
  }

  createExperienceChart() {
    const chartData = {
      datasets: [{
          data: [this.experienceData.beginner, this.experienceData.intermediate, this.experienceData.advanced], // the chart expects the values in an array in this order
          backgroundColor:[
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
          ],
          borderColor: [
            'white',
            'white',
            'white',
          ],
          borderWidth: 1
      }],
      labels: [
          'Beginner',
          'Intermediate',
          'Advanced'
      ]
    };
    new Chart(this.$experienceCanvas, {
      type: 'pie',
      data: chartData,
      options: {}
    });   
  }

  showExperience(event = null) {
    if(event) event.preventDefault();
    this.hideCharts();
    this.$experienceCanvas.classList.remove('visually-hidden');
    this.$experienceTab.classList.add('active');
  }

  /* Part 3 - Write these 2 methods. 
   Then TEST.  Both charts should now work. */

  // It's just like the loadExperience but there are 4 'slices' for these chart labels.
  // 'School Students', 'College Students', 'Trainees', 'Employees'.  The properties in the grouped data are school, college, trainee, employee
  createProfessionChart() {
 
  }
  
  showProfession(event = null) {
  
  }

}

// add a window on load handler that creates a new instance of this class
