export const GroupWrapper = ({
  tag,
  group,
}: {
  tag: React.ReactNode;
  group: React.ReactNode;
}) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      {tag}
      {group}
    </div>
  );
};

export const GroupTag = ({
  length,
  primary,
  secondary,
}: {
  primary: string;
  secondary: string;
  length: number;
}) => {
  return (
    <div className="relative flex flex-col items-center select-none">
      <h6 className="text-sm font-bold w-[2rem]">{primary}</h6>
      <div id="separator"></div>
      <h6 className="text-sm font-bold w-[2rem]">{secondary}</h6>
      {length > 0 && (
        <div
          style={{
            fontFamily: "Pretendard",
            backgroundColor:
              length >= 10 ? `#b71c1c90` : length >= 5 ? `#ef6c0090` : `#0288d190`,
          }}
          className="tag-count"
        >
          {length}
        </div>
      )}
    </div>
  );
};
