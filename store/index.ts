import { DataType } from "@/components/builderTable";
import { AtomEffect, atom, selector } from "recoil";

type whereType = "淘宝" | "京东" | "拼多多";
type typeType =
  | "CPU"
  | "散热器"
  | "主板"
  | "显卡"
  | "内存"
  | "固态"
  | "机械"
  | "电源"
  | "机箱"
  | "板U";

interface PartType {
  type: typeType;
  name: string;
  price: number;
  where: whereType;
  img?: string;
  url?: string;
}

const store = typeof window !== 'undefined' ? window.localStorage : null;


const localStorageEffect: (key:string) => AtomEffect<PartType[]> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    if (store) {
      const savedValue = store.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        isReset ? store.removeItem(key) : store.setItem(key, JSON.stringify(newValue));
      });
    }
  };


const partsState = atom<PartType[]>({
  key: "partsState",
  default: [],
  effects: [
    // ({ setSelf, onSet }) => {
    //   const key = "parts";
    //   const savedValue = localStorage.getItem(key);
    //   if (savedValue != null) {
    //     setSelf(JSON.parse(savedValue));
    //   }

    //   onSet((newValue, _, isReset) => {
    //     console.log(newValue);
    //     isReset
    //       ? localStorage.removeItem(key)
    //       : localStorage.setItem(key, JSON.stringify(newValue));
    //   });
    // },
    localStorageEffect("parts"),
  ],
});

interface TabType {
  id: number;
  name: string;
  date: Date;
  parts: DataType[];
}

const data: DataType[] = [
  {
    type: "CPU",
    empty: false,
    name: "AMD 5700x",
    price: 1349,
    where: "京东",
    img: "https://img12.360buyimg.com/n1/s450x450_jfs/t1/220364/12/15438/167638/623ad3f4E8cf3007b/4565f2a19edd9c6f.jpg.avif",
    url: "https://item.jd.com/100020455567.html",
  },
  {
    type: "主板",
    empty: true,
  },
  {
    type: "显卡",
    empty: true,
  },
  {
    type: "内存",
    empty: true,
  },
  {
    type: "固态",
    empty: true,
  },
  // {
  //   type: '机械',
  //   empty: true,
  // },
  {
    type: "散热器",
    empty: true,
  },
  {
    type: "机箱",
    empty: true,
  },
];

// const tabsState = atom<TabType[]>({
//   key: "tabsState",
//   default: [],
//   // default:
// });

// const curTab = atom<>

export { partsState,};
