import { Box, Pagination } from "@mui/material";
import { flexEnd } from "../styles";

interface PageProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  page: number;
}
const Paginate = ({ totalPages, setPage, page }: PageProps) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log("event", typeof event);
    setPage(value);
  };

  return (
    <>
      <Box sx={{ mt: 2, ...flexEnd }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          variant="outlined"
          color="secondary"
        />
      </Box>
    </>
  );
};

export default Paginate;
