import { removeAccessToken } from './cookies';
import { LOCAL_STORAGE_KEY, localStorageUtil } from './localStorage';
import { generateLoginUrl } from './routing';
import {
  CODE_TIME_OUT,
  ERROR_NETWORK_CODE,
  STATUS_TIME_OUT,
  SUCCESS_NETWORK_CODE,
} from '@/constants';
import { translate } from '@/i18n/translate';
import { dispatch } from '@/store/app-dispatch';
import { setApiError } from '@/store/slices/app';
import { AxiosError, AxiosResponse } from 'axios';

export interface IError {
  field?: string;
  message?: string;
  code?: number;
}

export interface ResponseBase<T = any> {
  code: number;
  message?: string | null;
  data?: T | any;
  success: boolean;
  errors?: IError[] | any;
  current_page?: number;
  per_page?: string;
  last_page?: number;
  total?: number;
  warning_message?: string | null;
  in_my_vendor?: boolean;
  in_pending_approval?: boolean;
  in_pending_request?: boolean;
}

/*
  ! TODO: MUST REMOVE THIS INTERFACE AFTER FIX `data` FIELD OF `ResponseBase` INTERFACE
*/
export interface ResponseBaseFixed<T = any, E = IError | any> {
  code: number;
  message?: string | null;
  data?: T;
  success: boolean;
  errors?: E[];
  current_page?: number;
  per_page?: string;
  last_page?: number;
  total?: number;
  warning_message?: string | null;
  in_my_vendor?: boolean;
  in_pending_approval?: boolean;
  in_pending_request?: boolean;
}

export interface RequestBase {
  search?: number | string;
  page?: number;
  limit?: number | string | null;
  order?: 'asc' | 'desc';
  order_by?: string;
}

export interface RequestListBase extends RequestBase {
  ids?: number[];
  exclude?: number[];
}

const handleData = (response: ResponseBase) => {
  if (response?.code === SUCCESS_NETWORK_CODE) {
    return { data: response };
  }
  return { error: response };
};

export const handleAxios = (
  data: AxiosError & AxiosResponse
): { data: ResponseBase } | { error: ResponseBase } => {
  if (data?.code === STATUS_TIME_OUT) {
    // timeout
    return handleApi(CODE_TIME_OUT, data?.response?.data);
  }
  // success
  if (data?.data) {
    return handleApi(data?.status, data);
  }
  // error
  if (data?.response) {
    return handleApi(data?.response?.status, data?.response?.data);
  }
  return handleApi(ERROR_NETWORK_CODE);
};

export const handleApi = (status: number, data?: any) => {
  const { message } = data?.errors?.[0] ?? '';
  switch (status) {
    case ERROR_NETWORK_CODE:
      return handleData({
        code: ERROR_NETWORK_CODE,
        message: '',
        data: data || null,
        success: false,
      });
    case 200:
      return handleData({
        code: status,
        ...data?.data,
      });
    case 400:
      return handleData({
        code: status,
        message: translate('error:400'),
        data: data || null,
        success: false,
      });
    case 401:
      removeAccessToken();
      localStorageUtil.removeItem(LOCAL_STORAGE_KEY.CURRENT_BRANCH);
      localStorageUtil.removeItem(LOCAL_STORAGE_KEY.BRANCHES);

      /*
        NOTE: 
          - 10/11/2023: có một lỗi cần tìm hướng xử lý là nếu user đang ở trang landing page hoặc ở những trang không yêu cầu authenticate (landing page, policy...) thì rơi vô case này sẽ bị redirect về page login
      */
      window.location.href = generateLoginUrl();

      return handleData({
        code: status,
        message: translate('error:401'),
        data: data || null,
        success: false,
      });
    case 402:
      return handleData({
        code: status,
        message: translate('error:402'),
        data: data || null,
        success: false,
      });
    // case PERMISSION_STATUS_CODE:
    //   dispatch(setStaffPermissionDenied(!!data.is_permisison_denied));

    //   dispatch(
    //     setApiError({
    //       code: status,
    //       message,
    //     } as IError)
    //   );
    //   return handleData({
    //     code: status,
    //     message: translate('error:403'),
    //     data: data || null,
    //     success: false,
    //   });
    case 404:
      return handleData({
        code: status,
        message: translate('error:404'),
        data: data || null,
        success: false,
      });
    case 405:
      return handleData({
        code: status,
        message: translate('error:405'),
        data: data || null,
        success: false,
      });
    case 406:
      return handleData({
        code: status,
        message: translate('error:406'),
        data: data || null,
        success: false,
      });
    case 407:
      return handleData({
        code: status,
        message: translate('error:407'),
        data: data || null,
        success: false,
      });
    case 408:
      return handleData({
        code: status,
        message: translate('error:408'),
        data: data || null,
        success: false,
      });

    case 409:
      return handleData({
        code: status,
        message: translate('error:409'),
        data: data || null,
        success: false,
      });
    case 410:
      return handleData({
        code: status,
        message: translate('error:410'),
        data: data || null,
        success: false,
      });

    case 411:
      return handleData({
        code: status,
        message: translate('error:411'),
        data: data || null,
        success: false,
      });
    case 412:
      return handleData({
        code: status,
        message: translate('error:412'),
        data: data || null,
        success: false,
      });

    case 413:
      return handleData({
        code: status,
        message: translate('error:413'),
        data: data || null,
        success: false,
      });
    case 414:
      return handleData({
        code: status,
        message: translate('error:414'),
        data: data || null,
        success: false,
      });
    case 415:
      return handleData({
        code: status,
        message: translate('error:415'),
        data: data || null,
        success: false,
      });
    case 416:
      return handleData({
        code: status,
        message: translate('error:416'),
        data: data || null,
        success: false,
      });
    case 417:
      return handleData({
        code: status,
        message: translate('error:417'),
        data: data || null,
        success: false,
      });
    case 500:
      return handleData({
        code: status,
        message: translate('error:500'),
        data: data || null,
        success: false,
      });
    case 501:
      return handleData({
        code: status,
        message: translate('error:501'),
        data: data || null,
        success: false,
      });
    case 502:
      return handleData({
        code: status,
        message: translate('error:502'),
        data: data || null,
        success: false,
      });
    case 503:
      return handleData({
        code: status,
        message: translate('error:503'),
        data: data || null,
        success: false,
      });
    case 504:
      return handleData({
        code: status,
        message: translate('error:504'),
        data: data || null,
        success: false,
      });
    case 505:
      return handleData({
        code: status,
        message: translate('error:505'),
        data: data || null,
        success: false,
      });

    default:
      dispatch(setApiError({ status } as IError));
      if (status > 503) {
        return handleData({
          code: status,
          message: 'Server down',
          data: data || null,
          success: false,
        });
      }
      if (status < 500 && status >= 400) {
        return handleData({
          code: status,
          message: 'Error request',
          data: data || null,
          success: false,
        });
      }
      return handleData({
        code: status,
        message: 'Error on handle',
        data: data || null,
        success: false,
      });
  }
};

export interface IResponseExcelError {
  line: number;
  errors: {
    attribute: string;
    message: string;
  }[];
}

export interface IUploadExcelError {
  line?: number;
  errors?: {
    attribute: string;
    message: string;
  }[];
  message?: string;
}
