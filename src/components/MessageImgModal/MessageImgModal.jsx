import { useDispatch, useSelector } from "react-redux";
import "./messageImgModal.scss";
import { setImgModal } from "../../store/features/chat/chatSlice";

export const MessageImgModal = () => {
  const { imgModal } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  return (
    <div
      className={
        imgModal.status
          ? "messageImgModal messageImgModal-active"
          : "messageImgModal"
      }
      onClick={() =>
        dispatch(
          setImgModal({
            photo: null,
            status: false,
          })
        )
      }
    >
      <div
        className={
          imgModal.status
            ? "messageImgModal__content messageImgModal__content-active"
            : "messageImgModal__content"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="messageImgModal__content__img"
          src={imgModal.photo}
          alt=""
        />
      </div>
    </div>
  );
};
