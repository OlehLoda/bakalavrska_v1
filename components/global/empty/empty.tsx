export default function Empty({
  text = "First you need to authorize",
}: {
  text?: string;
}) {
  return (
    <div className="bg">
      <div className="form">
        <h2>{text}</h2>
      </div>
    </div>
  );
}
