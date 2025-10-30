import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { closeModal } from '@/store/slices/modal/slice';
import Input from '@/components/form/input';
import Textarea from '@/components/form/textarea';
import Modal from '@/components/modal';
import { modals } from '@/constants/modals';
import { createProjectSchema } from './validation';
import { makeRequest } from '@/utils/api/make-request';
import { extractErrorMessage } from '@/utils/errors';
import ErrorMessage from '@/components/error-message';
import { getAllProjects } from '@/store/slices/projects/thunk';
import type { AppDispatch } from '@/store/store';
import type { CreateProjectForm } from './types';

const Content = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<CreateProjectForm>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: { name: '', description: '' },
  });

  const { handleSubmit } = form;

  const onSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await makeRequest('/projects', 'POST', form.getValues());

      dispatch(getAllProjects());
      toast.success('Project created successfully!');

      dispatch(closeModal({ name: modals.createProject }));
    } catch (error) {
      setErrorMessage(extractErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    dispatch(closeModal({ name: modals.createProject }));
    setErrorMessage(null);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md flex flex-col gap-4 border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Create Project</h3>
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
        <Input label="Project Name" name="name" type="text" placeholder="Project Name" />
        <Textarea label="Project Description (optional)" name="description" placeholder="Project Description" />

        <div className="flex justify-between gap-2">
          <button
            type="button"
            className="text-gray-900 dark:text-gray-300 hover:text-gray-400 text-base rounded-lg transition-colors hover:cursor-pointer"
            onClick={handleCloseModal}
          >
            Close
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-colors font-medium shadow-lg disabled:opacity-50 disabled:cursor-default"
            disabled={isSubmitting}
          >
            Create
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

const CreateProjectModal = () => {
  return (
    <Modal modalName={modals.createProject}>
      <Content />
    </Modal>
  );
};

export default CreateProjectModal;
