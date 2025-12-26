import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Modal from '@/components/modal';
import { modals } from '@/constants/modals';
import { closeModal } from '@/store/slices/modal/slice';
import type { AppDispatch, RootState } from '@/store/store';
import { selectModal } from '@/store/slices/modal/selectors';
import Input from '@/components/form/input';
import Textarea from '@/components/form/textarea';
import Checkbox from '@/components/form/checkbox';
import StatusCheckbox from '@/components/form/status-checkbox';
import { taskDetailsSchema } from './validation';
import type { TaskDetailsForm } from './types';
import type { Task } from '@/store/slices/projects/types';
import { makeRequest } from '@/utils/api/make-request';
import { getProject } from '@/store/slices/projects/thunk';
import { toast } from 'react-toastify';

const Content = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { payload } = useSelector(selectModal);
  const task = (payload as { task: Task })?.task;
  const projects = useSelector((state: RootState) => state.projects.projects);
  const project = projects.find((p) => p.tasks.some((t) => t.id === task?.id));

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TaskDetailsForm>({
    resolver: zodResolver(taskDetailsSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      urgent: task?.urgent || false,
      important: task?.important || false,
      status: task?.status || 'TODO',
    },
  });

  if (!task) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md flex flex-col gap-4 border border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400">Task not found</p>
      </div>
    );
  }

  const handleCloseModal = () => {
    dispatch(closeModal({ name: modals.taskDetails }));
  };

  const handleEditTask = async () => {
    setIsSubmitting(true);
    try {
      await makeRequest(`/tasks/${task.id}`, 'PATCH', form.getValues());

      if (project) {
        dispatch(getProject(project.id));
      }

      toast.success('Task updated successfully!');
      handleCloseModal();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update task';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleEditTask)}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md flex flex-col gap-4 border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Task Details</h3>
        <Input label="Task Name" name="title" type="text" placeholder="Task Name" />
        <Textarea label="Task Description (optional)" name="description" placeholder="Task Description" />
        <Checkbox name="important" />
        <Checkbox name="urgent" />
        <StatusCheckbox />
        <div className="flex w-full justify-between items-center gap-4">
          <button
            type="button"
            onClick={handleCloseModal}
            className="m-3 text-gray-400 dark:text-gray-500 rounded-lg hover:text-gray-500 dark:hover:text-gray-400 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-blue-900 dark:text-blue-200 hover:text-blue-400 text-lg rounded-lg transition-colors hover:cursor-pointer"
          >
            {isSubmitting ? 'Saving Changes…' : 'Save Task'}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

const TaskDetailsModal = () => {
  return (
    <Modal modalName={modals.taskDetails}>
      <Content />
    </Modal>
  );
};

export default TaskDetailsModal;
