import { useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';
import OtpInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router-dom';

import ErrorMessage from '@/components/error-message';
import { verifyOtpSchema } from '../validation';
import type { VerifyOtpForm } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { extractErrorMessage } from '@/utils/errors';
import { makeRequest } from '@/utils/api/make-request';

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRequestingNewOtp, setIsRequestingNewOtp] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const oneMinuteInMilliseconds = 1000 * 60;

  useEffect(() => {
    if (!state?.email) {
      toast.error('No reset session found. Please start the password reset process again.');
      navigate('/forgot-password');
      return;
    }

    setUserEmail(state.email);
  }, [navigate, state]);

  const { seconds, isRunning, restart } = useTimer({
    expiryTimestamp: new Date(Date.now() + oneMinuteInMilliseconds),
    onExpire: () => {
      setIsRequestingNewOtp(false);
    },
    autoStart: false,
  });

  const form = useForm<VerifyOtpForm>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async (data: VerifyOtpForm) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await makeRequest('/auth/verify-forgot-password-otp', 'POST', {
        code: data.code,
        email: userEmail,
      });

      toast.success('OTP verified successfully!');
      navigate('/new-password', { state: { email: userEmail } });
    } catch (error) {
      setErrorMessage(extractErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestNewOtp = async () => {
    if (isRequestingNewOtp || !userEmail) {
      return;
    }

    setIsRequestingNewOtp(true);

    try {
      const response = await makeRequest('/auth/request-new-otp', 'POST', {
        email: userEmail,
        type: 'RESET_PASSWORD',
      });

      if (response.status === 201) {
        toast.success('A new reset code has been sent to your email!');
        restart(new Date(Date.now() + oneMinuteInMilliseconds), true);

        return;
      }
    } catch (error) {
      setErrorMessage(extractErrorMessage(error));
      setIsRequestingNewOtp(false);
    }
  };

  // Show loading state while checking token
  if (!userEmail) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Verifying session...</p>
      </div>
    );
  }

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Verify Reset Code</h1>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Enter the reset code sent to <span className="font-semibold">{userEmail}</span>
            </p>
          </div>

          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
          <OtpInput
            value={form.watch('code')}
            onChange={(value: string) => {
              form.setValue('code', value);
              setErrorMessage(null);
            }}
            numInputs={6}
            inputType="number"
            containerStyle="flex gap-2 justify-center my-6"
            inputStyle={{
              width: '48px',
              height: '48px',
              fontSize: '18px',
              fontWeight: '600',
              textAlign: 'center',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              outline: 'none',
            }}
            renderInput={(props) => (
              <input
                {...props}
                className="w-12 h-12 flex items-center justify-center text-center text-lg font-semibold border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
              />
            )}
          />
          <button
            type="submit"
            disabled={isSubmitting || form.watch('code').length !== 6}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:cursor-pointer focus:outline-none font-medium shadow-lg hover:shadow-xl transition-colors duration-150 disabled:opacity-50 disabled:cursor-default disabled:hover:bg-blue-600"
          >
            {isSubmitting ? 'Verifying...' : 'Verify Email'}
          </button>
          <div className="text-center flex flex-col items-center justify-center">
            <span className="text-sm text-gray-600 dark:text-gray-400 mb-2">Having trouble with your code?</span>
            <button
              type="button"
              className="text-blue-900 dark:text-blue-200 hover:text-blue-400 hover:cursor-pointer rounded-lg font-medium transition-colors disabled:text-gray-500 disabled:opacity-50 disabled:cursor-default disabled:hover:text-gray-500"
              onClick={handleRequestNewOtp}
              disabled={isRequestingNewOtp || isRunning}
            >
              {isRunning ? `Request a new one in ${seconds} seconds` : 'Request a new one'}
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default VerifyOtpPage;
