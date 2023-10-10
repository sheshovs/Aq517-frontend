import { Button as ButtonMui, ButtonProps, useTheme } from '@mui/material'

interface CustomButtonProps extends ButtonProps {
  text: string
}

const CustomButton = ({ text, ...props }: CustomButtonProps): JSX.Element => {
  const {
    palette: { main, black },
  } = useTheme()
  return (
    <ButtonMui
      // disabled={isDisabled !== -1}
      // variant={isSelected ? `contained` : `outlined`}
      // onClick={() => onClickHour(hour)}
      sx={{
        fontSize: `13px`,
        width: 70,
        height: 30,
        '&.MuiButton-contained': {
          backgroundColor: `${main.white} !important`,
          color: `${black.main} !important`,
        },
        '&.MuiButton-outlined': {
          borderColor: main.white,
          color: main.white,
          '&:hover': {
            backgroundColor: `${main.whiteBackground}33`,
          },
        },
        '&:disabled': {
          backgroundColor: `${main.whiteBackground}33`,
          color: `${main.whiteBackground}66`,
          borderColor: `${main.whiteBackground}33`,
        },
      }}
      {...props}
    >
      {text}
    </ButtonMui>
  )
}

export default CustomButton
