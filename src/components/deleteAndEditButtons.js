import DeleteBevButton from './deleteBev';
import EditBevButton from './editBevButton';

export default function DeleteAndEditButtons({info, deleteEntry}){
	return(<>
		<div class="columns">
			<div class="column">
				<DeleteBevButton info={info} deleteEntry={deleteEntry}/>
			</div>
			<div class="column">
				<EditBevButton info={info}/>
			</div>
		</div>
	</>)
}