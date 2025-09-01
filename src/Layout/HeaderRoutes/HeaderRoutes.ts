
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import PaymentsIcon from '@mui/icons-material/Payments';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SavingsIcon from '@mui/icons-material/Savings';

export const HeaderRoutes = [
    {
        "name": "Painel",
        "path": "/",
        "icon": VideoLabelIcon
    },
    {
        "name": "Despesas Mensais",
        "path": "/monthly-expenses",
        "icon": PaymentsIcon
    },
    {
        "name": "Repartições",
        "path": "/repartitions",
        "icon": AttachMoneyIcon
    },
    {
        "name": "Objetivos",
        "path": "/objectives",
        "icon": SavingsIcon
    },
    {
        "name": "Calendário",
        "path": "/calendar",
        "icon": CalendarMonthIcon
    },
]