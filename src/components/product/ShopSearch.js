import React from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const ShopSearch = ({ handleSearchSubmit, handleSearchChange }) => {
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Search</h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <form className="pro-sidebar-search-form" onSubmit={handleSearchSubmit}>
          <TextField
            variant="outlined"
            placeholder="Search here..."
            fullWidth
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </div>
    </div>
  );
};

ShopSearch.propTypes = {
  handleSearchSubmit: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
};

export default ShopSearch;
