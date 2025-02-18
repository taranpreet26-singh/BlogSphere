import EntryNavbar from './EntryNavbar'
import EntryPageHome from './EntryPage'
import React from 'react'

const Main:React.FC = () => {
  return (
    <div>
        <EntryNavbar/>
        <hr/>
        <br/>
        <EntryPageHome/>
    </div>
  )
}

export default Main