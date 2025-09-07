import { type FC, useState } from "react";
import "./App.css";
import { Card } from "./components/Card";
import { ReactSortable } from "react-sortablejs";
import { For } from "./utils/For";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { InputGroup } from "./components/Input";
import { GroupWrapper, GroupTag } from "./components/DragGroup";

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
  const addCard = () => {
    if (title.trim() === "") return;
    const allCards = [...init, ...second, ...third, ...fourth];
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

    setSecond([]);
    setThird([]);
    setFourth([]);
  };
  return (
    <div className="flex flex-col gap-4 container">
      <div className="flex flex-row gap-4">
        <button onClick={() => handleGroup("월초")}>월초</button>
        <button onClick={() => handleGroup("중순")}>중순</button>
        <button onClick={() => handleGroup("월말")}>월말</button>
      </div>
      <InputGroup addCard={addCard} />
      <GroupWrapper
        tag={<GroupTag primary="품의" secondary="작성" length={init.length} />}
        group={<CardGroup array={init} setArray={setInit} />}
      />
      <GroupWrapper
        tag={<GroupTag primary="원인" secondary="세외수납" length={second.length} />}
        group={<CardGroup array={second} setArray={setSecond} />}
      />
      <GroupWrapper
        tag={<GroupTag primary="결의" secondary="세외반환" length={third.length} />}
        group={<CardGroup array={third} setArray={setThird} />}
      />
      <GroupWrapper
        tag={<GroupTag primary="지급" secondary="발송" length={fourth.length} />}
        group={<CardGroup array={fourth} setArray={setFourth} />}
      />
    </div>
  );
}

export default App;
