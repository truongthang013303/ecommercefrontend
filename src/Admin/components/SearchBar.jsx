import { IconButton, InputBase } from '@mui/material';
import React from 'react';
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from 'react-router-dom';
const SearchBar = ({
    value,
    cancelOnEscape,
    className,
    classes,
    closeIcon,
    disabled,
    onCancelSearch,
    onRequestSearch,
    searchIcon,
    style,
    onChange,
    ...inputProps
  }) => {
    
    const navigate = useNavigate();
    const searchIconButtonClickHandle=()=>{
      navigate('/admin/dtg?search=123');
    }
    return (
        <div className='border border-[#DFDBDB] rounded m-2'>
            <InputBase sx={{ ml: 2, flex: 1}} placeholder="Search" onChange={onChange}></InputBase>
            <IconButton type="button" sx={{ p: 1 }} onClick={searchIconButtonClickHandle}>
              <SearchIcon />
            </IconButton>
        </div>
    );
};

export default SearchBar;