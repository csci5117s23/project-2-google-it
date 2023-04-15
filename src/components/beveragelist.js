import {React} from 'react'
import ListItem from './listItem';
import 'bulma/css/bulma.min.css';
export default function BeverageList({listItems, onRemove}) {
    
    return (
    <ul className="content" style={{margin:"0 6%"}}>
        {listItems.map(item => (
            <li> 
                <ListItem info={item} onRemove={onRemove}></ListItem>
            </li>
        ))}
    </ul>
    );
    
}