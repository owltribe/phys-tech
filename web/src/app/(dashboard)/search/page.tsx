// import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ListServices from "@/app/(dashboard)/search/_components/ListServices";
import LoginDialog from "@/components/dialogs/login-dialog";
import {Button} from "@radix-ui/themes";
import {LogIn} from "lucide-react";

// import { db } from "@/lib/db";
// import { SearchInput } from "@/components/search-input";
// import { getCourses } from "@/actions/get-courses";
// import { CoursesList } from "@/components/courses-list";
//
// import { Categories } from "./_components/categories";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

const SearchPage = async ({
  searchParams
}: SearchPageProps) => {
  // const { userId } = auth();

  // if (!userId) {
  //   return redirect("/");
  // }

  // const categories = await db.category.findMany({
  //   orderBy: {
  //     name: "asc"
  //   }
  // });

  // const courses = await getCourses({
  //   userId,
  //   ...searchParams,
  // });

  return (
    <>
      {/*<div className="px-6 pt-6 md:hidden md:mb-0 block">*/}
      {/*  /!*<SearchInput />*!/*/}
      {/*  Hello teacher*/}
      {/*</div>*/}
      <div className="p-6 space-y-4">
        {/*<Categories*/}
        {/*  items={categories}*/}
        {/*/>*/}

           {/*<LoginDialog>*/}
           {/* <Button size="2">*/}
           {/*   <LogIn className="h-4 w-4 mr-2" />*/}
           {/*   Войти*/}
           {/* </Button>*/}
          {/*</LoginDialog>*/}

        <ListServices />
      </div>
    </>
   );
}
 
export default SearchPage;