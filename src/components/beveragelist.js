import {React} from 'react'
import ListItem from './listItem';
import 'bulma/css/bulma.min.css';
export default function BeverageList({listItems, onRemove}) {
    var columns = [];

    for (let i = 0; i < listItems.length; i+= 2){
        if(i == listItems.length - 1){
            const col = (
                <> 
                    <div class="columns is-desktop" style={{marginLeft:"0", marginRight:"0"}}>
                        <div class="column">
                                <ListItem info={listItems[i]} onRemove={onRemove}></ListItem>
                        </div>
                        <div class="column">
                        </div>
                    </div>
                </>);
            columns.push(col);
        }
        else {
            const col = (
                <> 
                    <div class="columns is-desktop" style={{marginLeft:"0", marginRight:"0"}}>
                        <div class="column">
                                <ListItem info={listItems[i]} onRemove={onRemove}></ListItem>
                        </div>
                        <div class="column">
                            <ListItem info={listItems[i + 1]} onRemove={onRemove}></ListItem>
                        </div>
                    </div>
                </>);
            columns.push(col);
        }
    }
    
    return (
        <>
            {columns.map(column => column)}
        </>
        
        // <div class="columns is-desktop">
        //     <div class="column">
        //         {l1.map(item => (
        //             <ListItem info={item} onRemove={onRemove}></ListItem>
        //         ))}
        //     </div>
        //     <div class="column">
        //         {l2.map(item => (
        //             <ListItem info={item} onRemove={onRemove}></ListItem>
        //         ))}
        //     </div>
        // </div>
    // <ul className="content" style={{margin:"0 6%"}}>
    //     {listItems.map(item => (
    //         <li> 
    //             <ListItem info={item} onRemove={onRemove}></ListItem>
    //         </li>
    //     ))}
    // </ul>
    );
    
}