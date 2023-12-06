/* eslint-disable tailwindcss/classnames-order */
import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import UserCard from "@/components/cards/UserCard";
import GlobalSearch from "@/components/search/GlobalSearch";
import { UserFilters } from "@/constant/filters";
import { GetAllUsers } from "@/lib/actions/users-action ";

const CommunityPage = async ({ searchParams }: any) => {
  const result = await GetAllUsers({
    searchQuery: searchParams.q,
    page: searchParams.page,
  });
  // console.log(result.users);
  return (
    <div className="flex w-full flex-col">
      <p className="h1-bold  mb-4 text-dark-200 dark:text-light-900 md:mb-7 ">
        Community
      </p>

      <div className="flex items-center gap-2 max-md:flex-col">
        <GlobalSearch
          placeholder="Search for Question"
          className="w-full"
          iconSide="left"
        />

        <Filter
          filter={UserFilters}
          className="max-md:w-full md:min-w-[180px] "
          mainClassName=" max-md:w-full"
        />
      </div>

      <section className="mt-5 flex w-full flex-wrap gap-4">
        {result.users.length > 0 ? (
          <div className=" grid-col-auto-fill w-full  gap-4  ">
            {result.users.map((user) => (
              <UserCard key={user._id} user={user} />
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

export default CommunityPage;
