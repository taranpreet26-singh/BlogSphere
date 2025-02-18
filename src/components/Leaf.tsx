import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Leaf:React.FC = () => {
  return (
    <div className=' hidden lg:flex z-[10] w-[50rem] h-screen absolute left-0 -top-10'>

    <DotLottieReact
      src="https://lottie.host/c4d7f2ab-be81-4b89-884c-6c9642629119/33tHgUIiDw.lottie"
      loop
      autoplay
      />
      </div>
  );
};

export default Leaf