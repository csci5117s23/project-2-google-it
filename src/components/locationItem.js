import { React } from 'react'
import 'bulma/css/bulma.min.css';
import { useRouter } from 'next/router'

export default function LocationItem({info}) {
  const router = useRouter()

  function sendToLocation(){
    router.push({
      pathname:"/list/location",
      query: {data: JSON.stringify(info["entries"]), name:info["locName"]}
    })
  }

  return (
    <div class="card" style={{background:"#88CFF2", borderRadius:"1em", marginTop:"3px", cursor: "pointer"}} onClick={sendToLocation}>
      <div class="card-content" style={{padding:"1.7vh"}}>
        <div class="media" style={{alignItems: "center"}}>
          <div class="media-left"> 
            {/* TODO: Replace icon with an actual picture and size it properly*/}
            <svg xmlns="http://www.w3.org/2000/svg" width="5vh" height="5vh" viewBox="0 0 72 72"><path fill="#92d3f5" d="M13.046 40.779h45.606v20.653H13.046z"/><path fill="#a57939" d="M18.355 46.012h12.273v15.42H18.355z"/><path fill="#fff" d="M35.927 44.87h6.467v12.562h-6.467zm11.086 0h6.467v12.562h-6.467z"/><path fill="#d0cfce" d="M27.917 18.74a13.522 13.522 0 0 1 6.933-1.817c4.542 0 8.438 6.247 14.334 6.247c.869 0 1.304-.392 2.181-.392c.728 0 1.018.52 1.018 1.439v1.565c0 .717-.783 1.531-3.081 1.531c-6.91 0-10.806-3.908-14.815-3.908a11.739 11.739 0 0 0-6.649 2.219v-4.267ZM8.831 61.432h54.036v3.419H8.831z"/><g fill="none" stroke="#000" stroke-linecap="round" stroke-width="2"><path stroke-linejoin="round" d="M13.046 61.432V45.399M8.831 64.852h54.036m0-3.42H8.831m11.16-28.129h-7.53l-3.63 7.476h54.036l-3.629-7.476h-30.41m29.824 28.129V45.399m-32.2 9.715V52.33m-3.918 2.784V52.33m-4.178-6.318h12.273v15.42H18.356zM27.917 9.34a13.416 13.416 0 0 1 6.933-2.148c4.542 0 8.438 3.937 14.334 3.937c.869 0 1.304-.39 2.181-.39c.728 0 1.018.52 1.018 1.438v13.605c0 .717-.783 1.531-3.081 1.531c-6.91 0-10.806-3.908-14.815-3.908a11.739 11.739 0 0 0-6.649 2.219v-4.267"/><path stroke-miterlimit="10" d="M24.579 7.347v33.432"/><path stroke-linejoin="round" d="M35.927 44.87h6.467v12.562h-6.467zm11.086 0h6.467v12.562h-6.467z"/></g></svg>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="5vh" height="5vh" viewBox="0 0 72 72"><path fill="#f4aa41" d="M19.895 17H19v50h34V17h-.895"/><path fill="#fcea2b" d="M27.716 49.891a2.168 2.168 0 0 1-.403-2.406c-1.684-3.303-.663-8.017 2.752-11.431s8.128-4.436 11.431-2.752a2.175 2.175 0 0 1 2.883 2.883c1.688 3.306.663 8.016-2.752 11.43s-8.124 4.44-11.431 2.753a2.168 2.168 0 0 1-2.443-.44l-.037-.037"/><path fill="#f4aa41" d="M41.377 47.547c-3.415 3.415-8.125 4.44-11.433 2.753c13.724 0 14.378-13.907 14.378-13.907c1.691 3.304.467 7.739-2.945 11.154Z"/><path fill="#f4aa41" d="M33.424 51.494a16.572 16.572 0 0 1-4.137-1.182l-.99-.408h1.647c5.535 0 9.568-2.27 11.988-6.746a17.793 17.793 0 0 0 1.995-6.783l.07-1.486l.678 1.324c1.766 3.452.582 8.01-3.018 11.614a11.947 11.947 0 0 1-8.233 3.667Zm-1.395-.911a10.627 10.627 0 0 0 9.069-3.316c2.803-2.807 4.059-6.331 3.402-9.224c-.644 3.5-3.133 11.5-12.471 12.54Z"/><path fill="#f4aa41" d="M43.912 33.654a5.77 5.77 0 0 1 .383 2.862l-1.623-1.623l1.24-1.24M27.77 50.36a5.77 5.77 0 0 0 2.888-.082l-1.863-1.341l-1.024 1.423"/><g fill="none" stroke="#000" stroke-linecap="round" stroke-width="2"><path stroke-linejoin="round" d="M23 17h26M19 28h34M19 56h34M19.895 17H19v50h34V17h-.895M40 14l2.765-4.978A7.82 7.82 0 0 1 49.602 5H60"/><path stroke-miterlimit="10" d="M27.716 49.891a2.168 2.168 0 0 1-.403-2.406c-1.684-3.303-.663-8.017 2.752-11.431s8.128-4.436 11.431-2.752a2.175 2.175 0 0 1 2.883 2.883c1.688 3.306.663 8.016-2.752 11.43s-8.124 4.44-11.431 2.753a2.168 2.168 0 0 1-2.443-.44l-.037-.037"/></g></svg> */}
          </div>
          <div class="media-content" style={{overflow: "hidden"}}>
            <p class="title is-size-6-desktop is-size-7-touch">
              {info["locName"]}<br></br>
              Average Rating: {info["avgRating"].toFixed(1)} / 5.0<br></br>
            </p>
            <p class="subtitle is-size-6-desktop  is-size-7-touch">
              Last Rated: {new Intl.DateTimeFormat('en-US').format(new Date(info["lastEntry"]))}<br></br>
              # of Entries: {info["entries"].length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}