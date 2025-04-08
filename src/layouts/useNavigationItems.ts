import { translate } from '@/i18n/translate';
import { NavLink } from '@/layouts/types';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { useMemo } from 'react';

export const useNavigationItems = () => {
  const navigationFullItems = useMemo(() => {
    return [
      {
        // title: translate('dashboard'),
        title: 'Game ghi nhớ',
        icon: DashboardOutlinedIcon as unknown as NavLink['icon'],
        showDotIcon: false,
        show: true,
        path: '/game-card',
      },
      {
        title: 'Game đố vui',
        icon: DashboardOutlinedIcon as unknown as NavLink['icon'],
        showDotIcon: false,
        show: true,
        path: '/game-quiz',
      },
      {
        title: 'Game đập chuột',
        icon: DashboardOutlinedIcon as unknown as NavLink['icon'],
        showDotIcon: false,
        show: true,
        path: '/game-whack-a-mole',
      },
      {
        title: 'Game Tính toán',
        icon: DashboardOutlinedIcon as unknown as NavLink['icon'],
        showDotIcon: false,
        show: true,
        path: '/game-loop-no-speech',
      },
    ];
  }, []);

  const navigationItems = useMemo(() => {
    const _navigationFullItems = navigationFullItems.filter(
      (navItem) => navItem.show
    );
    _navigationFullItems.forEach((item, index) => {
      _navigationFullItems[index] = {
        ...item,
        // subMenu: item.subMenu?.filter((itemChild) => itemChild.show),
      };
    });

    return _navigationFullItems;
  }, [navigationFullItems]);

  return {
    navigationFullItems,
    navigationItems,
  };
};
