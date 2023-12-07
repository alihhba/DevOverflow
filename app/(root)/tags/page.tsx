/* eslint-disable tailwindcss/classnames-order */
import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import TagCard from "@/components/cards/TagCard";
import GlobalSearch from "@/components/search/GlobalSearch";
import { TagFilters } from "@/constant/filters";
import { GetAllTags } from "@/lib/actions/tag-actions";

const TagsPage = async ({ searchParams }: any) => {
  const result = await GetAllTags({
    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,
    filter: searchParams.filter,
  });


  return (
    <div className="flex w-full flex-col">
      <p className="h1-bold  mb-4 text-dark-200 dark:text-light-900 md:mb-7 ">
        Tags
      </p>

      <div className="flex items-center gap-2 max-md:flex-col">
        <GlobalSearch
          placeholder="Search for Tags"
          className="w-full"
          iconSide="left"
        />

        <Filter
          filter={TagFilters}
          className="max-md:w-full md:min-w-[180px] "
          mainClassName=" max-md:w-full"
        />
      </div>

      <section className="mt-5 flex w-full flex-wrap gap-4">
        {result.tags.length > 0 ? (
          <div className=" grid-col-auto-fill w-full  gap-4  ">
            {result.tags.map((tag) => (
              <TagCard key={tag._id} tag={tag} />
            ))}
          </div>
        ) : (
          <div className="mx-auto w-full">not found</div>
        )}
      </section>

      <div className="mt-10">
        <Pagination
          isNext={result.isNext}
          page={searchParams?.page ? +searchParams.page : 1}
        />
      </div>
    </div>
  );
};

export default TagsPage;
