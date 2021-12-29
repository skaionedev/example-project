import { FaBox, FaBoxes, FaUsers } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'
import { ImBoxAdd } from 'react-icons/im'

export const getRoutes = () => {
  function isDisabled(slug: any) {
    return false
    // if (!user) return true
    // return !user.Permissions.some(p => p.slug === slug)
  }

  return [
    {
      label: 'Управление',
      children: [
        { title: 'Дашборд', url: '/', icon: <MdDashboard size={22} />, disabled: false },
        {
          title: 'Пользователи',
          url: '/users',
          icon: <FaUsers size={20} />,
          disabled: false
        }
      ]
    },
    {
      label: 'Торговля',
      children: [
        {
          title: 'Товары',
          url: '/products',
          icon: <FaBox size={20} />,
          disabled: false
        },
        {
          title: 'Заказы',
          url: '/orders',
          icon: <FaBoxes size={20} />,
          disabled: false
        },
        {
          title: 'Контейнеры',
          url: '/boxes',
          icon: <ImBoxAdd size={20} />,
          disabled: false
        }
      ]
    }
    // {
    //   label: 'Услуги',
    //   children: [
    //     {
    //       title: 'Мои услуги',
    //       url: '/services',
    //       icon: <FaListAlt size={20} />,
    //       disabled: isDisabled('service_provider_access')
    //     }
    //   ]
    // }
  ]
}
