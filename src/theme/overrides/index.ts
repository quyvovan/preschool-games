// ** MUI Imports
import { Theme } from '@mui/material/styles';
// ** Overrides Imports
import MuiAccordion from './accordion';
import MuiAlerts from './alerts';
import MuiAutocomplete from './autocomplete';
import MuiAvatar from './avatars';
import MuiBackdrop from './backdrop';
import MuiButton from './button';
import MuiCard from './card';
import MuiCheckbox from './checkbox';
import MuiChip from './chip';
import MuiDateTimePicker from './dateTimePicker';
import MuiDialog from './dialog';
import MuiDivider from './divider';
import MuiFormControl from './formControl';
import MuiInput from './input';
import MuiLinearProgress from './linearProgress';
import MuiLink from './link';
import MuiList from './list';
import MuiMenu from './menu';
import MuiMenuItem from './menuItem';
import MuiPagination from './pagination';
import MuiPaper from './paper';
import MuiPopover from './popover';
import MuiRadio from './radio';
import MuiRating from './rating';
import MuiSelect from './select';
import MuiSnackbar from './snackbar';
import MuiSwitches from './switches';
import MuiTable from './table';
import MuiTabs from './tabs';
import MuiTimeline from './timeline';
import MuiToggleButton from './toggleButton';
import MuiTooltip from './tooltip';
import MuiTypography from './typography';

const Overrides = (theme: Theme) => {
  const chip = MuiChip(theme);
  const list = MuiList(theme);
  const menu = MuiMenu(theme);
  const tabs = MuiTabs(theme);
  const cards = MuiCard(theme);
  const input = MuiInput(theme);
  const tables = MuiTable(theme);
  const alerts = MuiAlerts(theme);
  const button = MuiButton(theme);
  const rating = MuiRating(theme);
  const avatars = MuiAvatar(theme);
  const divider = MuiDivider(theme);
  const dialog = MuiDialog(theme);
  const popover = MuiPopover(theme);
  const tooltip = MuiTooltip(theme);
  const backdrop = MuiBackdrop(theme);
  const snackbar = MuiSnackbar(theme);
  const switches = MuiSwitches(theme);
  const timeline = MuiTimeline(theme);
  const accordion = MuiAccordion(theme);
  const pagination = MuiPagination(theme);
  const dateTimePicker = MuiDateTimePicker(theme);
  const formControl = MuiFormControl(theme);
  const checkbox = MuiCheckbox(theme);
  const autocomplete = MuiAutocomplete(theme);
  const radio = MuiRadio(theme);
  const menuItem = MuiMenuItem(theme);
  const linearProgress = MuiLinearProgress(theme);

  return Object.assign(
    chip,
    list,
    menu,
    tabs,
    cards,
    input,
    alerts,
    button,
    dialog,
    rating,
    tables,
    avatars,
    divider,
    MuiLink,
    popover,
    tooltip,
    backdrop,
    MuiPaper,
    snackbar,
    switches,
    timeline,
    accordion,
    MuiSelect,
    pagination,
    MuiTypography,
    dateTimePicker,
    MuiToggleButton,
    formControl,
    checkbox,
    autocomplete,
    radio,
    menuItem,
    linearProgress
  );
};

export default Overrides;
