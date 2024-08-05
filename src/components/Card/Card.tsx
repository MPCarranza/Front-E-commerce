
import ICardProduct from "@/Interfaces/IProducts";


const Card: React.FC<ICardProduct> = ({ name, price, stock, image }) => {
  
  return (
    
<div className="relative m-10 flex items-center w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img className="object-cover" src={image} alt={`Imagen del producto: ${image}`}/>
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">50% OFF</span>
      </div>
      <div className="mt-4 px-5 pb-5">    
        <h5 className="text-xl tracking-tight text-slate-900 line-clamp-1">{name}</h5>    
        <div className="mt-2 mb-5 flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">Price: ${price}</span>     
        </div>
        <div className="ml-0 mt-3 my-3 items-center px-8">
          <span>{stock ? <p className="text-[#FFB21D] text-[16px] my-2">Only {stock} available</p> : null}</span>        
        </div> 
      </div>
</div>

  );
};

export default Card;
