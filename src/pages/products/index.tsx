import { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { Product } from '../../model';
// import { useEffect } from 'react';

interface ProdutsListPageProps {
  products: Product[];
}

const ProdutsListPage: NextPage<ProdutsListPageProps> = ({ products }) => {
  // useEffect(() => {
  //   fetch('http://localhost:3001/products', { method: 'GET' })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);

  return (
    // <ul>
    <div>
      <h1>Listagem de Produtos</h1>
      {products.map((product) => (
        <ul key={product.id}>
          <li>ID: {product.id}</li>
          <li> Descrição: {product.name}</li>
          <li>Preço: {product.price}</li>
          <Link href="/products/[prodId]" as={`/products/${product.id}`}>
            Detalhes
          </Link>
        </ul>
      ))}
    </div>
    // </ul>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(`http://localhost:3001/products`, { method: 'GET' });
  const products = await res.json();
  if (!products) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products,
    }, // will be passed to the page component as props
  };
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const res = await fetch(`http://localhost:3001/products`, { method: 'GET' });
//   const products = await res.json();
//   if (!products) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       products,
//     }, // will be passed to the page component as props
//   };
// };

export default ProdutsListPage;
