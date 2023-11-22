import Filter from "@/components/Filter";
import Tag from "@/components/Tag";
import GlobalSearch from "@/components/search/GlobalSearch";
import { HomePageFilters } from "@/constant/filters";

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      <p className="text-dark-200  dark:text-light-900 h1-bold md:mb-7 ">
        All Questions
      </p>

      <div className="flex items-center max-md:flex-col gap-2">
        <GlobalSearch
          placeholder="Search for Question"
          className="w-full"
          iconSide="left"
        />

        <Filter
          filter={HomePageFilters}
          className="md:min-w-[180px] max-md:w-full"
          mainClassName=" max-md:w-full"
        />
      </div>
    </div>
  );
};

export default Home;
