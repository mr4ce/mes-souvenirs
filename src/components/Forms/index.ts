export interface IHookForm<T> {
  initialValues?: T;
  onSubmit: (formData: T) => void;
}
