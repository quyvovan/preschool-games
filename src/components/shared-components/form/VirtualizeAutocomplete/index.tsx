import {
  Autocomplete,
  AutocompleteChangeReason,
  AutocompleteProps as AutocompleteElementProps,
  AutocompleteRenderInputParams,
  TextField,
  TextFieldProps,
} from '@mui/material';
import React, { ReactNode, SyntheticEvent, useMemo } from 'react';
import Listbox from './components/Listbox';
import { VirtualizeAutocompleteContext } from './useVirtualizeAutocompleteContext';

type AutocompleteProps = AutocompleteElementProps<
  any,
  boolean,
  boolean,
  boolean
>;

interface IVirtualizeAutocompleteProps
  extends Omit<
    AutocompleteProps,
    'ListboxComponent' | 'renderInput' | 'onChange' | 'value'
  > {
  renderInput?: (params: AutocompleteRenderInputParams) => ReactNode;
  textFieldProps?: TextFieldProps;
  showCheckbox?: boolean;
  matchId?: boolean;
  label?: ReactNode;
  value: any;
  onChange: (
    _event: SyntheticEvent<Element, Event>,
    _value: any,
    _reason: AutocompleteChangeReason
  ) => void;
  lazyLoadProps?: {
    isLoadingMore: boolean;
    isFetching: boolean;
    onFetchMore: () => void;
  };
}

export const VirtualizeAutocomplete = (props: IVirtualizeAutocompleteProps) => {
  const {
    options,
    placeholder,
    textFieldProps,
    lazyLoadProps,
    showCheckbox = false,
    matchId = false,
    label,
    renderOption,
    onChange,
    getOptionLabel,
    multiple,
    value,
    ...restProps
  } = props;

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    _value: any,
    _reason: AutocompleteChangeReason
  ) => {
    let newValue = _value;
    if (_value) {
      if (matchId) {
        newValue = multiple ? _value?.map((val: any) => val.id) : _value?.id;
      }
    } else {
      newValue = multiple ? [] : null;
    }

    onChange(_event, newValue, _reason);
  };

  const renderInputElement = (params: AutocompleteRenderInputParams) => (
    <TextField
      placeholder={placeholder}
      label={label}
      {...params}
      {...textFieldProps}
      InputLabelProps={{
        shrink: true,
        ...params.InputLabelProps,
        ...textFieldProps?.InputLabelProps,
      }}
      InputProps={{
        ...params.InputProps,
        ...textFieldProps?.InputProps,
      }}
      inputProps={{
        ...params.inputProps,
        ...textFieldProps?.inputProps,
      }}
    />
  );

  const contextValues = useMemo(
    () => ({
      isLoadingMore: !!lazyLoadProps?.isLoadingMore,
      isFetching: !!lazyLoadProps?.isFetching,
      onFetchMore: lazyLoadProps?.onFetchMore,
    }),
    [lazyLoadProps]
  );

  const currentValue = useMemo(() => {
    if (matchId) {
      return multiple
        ? value.map((val: number) =>
            options.find((option) => option.id === val)
          ) || []
        : options.find((option) => option.id === value) || null;
    }

    return value;
  }, [value]);

  return (
    <VirtualizeAutocompleteContext.Provider value={contextValues}>
      <Autocomplete
        options={options}
        ListboxComponent={Listbox}
        disableListWrap
        disabledItemsFocusable
        disablePortal
        renderOption={(optionProps, option, state) =>
          [
            optionProps,
            option,
            renderOption,
            showCheckbox,
            state,
            getOptionLabel,
          ] as React.ReactNode
        }
        renderInput={renderInputElement}
        onChange={handleChange}
        value={currentValue}
        disableCloseOnSelect={multiple}
        getOptionLabel={getOptionLabel}
        multiple={multiple}
        {...restProps}
      />
    </VirtualizeAutocompleteContext.Provider>
  );
};
