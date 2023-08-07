import Link from 'next/link';
import { useRouter } from 'next/router';

const NewsBreadcrumbs = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter((segment) => segment !== '');
  // console.log(router.pathname);

  return (
    <nav>
      <ul>
        {pathSegments.map((segment, index) => (
          <li key={segment}>
            <Link href={`/${pathSegments.slice(0, index + 1).join('/')}`}>{segment}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NewsBreadcrumbs;
