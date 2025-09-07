import { type FC, useState } from "react";
import "./App.css";
import { Card } from "./components/Card";
import { ReactSortable } from "react-sortablejs";
import { For } from "./utils/For";
import { useLocalStorage } from "./hooks/useLocalStorage";

import { GroupWrapper, GroupTag } from "./components/DragGroup";
import { InputGroup } from "./components/Input";

const INIT_ARR = [
  { id: 1, name: "돌봄" },
  { id: 2, name: "연계형 돌봄" },
  { id: 3, name: "아침늘봄" },
  { id: 4, name: "특수" },
  { id: 5, name: "유치원특수" },
  { id: 6, name: "배움터" },
  { id: 7, name: "유치원 교육도우미" },
  { id: 8, name: "1수업 2교사" },
  { id: 9, name: "관외" },
  { id: 10, name: "관내" },
  { id: 11, name: "전달 보험료작업" },
];

interface CardType {
  id: number;
  name: string;
}

export const CardGroup: FC<{
  array: CardType[];
  setArray: (init: CardType[]) => void;
}> = ({ array, setArray }) => {
  return (
    <ReactSortable
      className="card-group"
      list={array}
      setList={setArray}
      group="shared"
      animation={200}
      delayOnTouchOnly={true}
      delay={2}
    >
      <For each={array} render={(item) => <Card item={item} key={item.id} />} />
    </ReactSortable>
  );
};
function App() {
  const [init, setInit] = useLocalStorage("init", INIT_ARR);
  const [second, setSecond] = useLocalStorage("second", []);
  const [third, setThird] = useLocalStorage("third", []);
  const [fourth, setFourth] = useLocalStorage("fourth", []);
  const [title, setTitle] = useState("");

  const GroupArray = [
    {
      primary: "품의",
      secondary: "작성",
      length: init.length,
      array: init,
      setArray: setInit,
    },
    {
      primary: "원인",
      secondary: "세외수납",
      length: second.length,
      array: second,
      setArray: setSecond,
    },
    {
      primary: "결의",
      secondary: "세외반환",
      length: third.length,
      array: third,
      setArray: setThird,
    },
    {
      primary: "지급",
      secondary: "발송",
      length: fourth.length,
      array: fourth,
      setArray: setFourth,
    },
  ];

  const addCard = () => {
    if (title.trim() === "") return;
    const allCards = [...init, ...second, ...third, ...fourth];
    console.log(allCards);
    const idx = (allCards.length ? Math.max(...allCards.map((c) => c.id)) : 0) + 1;
    setInit([...init, { id: idx, name: title }]);
    setTitle("");
  };
  const handleGroup = (group: string) => {
    if (group === "월초") setInit(INIT_ARR);
    if (group === "중순")
      setInit([
        { id: 1, name: "공무직 급여" },
        { id: 2, name: "원어민 급여" },
      ]);
    if (group === "월말")
      setInit([
        { id: 1, name: "보수변동자료" },
        { id: 2, name: "이번달 보험료작업" },
      ]);
    if (group === "전부 지우기") setInit([]);

    setSecond([]);
    setThird([]);
    setFourth([]);
  };
  return (
    <div className="flex flex-col gap-4 container">
      <header className="flex flex-row gap-4">
        <For
          each={["월초", "중순", "월말", "전부 지우기"]}
          render={(item) => (
            <button key={item} onClick={() => handleGroup(item)}>
              {item}
            </button>
          )}
        />
      </header>
      <InputGroup action={addCard} title={title} setTitle={setTitle} />
      <For
        each={GroupArray}
        render={(item) => (
          <GroupWrapper
            key={item.primary}
            tag={
              <GroupTag
                primary={item.primary}
                secondary={item.secondary}
                length={item.length}
              />
            }
            group={<CardGroup array={item.array} setArray={item.setArray} />}
          />
        )}
      />
    </div>
  );
}

export default App;
