import Language from '@/components/shared-components/Language';
import MenuIcon from '@mui/icons-material/Menu';
import { BoxProps, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';

// import UserDropdown from '@/components/shared-components/UserDropdown';
// import NotificationDropdown from '@/components/shared-components/notification/NotificationDropdown';

interface Props {
  hidden: boolean;
  toggleNavVisibility: () => void;
}

const LanguageStyled = styled(Box)<BoxProps>(({ theme }) => ({
  marginRight: theme.spacing(4),
  '& .MuiFormLabel-root': {
    display: 'none',
  },
  '& fieldset.MuiOutlinedInput-notchedOutline': {
    maxHeight: theme.spacing(9),
    top: 0,
    borderColor: theme.palette.customColors.tableBorder,
    legend: {
      display: 'none',
    },
  },
  '& .MuiInputBase-root': {
    maxHeight: theme.spacing(9),
  },
  '& .MuiSelect-select': {
    minHeight: 'auto',
    padding: theme.spacing(2),
    minWidth: 'fit-content !important',
    display: 'flex',
    alignItems: 'center',
    paddingRight: theme.spacing(9),
    '& .MuiBox-root': {
      fontSize: theme.spacing(3.5),
    },
  },
  '.MuiOutlinedInput-input': {
    '.MuiBox-root': {
      display: 'flex',
      alignItems: 'center',
      lineHeight: theme.spacing(5),
    },
  },
}));

const AppBarContent = (props: Props) => {
  const { hidden, toggleNavVisibility } = props;
  const theme = useTheme();

  const hiddenSm = useMediaQuery(() => theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        className="actions-left"
        sx={{ mr: 2, display: 'flex', alignItems: 'center' }}
      >
        {hidden ? (
          <IconButton
            color="inherit"
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <MenuIcon />
          </IconButton>
        ) : null}
      </Box>
      <Box
        className="actions-right"
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        {/* Language  */}
        <LanguageStyled>
          <Language
            transformOriginVertical="top"
            horizontal="left"
            anchorOriginVertical="bottom"
          />
        </LanguageStyled>

        <Divider
          sx={{ mr: 2, borderColor: theme.palette.text.secondary }}
          orientation="vertical"
          variant="middle"
          flexItem
        />

        {/* Notification  */}
        {/* <NotificationDropdown /> */}

        {/* User information */}
        {/* <UserDropdown /> */}
      </Box>
    </Box>
  );
};

export default AppBarContent;
