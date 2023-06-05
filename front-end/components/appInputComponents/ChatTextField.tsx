import { useState, ChangeEvent } from 'react';
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';

import axios from 'axios';

export default function ChatTextField(){
  
    const submitStyle = {
      position: 'fixed',
      bottom: '80px',
      right: '80px'
    }
    
  const [initialValue, setValue] = useState('');

  const userInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }
  const submitChat = async(event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try{
      const res = await axios.post('http://localhost:8080/name', {
        initialValue
      });
      console.log(res.data);
    }catch(e){
      console.log(e);
    }
  }
  return (
    <Box
      sx={{
        py: 2,
        display: 'grid',
        gap: 2,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
    <form  onSubmit={submitChat}>
      <Stack direction="row" spacing={1} sx={submitStyle}>
      <Textarea name="Outlined" placeholder="Chat Box" size="md" variant="outlined" onChange={userInput} value={initialValue} />
      <Button variant="contained" type='submit' sx={{height: 43}}>
      <SendIcon fontSize="small" />
      </Button>
      </Stack>
    </form>
    </Box>
  ) 
}

