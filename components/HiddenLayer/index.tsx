type TransparentPopup = {
  clicked(appear: boolean): void;
};

const HiddenLayer = ({ clicked }: TransparentPopup) => {
  return (
    <div
      className={`closePopupFullScreen`}
      onClick={() => {
        clicked(false);
      }}
    ></div>
  );
};
export default HiddenLayer;
