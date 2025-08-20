import { TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";

export default function CurrencyInputStandard({ value, onChange }) {
    return (
        <NumericFormat
            variant="standard"
            value={value}
            onValueChange={(values) => {
                onChange(values.value);
            }}
            defaultValue={value}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            decimalScale={2}
            fixedDecimalScale
            allowNegative={false}
            customInput={TextField}
            placeholder="R$ 1.650,00"
            fullWidth
            sx={{
               ".MuiInputBase-root": {
                    color: "#ffffff",
                    fontSize: 14,
                    height: 35,
                },
                "& .MuiInput-underline:before": {
                    borderColor: "#ffffff !important"
                }
            }}
        />
    );
}
