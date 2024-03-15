import { SvgIconProps } from '@mui/material'
import {
  AddRounded,
  AddShoppingCartRounded,
  ArrowBackIosRounded,
  ArrowBackRounded,
  ArrowForwardIosRounded,
  ArrowForwardRounded,
  CloseRounded,
  HelpOutlineRounded,
  LogoutRounded,
  MenuRounded,
  MusicNoteRounded,
  SelfImprovementRounded,
  ShareRounded,
  ShoppingCartRounded,
  VisibilityOffRounded,
  VisibilityRounded,
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
  showPassword: VisibilityRounded,
  hidePassword: VisibilityOffRounded,
  logout: LogoutRounded,
  help: HelpOutlineRounded,
  share: ShareRounded,
  add: AddRounded,
}
interface IconProps extends SvgIconProps {
  icon: keyof typeof icons
}
const Icon: React.FunctionComponent<IconProps> = ({ icon, ...props }) => {
  const IconComponent = icons[icon]
  return <IconComponent {...props} />
}

export default Icon
