import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

// Icons
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

// Styles
import "../Style.css";

export default function MonthlyExpenses(props) {
    const {
        panelApi,
        itemEdit,
        itemDelete,
        setFooterCollapse,
        handleEdit,
        handleDelete
    } = props;

    return (
        <TableContainer className="table-container-sx">
            <Table className="table-sx">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" className="table-header-cell">
                            Nome
                        </TableCell>

                        <TableCell align="center" className="table-header-cell">
                            Valor
                        </TableCell>

                        <TableCell align="center" className="table-header-cell">
                            Parcelas
                        </TableCell>

                        <TableCell>
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    { panelApi.MonthlyExpenses.map((data) => {
                        const parcel = () => {
                            if (data.current_parcel === data.parcels) {
                                return (
                                    <span style={{ color: "var(--theme)" }}>
                                        { data.current_parcel + "/" + data.parcels }
                                    </span>
                                )
                            };

                            if (data.current_parcel > data.parcels) {
                                return (
                                    <span style={{ color: "var(--red-app)" }}>
                                        { data.current_parcel + "/" + data.parcels }
                                    </span>
                                )
                            };

                            return (
                                <span>
                                    { data.current_parcel + "/" + data.parcels }
                                </span>
                            )
                        }

                        return (
                            <TableRow key={data.id}>
                                <TableCell align="center" sx={{ color: "var(--text)", fontWeight: "bold" }}>
                                    {data.expense_name}
                                </TableCell>

                                <TableCell align="center" sx={{ color: "var(--theme-dark)", fontWeight: "bold" }}>
                                    {data.expense_value}
                                </TableCell>

                                <TableCell align="center" sx={{ color: "var(--text)", fontWeight: "bold" }}>
                                    { data.parceled
                                        ? parcel()
                                        : <span>Sem Parcelas</span>
                                    }
                                </TableCell>

                                <TableCell align="right">
                                    {   itemEdit?.item.id === data.id
                                            ? (
                                                <IconButton className="edit-btn" onClick={() => handleEdit(null)}>
                                                    <RemoveOutlinedIcon/>
                                                </IconButton>
                                            )
                                            : (
                                                <IconButton className="edit-btn" onClick={() => handleEdit({ type: "monthly", item: data, key: Math.random() })}>
                                                    <ModeEditOutlineOutlinedIcon/>
                                                </IconButton>
                                            )
                                    }

                                    {   itemDelete?.item.id === data.id
                                            ? (
                                                <IconButton className="delete-btn" onClick={() => { setFooterCollapse(false); }}>
                                                    <RemoveOutlinedIcon/>
                                                </IconButton>
                                            )
                                            : (
                                                <IconButton className="delete-btn" onClick={() => handleDelete({ type: "monthly", item: data, key: Math.random() })}>
                                                    <DeleteOutlineOutlinedIcon/>
                                                </IconButton>
                                            )
                                    }
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}