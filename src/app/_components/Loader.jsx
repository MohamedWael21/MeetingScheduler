import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#0069ff"
        secondaryColor="#0069ff"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
export default Loader;
