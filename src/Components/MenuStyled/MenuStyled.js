import { Menu, MenuItem, styled } from "@mui/material";

export const CustomMenu = styled(Menu)(({ theme }) => ({
    "& .MuiPaper-root": {
        width: "fit-content",
        borderRadius: 12,
        backgroundColor: "#fff",
        boxShadow: "0px 6px 18px rgba(0,0,0,0.15)",
        padding: "10px 20px",
        border: "1px solid #cecece"
    },
}));

export const CustomMenuItem = styled(MenuItem)({
    color: "var(--text)",
    borderRadius: 8,
    "&:hover": {
        backgroundColor: "var(--theme)",
        color: "#fff",
    },
});