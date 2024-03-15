import { Button as ButtonMui, ButtonProps, useTheme } from '@mui/material'

interface CustomButtonDashboardProps extends ButtonProps {
  text: string
  width?: number
}

const CustomButtonDashboard = ({
  text,
  width,
  ...props
}: CustomButtonDashboardProps): JSX.Element => {
  const {
    palette: { main, black, primary },
  } = useTheme()
  return (
    <ButtonMui
      sx={{
        fontSize: `13px`,
        width: width,
        height: 30,
        '&.MuiButton-contained': {
          backgroundColor: `${primary.main} !important`,
          color: `${main.white} !important`,
        },
        '&.MuiButton-outlined': {
          borderColor: primary.main,
          color: primary.main,
          '&:hover': {
            backgroundColor: `${primary.light}33`,
          },
        },
        '&:disabled': {
          backgroundColor: `${black.lightFooter}33`,
          color: `${black.light}66`,
          borderColor: `${black.light}33`,
        },
      }}
      {...props}
    >
      {text}
    </ButtonMui>
  )
}

export default CustomButtonDashboard
