import React, { useState, useRef } from 'react';
import {Box, Button} from '@mui/material';
const ArrangeLandingPage = () => {
  
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [list, setList] = useState(['Component 1','Component 2','Component 3','Component 4','Component 5','Component 6']);
 
  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };
 
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };
 
  const drop = (e) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  };
 
  return (
    <Box style={{ marginTop:'100px' }}>
    {
    list&&
    list.map((item, index) => (
      <Button variant="contained" style={{ margin:'20px 45%', textAlign:'center'}}
        onDragStart={(e) => dragStart(e, index)}
        onDragEnter={(e) => dragEnter(e, index)}
        onDragEnd={drop}
        key={index}
        draggable>
          {item}
      </Button>
      ))}
    </Box>
  );
};
export default ArrangeLandingPage;