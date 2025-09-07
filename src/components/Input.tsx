import { PlusIcon } from "../assets/Icons";

export const InputGroup = ({ addCard }: { addCard: () => void }) => {
  return (
    <div className="flex flex-row gap-4">
      <input className="input-title" placeholder="제목을 입력해주세요." />
      <Button title={<PlusIcon />} action={addCard} />
    </div>
  );
};
const Button = ({
  title,
  action,
}: {
  title: string | React.ReactNode;
  action: () => void;
}) => {
  return (
    <button className="add-button" onClick={action}>
      {title}
    </button>
  );
};
