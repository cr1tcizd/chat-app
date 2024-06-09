import "./contact.scss";
import catImg from "./../../assets/cat.png";

export const Contact = ({ contact }) => {
  console.log(contact);
  return (
    <div className="contact">
      <img className="contact__img" src={contact.photoUrl} alt="" />

      <div className="contact__content">
        <div className="contact__content__head">
          <div className="contact__content__head__name">
            {contact.displayName}
          </div>
          <p className="contact__content__head__time">12m</p>
        </div>
        <div className="contact__content__message">null</div>
      </div>
    </div>
  );
};
