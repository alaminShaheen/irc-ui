import SignupForm from "@/components/SignupForm/SignupForm";
import SignupContent from "@/components/SignupContent/SignupContent";

const Signup = () => {
  return (
    <div className="grid grid-rows-1 md:grid-cols-2">
      <section className="hidden md:block">
        {/* Left section */}
        <SignupContent />
      </section>
      <section className="">
        {/* Right section */}
        <SignupForm />
      </section>
    </div>
  );
};

export default Signup;
