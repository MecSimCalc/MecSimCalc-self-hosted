import { useState, ChangeEvent, KeyboardEvent } from 'react';
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

    //Sending Data to the chatGPT API
    const sendingData = async() => {
      try{
        const res = await axios.post('http://localhost:8080/chat_input', {
          initialValue
        });
        console.log(res.data);
      }catch(e){
        console.log(e);
      }
      setValue('');
    }

    //User Input
  const userInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }

  //Submit Input with 'Enter' key-word
  function enterSubmit(e: KeyboardEvent){
    if(document.activeElement === e.target){
      if(e.key === 'Enter'){
        e.preventDefault();
        sendingData();
      } 
    }
  }

  //Submit Input with 'Send' button
  const submitChat = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    sendingData();
  }

  //Render the Chat Box
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
      <Textarea name="Outlined" placeholder="Chat Box" variant="outlined" onChange={userInput} value={initialValue} sx={{width: 250}} onKeyDown={enterSubmit} />
      <Button variant="contained" type='submit' sx={{height: 43}}>
      <SendIcon fontSize="small" />
      </Button>
      </Stack>
    </form>
    </Box>
  ) 
}

