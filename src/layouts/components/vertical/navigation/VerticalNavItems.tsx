import { Settings } from '@/context/settingsContext';
import {
  NavLink,
  NavSectionTitle,
  NavSubMenu,
  VerticalNavItemsType,
} from '@/layouts/types';
import VerticalNavLink from './VerticalNavLink';
import VerticalNavMultiLevel from './VerticalNavMultiLevel';
import VerticalNavSectionTitle from './VerticalNavSectionTitle';

interface Props {
  settings: Settings;
  navVisible?: boolean;
  groupActive: string[];
  currentActiveGroup: string[];
  verticalNavItems?: VerticalNavItemsType;
  saveSettings: (values: Settings) => void;
  setGroupActive: (value: string[]) => void;
  setCurrentActiveGroup: (item: string[]) => void;
}

const resolveNavItemComponent = (
  item: NavLink | NavSectionTitle | NavSubMenu
) => {
  if ((item as NavSectionTitle)?.sectionTitle) return VerticalNavSectionTitle;
  if ((item as NavSubMenu)?.subMenu) return VerticalNavMultiLevel;

  return VerticalNavLink;
};

const VerticalNavItems = (props: Props) => {
  const { verticalNavItems } = props;

  const RenderMenuItems = verticalNavItems?.map(
    (item: NavLink | NavSectionTitle, index) => {
      const TagName: any = resolveNavItemComponent(item);

      return <TagName {...props} item={item} key={index?.toString()} />;
    }
  );

  return RenderMenuItems as any;
};

export default VerticalNavItems;
