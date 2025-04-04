import themeConfig from '@/configs/themeConfig';
import { ContentWidth, ThemeColor } from '@/layouts/types';
import { Cookies, CookiesKey, LanguageEnum } from '@/utils';
import { PaletteMode } from '@mui/material';
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type Settings = {
  mode: PaletteMode;
  themeColor: ThemeColor;
  contentWidth: ContentWidth;
  language: LanguageEnum;
  layoutDetailWidth: number;
};

export type SettingsContextValue = {
  settings: Settings;
  saveSettings: (updatedSettings: Settings) => void;
};

const initialSettings: Settings = {
  themeColor: 'primary',
  mode: themeConfig.mode,
  contentWidth: themeConfig.contentWidth,
  layoutDetailWidth: 1064,
  language: LanguageEnum.en_US,
};

// ** Create Context
export const SettingsContext = createContext<SettingsContextValue>({
  saveSettings: () => null,
  settings: initialSettings,
});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  // ** State
  const [settings, setSettings] = useState<Settings>({ ...initialSettings });
  const { i18n } = useTranslation();

  const saveSettings = async (updatedSettings: Settings) => {
    if (updatedSettings?.language !== settings.language) {
      await Cookies.save(CookiesKey.LANGUAGE, updatedSettings?.language);
      await i18n.changeLanguage(updatedSettings?.language);
    }
    setSettings(updatedSettings);
  };

  useEffect(() => {
    (async () => {
      const language = (await Cookies.load(
        CookiesKey.LANGUAGE
      )) as LanguageEnum;
      await saveSettings({
        ...settings,
        language: language ?? LanguageEnum.en_US,
      });
    })();
  }, []);

  const value = useMemo(
    () => ({ settings, saveSettings }),
    [settings, saveSettings]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;
