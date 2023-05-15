import BigNumbers from "./big-numbers/big-numbers";
import WhyUs from "./why-us/why-us";
import HowItWorks from "./how-it-works/how-it-works";

// компонента Home, яка вертає компоненти для головної сторінки
export default function Home() {
  return (
    <div>
      <BigNumbers />
      <WhyUs />
      <HowItWorks />
    </div>
  );
}
