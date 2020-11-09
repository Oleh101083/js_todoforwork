const form = document.querySelector("#newTaskForm");
const input = document.querySelector("#addNewTask");
const tasksList = document.querySelector("#list-group");

//loading data
loadData();

//1.add new tasks

//listener form
form.addEventListener('submit', function (event){

    //default reloading
    event.preventDefault();

    //get writing text of task from form
const taskText =input.value;


    const taskHTML = `<li class="list-group-item d-flex justify-content-between">
    <a href="#" style="color: black;" onclick="return ChangeColor(this);"> 
    <span contenteditable="true" class="task-title">${taskText}</span>
    </a>
   
    <div>
        <button type="button" data-action="delete-task" class="btn btn-light align-self-end">&#10006;</button>
    </div>
</li>`;

//adding element in html
tasksList.insertAdjacentHTML('afterbegin', taskHTML);

//show or hiden block the "Список дел пуст"
toggleEmptyListItem();

//cleaning input after
input.value='';

//focus in input
input.focus();

//saving data
saveDate();

})

//2. buttons "Готово" and "Удалить"

tasksList.addEventListener('click', function(event){
    //click target
    if (event.target.getAttribute('data-action')=='delete-task'){

        //get teg li widht class '.list-group-item' and delete it
        event.target.closest('li.list-group-item').remove();

        //show or hiden block the "Список дел пуст"
        toggleEmptyListItem();

        //saving data
        saveDate();

        //cheking click button "Готово"
    }  else if (event.target.getAttribute('data-action')=='ready'){

        //get teg li widht class '.list-group-item' and add span
const parentElement = event.target.closest('li.list-group-item');

parentElement.querySelector('span.task-title').classList.add('task-title--done');



//delete in teg span atribute contenteditable
parentElement.querySelector('span.task-title').setAttribute('contenteditable');

    
//move listTask to down 
tasksList.insertAdjacentElement('beforeend', parentElement);

//delete buttton "Готово" and "Удалить"
parentElement.querySelector('button[data-action="ready"]').remove();


 //saving data
 saveDate();
}
})

function ChangeColor(Element) {
	if (Element.style.color == 'black') Element.style.color = 'orange';
    else Element.style.color = 'black';
    return false;
}
saveDate();




//function of show or hiden block the "Список дел пуст"
function toggleEmptyListItem(){
    if(tasksList.children.length > 1){
        document.querySelector("#empty-list-item").style.display= "none";
    }else{
        document.querySelector("#empty-list-item").style.display="block";
    }
}

function saveDate(){
    localStorage.setItem('todolist1',tasksList.innerHTML);
}

function loadData(){
    if(localStorage.getItem('todolist1')){
        tasksList.innerHTML =  localStorage.getItem('todolist1');
    }
}
saveDate();








// //saving date to locakStorage
// localStorage.setItem('name','Oleh');


// //get date from localStorage
// localStorage.getItem('name')


//Date_local 
let today = new Date();				
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();				
document.getElementById("p1").innerHTML = date;


//Time_local 
function showTime() {
    let d = new Date();
    document.getElementById("p2").innerHTML = d.toLocaleTimeString();
}
setInterval(showTime, 1000);



//Timer 
var ss = document.getElementsByClassName('stopwatch');

[].forEach.call(ss, function (s) {
    var currentTimer = 0,
        interval = 0,
        lastUpdateTime = new Date().getTime(),
        start = s.querySelector('button.start'),
        stop = s.querySelector('button.stop'),
        reset = s.querySelector('button.reset'),
        mins = s.querySelector('span.minutes'),
        secs = s.querySelector('span.seconds'),
        cents = s.querySelector('span.centiseconds');

    start.addEventListener('click', startTimer);
    stop.addEventListener('click', stopTimer);
    reset.addEventListener('click', resetTimer);

    function pad (n) {
        return ('00' + n).substr(-2);
    }

    function update () {
        var now = new Date().getTime(),
            dt = now - lastUpdateTime;

        currentTimer += dt;

        var time = new Date(currentTimer);

        mins.innerHTML = pad(time.getMinutes());
        secs.innerHTML = pad(time.getSeconds());
        cents.innerHTML = pad(Math.floor(time.getMilliseconds() / 10));

        lastUpdateTime = now;
    }

    function startTimer () {
        if (!interval) {
            lastUpdateTime = new Date().getTime();
            interval = setInterval(update, 1);
        }
    }

    function stopTimer () {
        clearInterval(interval);
        interval = 0;
    }

    function resetTimer () {
        stopTimer();

        currentTimer = 0;

        mins.innerHTML = secs.innerHTML = cents.innerHTML = pad(0);
    }
});