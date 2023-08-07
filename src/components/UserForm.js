import { gql, useMutation } from '@apollo/client';
import { Field, Form, Formik } from 'formik';

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

function UserForm() {
  const [createUser] = useMutation(CREATE_USER);

  const handleSubmit = async (values, { setSubmitting }) => {
    alert(values.name);
    await createUser({
      variables: {
        name: values.name,
        email: values.email,
        password: values.password
      }
    });
    setSubmitting(false);
  };

  return (
    <Formik initialValues={{ name: '', email: '', password: '' }} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="name" />
          <Field type="email" name="email" />
          <Field type="password" name="password" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default UserForm;
