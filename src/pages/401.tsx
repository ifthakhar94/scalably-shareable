import { useRouter } from 'next/router';
const Error401 = () => {
  const router = useRouter();
  function goBack() {
    router.back();
  }
  return (
    <div className="error_401">
      <h2>401</h2>
      <h5> Unauthorized</h5>
      <button onClick={goBack}>Go back</button>
    </div>
  );
};

export default Error401;
