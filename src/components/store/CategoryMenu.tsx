import styles from "@/styles/store/categoryMenu.module.scss";
import CategoryItme from "./CategoryItme";
import {useGetCategoriesQuery} from "@/rtk/features/api/categoryApi";
import {ICategory} from "@/types";

const CategoryMenu = () => {
  const {data} = useGetCategoriesQuery({});
  const categories = data?.categories;

  return (
    <div
      id="store-category-menu"
      className={`${styles.container} font-inter text-dark`}>
      {categories?.map((item: ICategory) => (
        <CategoryItme key={item.id} data={item} />
      ))}
    </div>
  );
};

export default CategoryMenu;
