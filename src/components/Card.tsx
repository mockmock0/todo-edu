import { useLocalStorage } from "../hooks/useLocalStorage";
import { CloseIcon } from "../assets/Icons";

export const Card = ({ item }: { item: { id: number; name: string } }) => {
  const [init, setInit] = useLocalStorage("init", []);
  const [second, setSecond] = useLocalStorage("second", []);
  const [third, setThird] = useLocalStorage("third", []);
  const [fourth, setFourth] = useLocalStorage("fourth", []);
  const handleDelete = () => {
    const id = item.id;
    for (const group of [
      { get: init, set: setInit },
      { get: second, set: setSecond },
      { get: third, set: setThird },
      { get: fourth, set: setFourth },
    ]) {
      group.set(group.get.filter((i: { id: number; name: string }) => i.id !== id));
    }
  };
  return (
    <main className="card">
      <h2 className="card-title">{item.name}</h2>
      <button className="delete-button" onClick={handleDelete}>
        <CloseIcon />
      </button>
    </main>
  );
};
