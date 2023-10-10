import { SvgIconProps } from '@mui/material'
import {
  AddShoppingCartRounded,
  ArrowBackRounded,
  ArrowForwardRounded,
  CloseRounded,
  MusicNoteRounded,
  SelfImprovementRounded,
  ShoppingCartRounded,
} from '@mui/icons-material'
export const icons = {
  shoppingCart: ShoppingCartRounded,
  addShoppingCart: AddShoppingCartRounded,
  arrowBack: ArrowBackRounded,
  arrowForward: ArrowForwardRounded,
  close: CloseRounded,
  musicNote: MusicNoteRounded,
  yoga: SelfImprovementRounded,
}
interface IconProps extends SvgIconProps {
  icon: keyof typeof icons
}
const Icon: React.FunctionComponent<IconProps> = ({ icon, ...props }) => {
  const IconComponent = icons[icon]
  return <IconComponent {...props} />
}

export default Icon
