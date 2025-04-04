import { SearchOutlined } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClearIcon from '@mui/icons-material/Clear';
import {
  Box,
  ClickAwayListener,
  IconButton,
  InputAdornment,
  ListItem,
  ListItemText,
  Popper,
  Tab,
  Tabs,
  useTheme,
} from '@mui/material';
import React, {
  ChangeEvent,
  MouseEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useGetListCitiesQuery, useGetListDistrictsQuery } from '@/apis';
import TabPanel from '@/components/shared-components/tab/TabPanel';
import { NoResultTextStyled } from '@/components/styled-components/Text';
import { TOP_CITIES } from '@/constants/city';
import { IOption } from '@/types';
import { IAddressAreaGeneral } from '@/types/delivery-address';
import { removeAccent } from '@/utils';
import { getFirstFieldErrorMessage } from '@/utils/form';
import Loading from '../../loading';
import {
  AddressPickerTabEnum,
  addressPickerTabs,
  initialValue,
} from './constants';
import {
  AreaPickerStyled,
  BoxClickAwayListenerStyled,
  BoxPopperStyled,
  TextFieldStyled,
} from './styles';
import { IAreaPickerElementProps, IAreaPickerElementValue } from './types';

export const AreaPickerElement = (props: IAreaPickerElementProps) => {
  const { name, boxWrapperProps, textFieldProps } = props;
  const [tabDelivery, setTabDelivery] = useState(AddressPickerTabEnum.City);
  const { t } = useTranslation();
  const theme = useTheme();
  const { field, fieldState } = useController({
    name,
    defaultValue: null as any,
  });
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'area-popper' : undefined;
  const [addressPickerValue, setAddressPickerValue] =
    useState<IAreaPickerElementValue>(initialValue);
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLDivElement>(null);

  const isHasCity = !!addressPickerValue.city?.id;
  const isHasDistrict = !!addressPickerValue.district?.id;

  const { data: citiesResponse, isFetching: isFetchingCity } =
    useGetListCitiesQuery();
  const { data: districtsResponse, isFetching: isFetchingDistricts } =
    useGetListDistrictsQuery(
      addressPickerValue.city?.id ? addressPickerValue.city.id.toString() : '',
      {
        skip: !isHasCity,
      }
    );

  const dataCity: IAddressAreaGeneral[] = citiesResponse?.data || [];
  const dataDistricts: IAddressAreaGeneral[] = districtsResponse?.data || [];

  const errorMessage = getFirstFieldErrorMessage(fieldState.error);

  useEffect(() => {
    if (isHasCity && isHasDistrict) {
      const addressNode = document.createElement('div');
      addressNode.className = 'address';
      addressNode.innerHTML = `${addressPickerValue.city?.name}, ${addressPickerValue.district?.name}`;

      const existAddressNode =
        inputRef.current?.getElementsByClassName('address')[0];
      if (existAddressNode) {
        inputRef.current?.removeChild(existAddressNode);
      }

      inputRef.current?.prepend(addressNode);
    }
  }, [addressPickerValue]);

  const sortedCities = useMemo(() => {
    const cities: IAddressAreaGeneral[] = [...dataCity].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    const topCityIndexes: (number | string)[] = JSON.parse(
      JSON.stringify(TOP_CITIES)
    );

    if (cities.length) {
      for (let i = 0; i < cities.length; i++) {
        for (let j = 0; j < topCityIndexes.length; j++) {
          if (cities[i].id === topCityIndexes[j]) {
            topCityIndexes[j] = i.toString();
          }
        }
      }

      let topCity: IAddressAreaGeneral;

      for (let i = topCityIndexes.length - 1; i >= 0; i--) {
        topCity = cities[Number(topCityIndexes[i])];

        cities.splice(Number(topCityIndexes[i]), 1);
        cities.unshift(topCity);
      }
    }

    return cities.map((city) => ({
      label: city.name ?? '',
      value: `${city.id}`,
    }));
  }, [dataCity]);

  const cities: IOption[] = useMemo(() => {
    return sortedCities.filter((city) =>
      removeAccent(city.label?.toLowerCase()).includes(
        removeAccent(searchValue.toLowerCase())
      )
    );
  }, [searchValue, dataCity]);

  const sortedDistricts = useMemo(() => {
    return dataDistricts
      .map((district) => ({
        label: district.name ?? '',
        value: `${district.id}`,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [dataDistricts]);

  const districts: IOption[] = useMemo(
    () =>
      sortedDistricts.filter((district) =>
        removeAccent(district.label?.toLowerCase()).includes(
          removeAccent(searchValue.toLowerCase())
        )
      ),
    [searchValue, dataDistricts]
  );

  const openPopper = (event: SyntheticEvent<HTMLDivElement>) => {
    setAnchorEl(event?.currentTarget);

    if (!isHasCity && !isHasDistrict) {
      setTabDelivery(AddressPickerTabEnum.City);
    }

    if (isHasCity && !isHasDistrict) {
      setTabDelivery(AddressPickerTabEnum.District);
    }
  };

  const closePopper = () => {
    setAnchorEl(null);
  };

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    if (!addressPickerValue.city && newValue === AddressPickerTabEnum.District)
      return;

    setTabDelivery(newValue);
  };

  const onChangeCity = (option: IOption) => {
    const addressNode = document.createElement('div');
    addressNode.className = 'address';

    const selectedCityNode = document.createElement('div');
    selectedCityNode.innerHTML = `${option.label}, `;
    selectedCityNode.className = 'city';

    const existAddressNode =
      inputRef.current?.getElementsByClassName('address')[0];
    if (existAddressNode) {
      inputRef.current?.removeChild(existAddressNode);
    }

    addressNode.appendChild(selectedCityNode);
    inputRef.current?.prepend(addressNode);

    setSearchValue('');
    setAddressPickerValue({
      city: {
        id: Number(option.value),
        name: option.label,
      },
      district: null,
    });

    setTabDelivery(AddressPickerTabEnum.District);
    field.onChange({
      city: {
        id: Number(option.value),
        name: option.label,
      },
      district: null,
    });
  };

  const onChangeDistrict = (option: IOption) => {
    const address = inputRef.current?.getElementsByClassName('address')[0];

    const selectedDistrict = document.createElement('div');
    selectedDistrict.innerHTML = option.label;
    selectedDistrict.className = 'district';

    const existDistrict =
      inputRef.current?.getElementsByClassName('district')[0];
    if (existDistrict) {
      address?.removeChild(existDistrict);
    }

    address?.appendChild(selectedDistrict);

    setSearchValue('');
    setAddressPickerValue({
      ...addressPickerValue,
      district: {
        id: Number(option.value),
        name: option.label,
      },
    });
    field.onChange({
      district: {
        id: Number(option.value),
        name: option.label,
      },
      city: addressPickerValue.city,
    });
    closePopper();
  };

  const onResetValue = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    inputRef.current?.querySelector('input')?.focus();

    setSearchValue('');

    setTabDelivery(AddressPickerTabEnum.City);

    const existAddress = inputRef.current?.getElementsByClassName('address')[0];
    if (existAddress) {
      inputRef.current?.removeChild(existAddress);
    }

    setAddressPickerValue({
      city: null,
      district: null,
    });

    field.onChange({
      district: null,
      city: null,
    });
    closePopper();
  };

  useEffect(() => {
    setAddressPickerValue({
      city: {
        id: field.value?.city?.id,
        name: field.value?.city?.name,
      },
      district: {
        id: field.value?.district?.id,
        name: field.value?.district?.name,
      },
    });
  }, [field.value]);

  const renderContentCity = useCallback(() => {
    if (isFetchingCity) return <Loading />;

    return (
      <AreaPickerStyled>
        {cities.length ? (
          cities.map((item, index: number) => {
            return (
              <ListItem
                key={index}
                className={
                  addressPickerValue.city?.id === Number(item?.value)
                    ? 'active'
                    : ''
                }
                button
                onClick={() => onChangeCity(item)}
              >
                <ListItemText primary={item?.label} />
              </ListItem>
            );
          })
        ) : (
          <NoResultTextStyled>{t('no_result_found')}</NoResultTextStyled>
        )}
      </AreaPickerStyled>
    );
  }, [addressPickerValue.city, cities, isFetchingCity]);

  const renderContentDistrict = useCallback(() => {
    if (isFetchingDistricts) return <Loading />;

    return (
      <AreaPickerStyled>
        {districts.length && isHasCity ? (
          districts.map((item, index: number) => {
            return (
              <ListItem
                key={index}
                className={
                  addressPickerValue.district?.id === Number(item?.value)
                    ? 'active'
                    : ''
                }
                button
                onClick={() => onChangeDistrict(item)}
              >
                <ListItemText primary={item?.label} />
              </ListItem>
            );
          })
        ) : (
          <NoResultTextStyled>{t('no_result_found')}</NoResultTextStyled>
        )}
      </AreaPickerStyled>
    );
  }, [addressPickerValue, districts, isFetchingDistricts]);

  const areaPickerPopover = () => {
    return (
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        sx={{ zIndex: 1301 }}
      >
        <BoxPopperStyled>
          <Tabs
            value={tabDelivery}
            onChange={handleChangeTab}
            defaultValue={AddressPickerTabEnum.City}
          >
            {addressPickerTabs.map((tab) => {
              return <Tab key={tab.value} label={tab.name} />;
            })}
          </Tabs>
          <TabPanel value={tabDelivery} index={AddressPickerTabEnum.City}>
            <Box sx={{ height: theme.spacing(50) }}>{renderContentCity()}</Box>
          </TabPanel>
          <TabPanel value={tabDelivery} index={AddressPickerTabEnum.District}>
            <Box sx={{ height: theme.spacing(50) }}>
              {renderContentDistrict()}
            </Box>
          </TabPanel>
        </BoxPopperStyled>
      </Popper>
    );
  };

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const placeholder = (() => {
    if (!isHasCity && !isHasDistrict) {
      return t('select_city');
    }

    if (isHasCity && !isHasDistrict) {
      return t('select_district');
    }
  })();

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={closePopper}
    >
      <BoxClickAwayListenerStyled {...boxWrapperProps}>
        <TextFieldStyled
          placeholder={placeholder}
          variant="outlined"
          name={name}
          label={t('city_district')}
          value={searchValue}
          InputLabelProps={{ shrink: true }}
          error={!!errorMessage}
          helperText={errorMessage}
          autoComplete="off"
          inputProps={{
            autoComplete: 'off', // disable autocomplete and autofill
          }}
          InputProps={{
            ref: inputRef,
            readOnly: isHasCity && isHasDistrict,
            endAdornment: (
              <>
                {(isHasCity || isHasDistrict) && !textFieldProps?.disabled && (
                  <IconButton onClick={onResetValue}>
                    <ClearIcon />
                  </IconButton>
                )}
                {anchorEl && <SearchOutlined />}
                <InputAdornment position="end">
                  <ArrowDropDownIcon sx={{ pointerEvents: 'none' }} />
                </InputAdornment>
              </>
            ),
            onChange: handleChangeSearch,
            onClick: textFieldProps?.disabled ? undefined : openPopper,
            sx: {
              ...(isHasCity && {
                '.MuiInputBase-input': {
                  pl: 2,
                },
              }),
            },
          }}
          required
          {...textFieldProps}
        />
        {!!anchorEl && areaPickerPopover()}
      </BoxClickAwayListenerStyled>
    </ClickAwayListener>
  );
};
