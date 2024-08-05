import CardList from "@/components/CardList/CardList";
import Carrousel from "@/components/Carrousel/Carrousel";

const Home: React.FC = () => {
  return (
    <div>
      <Carrousel />
      <CardList />
    </div>
  );
};

export default Home;
