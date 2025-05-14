
import Layout from "../components/layout/Layout";
import SignupForm from "../components/auth/SignupForm";

const Signup = () => {
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <SignupForm />
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
