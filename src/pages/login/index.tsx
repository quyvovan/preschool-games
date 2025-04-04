import { LoginContainer } from '@/containers/auth/login';
import UnAuthLayout from '@/layouts/UnAuthLayout';
import { ReactNode } from 'react';

const LoginPage = () => {
  return <LoginContainer />;
};

LoginPage.getLayout = (page: ReactNode) => <UnAuthLayout>{page}</UnAuthLayout>;

export default LoginPage;
