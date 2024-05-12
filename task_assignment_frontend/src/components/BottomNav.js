import { AddTask, Task } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useState } from 'react'

const BottomNav = () => {
  const [value, setValue] = useState('task');
  
  return (
    <div>
        <BottomNavigation
            showLabels
            sx={{bgcolor: '#292f38'}}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
        >
          <BottomNavigationAction href='/dashboard' sx={{color: '#ccc'}} label="Tasks" icon={<Task />} />
          <BottomNavigationAction href='/new ' sx={{color: '#ccc'}} label="AddTask" icon={<AddTask />} />
        </BottomNavigation>
  </div>
  )
}

export default BottomNav