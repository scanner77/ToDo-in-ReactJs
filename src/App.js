import React, {useState, useEffect} from 'react'

const App = () => {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const changeHandler = (event) => {
    setTask(event.target.value);
  };
 
  const addTask = () => {
    if(task !== '') {
      const taskDetails = {
        id: Math.floor(Math.random() * 1000),
        value: task,
        isCompleted: false
      }
      setTaskList(taskList.concat(taskDetails));
    }}

  const deleteTask = (e) => {
   const {id} = e.target.parentElement;
   taskList.splice(id, 1);
   setTask([...taskList]);
  }

  useEffect(() => {
    const storedTaskList = JSON.parse(localStorage.getItem('taskList'));
    if(storedTaskList) setTaskList(storedTaskList);
  }, []);

    // saving the todos in browser storage to prevent loss of todos on refreshing tab
  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }, [taskList]); //whenever the value of taskList changes, the effect will run

  return (
    <>
      <input type = "text" placeholder = "add to do items...." value = {task} onChange = {changeHandler}/>
      <button type = "button" onClick = {addTask}> Add to do items </button>
      <br />
      <ul>
        {taskList.map((item) => (
            <li key = {item.id} >
              {item.value}
              <button type = "button" onClick = {(e) => deleteTask(e)}>Delete</button>
              </li>
        ))}
        </ul>
    </>
  )
}

export default App
