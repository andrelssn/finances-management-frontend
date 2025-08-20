import React from "react";
import { Box, Button, CircularProgress, MenuItem, Typography } from "@mui/material";
import { StyledTextField } from "../../StyledTextField/StyledTextField";

// Styles
import "../Style.css";

// Components
import CurrencyInput from "../../CurrencyInput/CurrencyInput";

// Services
import { putData } from "../../../Services/services";

export default function EditMonthly(props) {
    const {
        itemEdit,
        setItemEdit,
        setFooterCollapse,
        setSnackbar,
        handleReloadFetch,
    } = props;

    const name                    = React.useRef(itemEdit.item.expense_name)
    const value                   = React.useRef(itemEdit.item.expense_value);
    const parcels                 = React.useRef(itemEdit.item.parcels);
    const current                 = React.useRef(itemEdit.item.parcels);

    const [parceled, setParceled] = React.useState(itemEdit.item.parceled);
    const [loader, setLoader]     = React.useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoader(true);

        let uri = `/monthly/${itemEdit.item.id}`;

        let body = {
            "expense_name": name.current,
            "expense_value": value.current,
            "parceled": parceled,
            "parcels": !Boolean(parceled) ? null : parcels.current,
            "current_parcel": !Boolean(parceled) ? null : current.current
        }

        await putData({uri, body}).then(response => {
            if (response.status === 200 && response.data.status) {
                handleReloadFetch();
                setFooterCollapse(false);
                setItemEdit(null);
                setSnackbar({ open: true, severity: "success", message: `Despesa editada com sucesso!` });
            } else {
                setSnackbar({ open: true, severity: "error", message: `Houve um erro ao salvar, tente novamente mais tarde.` });
            }
        })

        setLoader(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", justifyContent: "left", alignItems: "center", width: "100%", gap: 2, mt: 2 }}>
                <Typography textAlign={"center"} fontSize={14} width={130} color="var(--text)" fontWeight={"bold"}>
                    Editar Despesa
                </Typography>

                <StyledTextField
                    required
                    size="small"
                    label="Nome da Despesa"
                    defaultValue={name.current}
                    slotProps={{
                        inputLabel: {
                            style: {
                                fontSize: 14
                            }
                        },
                        input: {
                            style: {
                                fontSize: 14
                            }
                        }
                    }}
                    onChange={(e) => name.current = e.target.value}
                />

                <CurrencyInput value={value.current} current={value}/>

                <StyledTextField
                    required
                    select
                    size="small"
                    label="Parcelado?"
                    defaultValue={Boolean(parceled)}
                    slotProps={{
                        inputLabel: {
                            style: {
                                fontSize: 14,
                            }
                        },
                        input: {
                            style: {
                                fontSize: 14
                            }
                        }
                    }}
                    onChange={(e) => setParceled(e.target.value)}
                >
                    <MenuItem value={true} sx={{ fontSize: 14, color: "var(--text)", fontWeight: "bold" }}>
                        Sim
                    </MenuItem>

                    <MenuItem value={false} sx={{ fontSize: 14, color: "var(--text)", fontWeight: "bold" }}>
                        Não
                    </MenuItem>
                </StyledTextField>

                <StyledTextField
                    required={Boolean(parceled) ? true : false}
                    disabled={!Boolean(parceled) ? true : false}
                    type="number"
                    size="small"
                    label="Parcela Atual"
                    defaultValue={parcels.current}
                    inputProps={{
                        min: 0,
                        max: 200,
                    }}
                    slotProps={{
                        inputLabel: {
                            style: {
                                fontSize: 14,
                                color: !Boolean(parceled) ? "#cecece" : "var(--text)"
                            }
                        },
                        input: {
                            style: {
                                fontSize: 14
                            }
                        }
                    }}
                    onChange={(e) => current.current = e.target.value}
                />

                <StyledTextField
                    required={Boolean(parceled) ? true : false}
                    disabled={!Boolean(parceled) ? true : false}
                    type="number"
                    size="small"
                    label="Número de Parcelas"
                    defaultValue={parcels.current}
                    inputProps={{
                        min: 0,
                        max: 200,
                    }}
                    slotProps={{
                        inputLabel: {
                            style: {
                                fontSize: 14,
                                color: !Boolean(parceled) ? "#cecece" : "var(--text)"
                            }
                        },
                        input: {
                            style: {
                                fontSize: 14
                            }
                        }
                    }}
                    onChange={(e) => parcels.current = e.target.value}
                />

                <Button type="submit" size="small" className="save-button">
                    { loader ? <CircularProgress size={16} sx={{ color: "#ffffff" }}/> : "Salvar" }
                </Button>
            </Box>
        </form>
    )
}