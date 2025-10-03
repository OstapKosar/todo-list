import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { addProject, closeCreateModal } from '../../../store/slices/projects/slice';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100, 'Max 100 characters'),
  description: z.string().max(500, 'Max 500 characters').optional(),
});

type CreateProjectForm = z.infer<typeof createProjectSchema>;

const CreateProjectModal: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((s: RootState) => s.projects.isCreateModalOpen);

  const form = useForm<CreateProjectForm>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: { name: '', description: '' },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  if (!isOpen) return null;

  const onSubmit = (data: CreateProjectForm) => {
    dispatch(addProject({ id: Date.now(), name: data.name, description: data.description ?? '', tasks: [] }));
    dispatch(closeCreateModal());
    reset();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-full max-w-md flex flex-col gap-4"
        >
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Create Project</h3>

          <div>
            <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project Name
            </label>
            {(() => {
              const error = errors.name;
              const inputClassName = `
                w-full px-4 py-3 rounded-lg transition-colors
                text-gray-900 dark:text-white dark:bg-gray-700
                placeholder-gray-500 dark:placeholder-gray-400
                outline-2
                outline ${error ? 'outline-red-500 bg-red-50' : 'outline-gray-300 bg-gray-100 dark:outline-gray-600'}
                ${error ? 'ring-red-300 dark:ring-red-600' : 'focus:outline-blue-500'}
              `;

              const errorTextClass = `mt-1 text-sm ${error ? 'text-red-700 dark:text-red-400' : ''}`;

              return (
                <>
                  <input
                    id="project-name"
                    {...register('name')}
                    type="text"
                    placeholder="Project Name"
                    className={inputClassName}
                  />
                  {error && <p className={errorTextClass}>{String(error.message)}</p>}
                </>
              );
            })()}
          </div>

          <div>
            <label
              htmlFor="project-description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Description (optional)
            </label>
            {(() => {
              const error = errors.description;
              const textareaClassName = `
                w-full px-4 py-3 rounded-lg transition-colors
                text-gray-900 dark:text-white dark:bg-gray-700
                placeholder-gray-500 dark:placeholder-gray-400
                outline-2
                outline ${error ? 'outline-red-500 bg-red-50' : 'outline-gray-300 bg-gray-100 dark:outline-gray-600'}
                ${error ? 'ring-red-300 dark:ring-red-600' : 'focus:outline-blue-500'}
              `;

              const errorTextClass = `mt-1 text-sm ${error ? 'text-red-700 dark:text-red-400' : ''}`;

              return (
                <>
                  <textarea
                    id="project-description"
                    {...register('description')}
                    placeholder="Optional description"
                    className={textareaClassName}
                    rows={3}
                  />
                  {error && <p className={errorTextClass}>{String(error.message)}</p>}
                </>
              );
            })()}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="pr-2 text-red-900 dark:text-red-200 hover:text-red-400 rounded-lg transition-colors hover:cursor-pointer"
              onClick={() => {
                dispatch(closeCreateModal());
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
    </div>
  );
};

export default CreateProjectModal;
