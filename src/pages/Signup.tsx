import SignupForm from "@/components/SignupForm/SignupForm";

const Signup = () => {
  return (
    <div className="grid grid-rows-1 lg:grid-cols-2">
      <section className="hidden lg:block">{/* Left section */}</section>
      <section className="">
        {/* Right section */}
        <SignupForm />
      </section>
    </div>
  );
};

export default Signup;
