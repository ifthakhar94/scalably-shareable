import { useFormik } from 'formik';
const useHubTop = () => {
  return useFormik({
    initialValues: {
      hub_name: ''
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });
};

export default useHubTop;
