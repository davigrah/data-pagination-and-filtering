
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

// showPage function takes two parameters which will take student data and page as arguments
function showPage (list, page) {
  // Two variables which will display start and end index of student data
  const startIndex = (page * 9) - 9
  const endIndex = page * 9

  const studentListUL = document.querySelector('.student-list')
  // console.log(studentListUL);
  // student list is set to an empty string so remove string
  studentListUL.innerHTML = ''
  let html = ''

  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      html += `
        <li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src= ${list[i].picture.large} alt="Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
          </div>
          <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
          </div>
        </li>
          `
    }
  }
  studentListUL.insertAdjacentHTML('beforeend', html)
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination (list) {
  // console.log(list);

  // variable show the number of the pagination button needed
  const numOfPages = Math.ceil(list.length / 9)
  // console.log(numOfPages);
  const linkListUL = document.querySelector('.link-list')
  // the list is set to am empty string to remove data if present
  linkListUL.innerHTML = ''
  let buttonHTML = ''

  for (let i = 1; i <= numOfPages; i++) {
    buttonHTML += `
     <li>
       <button type="button">${i}</button>
     </li>    
     `
    // console.log(buttonHTML);
  }

  linkListUL.insertAdjacentHTML('beforeend', buttonHTML)

  const button = document.querySelectorAll("button[type='button']")
  button[0].className = 'active'
  // console.log(button);

  linkListUL.addEventListener('click', (e) => {
    const buttonClicked = e.target
    if (buttonClicked.tagName === 'BUTTON') {
      const activeClassButton = document.getElementsByClassName('active')
      activeClassButton[0].className = ''
      buttonClicked.className = 'active'
      showPage(list, buttonClicked.textContent)
      // console.log(activeClassButton);
    }
  })
}

// Call functions
showPage(data, 1)
addPagination(data)
// Call functions

// search engine

const searchForm = () => {
  const searchHeader = document.querySelector('.header')
  const searchLabel = document.createElement('label')
  searchLabel.innerHTML =
      `
      <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
      `
  searchHeader.appendChild(searchLabel)
}
// calls function to display
searchForm()

// 2 Search Functionality

// 1. Select the search bar element and create an empty array to insert the data of the filtered students.
const searchInput = document.getElementById('search')
let newStudentList = []

//    a. Event listener to filter out students based on the key characters provided to the search bar.
searchInput.addEventListener('keyup', (e) => {
  const filterInput = e.target.value.toLowerCase()
  

  //    b. If individual student's data includes stored search input, add that student to new list of students
  const filteredStudent = data.filter(student => {
    return student.name.first.toLowerCase().includes(filterInput) || student.name.last.toLowerCase().includes(filterInput)
  })

  // 3. After loop ends, call showPage function with new list of students as first argument
  newStudentList = filteredStudent
  showPage(newStudentList, 1)
  addPagination(newStudentList)
  const button = document.querySelectorAll("button[type='button']")
  button[1].className = 'active'

  // Displays "No Results" on the page when newStudentList returns 0 matches.
  if (newStudentList.length === 0) {
    const noResults = document.querySelector('.student-list')
    noResults.innerHTML += '<li class="no-results">No results.</li>'
  }
})
