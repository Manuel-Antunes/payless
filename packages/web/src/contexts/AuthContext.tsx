import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, useContext } from 'react';
import { useMutation } from 'react-relay';

import { ApiContext } from '../@types/ApiContext';
import { LoginInput } from '../graphql/generated/schema';

import login from '../graphql/mutations/login';
import { loginMutation } from '../graphql/mutations/__generated__/loginMutation.graphql';
import { useMe_me } from '../hooks/__generated__/useMe_me.graphql';

import { toast } from '../services/toast';

type AuthContextType = {
  // eslint-disable-next-line no-unused-vars
  signIn: (data: LoginInput) => void;
  // eslint-disable-next-line no-unused-vars
  signOut: () => void;
  user?: useMe_me;
  isAuthenticated: boolean;
  signInLoading: boolean;
};

const APP_TOKEN_COOKIE = 'payless.token';

export const AuthContext = createContext({} as AuthContextType);

export interface AuthProviderProps {
  children: React.ReactNode;
  me?: useMe_me;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, me }) => {
  const [commitMutation, signInLoading] = useMutation<loginMutation>(login);

  const isAuthenticated = !!me;

  function signIn({ email, password }: LoginInput) {
    try {
      commitMutation({
        variables: {
          input: { email, password },
        },
        onCompleted: ({ login }, errors) => {
          if (errors) {
            toast.error(errors[0].message);
          }
          if (login) {
            const { token } = login;
            setCookie(undefined, APP_TOKEN_COOKIE, token, {
              maxAge: 60 * 60 * 1, // 1 hour
            });

            toast.success('Login realizado com sucesso!');

            Router.push('/');
          }
        },
      });
    } catch (error) {
      toast.error('Failed to Sign in.');
    }
  }

  function signOut(): void {
    try {
      destroyCookie(undefined, APP_TOKEN_COOKIE, { path: '/' });
      Router.push('/');
    } catch (error) {
      toast.error('Failed to Sign out.');
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user: me,
        isAuthenticated,
        signInLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const getToken = (ctx?: ApiContext) => {
  const { [APP_TOKEN_COOKIE]: token } = parseCookies(ctx);
  return token;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
