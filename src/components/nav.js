import Link from "next/link";


export default function NavBar(){
	const pages=["addEntry", "list", "map"]
	return(<>
		<nav class="bottom" role="navigation" aria-label="navigation">
			<div class="nav">
				<Link class="sidebutton" href="/list"><div class="stack"><img class="sideImg" src="https://cdn-icons-png.flaticon.com/512/3221/3221593.png"></img><p>Journal</p></div></Link> 
				<Link href="/addEntry"><div class="elevate"><img class="plus" src="https://library.uwosh.edu/images/plus-icon.png/@@images/image.png"></img></div></Link>
				<Link class="sidebutton" href="/map"><div class="stack"><img class="sideImg" src="https://cdn-icons-png.flaticon.com/512/854/854878.png"></img><p>Map</p></div></Link>
			</div>
			
		</nav>
	</>)
}
