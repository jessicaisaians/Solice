"use client";
import { TomanIcon } from "@/app/components/TomanIcon";
import clsx from "clsx";
import Image from "next/image";
import { FC, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";

interface CatalogProps {}
const url = process.env.NEXT_PUBLIC_PRODUCT_IMAGES_URL;
const products = [
  {
    sdk: "2753/122",
    colorId: "1",
    images: [
      url + "/oversized_blazer/3736043505_1_1_1.jpg",
      url + "/oversized_blazer/3736043505_2_1_1.jpg",
      url + "/oversized_blazer/3736043505_2_2_1.jpg",
      url + "/oversized_blazer/3736043505_2_3_1.jpg",
      url + "/oversized_blazer/3736043505_6_1_1.jpg",
      url + "/oversized_blazer/3736043505_6_2_1.jpg",
      url + "/oversized_blazer/3736043505_6_3_1.jpg",
      url + "/oversized_blazer/3736043505_6_4_1.jpg",
    ],
    title: "کت اور",
    category: "blazer",
    price: 1200,
    discountPercent: 0,
  },
  {
    sdk: "2353/123",
    colorId: "1",
    images: [
      url + "/oversized_blazer/3736043505_1_1_1.jpg",
      url + "/oversized_blazer/3736043505_2_1_1.jpg",
      url + "/oversized_blazer/3736043505_2_2_1.jpg",
      url + "/oversized_blazer/3736043505_2_3_1.jpg",
      url + "/oversized_blazer/3736043505_6_1_1.jpg",
      url + "/oversized_blazer/3736043505_6_2_1.jpg",
      url + "/oversized_blazer/3736043505_6_3_1.jpg",
      url + "/oversized_blazer/3736043505_6_4_1.jpg",
    ],
    title: "کت اصور",
    category: "blazer",
    price: 1200,
    discountPercent: 0,
  },
  {
    sdk: "2753/122",
    colorId: "12",
    images: [
      `${url}/oversized_blazer/3736043505_1_1_1.jpg`,
      `${url}/oversized_blazer/3736043505_2_1_1.jpg`,
      `${url}/oversized_blazer/3736043505_2_2_1.jpg`,
      `${url}/oversized_blazer/3736043505_2_3_1.jpg`,
      `${url}/oversized_blazer/3736043505_6_1_1.jpg`,
      `${url}/oversized_blazer/3736043505_6_2_1.jpg`,
      `${url}/oversized_blazer/3736043505_6_3_1.jpg`,
      `${url}/oversized_blazer/3736043505_6_4_1.jpg`,
    ],
    title: "کت اصسور",
    category: "blazer",
    price: 1200,
    discountPercent: 0,
  },
  {
    sdk: "2753/122",
    colorId: "1",
    images: [
      url + "/oversized_blazer/3736043505_1_1_1.jpg",
      url + "/oversized_blazer/3736043505_2_1_1.jpg",
      url + "/oversized_blazer/3736043505_2_2_1.jpg",
      url + "/oversized_blazer/3736043505_2_3_1.jpg",
      url + "/oversized_blazer/3736043505_6_1_1.jpg",
      url + "/oversized_blazer/3736043505_6_2_1.jpg",
      url + "/oversized_blazer/3736043505_6_3_1.jpg",
      url + "/oversized_blazer/3736043505_6_4_1.jpg",
    ],
    title: "کت اشصور",
    category: "blazer",
    price: 1200,
    discountPercent: 0,
  },
];
const Catalog: FC<CatalogProps> = ({}) => {
  const [isFav, setIsFav] = useState(false);
  const handleToggleFav = () => setIsFav((prev) => !prev);
  const [showModule, setShowModule] = useState<boolean>(false);
  const [data, setData] = useState<
    | {
        sdk: string;
        colorId: string;
        colors: {
          id: string;
          label: string;
          hex: string;
        }[];
        sizes: { label: string; stockCnt: number }[];
      }
    | undefined
  >(undefined);
  const fetchProductStock = (productSdk: string, colorId: string) => {
    setData({
      sdk: productSdk,
      colorId,
      colors: [
        { id: "1", label: "بژ", hex: "#e0d1a6" },
        { id: "2", label: "آبی", hex: "#93dcf0" },
      ],
      sizes: [
        { label: "L", stockCnt: 1 },
        { label: "M", stockCnt: 2 },
        { label: "S", stockCnt: 0 },
      ],
    });
  };
  return (
    <>
      {/* <div className="absolute inset-0 bg-black opacity-80 z-[9998]"></div>
      <div className="py-3 px-4 fixed z-[9999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] shadow-2xl rounded-lg min-h-[300px] w-[300px] bg-stone-200">
            سایز موردنظر خود را انتخاب کنید:

        
      </div> */}
      <div className="select-none cursor-pointer flex flex-wrap gap-6 gap-y-9 items-center justify-center">
        {products.map((product) => (
          <div className="flex flex-col items-center" key={product.title}>
            <div className="relative rounded-lg h-[60vh] min-h-[300px] w-auto overflow-hidden ">
              <Image
                className="h-full w-auto"
                src={product.images?.[0]}
                alt={product.title}
                height={300}
                width={300}
              />
              {showModule && (
                <div className="w-full absolute left-0 right-0 py-1 bottom-0 z-50 h-[60%] bg-stone-100 opacity-90">
                  <div className="max-h-full overflow-scroll px-6 py-4 ">
                    <div className="mb-4 flex flex-col gap-2">
                      <div className="flex flex-wrap gap-3 ">
                        {data?.colors?.map((color) => (
                          <div
                            onClick={() =>
                              fetchProductStock(data?.sdk, color.id)
                            }
                            key={color.hex}
                            className={clsx(
                              data?.colorId === color.id
                                ? "outline- outline outline-offset-1 outline-blue-600"
                                : "outline-none",
                              "h-4 w-4 rounded-full "
                            )}
                            style={{ background: color.hex }}
                            title={color.label}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-stone-500">
                        {
                          data?.colors.find((item) => item.id === data.colorId)
                            ?.label
                        }{" "}
                        | {data?.sdk}
                      </p>
                    </div>
                    <div className="mb-4 flex flex-col gap-2">
                      {data?.sizes?.map((size) => (
                        <div
                          key={size.label}
                          className="flex justify-between items-baseline"
                        >
                          <div
                            className={`text-sm ${
                              size.stockCnt > 0
                                ? "text-stone-900"
                                : "text-stone-500"
                            }`}
                          >
                            {size.label}
                          </div>
                          {size.stockCnt == 0 && (
                            <div className="text-stone-500 text-xs">
                              ناموجود
                            </div>
                          )}
                        </div>
                      ))}
                
                        </div>
                  </div>
                </div>
              )}
              <div
                onClick={() => {
                  setShowModule((prev) => !prev);
                  fetchProductStock(product.sdk, product.colorId);
                }}
                className="cursor-scale absolute bottom-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-white opacity-70 flex items-center justify-center"
              >
                <BiPlus className="text-stone-500 hover:text-black      " />
              </div>
              {/* <div className="absolute top-4 left-4 h-8 w-8 rounded-full border-stone-600 border-2 opacity-1 blur-sm flex items-center justify-center"></div> */}
              <div
                onClick={handleToggleFav}
                className={clsx(
                  isFav
                    ? "border-red-300"
                    : "border-stone-300 hover:border-red-500 ",
                  "transition-all group/item absolute top-4 left-4 h-8 w-8 rounded-full border-2 flex items-center justify-center"
                )}
              >
                {!isFav && (
                  <AiOutlineHeart
                    className={clsx(
                      "absolute text-stone-300 group-hover/item:scale-125 group-active/item:scale-110 group-active/item:opacity-0 opacity-100 group-hover/item:text-red-500 transition"
                    )}
                  />
                )}
                <AiFillHeart
                  className={clsx(
                    isFav ? "opacity-1" : "opacity-0",
                    isFav
                      ? "group-hover/item:scale-1 group-active/item:scale-95"
                      : "group-hover/item:scale-125 group-active/item:scale-110",
                    isFav
                      ? "text-red-400"
                      : "text-stone-300 group-hover/item:text-red-500 ",
                    "absolute  group-active/item:opacity-100   transition"
                  )}
                />
              </div>
            </div>
            <p className="text-stone-400 mt-3 text-sm">{product.title}</p>
            <p className="text-stone-300 mt-3 text-lg font-bold flex">
              {product.price.toLocaleString("fa-IR")}{" "}
              <TomanIcon color="rgb(214 211 209)" scale={1.3} />
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
export default Catalog;
