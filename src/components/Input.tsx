import { PlusIcon } from "../assets/Icons";

export const InputGroup = ({
  action,
  title,
  setTitle,
}: {
  action: () => void;
  title: string;
  setTitle: (title: string) => void;
}) => {
  return (
    <div className="flex flex-row gap-4">
      <input
        className="input-title"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && action()}
      />
      <Button title={<PlusIcon />} action={action} />
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
