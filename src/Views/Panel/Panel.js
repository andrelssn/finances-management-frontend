import React from "react";
import { Box, Collapse, Divider, Skeleton, Tab, Tabs, Typography } from "@mui/material";

// Styles
import "./Style.css";

// State Components
import userAuthData from "../../Components/States/UserState";

// Style obj
import { tabsSx, tabsSxMain } from "../../Components/Styles/TabsSx";

// Services
import { getData } from "../../Services/services";

// Components
import CurrencyInput from "../../Components/CurrencyInput/CurrencyInput";
import MonthlyExpenses from "../../Components/Panel/MonthlyExpenses/MonthlyExpenses";
import EditMonthly from "../../Components/Panel/MonthlyExpenses/EditMonthly";
import DeleteModal from "../../Components/Panel/Modal/DeleteModal";

export default function Panel(props) {
    const {
        setSnackbar
    } = props;

    const userData = userAuthData((state) => state.user);

    const [panelApi, setPanelApi]             = React.useState(null);
    const [tabValue, setTabValue]             = React.useState(0);
    const [fixedValue, setFixedValue]         = React.useState(!userData.fixed_value ? 0 : userData.fixed_value);
    const [itemEdit, setItemEdit]             = React.useState(null);
    const [itemDelete, setItemDelete]         = React.useState(null);
    const [footerCollapse, setFooterCollapse] = React.useState(false);
    const [openDelete, setOpenDelete]         = React.useState(false);

    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => {
        setItemDelete(null);
        setOpenDelete(false);
    };

    React.useEffect(() => {
        getData(`/panel/${userData.id}`).then(response => {
            if(response.status === 200 && response.data.status) {
                setPanelApi(response.data.data);
            }
        })
    }, [userData]);

    const handleReloadFetch = React.useCallback(() => {
        getData(`/panel/${userData.id}`).then(response => {
            if(response.status === 200 && response.data.status) {
                setPanelApi(response.data.data);
            }
        })
    }, []);

    if(!panelApi) return (
        <Box className="panel-container">
            <Skeleton variant="rectangular" width={"100%"} height={80} sx={{ mb: 1 }} />
            <Skeleton variant="rounded" width={"100%"} height={200} />
        </Box>
    );

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleEdit = (value) => {
        setItemEdit(value);

        if (!value) {
            setFooterCollapse(false);
        } else {
            setFooterCollapse(true);
        }
    };

    const handleDelete = (value) => {
        setItemDelete(value);
        handleOpenDelete();
    };

    return (
        <Box className="panel-container">
            <Typography variant="h6" color="var(--text)" fontWeight={"bold"}>
                Gerenciamento de Finanças
            </Typography>

            <Divider
                textAlign="left"
                sx={{ color: "var(--text-secondary)", fontWeight: "bold", m: "20px 0px" }}
            />

            <Box className="panel-content">
                <Box className="panel-left-side">
                    <Box className="panel-block-01">
                        <Typography
                            color="#ffffff"
                            fontWeight={"bold"}
                            fontSize={12}
                            textAlign={"center"}
                        >
                            Salário Bruto
                        </Typography>

                        <CurrencyInput value={fixedValue} onChange={setFixedValue}/>
                    </Box>

                    <Box className="panel-block-01">
                        <Typography
                            color="#ffffff"
                            fontWeight={"bold"}
                            fontSize={12}
                            textAlign={"center"}
                        >
                            Restante
                        </Typography>

                        <CurrencyInput value={fixedValue} onChange={setFixedValue}/>
                    </Box>
                </Box>

                <Box className="panel-right-side">
                    <Box className="panel-hotbar">
                        <Tabs value={tabValue} onChange={handleChangeTab} sx={tabsSxMain}>
                            <Tab label="Despesas Fixas Mensais" sx={tabsSx}/>
                            <Tab label="Repartições" sx={tabsSx}/>
                            <Tab label="Objetivos" sx={tabsSx}/>
                        </Tabs>
                    </Box>

                    <MonthlyExpenses
                        panelApi={panelApi}
                        itemEdit={itemEdit}
                        itemDelete={itemDelete}
                        setFooterCollapse={setFooterCollapse}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </Box>
            </Box>

            <footer>
                <Collapse in={footerCollapse}>
                    { itemEdit && itemEdit?.type === "monthly"
                        ? (
                            <div key={itemEdit.key}>
                                <Divider sx={{ mt: 2 }}/>
                                <EditMonthly
                                    itemEdit={itemEdit}
                                    setItemEdit={setItemEdit}
                                    setSnackbar={setSnackbar}
                                    setFooterCollapse={setFooterCollapse}
                                    handleReloadFetch={handleReloadFetch}
                                />
                            </div>
                        )
                        : <></>
                    }
                </Collapse>
            </footer>

            <DeleteModal itemDelete={itemDelete} open={openDelete} handleClose={handleCloseDelete} handleReloadFetch={handleReloadFetch} setSnackbar={setSnackbar}/>
        </Box>
    );
};