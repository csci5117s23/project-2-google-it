import Link from "next/link";


export default function NavBar(){
	const pages=["addEntry", "list", "map"]
	return(<>
		<nav class="bottom" role="navigation" aria-label="navigation">
			<div class="nav">
				<Link class="sidebutton" href="/list"><div class="stack"><img class="sideImg" src="https://cdn-icons-png.flaticon.com/512/3221/3221593.png"></img><p>Journal</p></div></Link> 
				<Link href="/addEntry"><div class="elevate"><img class="plus" src="https://www.pngall.com/wp-content/uploads/10/Plus-Symbol-PNG-Image-HD.png"></img></div></Link>
				<Link class="sidebutton" href="/map"><div class="stack"><img class="sideImg" src="https://cdn-icons-png.flaticon.com/512/854/854878.png"></img><p>Map</p></div></Link>
				{/* <div class="sidebutton"><Link href="/list">Journal</Link></div>
				<div class="plus"><Link href="/addEntry"><div class="elevate">addEntry</div></Link></div>
				<div class="sidebutton"><Link href="/map">Map</Link></div> */}
			</div>
			{/* <div class="navbar-menu">
				<div class="navbar-start">
					<div class="navbar-item">
						<a class="navbar-link">
						Left
						</a>
					</div>
				</div>
				{pages.map(pg =>{
            		return <div class="navbar-item">
						{pg}
					</div>
            		// if(todo.complete){
                	// 	return <TodoItem complete={true} task={todo.task} desc={todo.description} date={todo.created} onTodoClick = {completeTask}></TodoItem>
            		// }
            		// //return <TodoItem num={todo.num} complete={todo.complete} task={todo.task} date={todo.created} ></TodoItem>
            
            		// return <TodoItem complete={false} task={todo.task} desc={todo.description} date={todo.created} onTodoClick = {completeTask}></TodoItem>
        		})}
				<div class="navbar-end">
					<div class="navbar-item">
						<a class="navbar-link">
						Right
						</a>
					</div>
				</div>
			</div> */}
		</nav>
	</>)
}