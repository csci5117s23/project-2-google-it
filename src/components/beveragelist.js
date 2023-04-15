import {React} from 'react'
import ListItem from './listItem';

export default function BeverageList({listItems, onRemove}) {
    
    return (
    <ul>
        {listItems.map(item => (
            <li> 
                <ListItem info={item} onRemove={onRemove}></ListItem>
            </li>
        ))}
    </ul>
    );
    
}