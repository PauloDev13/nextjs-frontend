import {
  NextPage,
  GetServerSideProps,
  GetStaticProps,
  GetStaticPaths,
} from 'next';
import { Product } from '../../model';

interface ProdutsDetailPageProps {
  product: Product;
}

const ProdutsDetailPage: NextPage<ProdutsDetailPageProps> = ({ product }) => {
  // useEffect(() => {
  //   fetch('http://localhost:3001/products', { method: 'GET' })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);

  return (
    // <ul>
    <div>
      <h1>Detalhe do Produto</h1>
      <ul>
        <li>ID: {product.id}</li>
        <li> Descrição: {product.name}</li>
        <li>Preço: {product.price}</li>
      </ul>
    </div>
    // </ul>
  );
};

export const getStaticProps: GetStaticProps<ProdutsDetailPageProps> = async (
  context
) => {
  const { prodId } = context.params!;
  const res = await fetch(`http://localhost:3001/products/${prodId}`, {
    method: 'GET',
  });
  const product = await res.json();
  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    }, // will be passed to the page component as props
    revalidate: 20,
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`http://localhost:3001/products`, { method: 'GET' });
  const products = await res.json();
  if (!products) {
    return {
      notFound: true,
    };
  }
  const paths: Product[] = products.map((p: Product) => ({
    params: { prodId: p.id + '' },
  }));
  return {
    paths,
    fallback: false,
  };
};

// export const getServerSideProps: GetServerSideProps<ProdutsDetailPageProps> =
// async (context) => {
//   const { prodId } = context.params!;
//   const res = await fetch(`http://localhost:3001/products/${prodId}`, {
//     method: 'GET',
//   });
//   const product = await res.json();
//   if (!product) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       product,
//     }, // will be passed to the page component as props
//   };
//};
export default ProdutsDetailPage;
