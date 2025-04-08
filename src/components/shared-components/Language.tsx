import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { useSettings } from '@/hooks/useSettings';
import { ILocale } from '@/types';
import { LanguageEnum } from '@/utils';

const locales: ILocale[] = [
  {
    key: LanguageEnum.vi_VN,
    label: 'Tiếng Việt',
    value: LanguageEnum.vi_VN,
    img: '/country/vi.png',
  },
  {
    key: LanguageEnum.en_US,
    label: 'English',
    value: LanguageEnum.en_US,
    img: '/country/en.png',
  },
];

interface LanguageProps {
  transformOriginVertical: 'top' | 'bottom' | 'center';
  horizontal: 'right' | 'left' | 'center';
  anchorOriginVertical: 'top' | 'bottom' | 'center';
}

const Language = (props: LanguageProps) => {
  const { transformOriginVertical, horizontal, anchorOriginVertical } = props;
  const router = useRouter();
  const { settings, saveSettings } = useSettings();

  const changeLanguage = async (event: SelectChangeEvent) => {
    event.preventDefault();
    if (event?.target?.value) {
      saveSettings({
        ...settings,
        language: event?.target?.value as LanguageEnum,
      });
      router.reload();
    }
  };

  return (
    <Box>
      <Select
        className="customize-language"
        label="Locale"
        autoWidth
        value={settings.language}
        onChange={changeLanguage}
        MenuProps={{
          transformOrigin: {
            vertical: `${transformOriginVertical}`,
            horizontal: `${horizontal}`,
          },
          anchorOrigin: {
            vertical: `${anchorOriginVertical}`,
            horizontal: 'left',
          },
        }}
        sx={{
          '& .MuiSvgIcon-root': {
            color: '#fff',
          },
        }}
      >
        {locales.map((item) => (
          <MenuItem key={item.key} value={item.key}>
            <Box sx={{ color: '#fff', '& > img': { mr: 2, flexShrink: 0 } }}>
              <img loading="lazy" width="20" src={item.img} alt="" />
              {item.label}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default Language;
