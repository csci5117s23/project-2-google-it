

export default function DeleteBevButton({info, deleteEntry}){
	
	
	return (<>
		<button onClick={() => deleteEntry(info)} style={{'width': '100%', borderRadius:"1em"}} class="button is-danger">Delete Entry</button>
	</>)
}