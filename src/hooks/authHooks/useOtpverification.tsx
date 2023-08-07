import client from '@/GraphqlClient/client';
import LSHelper from '@/utils/LSHelper';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
const useOtpverification = (numberOtp = 2) => {
  const router = useRouter();

  const test = () => {
    const getEmail = LSHelper.getItem('singupEmail');
    client
      .query({
        query: gql`
    query {
      verifyEmail(email: "${getEmail}", otp: "${numberOtp}") {
        message
      }
    }
  `
      })
      .then((result) => {
        {
          toast.success(result?.data.verifyEmail.message);
        }
      })
      .then(() => router.push({ pathname: '/authPages/settingPassword' }))
      .catch((error) => {
        toast.error(error.message);
      });

    // console.log(numberOtp)
  };

  return { test };
};
export default useOtpverification;
