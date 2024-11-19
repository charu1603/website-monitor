import React from 'react'
import NavigationBar from '../components/NavigationBar';
import Search from '../components/Search';
import SearchBar from '../components/SearchBar';

const Dashboard = () => {
  return (
    <div className='w-full flex flex-col h-full'>
          <div className='w-full h-12'> 
        <SearchBar/>
        </div>
        <div className='w-full h-16'> 
             <NavigationBar/>
        </div>
      
        <div className='w-full'>
            <Search/>
        </div>
    </div>
  )
}

export default Dashboard