import VerticalAppBarContent from './components/vertical/AppBarContent';
import { useNavigationItems } from './useNavigationItems';
import { useSettings } from '@/hooks/useSettings';
import VerticalLayout from '@/layouts/VerticalLayout';
import { Alert, Collapse } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  children: ReactNode;
}

const UserLayout = ({ children }: Props) => {
  const { settings, saveSettings } = useSettings();
  const { t } = useTranslation();
  const theme = useTheme();
  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const hidden = useMediaQuery(() => theme.breakpoints.down('lg'));

  const verticalAppBarContent = (props: any) => (
    <VerticalAppBarContent
      hidden={hidden}
      toggleNavVisibility={props.toggleNavVisibility}
    />
  );

  const { navigationItems } = useNavigationItems();

  return (
    <VerticalLayout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      verticalNavItems={navigationItems}
      verticalAppBarContent={verticalAppBarContent}
    >
      <Collapse in={showWarningAlert}>
        <Alert
          severity="error"
          onClose={() => setShowWarningAlert(false)}
          sx={{
            border: `1px solid ${theme.palette.error.main}`,
            mb: 8,
            '& .MuiAlertTitle-root': {
              mb: 1,
            },
          }}
        >
          {t(
            'dialog:please_enable_push_notification_to_always_receive_active_message_operating_for_your_business'
          )}
        </Alert>
      </Collapse>

      {children}
    </VerticalLayout>
  );
};

export default UserLayout;
