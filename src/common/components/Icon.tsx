import { SvgIconProps } from '@mui/material'
import {
  AddShoppingCartRounded,
  ArrowBackRounded,
  ArrowForwardRounded,
  ShoppingCartRounded,
} from '@mui/icons-material'
export const icons = {
  shoppingCart: ShoppingCartRounded,
  addShoppingCart: AddShoppingCartRounded,
  arrowBack: ArrowBackRounded,
  arrowForward: ArrowForwardRounded,
}
interface IconProps extends SvgIconProps {
  icon: keyof typeof icons
}
const Icon: React.FunctionComponent<IconProps> = ({ icon, ...props }) => {
  const IconComponent = icons[icon]
  return <IconComponent {...props} />
}

export default Icon
