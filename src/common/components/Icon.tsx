import { SvgIconProps } from '@mui/material'
import { ShoppingCartRounded } from '@mui/icons-material'
export const icons = {
  shoppingCart: ShoppingCartRounded,
}
interface IconProps extends SvgIconProps {
  icon: keyof typeof icons
}
const Icon: React.FunctionComponent<IconProps> = ({ icon, ...props }) => {
  const IconComponent = icons[icon]
  return <IconComponent {...props} />
}

export default Icon
