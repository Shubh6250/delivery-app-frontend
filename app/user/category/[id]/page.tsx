"use client";
import { useParams } from "next/navigation";
import React from "react";

const Category = () => {
  const params = useParams();
  //   const {data: categoryData} = useQuery({
  //     queryKey: [id],
  //     queryFn: () => getDataByCategory(id),
  //     enabled: !!id
  //   })
  return <div>Category {params.id}</div>;
};

export default Category;
