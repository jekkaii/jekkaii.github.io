import preloader from "../components/resources/preloader-logov2.svg"; // Update the path to your logo image

export default function SpinnerLoader() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <img className="mw-100" src={preloader} alt="preloader-logo" />
        <h4 className="fw-normal">Loading...</h4>
      </div>
    </div>
  );
}
