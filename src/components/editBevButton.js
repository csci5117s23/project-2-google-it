import Link from "next/link";


export default function EditBevButton({info}){
	return (<>
		<Link href={'/edit/' + info['_id']}><button class="button is-primary" style={{'width': '100%', borderRadius:"1em"}}>Edit Bev</button></Link>
	</>)
}