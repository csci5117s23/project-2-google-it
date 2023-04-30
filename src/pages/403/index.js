import {React} from 'react'
import Header from '@/components/header';
import NavBar from '@/components/nav'

export default function AccessDenied403(){
  return (
    <>
        <Header title={"Bevary"}></Header>
        <div style={{textAlign:"center"}} >
            <div class="is-size-1-desktop is-size-2-touch">Acesss Denied</div>
            <h4 class="is-size-6-desktop is-size-7-touch">You don't have access to this resource</h4>
        </div>
        <NavBar/>
    </>
    
  )
}