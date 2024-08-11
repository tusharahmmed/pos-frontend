import React, {useEffect, useState} from "react";
import StoreLayout from "@/layouts/StoreLayout";
import styles from "@/styles/store/index.module.scss";
import BrandItem from "@/components/store/brandItem";
import ProductCart from "@/components/store/ProductCart";
import {useAppDispatch, useAppSelector, useDebounced} from "@/rtk/hooks";
import {setBrand, setCategory} from "@/rtk/features/store/storeSlice";
import {useGetBrandsQuery} from "@/rtk/features/api/brandApi";
import {IBrand, IProduct} from "@/types";
import {
  productApi,
  useGetStoreProductsQuery,
} from "@/rtk/features/api/productApi";
import {Spinner} from "@/components/ui/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import {Empty, Result} from "antd";

const StorePage = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [nextPage, setNextPage] = useState<number>(2);
  const [showSpin, setShowSpin] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const store = useAppSelector((state: {store: any}) => state.store);

  // filters
  query["limit"] = 6;

  if (store.category_id) {
    query["category_id"] = store.category_id;
  }
  if (store.brand_id) {
    query["brand_id"] = store.brand_id;
  }

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["search"] = debouncedSearchTerm;
  }

  // functions
  const resetFilters = () => {
    dispatch(setBrand(""));
    dispatch(setCategory(""));
    setSearchTerm("");
  };

  // brands
  const {data: brandData} = useGetBrandsQuery({});
  const brands = brandData?.brands;

  // infinity scroll

  const {
    data: productData,
    isLoading,
    isError,
  } = useGetStoreProductsQuery({...query});

  const {products, meta} = productData || {};

  // calculate has more
  useEffect(() => {
    if (meta) {
      const totalPage = Math.ceil(meta?.total / meta?.limit);
      // console.table({totalPage: totalPage, nextPage: nextPage});
      if (nextPage > totalPage) {
        setShowSpin(false);
      }
    }
  }, [meta, nextPage]);

  // reset if filter change
  useEffect(() => {
    setNextPage(2);
    setShowSpin(true);
    // dispatch(baseApi.util.invalidateTags([tagTypes.store_product]));
  }, [searchTerm, store.brand_id, store._category_id]);

  const fetchData = () => {
    setNextPage((prevPage) => prevPage + 1);

    if (meta) {
      const totalPage = Math.ceil(meta?.total / meta?.limit);
      if (nextPage <= totalPage) {
        // console.log(`data is fatchin ${nextPage}`);
        dispatch(
          productApi.endpoints.getMoreStoreProducts.initiate({
            page: nextPage,
            ...query,
          })
        );
      }
    }
  };
  // console.log(products);

  let content = null;
  if (isLoading) {
    content = (
      <div className="flex items-center justify-center text-gold">
        <Spinner />
      </div>
    );
  }
  if (!isLoading && isError) {
    content = (
      <div className="flex items-center justify-center text-gold">
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
        />
      </div>
    );
  }
  if (!isLoading && !isError && products?.length === 0) {
    content = (
      <div className="pt-32">
        <Empty />
      </div>
    );
  }
  if (!isLoading && !isError && products?.length > 0) {
    let height = (83.5 * window.innerHeight) / 100;
    content = (
      <InfiniteScroll
        className={styles.scrollWraper}
        height={height}
        dataLength={products?.length} //This is important field to render the next data
        next={fetchData}
        hasMore={showSpin}
        loader={
          <div className="flex items-center justify-center text-gold  pb-3">
            <Spinner />
          </div>
        }
        endMessage={
          <div className="flex items-center justify-center gap-1 font-inter pb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 h-[30px] w-[30px]">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <span>You're all cauth up</span>
          </div>
        }>
        <div className={styles.productWraper}>
          {products?.map((item: IProduct) => (
            <ProductCart key={item.id} data={item} />
          ))}
        </div>
      </InfiniteScroll>
    );
  }

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.inputWraper}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            className="font-medium"
            type="text"
            placeholder="Search menu"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div id="list" className={styles.brandWraper}>
          <span
            onClick={() => {
              dispatch(setBrand(""));
            }}
            className={store.brand_id == "" ? "active" : ""}>
            All
          </span>

          {brands?.map((item: IBrand) => (
            <BrandItem key={item.id} data={item} />
          ))}

          <div id="right-arrow" className={`${styles.wrightArrow} `}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
        {(!!store.brand_id || !!store.category_id || !!searchTerm) && (
          <div
            style={{}}
            className="bg-gold text-white absolute left-[44%] top-[58px] cursor-pointer px-4 py-1 font-inter rounded-full text-sm"
            onClick={resetFilters}>
            Remove filters
          </div>
        )}
      </div>

      {/* {products?.length ? (
        <InfiniteScroll
          height={400}
          dataLength={products?.length} //This is important field to render the next data
          next={fetchData}
          hasMore={showSpin}
          loader={
            <div className="flex items-center justify-center text-gold">
              <Spinner />
            </div>
          }
          endMessage={
            <div className="flex items-center justify-center gap-1 font-inter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <span>You're all cauth up</span>
            </div>
          }>
          <div className={styles.productWraper}>
            {products?.map((item: IProduct) => (
              <ProductCart key={item.id} data={item} />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <div className="pt-32">
          <Empty />
        </div>
      )} */}
      {content}
    </div>
  );
};

export default StorePage;

StorePage.getLayout = function getLayout(page: React.ReactElement) {
  return <StoreLayout>{page}</StoreLayout>;
};
