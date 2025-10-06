import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';

import { addProject } from '@/store/slices/projects/slice';
import { closeModal } from '@/store/slices/modal/slice';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/form/input';
import Textarea from '@/components/form/textarea';
import Modal from '@/components/modal';
import { modals } from '@/constants/modals';
import { createProjectSchema, type CreateProjectForm, maxDescriptionLength } from './validation';

const Content: React.FC = () => {
  const dispatch = useDispatch();

  const form = useForm<CreateProjectForm>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: { name: '', description: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form;

  const onSubmit = (data: CreateProjectForm) => {
    dispatch(addProject({ id: Date.now(), name: data.name, description: data.description ?? '', tasks: [] }));
    dispatch(closeModal({ name: 'create-project' }));
    reset();
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md flex flex-col gap-4 border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Create Project</h3>
        <Input label="Project Name" name="name" type="text" placeholder="Project Name" />
        <Textarea
          label="Project Description"
          name="description"
          placeholder="Project Description"
          maxLength={maxDescriptionLength}
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="pr-2 text-red-900 dark:text-red-200 hover:text-red-400 rounded-lg transition-colors hover:cursor-pointer"
            onClick={() => {
              dispatch(closeModal({ name: 'create-project' }));
              reset();
            }}
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

const CreateProjectModal: React.FC = () => {
  return (
    <Modal modalName={modals.createProject}>
      <Content />
    </Modal>
  );
};

export default CreateProjectModal;
