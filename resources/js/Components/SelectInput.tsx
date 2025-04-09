import Select from "react-select";
import makeAnimated from "react-select/animated";

interface SelectInputProps {
    options: { label: string; value: string }[];
    isFocused?: boolean;
    className?: string;
    selectedOption?: any;
    setData?: any;
    menuPlacement?: any
    menuPortalTarget?: any;
}

const SelectInput = ({
    options,
    selectedOption,
    className = "",
    isFocused = false,
    setData,
    menuPlacement = "bottom",
    menuPortalTarget,
    ...props
}: SelectInputProps) => {
    const animatedComponents = makeAnimated();

    const handleChange = (selectedOption: any) => {
        setData(selectedOption.value);
    };

    return (
        <Select
            menuPortalTarget={
                menuPortalTarget
            }
            className={className}
            value={selectedOption}
            onChange={handleChange}
            options={options}
            components={animatedComponents}
            menuPlacement={menuPlacement}
            styles={{
                control: (provided, state) => ({
                    ...provided,
                    height: "45px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                    cursor: 'pointer',
                    "&:hover": {
                        borderColor: "#3DBDF5",
                    },
                }),
                menuPortal: base => ({ ...base, zIndex: 9999 }),
                option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? "#3DBDF5" : "inherit",
                    "&:hover": {
                        backgroundColor: state.isSelected
                            ? "#3DBDF5"
                            : "rgb(225, 235, 235)",
                    },
                }),
            }}
        />
    );
};

export default SelectInput;