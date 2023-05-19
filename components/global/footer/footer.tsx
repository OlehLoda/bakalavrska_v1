import Link from "next/link";
import s from "./footer.module.css";
import TelegramIcon from "@/public/icons/telegram";
import FacebookIcon from "@/public/icons/facebook";
import InstagramIcon from "@/public/icons/instagram";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.content}>
        <div className={s.left}>
          <div>
            <p>Наші соц мережі</p>
            <div className={s.socials}>
              <TelegramIcon />
              <FacebookIcon />
              <InstagramIcon />
            </div>
          </div>
          <hr />
        </div>
        <div className={s.right}>
          <div>
            <Link href="/#">Про нас</Link>
            <Link href="/requests">Заявки</Link>
            <Link href="/verification">Отримати верефікацію</Link>
          </div>
          <div>
            <p>Політика коонфіденційності</p>
            <p>Використання Cookies</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
