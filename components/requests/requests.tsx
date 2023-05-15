import Form from "./form/form";
import Create from "./create/create";
import RequestsList from "./requests-list/requests-list";

// компонента Requests вертає всі компоненти для сторінки заявок
export default function Requests() {
  return (
    <div>
      <Create />
      <Form />
      <RequestsList />
    </div>
  );
}
