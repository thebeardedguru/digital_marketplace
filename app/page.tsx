import { ProductRow } from './components/ProductRow';

export default function Home() {
  return (
    <section className='bg-gradient-to-br from-white to-gray-50 py-24 px-8'>
      <div className='max-w-6xl mx-auto text-center px-6'>
        <h1 className='text-5xl font-extrabold text-gray-900 tracking-tight'>
          Chatty<span className='text-primary'>&apos;</span>s Luxury Handbags
        </h1>
        <h2 className='text-2xl font-medium text-gray-700 mt-4'>
          Your Destination for New & Pre-Loved Designer Purses
        </h2>
        <p className='text-lg text-gray-600 mt-6 max-w-3xl mx-auto'>
          Shop a curated collection of authentic, high-end handbags from top
          brands. Whether you’re looking for the latest trends or timeless
          classics, find your perfect match with us.
        </p>
        <div className='mt-10 flex justify-center space-x-4'>
          <a
            href='#new-arrivals'
            className='px-8 py-3 bg-primary text-white border border-primary font-semibold rounded-full shadow-lg hover:bg-white hover:border-primary hover:text-primary transition ease-in-out duration-300'
          >
            Shop New Arrivals
          </a>
          <a
            href='#pre-loved-gems'
            className='px-8 py-3 bg-white border border-primary text-primary font-semibold rounded-full shadow-lg hover:text-white hover:bg-primary transition ease-in-out duration-300'
          >
            Explore Pre-Loved Gems
          </a>
        </div>
      </div>
      <ProductRow category={'newest'} />
      <ProductRow category={'purses'} />
      <ProductRow category={'clothing'} />
      <ProductRow category={'accessories'} />
    </section>
  );
}
