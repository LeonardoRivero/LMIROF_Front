import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "../utilities/debounce";

export default function SearchBar() {
  const navigate = useNavigate();

  const debouncedSearchHandler = useMemo(() => {
    return debounce(
      ({ target: { value } }) => navigate(`/search/${value}`),
      600
    );
  }, []);

  return (
    <div className="search">
      <div className="search-icon-wrapper">
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Buscar..."
        inputProps={{ "aria-label": "buscar", maxLength: 50 }}
        className="input-base"
        onChange={debouncedSearchHandler}
      />
    </div>
  );
}
