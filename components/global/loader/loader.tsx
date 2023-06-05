import { ReactNode } from "react";

interface Props {
  loading: boolean;
  children: ReactNode;
}

export default function Loader({ loading, children }: Props) {
  return loading ? (
    <div className="bg">
      <div className="form">
        <h2>Loading...</h2>
      </div>
    </div>
  ) : (
    <>{children}</>
  );
}
