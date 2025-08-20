import { TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";

export default function CurrencyInput({ value, onChange, current }) {
    return (
        <NumericFormat
            required
            size="small"
            value={value}
            onValueChange={(values) => {
                if (!current) {
                    onChange(values.value);
                } else {
                    current.current = values.value;
                }
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
            label="Valor"
            sx={{
                "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                        borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                        borderColor: "var(--theme-dark)",
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "var(--theme)",
                    },
                    borderRadius: 2,
                    fontSize: 14,
                    bgcolor: "#eeeeeeff",
                    color: "var(--text)",
                    fontWeight: "bold"
                },
                "& .MuiInputLabel-root": {
                    color: "var(--text-secondary)",
                    fontSize: 14,
                    fontWeight: "bold"
                },
                "& .MuiInputLabel-root.Mui-focused": {
                    color: "var(--theme)",
                },
            }}
        />
    );
}
