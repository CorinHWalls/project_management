import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';


export default function ProjectSearch(props) {

  const handleSearch = (e) => {
      props.setSearchWord(e.target.value.toLowerCase())
  }

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
    >
      {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton> */}
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Projects"
        inputProps={{ 'aria-label': 'search projects' }}
      onChange={handleSearch}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        {/* <SearchIcon /> */}
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton> */}
    </Paper>
  );
}