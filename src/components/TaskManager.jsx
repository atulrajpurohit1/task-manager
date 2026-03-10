import { useState, useEffect } from "react";

function TaskManager() {

const [task,setTask] = useState("");
const [tasks,setTasks] = useState([]);
const [filter,setFilter] = useState("all");
const [dark,setDark] = useState(false);

useEffect(()=>{
const saved = JSON.parse(localStorage.getItem("tasks"));
if(saved) setTasks(saved);
},[]);

useEffect(()=>{
localStorage.setItem("tasks",JSON.stringify(tasks));
},[tasks]);

const addTask = ()=>{
if(task.trim()==="") return;
setTasks([...tasks,{text:task,completed:false}]);
setTask("");
};

const deleteTask = (i)=>{
setTasks(tasks.filter((_,index)=>index!==i));
};

const toggleComplete = (i)=>{
const updated=[...tasks];
updated[i].completed=!updated[i].completed;
setTasks(updated);
};

const editTask=(i)=>{
const newTask=prompt("Edit Task",tasks[i].text);
if(newTask){
const updated=[...tasks];
updated[i].text=newTask;
setTasks(updated);
}
};

const filtered = tasks.filter(t=>{
if(filter==="completed") return t.completed;
if(filter==="pending") return !t.completed;
return true;
});

return(

<div className={dark ? "bg-gray-900 min-h-screen flex justify-center items-center":"bg-gradient-to-r from-indigo-500 to-purple-600 min-h-screen flex justify-center items-center"}>

<div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-105">

<h1 className="text-3xl font-bold text-center mb-6 text-gray-700">
Task Manager
</h1>

<button
className="mb-4 bg-black text-white px-3 py-1 rounded"
onClick={()=>setDark(!dark)}
>
Toggle Mode
</button>

<div className="flex gap-2 mb-5">

<input
className="flex-1 border p-2 rounded"
value={task}
onChange={(e)=>setTask(e.target.value)}
placeholder="Add new task"
/>

<button
className="bg-indigo-600 text-white px-4 rounded"
onClick={addTask}
>
Add
</button>

</div>

<div className="flex justify-between mb-5">

<button onClick={()=>setFilter("all")} className="text-sm bg-gray-200 px-3 py-1 rounded">
All
</button>

<button onClick={()=>setFilter("completed")} className="text-sm bg-green-200 px-3 py-1 rounded">
Completed
</button>

<button onClick={()=>setFilter("pending")} className="text-sm bg-yellow-200 px-3 py-1 rounded">
Pending
</button>

</div>

<ul className="space-y-3">

{filtered.map((t,i)=>(
<li
key={i}
className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
>

<span
onClick={()=>toggleComplete(i)}
className={t.completed ? "line-through text-gray-400 cursor-pointer":"cursor-pointer"}
>
{t.text}
</span>

<div className="flex gap-2">

<button
className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
onClick={()=>editTask(i)}
>
Edit
</button>

<button
className="bg-red-500 text-white px-2 py-1 rounded text-sm"
onClick={()=>deleteTask(i)}
>
Delete
</button>

</div>

</li>
))}

</ul>

</div>

</div>

);
}

export default TaskManager;