import dayjs from 'dayjs'
import 'dayjs/locale/es'
import updateLocale from 'dayjs/plugin/updateLocale'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.locale(`es`)
dayjs.extend(updateLocale)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

dayjs.updateLocale(`es`, {
  weekdays: [`Domingo`, `Lunes`, `Martes`, `Miércoles`, `Jueves`, `Viernes`, `Sábado`],
  months: [
    `Enero`,
    `Febrero`,
    `Marzo`,
    `Abril`,
    `Mayo`,
    `Junio`,
    `Julio`,
    `Agosto`,
    `Septiembre`,
    `Octubre`,
    `Noviembre`,
    `Diciembre`,
  ],
})

export default dayjs
