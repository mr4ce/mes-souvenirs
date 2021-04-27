import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Form from '../../Form';
import { IHookForm } from '../index';
import SubmitButton from '../SubmitButton/SubmitButton';

export interface ISouvenirFormData {
  souvenirName: string;
  souvenirDescription?: string;
}

interface ISouvenirForm extends IHookForm<ISouvenirFormData> {
  editingMode?: boolean;
}

const SouvenirForm: React.FC<ISouvenirForm> = (props: React.PropsWithChildren<ISouvenirForm>) => {
  const { initialValues, onSubmit } = props;

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ISouvenirFormData>({
    defaultValues: initialValues,
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="souvenirName"
        render={({ field: { value, onBlur, onChange } }) => (
          <FormControl fullWidth>
            <TextField
              fullWidth
              error={!!errors.souvenirName?.message}
              required
              helperText={errors.souvenirName?.message}
              id="souvenirName"
              label="Souvenir name"
              value={value}
              onBlur={onBlur}
              onChange={onChange}
            />
          </FormControl>
        )}
        rules={{ required: 'Souvenir description is required' }}
      />
      <Controller
        control={control}
        name="souvenirDescription"
        render={({ field: { value, onBlur, onChange } }) => (
          <FormControl fullWidth>
            <TextField
              fullWidth
              multiline
              id="souvenirDescription"
              label="Souvenir description"
              value={value}
              onBlur={onBlur}
              onChange={onChange}
            />
          </FormControl>
        )}
      />
      <SubmitButton iconName="save">Save</SubmitButton>
    </Form>
  );
};

export default React.memo(SouvenirForm);
