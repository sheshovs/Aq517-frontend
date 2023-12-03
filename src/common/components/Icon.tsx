import { SvgIconProps } from '@mui/material'
import {
  AddShoppingCartRounded,
  ArrowBackIosRounded,
  ArrowBackRounded,
  ArrowForwardIosRounded,
  ArrowForwardRounded,
  CloseRounded,
  MenuRounded,
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
  backArrow: ArrowBackIosRounded,
  nextArrow: ArrowForwardIosRounded,
  menuExpand: MenuRounded,
}
interface IconProps extends SvgIconProps {
  icon: keyof typeof icons
}
const Icon: React.FunctionComponent<IconProps> = ({ icon, ...props }) => {
  const IconComponent = icons[icon]
  return <IconComponent {...props} />
}

export default Icon
