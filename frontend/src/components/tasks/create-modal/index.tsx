import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { createProjectTaskSchema } from './validation';
import type { CreateProjectTaskForm } from './types';
import { closeModal, openModal } from '@/store/slices/modal/slice';
import type { AppDispatch } from '@/store/store';
import Modal from '@/components/modal';
import Input from '@/components/form/input';
import Textarea from '@/components/form/textarea';
import Checkbox from '@/components/form/checkbox';
import { extractErrorMessage } from '@/utils/errors';
import { modals } from '@/constants/modals';
import { makeRequest } from '@/utils/api/make-request';
import { getProject } from '@/store/slices/projects/thunk';
import ErrorMessage from '@/components/error-message';

const Content = ({ projectId }: { projectId: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<CreateProjectTaskForm>({
    resolver: zodResolver(createProjectTaskSchema),
    defaultValues: { title: '', description: '', urgent: false, important: false },
  });

  const handleCloseModal = () => {
    dispatch(closeModal({ name: modals.createProjectTask }));
    dispatch(openModal({ name: modals.projectTasks }));
  };

  const handleCreateTask = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await makeRequest('/tasks', 'POST', { ...form.getValues(), projectId });

      dispatch(getProject(projectId));

      dispatch(closeModal({ name: modals.createProjectTask }));
      dispatch(openModal({ name: modals.projectTasks }));
    } catch (error) {
      setErrorMessage(extractErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateTask)}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md flex flex-col gap-4 border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Create Task</h3>
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
        <Input label="Task Name" name="title" type="text" placeholder="Task Name" />
        <Textarea label="Task Description (optional)" name="description" placeholder="Task Description" />
        <Checkbox name="urgent" />
        <Checkbox name="important" />
        <div className="flex w-full justify-between items-center  gap-4">
          <button
            type="button"
            onClick={handleCloseModal}
            className="m-3 text-gray-400 dark:text-gray-500 rounded-lg hover:text-gray-500 dark:hover:text-gray-400 transition-colors cursor-pointer"
          >
            Back to Tasks List
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 mx-3 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Create Task
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

const CreateTaskModal = ({ projectId }: { projectId: string }) => {
  return (
    <Modal modalName={modals.createProjectTask}>
      <Content projectId={projectId} />
    </Modal>
  );
};

export default CreateTaskModal;
