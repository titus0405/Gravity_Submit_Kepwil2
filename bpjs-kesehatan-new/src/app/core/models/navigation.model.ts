export interface NavItem {
  label: string;
  route?: string;
  icon?: string;
  children?: NavColumn[];
}

export interface NavColumn {
  title?: string;
  icon?: string;
  links: NavLink[];
}

export interface NavLink {
  label: string;
  route: string;
  isViewAll?: boolean;
}
