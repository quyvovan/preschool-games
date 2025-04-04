import { ReactNode } from 'react';
import { Settings } from '@/context/settingsContext';

export type ContentWidth = 'full' | 'boxed';

export type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success'
  | 'cyan';

export type NavLink = {
  path?: string;
  title: string;
  action?: string;
  subject?: string;
  show?: boolean;
  disabled?: boolean;
  badgeContent?: string;
  externalLink?: boolean;
  openInNewTab?: boolean;
  icon?: string | string[] | ReactNode;
  badgeColor?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'warning'
    | 'info';
};

export type NavSectionTitle = {
  sectionTitle: string;
  action?: string;
  subject?: string;
};

export type NavSubMenu = {
  path?: string;
  title: string;
  action?: string;
  subject?: string;
  show?: boolean;
  disabled?: boolean;
  badgeContent?: string;
  externalLink?: boolean;
  openInNewTab?: boolean;
  icon?: string | string[] | ReactNode;
  badgeColor?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'warning'
    | 'info';
  subMenu?: {
    path?: string;
    title: string;
    show?: boolean;
    badgeColor?:
      | 'default'
      | 'primary'
      | 'secondary'
      | 'success'
      | 'error'
      | 'warning'
      | 'info';
    icon?: string | string[] | ReactNode;
  }[];
};

export type VerticalNavItemsType = (NavLink | NavSectionTitle | NavSubMenu)[];

export type LayoutProps = {
  hidden: boolean;
  settings: Settings;
  children: ReactNode;
  verticalNavItems?: VerticalNavItemsType;
  saveSettings: (values: Settings) => void;
  footerContent?: (props?: any) => ReactNode;
  verticalAppBarContent?: (props?: any) => ReactNode;
  verticalNavMenuContent?: (props?: any) => ReactNode;
  verticalNavMenuBranding?: (props?: any) => ReactNode;
  afterVerticalNavMenuContent?: (props?: any) => ReactNode;
  beforeVerticalNavMenuContent?: (props?: any) => ReactNode;
};

export type BlankLayoutProps = {
  children: ReactNode;
};

export type UnAuthLayoutProps = {
  children: ReactNode;
};
