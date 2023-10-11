import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";




export default function PaginationButtons({
  page,
  setPage,
  maxPage,
  data,
}) {
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setPage(1);
  }, [data, setPage]);

  return (
    <div className="flex items-center justify-center space-x-2">
      <Stack spacing={2}>
        <Pagination
          count={maxPage}
          onChange={handleChange}
          defaultPage={1}
          page={page}
          showFirstButton
          showLastButton
        />
      </Stack>
    </div>
  );
}