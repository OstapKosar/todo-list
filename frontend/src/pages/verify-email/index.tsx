import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import OtpInput from 'react-otp-input';
import { toast } from 'react-toastify';
import { useTimer } from 'react-timer-hook';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import ErrorMessage from '@/components/error-message';
import { extractErrorMessage } from '@/utils/errors';
import { makeRequest } from '@/utils/api/make-request';
import type { RootState } from '@/store/store';
import { updateUser } from '@/store/slices/user/slice';
import { verifyEmailSchema } from './validation';
import type { VerifyEmailForm } from './types';

const VerifyEmailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRequestingNewOtp, setIsRequestingNewOtp] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const oneMinuteInMilliseconds = 1000 * 60;

  const { seconds, isRunning, restart } = useTimer({
    expiryTimestamp: new Date(Date.now() + oneMinuteInMilliseconds),
    onExpire: () => {
      setIsRequestingNewOtp(false);
    },
    autoStart: false,
  });

  const form = useForm<VerifyEmailForm>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: '',
    },
  });

  const user = useSelector((state: RootState) => state.user.user);

  if (!user) {
    navigate('/login');

    return null;
  }

  const onSubmit = async (data: VerifyEmailForm) => {
    if (!user?.email) {
      setErrorMessage('User email not found.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await makeRequest('/auth/verify-email', 'POST', {
        email: user.email,
        code: data.code,
      });

      if (response.data?.user) {
        dispatch(updateUser(response.data.user));
      } else {
        dispatch(updateUser({ status: 'VERIFIED' }));
      }

      navigate('/dashboard');
      toast.success('Email verified successfully!');
    } catch (err) {
      setErrorMessage(extractErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestNewOtp = async () => {
    if (isRequestingNewOtp) {
      return;
    }

    setIsRequestingNewOtp(true);

    try {
      await makeRequest('/auth/request-new-otp', 'POST', {
        email: user?.email,
        type: 'VERIFICATION',
      });

      toast.success('New OTP code has been sent to your email!');
      restart(new Date(Date.now() + oneMinuteInMilliseconds), true);
    } catch (err) {
      setErrorMessage(extractErrorMessage(err));
      setIsRequestingNewOtp(false);
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Verify Email</h1>
            <p className="text-base text-gray-600 dark:text-gray-400">Check your email for the verification code</p>
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

export default VerifyEmailPage;
